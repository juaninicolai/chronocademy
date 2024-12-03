- Implement Skills Page

  - validate email on next (partial work done)
  - initialize initial signup state as null to prevent pages from being accessible if not going through flow
  - use countries, timezone, language from database (add seed)
  - change birthdate to text input box

- Refine:
  - protect login pages when there is an active session, redirect users to /app (consider using layout)
  - make profile description non mandatory
    - placeholder: example
    - tip statement in a label
  - add "back" button in signup journey (try to save state when going back)

Nice to Have:

- Validate sign up form on change less often (Check debounce)
- Handle unexpected signup action error
- Display /api/auth/signin on /signin
