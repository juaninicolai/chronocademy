- Implement Skills Page

  - validate email on next (partial work done)
  - initialize initial signup state as null to prevent pages from being accessible if not going through flow
  - protect login pages when there is an active session, redirect users to /app (consider using layout)

- Refine:
  - change birthdate to text input box
  - make profile description non mandatory
  - add "back" button in signup journey (try to save state when going back)

Nice to Have:

- Validate sign up form on change less often (Check debounce)
- Handle unexpected signup action error
- Display /api/auth/signin on /signin
