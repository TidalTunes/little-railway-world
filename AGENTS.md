# Working on this game

Think from first principles.

## Local testing resources

The user's Mac has recently been crashing, with high WindowServer and Codex Renderer CPU usage. Keep browser testing resource-conscious:

- Use at most one rendered game instance at a time. Subagents should use focused non-browser checks; coordinate browser testing through the primary agent.
- Close every agent-created game/test tab when its check is finished, including published-site verification. Leave one open only when the user explicitly asks.
- Stop development/preview servers started for the task after testing. Do not stop unrelated user processes.
- Prefer focused tests during iteration. Run the full suite with limited concurrency once changes are ready (for example, `node --test --test-concurrency=2 tests/*.test.js`).
- Do not assume pausing the game stops GPU rendering. Close the test tab to release its resources.
