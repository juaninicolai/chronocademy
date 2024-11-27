- Implement Skills Page
  - initialize initial signup state as null to prevent pages from being accessible if not going through flow
  - do backend stuff (database schemas, apis or form actions and mark skills to teach / learn and wire up on frontend)
  - render available skills as select options
  - finish sign up transaction
  - countries, skills, timezone table seeding
  - validate email on next
  - extras:
    - disable add skill button when there is no skill 
    - protect signup and login pages when there is an active session, redirect users to /app

- Refine:
  - disable add language by default
  - change birthdate to text input box
  - make profile description non mandatory
    - placeholder: example
    - tip statement in a label
  - add "back" button in signup journey (try to save state when going back)

Nice to Have:

- Validate sign up form on change less often (Check debounce)
- Handle unexpected signup action error
- Display /api/auth/signin on /signin
