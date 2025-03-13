Fix:

- learning skills looks broken on mobile version (tested on iPhone 14 Pro Max)
- Titles of profile tabs, to be centered aligned instead of to the left
- For user's public page, if there is no data
  - e.g: no teaching description, hide that part
  - e.g: if there is no learning skill at all, just don't show "I am interested in: ..." at all

Focus:

- Profile/Account Information (2 columns, with language, and description full-width, bottom-right, spacing)

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
  - At language section make form scrollable (when adding 4 languages it moves up)
  - Gender in form (user details) and assign avatar based on that (Male/Female/Other)
- home page
  - profile card editor to customize how people see you
- footer
  - report a bug & request a feature: can we send via email metadata (or any private / hidden way) the user id?
