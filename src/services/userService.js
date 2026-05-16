const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'https://multi-lingo-ai-api.vercel.app';

/**
 * Fetch the user's Firestore profile.
 */
export const getUserProfile = async (token, uid) => {
  const response = await fetch(
    `${PROXY_URL}/api/firestore?collection=users&id=${uid}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const json = await response.json();
  if (!response.ok) throw new Error(json?.error || json?.message || 'Failed to load profile');
  return json?.data || {};
};

/**
 * Update the user's Firestore profile.
 * Only fields passed in `data` are updated (partial update).
 */
export const updateUserProfile = async (token, uid, data) => {
  const response = await fetch(`${PROXY_URL}/api/firestore`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collection: 'users', id: uid, data }),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json?.error || json?.message || 'Failed to save settings');
  return json;
};

/**
 * Upload a profile image for the authenticated user.
 *
 * Flow:
 *   1. POST /api/storage  → get a signed upload URL + filePath
 *   2. PUT signed URL     → upload the raw file bytes directly to GCS
 *   3. PUT /api/firestore → update users/{uid}.photoURL with the public URL
 *
 * @param {string} token  - Firebase ID token
 * @param {string} uid    - User UID
 * @param {File}   file   - The image File object from <input type="file">
 * @returns {Promise<string>} The public URL of the uploaded avatar
 */
export const uploadProfileImage = async (token, uid, file) => {
  // Step 1 — request a signed upload URL from our API
  const initRes = await fetch(`${PROXY_URL}/api/storage`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: file.name,
      contentType: file.type,
      folder: 'avatars',
      metadata: { uid },
    }),
  });
  const initJson = await initRes.json();
  if (!initRes.ok) throw new Error(initJson?.error || 'Failed to initiate upload');

  const { uploadUrl, publicUrl } = initJson?.data || initJson;

  // Step 2 — upload file bytes directly to GCS via the signed URL
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!uploadRes.ok) throw new Error('Failed to upload image to storage');

  // Step 3 — persist the public URL in Firestore
  await updateUserProfile(token, uid, { photoURL: publicUrl });

  return publicUrl;
};

/**
 * Permanently delete the authenticated user's account.
 * Removes: Firestore doc, Storage files, Firebase Auth account.
 *
 * @param {string} token - Firebase ID token
 * @returns {Promise<void>}
 */
export const deleteAccount = async (token) => {
  const response = await fetch(`${PROXY_URL}/api/user`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json?.error || json?.message || 'Failed to delete account');
  return json;
};
