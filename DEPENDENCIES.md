# Dependency Notes

## Known Deprecation Warnings

### `inflight@1.0.6` (Safe to Ignore)

**Warning**: "This module is not supported, and leaks memory"

**Status**: ✅ Safe to ignore for this project

**Why**:
- `inflight` is a **transitive dependency** from `glob@7.x` used by:
  - `eslint@8.x`
  - `jest@29.x`

- Only affects **build time**, not runtime
- Memory leak only matters for long-running processes
- Our builds complete in 2-3 minutes (leak is negligible)

**To Fix** (requires major version upgrades):
- Upgrade to `eslint@9.x` (breaking changes)
- Upgrade to `jest@30.x` (when available)

**Decision**: Keep current versions for stability. The warning has no practical impact on:
- Build performance
- Production site
- Development experience

---

## Other Deprecation Warnings

### `@humanwhocodes/*` packages
- Used by ESLint 8.x
- Will be resolved when upgrading to ESLint 9.x

### `puppeteer@21.x`
- Used for PDF generation script
- Consider upgrading to `puppeteer@24.x` when needed
- Not critical (PDF generation is optional)

---

## Recommendation

**For now**: Ignore these warnings. They don't affect:
- ✅ Site functionality
- ✅ Build success
- ✅ Performance
- ✅ Security

**Future**: Consider upgrading when:
- ESLint 9.x becomes stable
- Jest 30.x is released
- Breaking changes are acceptable

---

## Version Policy

This project uses **conservative versioning**:
- Prefer stability over cutting-edge
- Update only when security issues exist
- Test thoroughly before major upgrades

Current versions are well-tested and production-ready.
