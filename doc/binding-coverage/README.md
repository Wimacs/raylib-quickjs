# RayJS Binding Coverage Archive

This directory stores repeatable coverage snapshots and batch notes for raylib -> JS binding updates.

## Files

- `latest.md`: latest generated coverage snapshot (cheatsheet/API aligned).
- `archive/*.md`: dated batch logs, each one describing what changed and what remains.

## Update Workflow

1. Rebuild the generator bundle:

```bash
cd bindings
npm run build
```

2. Regenerate bindings and declarations:

```bash
cd ..
node generate-bindings.js
```

3. Refresh the latest snapshot:

```bash
node tools/report-binding-coverage.js --out=doc/binding-coverage/latest.md
```

4. Create a new archive note under `doc/binding-coverage/archive/` with:
- date and batch id
- before/after metrics
- APIs added in this batch
- remaining gaps and next priorities

## Notes

- Coverage metrics are based on `thirdparty/raylib/parser/output/raylib_api.json` compared to exported functions in `examples/lib.raylib.d.ts`.
- `ignore("...")` entries in `bindings/src/index.ts` are tracked in snapshots to make unsupported cases explicit.
