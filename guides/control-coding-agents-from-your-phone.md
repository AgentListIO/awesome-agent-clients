# Control and review coding agents from your phone

Compare Claude Code Remote Control, Happy, and CloudCLI by agent support, execution location, session handoff, and review workflow.

Documentation checked September 30, 2026. This is a documented-capability comparison, not a hands-on mobile test or an exhaustive ranking.

Your phone can be a window into work running elsewhere. The useful question is how much of that work you can inspect and control: starting a task, continuing a conversation, answering a permission request, and reviewing changed files are separate capabilities.

## Choose a starting point

| Your setup | Option to investigate | Documented capability | Constraint to check |
| --- | --- | --- | --- |
| You use Claude Code with a supported Claude subscription | [Remote Control](https://code.claude.com/docs/en/remote-control) | Connect a local session to Claude mobile or the web; Git changes have a diff pane | API keys and Bedrock are unsupported; the host and process must remain running |
| You use Claude Code and Codex and want a shared mobile client | [Happy](https://github.com/slopus/happy) | Mobile/web access, permission notifications, and device handoff through a CLI wrapper | Its README describes restarting the session into remote mode; test continuity in your workflow |
| You want a browser workspace with files, shell, and Git controls | [CloudCLI](https://github.com/siteboon/claudecodeui) | Responsive UI, session resumption, file editing, and Git staging/committing | Choose deliberately between self-hosted execution and its managed cloud environment |

These are starting points for comparison, not a claim that one option replaces every native or third-party client.

## Where does the work run?

**Remote Control:** Claude Code runs on your machine. The documented requirements include an eligible subscription and account login. Messages and tool activity are stored on Anthropic servers to synchronize devices, so local execution does not mean local-only data. See the official [requirements and connection model](https://code.claude.com/docs/en/remote-control).

**Happy:** the project documents launching Claude Code or Codex through its wrapper on your computer. It provides mobile and web clients plus a synchronization server, and claims end-to-end encryption. That is a project claim, not an independent security assessment. See the [architecture and usage overview](https://github.com/slopus/happy#readme).

**CloudCLI:** the README documents both a self-hosted service and a managed containerized cloud environment. It explicitly lists Claude Code, Cursor CLI, and Codex in its introduction. Confirm your installed version's supported agents and authentication before choosing it. See the [installation and feature documentation](https://github.com/siteboon/claudecodeui#readme).

## Can I start a task or only watch one?

Remote Control documents server mode with `claude remote-control`, and `/remote-control` for an existing session. Happy documents `happy claude` and `happy codex` as entry points. CloudCLI documents interactive chat and session management. Follow each linked setup guide rather than assuming an already-running terminal is automatically attached.

For your shortlist, record separate answers for starting, resuming, interrupting, and viewing a session. A notification that an agent needs attention does not by itself establish that the phone can resolve every kind of prompt.

## Can I see what I am approving?

A public [mobile approval question](https://www.reddit.com/r/ClaudeCode/comments/1tor1a0/remote_control_how_to_see_full_command_you_are/) asks how to inspect a complete command before approving it. Treat that as a workflow to test, not proof of a current bug in any product.

Before relying on a client away from your desk, try these checks in a disposable project:

1. Trigger a harmless permission request with a long command. Can you inspect the entire command and its working directory?
2. Reject it. Does execution stop as expected, with a clear result on both devices?
3. Make a small file edit. Can you inspect the actual diff and identify the affected file?
4. Interrupt a running task. Can you tell whether the task stopped or only the connection closed?
5. Reconnect. Are you in the same project and conversation, with the expected history?

Full approval-card rendering, long-output usability, and mobile diff ergonomics remain **untested here**. Do not substitute an agent's description of its changes for reviewing the changes themselves.

## What happens when my laptop sleeps?

Remote Control documents reconnection when the host returns online. Reconnection does not mean execution continued while the machine was asleep. For any option, identify the machine doing the work and test what happens when its network or power disappears.

If you want tasks to continue independently of your laptop, compare an always-on host with a managed environment. Include repository access, credentials, cost, and how you retrieve the result in that decision.

## A useful comparison record

For each candidate, write down:

- **Works with:** agent, version, operating system, and login method.
- **Runs where:** interface, execution host, and synchronization service.
- **Needs access to:** repositories, shell, credentials, and network services.
- **Keeps what:** transcript, files, and export or deletion options.
- **Human involvement:** approval, interruption, and review controls.
- **Main limitation:** the specific requirement it does not meet.

Mark each answer **documented**, **tested**, or **unknown**. A missing answer is a reason to investigate, not a negative feature claim.

[Browse more agent clients](../README.md) · [Compare execution sandboxes](https://github.com/AgentListIO/awesome-agent-sandboxes) · [Explore agentlist.io](https://www.agentlist.io)
