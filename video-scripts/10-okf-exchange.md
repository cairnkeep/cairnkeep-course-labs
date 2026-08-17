# Episode 10: reviewed OKF knowledge exchange

**Target duration:** 22 minutes
**Checkpoint:** `course-10-trust-context`
**Maps to:** L20-L21 and L24

## Before recording

- Use a disposable clone with Cairnkeep 2.14.0.
- Run `npm run check` and `scripts/test-okf-lab.sh`.
- Keep `CAIRN_PACK_BASE_DIR` under `.course-state/`.
- Show only the committed synthetic OKF fixture and fictional project files.
- Keep network credentials, notifications, and unrelated repositories hidden.

## 00:00 - Opening

**Show:** The synthetic OKF catalog beside an ordinary context-pack manifest.

**Say:** "Cairnkeep can exchange reviewed structured knowledge without becoming
an OKF runtime or silently promoting imported text into durable memory. We will
validate, pin, retrieve, preview, and explicitly confirm every state change."

## 01:10 - Re-establish least authority

**Show:** Set the disposable project to the read-only MCP profile and inspect
its profile digest.

**Say:** "The profile only removes tools. It does not enable context packs,
capabilities, or remote access, and its digest identifies configuration rather
than publisher trust."

## 03:00 - Validate source claims

**Show:** Run `cairn pack validate-okf` on the fixture and inspect version,
concept type, source, stale, and broken-link diagnostics.

**Say:** "Validation distinguishes a safe bundle from a perfect knowledge
claim. Staleness and a missing link remain visible diagnostics. A missing type,
unsafe path, symlink, invalid UTF-8, or YAML alias fails validation."

## 05:20 - Import without mutation

**Show:** Import as `trail-ledger-knowledge`, capture its digest, prove the
source stays unchanged, enable the digest for the disposable project, and show
the pack manifest.

**Say:** "The immutable digest is authoritative. The version label is useful
metadata, and the source assertions are preserved without becoming publisher
authenticity."

## 08:00 - Retrieve and traverse locally

**Show:** Start the project MCP server with `CAIRN_CONTEXT_PACKS=1`, then call
list, search, read, and `context_pack_related`.

**Say:** "Related-document traversal is read-only and closed-world. It follows
only local links in this enabled pack. It never fetches an external URL and never executes
computation, executor, or attester metadata."

## 11:30 - Preview an allowlist-only export

**Show:** Select one reviewed Markdown file, run export with `--check --json`,
inspect the output list and redaction count, and prove the destination does not
exist.

**Say:** "This no-write preview binds the selection, current bytes, redaction
result, and destination into one confirmation digest. Nothing is exported yet."

## 14:10 - Demonstrate fail-closed confirmation

**Show:** Try a wrong digest, then change a selected byte and show that the old
preview digest is rejected. Restore the reviewed text and preview again.

**Say:** "Approval is for exact bytes. A stale preview cannot authorize changed
content, and existing output is never replaced."

## 16:40 - Apply and inspect

**Show:** Apply with the exact digest, validate the exported OKF 0.2 directory,
open the redacted result, and confirm an unselected file is absent.

**Say:** "Export is allowlist-only. Redaction reduces accidental disclosure,
but the operator must still review the final bundle before publication."

## 19:10 - Recovery

**Show:** Disable and remove both packs, reset the MCP profile, run the bounded
course cleanup, and confirm normal project memory was not touched.

**Say:** "Imported context never became reviewed memory. Cleanup removes only
the disposable course state and exact project pointers we created."

## Privacy and trust boundary

All content is synthetic and local. Optional embeddings are not used. Pack
digests prove integrity, not publisher authenticity. Skills remain separately
approved, imports do not execute instructions, and exports require human review
even after redaction.

## Recap

**Say:** "We reduced MCP authority, imported structured context immutably,
traversed it without network access or execution, and exported only reviewed
bytes through a no-write preview and exact digest. That is useful exchange
without handing Cairnkeep an agent loop or a synchronization service."
