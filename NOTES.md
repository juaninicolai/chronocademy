Focus:

- Name, description, skills and languages as search vector
- Responsive navigation (hamburger)
- Wrap all pages (landing and app) in a container so they're centered
- FAQ

Nice to Have:

- signup journey
  - initialize initial signup state as null to prevent pages from being accessible if not going through flow
  - protect login pages when there is an active session, redirect users to /app (consider using layout)
  - change birthdate to text input box
  - make profile description non mandatory
  - add "back" button in signup journey (try to save state when going back)
  - Validate sign up form on change less often (Check debounce)
  - Handle unexpected signup action error
  - Display /api/auth/signin on /signin
  - At language secction make form scrollable (when adding 4 languages it moves up)
  - Gender in form (user details) and assign avatar based on that (Male/Female/Other)
- home page
  - profile card editor to customize how people see you
  - report a bug & request a feature: can we send via email metadata (or any private / hidden way) the user id?
