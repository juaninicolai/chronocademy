- Implement Skills Page
  - initialize initial signup state as null to prevent pages from being accessible if not going through flow
  - do backend stuff (database schemas, apis or form actions and mark skills to teach / learn and wire up on frontend) // WORK IN PROGRESS DONE check --wip-- commit
    - skills tableS (teaching, learning)
    - profile description (user_data)
  - schema validation
  - countries, skills, timezone table seeding
  - validate email on next

Nice to Have:

- Validate sign up form on change less often (Check debounce)
- Handle unexpected signup action error
- Display /api/auth/signin on /signin
