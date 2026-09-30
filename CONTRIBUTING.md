# Contributing

## Scope

Interfaces that run, steer, review, or resume an existing coding-agent harness. General chat frontends and standalone agent frameworks belong elsewhere.

## Suggest an entry or correction

[Open an issue](https://github.com/AgentListIO/awesome-agent-clients/issues/new) or submit a pull request. Include the official project URL, the category, a short factual description, and a primary source supporting it.

- Prefer maintained projects with usable documentation. Mark maintenance-only projects explicitly.
- Link canonical upstream repositories; avoid affiliate links, mirrors, and duplicate entries.
- Keep descriptions neutral. Do not copy promotional claims, benchmark rankings, or security guarantees.
- Do not use stars as a quality score. Distinguish a hosted service from its SDK and self-hostable code.
- Add related awesome lists to `related`, not to the project entries.

## Edit and validate

`list.json` is the source of truth. Update it, then run:

```sh
bun run build
bun run check
```

Commit both `list.json` and the generated `README.md`. The check verifies record fields, duplicate URLs, and that the README matches the data; it does not verify live links or project capabilities. Change an entry’s `checked` date only after checking its upstream documentation.

`decisions` feeds the choice table. Each row has `need`, `fit`, `distinction`, `unknown`, and `sources`. Each source has a `name` and an HTTPS `url`. Name every product the row compares, and link the page that supports that product's claim. Use 6 to 14 situations, not one row per project.

Keep each project description between 35 and 65 words. Say what the tool is and the distinction that would change a choice. Do not write "the README says," "not installed," "not read on this pass," or a hands-on-testing disclaimer in an entry. The generated README states once that these lists were not install-tested.

Descriptions and list data are dedicated to the public domain under [CC0](LICENSE). Each linked project retains its own license. Entries are editorial records, not endorsements or paid placements.

## Write for someone choosing a tool

Explain the task the tool helps with and the setup it fits. Put facts that differ across tools in the decision table, one row per situation, with a source page for each product the row names. A project description should say what the tool is and the distinction that would change a choice. Do not repeat the same six caveats in every entry, and do not add a “not tested” sentence; the generated README already says inclusion is not hands-on testing.

Where a source supports a specific claim about compatibility, execution location, access, retained data, human review, license terms, or maintenance status, keep that claim and link it. Mark a missing fact as unknown. Do not infer compatibility from a shared protocol alone or equate a local interface with local execution or storage. Do not treat a quiet commit history as abandonment. State deprecation, archival, or maintenance mode only when the project says so.

Keep descriptions free of promotional superlatives, star counts, prices, and benchmark percentages. Do not repeat an isolation or privacy claim as if this list certified it. Name the mechanism the documentation names, or leave it unknown.
