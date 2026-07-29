# Decision 0001: use a bounded status set

**Status:** accepted

Trail Ledger accepts only `available`, `borrowed`, and `maintenance`. A missing
item is not represented as another status because that would mix inventory
existence with lending state.

If the requirement changes, supersede this decision and update the tests before
changing the implementation.

