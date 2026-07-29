# Deliberately vulnerable review target

This module is synthetic input for `/repo-review` and `/security-audit`. It is
not imported by Trail Ledger and must never be deployed. Some behavior is
intentionally unsafe even though its tests pass.

The learner's task is to find concrete bugs, show an exploit path, propose the
smallest safe repair, and add regression tests without treating scanner output
as proof.

