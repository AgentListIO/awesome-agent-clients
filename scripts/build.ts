import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

type Project = { name: string; url: string; description: string; kind: string; source: string; checked: string }
type List = { title: string; introduction: string; subtitle: string; slug: string; description: string; scope: string; questions: string[]; sections: { title: string; projects: Project[] }[]; related: { name: string; url: string; description: string }[] }
const root = fileURLToPath(new URL('../', import.meta.url))
const list: List = JSON.parse(readFileSync(resolve(root, 'list.json'), 'utf8'))
const assert = (ok: unknown, message: string) => { if (!ok) throw new Error(message) }
const https = (value: string) => { assert(new URL(value).protocol === 'https:', `Expected HTTPS URL: ${value}`) }
const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-')
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const family = [
  ['Awesome Agent List', 'awesome-agent-list'],
  ['Awesome Personal Assistants', 'awesome-personal-assistants'],
  ['Awesome Agent Clients', 'awesome-agent-clients'],
  ['Awesome Agent Memory', 'awesome-agent-memory'],
  ['Awesome Agent Sandboxes', 'awesome-agent-sandboxes'],
  ['Awesome Agent Orchestration', 'awesome-agent-orchestration'],
  ['Awesome Agent Observability', 'awesome-agent-observability'],
]
assert(list.title && list.description && list.scope && list.introduction && list.subtitle, 'Missing list metadata')
assert(/^awesome-agent-[a-z-]+$/.test(list.slug), 'Invalid repository slug')
assert(list.sections.length && list.questions.length && list.related.length, 'Missing sections, guidance, or related lists')
const entries = list.sections.flatMap(section => section.projects)
const urls = new Set<string>()
const anchors = new Set<string>()
for (const section of list.sections) {
  assert(section.title && section.projects.length, 'Empty section')
  const anchor = slug(section.title)
  assert(!anchors.has(anchor), `Duplicate section: ${section.title}`)
  anchors.add(anchor)
  for (const project of section.projects) {
    assert(project.name && project.description && project.kind, 'Missing project fields')
    https(project.url); https(project.source)
    const canonical = project.url.replace(/\/$/, '').toLowerCase()
    assert(!urls.has(canonical), `Duplicate project: ${project.url}`)
    urls.add(canonical)
    assert(/^\d{4}-\d{2}-\d{2}$/.test(project.checked) && !Number.isNaN(Date.parse(project.checked)), `Invalid checked date: ${project.name}`)
    assert(!/[\r\n|]/.test(project.name + project.description + project.kind), `Unexpected Markdown delimiter: ${project.name}`)
  }
}
for (const related of list.related) { https(related.url); assert(related.name && related.description, 'Missing related-list fields') }
const dates = entries.map(project => project.checked).sort()
const checkRange = dates[0] === dates.at(-1) ? dates[0] : `${dates[0]}–${dates.at(-1)}`
const lines = [
  '<p align="center">',
  `  <a href="https://www.agentlist.io"><img src="media/banner.png" width="800" alt="${escape(list.title)} — ${escape(list.description)}"></a>`,
  '</p>', '',
  `# ${list.title}`, '',
  '[![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![Contributions welcome](https://img.shields.io/badge/contributions-welcome-f04424.svg)](CONTRIBUTING.md) [![CC0](https://img.shields.io/badge/license-CC0_1.0-6b6a64.svg)](LICENSE)', '',
  `> ${list.description}`, '',
  `${entries.length} projects · Upstream documentation checked ${checkRange}. Curated by [agentlist.io](https://www.agentlist.io).`, '',
  `**${list.subtitle}**`, '',
  list.introduction, '',
  list.scope, '',
  '## Practical guides', '',
  '- [Control and review coding agents from your phone](guides/control-coding-agents-from-your-phone.md) — compare native remote access, Happy, and CloudCLI; check execution location, approvals, and session continuity.', '',
  '## Contents', '',
  '- [How to choose](#how-to-choose)',
  ...list.sections.map(section => `- [${section.title}](#${slug(section.title)})`),
  '- [Related awesome lists](#related-awesome-lists)',
  '- [More from Agentlist](#more-from-agentlist)',
  '- [Contributing](#contributing)', '',
  '## How to choose', '',
  ...list.questions.map(question => `- ${question}`), '',
  'Use these questions to narrow your shortlist. An entry’s source link records the documentation used for its description; it does not mean every question above has been answered or tested. Treat undocumented capabilities as unknown, and confirm requirements against the linked project before adopting it.', '',
]
for (const section of list.sections) {
  lines.push(`## ${section.title}`, '')
  for (const project of section.projects) {
    lines.push(`- [${project.name}](${project.url}) - ${project.description} **${project.kind}.**`)
  }
  lines.push('')
}
lines.push('## Related awesome lists', '',
  'Independent collections for deeper discovery. These are references, not affiliations or endorsements.', '',
  ...list.related.map(item => `- [${item.name}](${item.url}) - ${item.description}`), '',
  '## More from Agentlist', '',
  ...family.filter(([, repository]) => repository !== list.slug).map(([name, repository]) => `- [${name}](https://github.com/AgentListIO/${repository})`), '',
  '**[Browse agents](https://www.agentlist.io/list-of-ai-agents) · [Compare agents](https://www.agentlist.io/compare) · [GitHub organization](https://github.com/AgentListIO)**', '',
  '## Contributing', '',
  'Missing something useful? Read the [contribution guide](CONTRIBUTING.md) and open an issue or pull request with an official source.', '',
  'The machine-readable [list.json](list.json) includes a primary-source link and a documentation-check date for every entry. Descriptions are editorial summaries of upstream documentation; inclusion does not imply hands-on testing, a security audit, or endorsement. Hosted services and source code may have different terms.', '',
  'To update the list, edit `list.json`, run `bun run build`, then `bun run check`. The README is generated; avoid editing it directly.', '',
  '[CC0](LICENSE) applies to this list’s text and data. Linked projects retain their own licenses.', '',
)
const output = lines.join('\n')
const file = resolve(root, 'README.md')
if (process.argv.includes('--check')) {
  assert(readFileSync(file, 'utf8') === output, 'README is out of date; run bun run build')
  console.log(`${list.slug}: ${entries.length} entries and generated README verified`)
} else {
  writeFileSync(file, output)
  console.log(`Generated ${file}`)
}
