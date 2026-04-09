import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isDarkMode, t } = useAppContext();

  return (
    <main className="flex-grow flex items-center justify-center py-20 px-4">
      <div className={`max-w-md w-full p-8 rounded-3xl border-4 ${
        isDarkMode 
          ? "bg-slate-800 border-slate-700 neo-shadow-dark" 
          : "bg-white border-slate-900 neo-shadow-light"
      }`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2">{t.login}</h2>
          <p className="opacity-70">Welcome back to Nuno's Lingo</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input 
              type="email" 
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                isDarkMode 
                  ? "bg-slate-700 border-slate-600" 
                  : "bg-blue-50 border-slate-900"
              } outline-none focus:border-blue-600`}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Password</label>
            <input 
              type="password" 
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                isDarkMode 
                  ? "bg-slate-700 border-slate-600" 
                  : "bg-blue-50 border-slate-900"
              } outline-none focus:border-blue-600`}
              placeholder="••••••••"
            />
          </div>

          <button className={`w-full px-8 py-4 rounded-xl font-black border-4 ${
            isDarkMode 
              ? "bg-yellow-400 border-slate-900 text-slate-900 hover-neo-dark" 
              : "bg-yellow-400 border-slate-900 text-slate-900 hover-neo-light"
          } transition-all active:scale-95`}>
            {t.login}
          </button>

          <div className="text-center pt-4">
            <Link to="/" className="text-blue-600 hover:underline font-semibold">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;