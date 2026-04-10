## Brief overview
This rule file defines project-specific guidelines for component management, reuse, and creation practices. These rules apply to all development work in this project and must be followed for all new code implementations.

## Component usage workflow
  - Always check for existing components in the codebase before writing new UI or functional code
  - Prioritize reusing existing components whenever possible instead of creating similar implementations
  - When an existing component does not meet requirements, request changes/extensions to that component rather than creating a new duplicate one
  - Never duplicate component logic or UI patterns across the codebase

## Component creation rules
  - Proactively identify duplicated code patterns during development
  - When duplicated code is found, always create a reusable shared component to replace the duplicate implementations
  - Components should be designed for reusability across multiple pages and use cases
  - Place all shared reusable components in the `/src/components/` directory