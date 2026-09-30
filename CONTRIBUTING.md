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

Descriptions and list data are dedicated to the public domain under [CC0](LICENSE). Each linked project retains its own license. Entries are editorial records, not endorsements or paid placements.

## Write for someone choosing a tool

Explain the task the tool helps with and the setup it fits. Where official sources support them, describe compatibility, execution location, required access, retained data, human approval or review, and a material limitation. Link the evidence for specific claims. Mark missing evidence as unknown; distinguish documented support from hands-on testing. Do not infer compatibility from a shared protocol alone or equate a local interface with local execution or storage.
