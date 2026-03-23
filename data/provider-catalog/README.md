# Provider Catalog

This directory is the committed provider/model document database for the BYOK audit.

Canonical source priority:

1. The Excel workbook is authoritative for provider inventory, verified support states, and the model catalog.
2. The supplemental markdown research report is enrichment only. It adds compatibility, protocol, pricing, and free-tier detail, but it does not override workbook support states when they conflict.

Generated artifacts:

- `catalog.snapshot.json`: runtime-friendly aggregate loaded by the app.
- `source-manifest.json`: import metadata.
- `providers/<provider-id>/provider.json`: one provider document per provider.
- `providers/<provider-id>/models/*.json`: one model document per model/service row.
- `reports/compass-research-report.json`: parsed supplemental report sections when a markdown source is supplied.

Regenerate:

```sh
npm run catalog:import -- /path/to/byok_provider_audit.xlsx --report /path/to/research_report.md
```

The document tree is intended to be edited, reviewed, and tested in git. The importer gives you a reproducible baseline; the JSON docs are the working database.
