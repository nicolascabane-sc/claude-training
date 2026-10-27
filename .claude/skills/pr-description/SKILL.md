---
name: pr-description
description: Write the title and description for a pull request in this repo, in its house style (Summary with the why, bullets, a Test plan with checkboxes). Use when opening a PR, when asked to write or improve a PR description, or before running gh pr create.
---

# PR descriptions

Write PR titles and descriptions that match the earlier PRs in this repo (see #15, #16, #17). A reviewer should understand why the change exists, what changed and what was verified, without opening the diff.

## 1. Gather the facts

Base the description on the branch, not on memory of the conversation.

```sh
git fetch -q
git log --oneline origin/main..HEAD
git diff --stat origin/main...HEAD
git diff origin/main...HEAD
```

Read enough of the diff to describe every change. If the branch touches tests, page objects or config, note whether test behaviour changed.

## 2. Title

- Imperative, sentence case, no trailing period, under about 70 characters.
- Say what the change does, not which files it touches: `Explain how known-defect tests appear in results`, not `Update README`.
- No prefixes like `feat:` or ticket IDs; earlier PRs don't use them.

## 3. Body template

```markdown
## Summary
<One or two sentences: the problem or reason, then what this PR does about it.>

- <One bullet per change, most important first>
- <Name files, functions and settings in backticks>
- <Show before → after for renames or wording changes>

<"No test behaviour changes." when that is true.>

## Test plan
- [x] <Check that was run, with its actual result>
- [ ] <Check that has not run yet, e.g. one only CI can do>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

For a PR with distinct parts, group the bullets under bold labels (`**README**`, `**Reporter fix**`) instead of one flat list.

## 4. Writing rules

- Lead with the why. "Test names were hard to read without the strategy's IDs" before "Drop the IDs".
- Be concrete: numbers, file paths, exact error text (`Expected to fail, but passed`), line counts (`47 → 106 lines`).
- Plain language, short sentences, no filler such as "This PR aims to" or "various improvements".
- Mention what a reviewer could trip over: behaviour changes, new secrets or settings, follow-up steps after merging.
- Don't repeat the diff line by line; summarise each change in one bullet.

## 5. Test plan: only what actually happened

- Tick `[x]` only for checks that were run on this branch, and give the real outcome. Never tick a check you did not run.
- Leave `[ ]` for checks still pending, and say who or what will do them (for example "CI on this PR uploads the report artifact").
- The usual checks in this repo:
  - `npx -p typescript@7.0.2 tsc -p .` passes (CI does not type-check)
  - `npx playwright test`: 15 passed (the two known-defect tests fail as expected)
- Docs, site or CI-only changes: say what was checked instead (rendered the page, preview deploy, `gh run` result).
- The Vercel deploy step only runs on pushes to `main`. If the PR changes it, say that this PR's CI run won't exercise it.

## 6. Output

- When opening the PR, pass the body through a heredoc so the formatting survives:

  ```sh
  gh pr create --title "<title>" --body "$(cat <<'EOF'
  <body>
  EOF
  )"
  ```

- When only asked to write the description, print the title and body in a Markdown code block so they can be pasted.
- Write `@name` only for real GitHub logins you mean to notify.
