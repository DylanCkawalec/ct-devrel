# CoreThink Hybrid: Product, GTM, and ICP Plan

**Author:** Dylan  
**Intent:** Local-first execution with higher-order reasoning on demand—lower cost at the CPU and inference layer than raw frontier APIs, without giving up control.

---

## Executive summary

The winning posture for 2026 is **not** “cloud-only agents” or “tiny local models only.” It is a **hybrid**: small and mid models (SML) handle volume locally; **CoreThink** handles planning, multi-file reasoning, security-sensitive judgment, and synthesis—via an API designed for **symbolic / reasoning-first** workloads, not generic chat replacement alone.

This document is an **operating memo**, not a generic strategy deck. It ties together:

1. **Strategic anchors** — four pillars that align docs, product, and feedback.
2. **Product & architecture** — three-layer hybrid (local default → CoreThink escalation → durable local execution and memory).
3. **SDK & framework** — **Agent Coding**, **Agent Planning**, and **Agent Reasoning** modes and the **SML → CoreThink → optional cloud** ladder.
4. **ICP, geography, and revenue motion** — Bay Area SMBs, 6–12 month focus, and the adoption → pilot → contract path.
5. **GTM** — DevRel + product engineering as the awareness and quality engine.
6. **Enterprise credibility** — legacy core banking / COBOL-era hardening today; massive distributed systems next.
7. **Org & operating targets** — minimum viable GTM, resource allocation, and a base-case funnel model.
8. **Evidence base** — pricing comps, developer survey data, adjacent security and modernization narratives.
9. **Role investment** — framing the execution ask (including compensation benchmarks).

CoreThink’s differentiation stays anchored in **domain-specific languages**, **improved coding**, **improved cybersecurity**, and **improved planning**. Documentation, examples, and community feedback should **always** map back to those pillars so messaging and product evolve together.

---

## 1. Strategic anchors: the four pillars

When we collect feedback (“your agent is weak on X”) or ship docs, we classify it against four pillars:

| Pillar | What “good” looks like in docs & examples |
|--------|---------------------------------------------|
| **Domain-specific languages** | Patterns, grammars, and constrained interfaces that reduce ambiguity and tool misuse—not just “prompt harder.” |
| **Improved coding** | Multi-file refactors, test-aware edits, CI-aware navigation, and reproducible harnesses (e.g. OpenClaw / NemoClaw). |
| **Improved cybersecurity** | Prompt-injection awareness, narrow tool surfaces, access control for remote fetches, and clear threat models for hybrid setups. |
| **Improved planning** | Decomposition, critique passes, root-cause analysis, and planner/executor splits—not one-shot completions. |

**Documentation and context** should explicitly say *which pillar* a feature serves. That keeps marketing, SDK design, and customer conversations aligned.

---

## 2. Product architecture: three-layer hybrid

### 2.1 Layer 1 — Local default (Ollama / vLLM / LM Studio)

- **Role:** Handles **90%+** of high-volume loops (examples in our stack: **Mermate**, **Synth**).
- **Why:** Near-zero marginal cost, low latency, strong privacy, instant fallback when remote tiers are unavailable.
- **Models:** Class-sized locals (e.g. **gpt-oss-20b**, **Qwen3.5-9B-class**) are sufficient for fine-tuned vertical tasks, CI/CD navigation, Q&A, and routine file operations.
- **How:** **OpenClaw / NemoClaw** native local model support (e.g. `models.mode: "merge"`) keeps routing and fallbacks fast.

**Economic story:** At the **CPU level**, local inference amortizes cost and removes per-token rent-seeking for bulk work—this is the baseline for replacing “everything goes to Claude/GPT” defaults.

### 2.2 Layer 2 — CoreThink escalation (OpenAI-compatible custom provider)

- **Role:** Escalate for **planning**, **multi-file refactors**, **debugging**, **root-cause analysis**, **review/critique passes**, **non-obvious tool choice**, and **large synthesis** problems.
- **Why:** CoreThink’s **symbolic reasoning layer** targets **roughly 5–30%** gains on agentic-style benchmarks at **materially lower compute** than raw frontier-only stacks for the same class of task—when the task is structured for reasoning, not generic chit-chat.
- **How:** Register as an OpenAI-compatible provider—e.g. `https://api.corethink.ai/v1/code` with model **`corethink`**. Use **multi-agent routing** in OpenClaw so **deep-work subagents** are explicitly bound to CoreThink while cheap locals handle the rest.

**Inference story:** For workloads that **must** scale in the cloud, **CPU/GPU inference** behind CoreThink becomes a **controlled substitute** for undifferentiated frontier APIs—same integration surface many tools already speak (OpenAI-compatible), different cost and safety posture when combined with Layer 3.

### 2.3 Layer 3 — Local execution + memory persistence

- **Role:** Everything **durable** stays in **your** workspace: files, repo state, shell history policy, **MEMORY.md** and dated notes, channels, and safety policy.
- **Product extensions (roadmap-aligned):** Prompt-injection **toolkits**, remote fetch **access control**, optional **premium** tiers (e.g. confidential compute patterns—**TEE-style gateways**, partners such as **Phala Cloud**-class isolation, pipeline protection concepts like **Vijil**-class data governance) for teams that need stronger guarantees than “trust the vendor.”
- **Why:** **Ownership, inspectability, control.** RA-TLS and similar patterns reduce “hidden cloud state.” Injection and tool misuse stay **bounded** when execution sits behind **your** sandboxing and allowlists—not a vendor’s opaque runtime.
- **How:** OpenClaw-style **plain Markdown memory**, **isolated workspaces per agent**, and a first-class **planner / executor split**.

**One-line product promise:** Stronger planning and tool use **without** surrendering local control, privacy, or economics—**cheaper and more reliable** than pure cloud for many agentic loops, **stronger** than pure local on hard reasoning.

---

## 3. SDK and framework: local-first, CoreThink second, cloud as a dial

### 3.1 Builder mental model

- **CoreThink SDK / integration pattern:** A **framework for local-first agents** where **higher-order reasoning** is a **second stage**—invoked by policy, not by default.
- **Cost axis:** Default to **SML on local CPU**; escalate to **CoreThink API** for structured reasoning; optionally burst to **cloud CPU/GPU** for inference where policy allows—**replacing undifferentiated Claude/GPT/OpenAI-style defaults** for the segments we win (planning, security-aware coding, DSL-backed workflows).
- **SML → LLM (CoreThink) hybrid:** Marketing and docs should repeat this ladder: **small/mid local** → **CoreThink reasoning** → **optional governed cloud inference**—never “send everything to the biggest model.”

### 3.2 Agent modes (first-class in tutorials and SDK examples)

| Mode | Primary tier | Typical triggers |
|------|----------------|------------------|
| **Agent Coding** | Local + narrow tools | Edits, tests, routine refactors, harness-driven tasks |
| **Agent Planning** | CoreThink + local memory | Decomposition, specs, multi-step roadmaps, risk lists |
| **Agent Reasoning** | CoreThink | Debugging chains, root cause, critique, ambiguous tool routing |

SDK and harness examples should show **explicit mode switches** and **routing rules**, not accidental “everything escalated.”

---

## 4. ICP, geography, and revenue motion

### 4.1 ICP and geography (6–12 months)

- **ICP:** **Small and mid-size businesses** building or operating **software-heavy** workflows—product eng, internal tools, security-conscious SaaS, fintech-adjacent builders, and agencies shipping code with agents.
- **Geography:** **San Francisco Bay Area** for density of **design partners**, **meetups**, **forward-deployed** debugging with real repos, and **fast feedback** on latency, cost, and compliance narratives.
- **Wedge narrative:** *“Your agent is costing too much and failing on hard tasks—here is a 12-month path to hybrid that keeps data local and improves reasoning where it matters.”*

### 4.2 Core revenue motion

**Core strategy:** local-first adoption → paid design-partner pilots → production annual contracts.

This motion is anchored to the hybrid plan: **local default**, **CoreThink escalation**, **durable local execution/memory**, the **Bay Area design-partner** focus, and the **four pillars** (DSLs, coding, cybersecurity, planning).

---

## 5. GTM: DevRel + product engineering

### 5.1 Core message

- **Approved headline:** **Reasoning-first API meets self-hosted harness.**
- **Hero proof:** **Harness Engineering** (e.g. Section 12 of the full briefing)—production-ready path to **two isolated agents** in **under ~30 minutes**: one **local code assistant**, one **CoreThink-backed deep-work** agent, routed via **NemoClaw / OpenClaw multi-agent** configuration.
- **Multi-channel pattern:** One **cheap local** assistant for everyday channels + one **CoreThink** lane for hard tasks (reference implementations: **Mermate**, **Synth**).

### 5.2 Channels and assets

- Publish **“CoreThink for ___”** briefings on **corethink.ai/devrel**, **openclaw.ai**, and communities (**r/LocalLLaMA**, **r/AI_Agents**, **Indie Hackers**, etc.).
- **Ecosystem play:** Continue.dev, Cline, Roo Code, Aider, OpenHands, plus a **curated list** of ~30 OSS tools (local runtimes, vector stores, IDE plugins, security tools).

### 5.3 Differentiator: the “safe hybrid rule”

Lead with:

- **Planner / executor split**
- **Sandboxing and allowlists**
- **Distilled context** (what actually gets sent upstream)
- **Narrow tool surfaces**
- **Honesty:** the workspace is **not** a hard sandbox by default—set expectations, then show how to harden

This separates CoreThink-aligned hybrid from **pure-cloud** “send the repo to a black box” stories and earns trust with **security-conscious builders**.

---

## 6. Enterprise narrative (credibility without overclaiming)

- **Today:** CoreThink is already engaged with **enterprise partners** on **hardening legacy core banking stacks**—including **COBOL-era / core banking infrastructure** modernization and safety-critical constraints (wording in market materials should match **legal-approved** case studies).
- **Next:** Position for **massive distributed systems architecture**—reasoning and DSL-backed tooling at the **design and operations** boundary where failures are expensive and “chat completion” is the wrong abstraction.

DevRel content should **mirror** enterprise proof points **only** with **approved** names, numbers, and logos.

---

## 7. Organization: minimum viable GTM and resource allocation

### 7.1 What this arm does when formal GTM is thin

- **Awareness:** Consistent narrative (hybrid, safe, reasoning-first) across docs, talks, and repos.
- **Content:** Briefings, Harness Engineering tutorial, integration guides, and pillar-tagged examples (coding / security / planning / DSL).
- **Engineering + forward deploy:** Partner repos instrumented for **real latency and cost** comparisons—not slide-deck claims.
- **Feedback now:** Structured intake (agent failures, cost spikes, security concerns) mapped to the **four pillars** so product and research prioritize **community-validated** pain.

### 7.2 Additive to the core mission

The **core** remains **DSLs, coding, cybersecurity, planning** at the **API and symbolic** layers. DevRel and hybrid harness work **surface** those capabilities to developers and SMBs; they do not replace R&D—they **accelerate adoption** and **tighten the loop** between field pain and roadmap.

If leadership **does not** yet have a full GTM plan, **this** function is the **minimum viable GTM**: messaging + hero tutorial + integrations + honest security story + Bay Area design partners over **6–12 months**.

---

## 8. Operating targets (base case)

The model answers the lead’s question with a **base case**:

| Metric | Base case |
|--------|-----------|
| Activated builders / champions | 400 |
| Qualified opportunities | 35 |
| Paid pilots | 6 |
| Annual contracts (from pilots) | 4 |
| Cumulative paying logos | 10 |
| Year-one bookings (approx.) | ~$510K |

Treat these as planning anchors to stress-test resourcing and channel mix, not as commitments without leadership alignment.

---

## 9. Evidence base: pricing, developers, and adjacent narratives

### 9.1 Pricing ladder (comps)

Current AI/dev-tool pricing patterns support a **free/community → usage or team → custom enterprise** ladder:

- **Continue:** token-based starter, seat-based team, custom company pricing.
- **Cline:** free individual, usage-based inference, custom enterprise.
- **Arize:** open-source/free entry, paid small-team, custom enterprise.
- **OpenAI API:** token-based with batch discounts and enterprise contact-sales.

### 9.2 Developer behavior (Stack Overflow 2025 survey)

- **84%** of developers use or plan to use AI tools.
- **46%** do not trust AI-tool accuracy; **45%** cite time-consuming debugging of AI-generated code.
- **Technical documentation** remains a top learning resource (**68%**).

That supports the memo’s emphasis on **docs, demos, integrations, security posture**, and **repeatable proof** over hype marketing.

### 9.3 Web3 / security lane

Smart-contract security firms already sell **trust, auditability, manual review, AI-assisted review**, and **formal verification**. **OpenZeppelin** frames audits around leading protocols and onchain financial infrastructure; **CertiK** describes audits as manual review plus AI-powered review and optional formal verification.

### 9.4 Enterprise modernization and large codebases

- **Google’s Mainframe Assessment Tool:** generative AI for codebase understanding, documentation, and migration planning.
- **Claude Code:** modernization framed as codebase understanding, enterprise-grade security, incremental refactoring, humans in the loop.
- **Sourcegraph CodeScaleBench:** large-codebase understanding as a bottleneck for agent performance.

---

## 10. Role investment and compensation framing

The **$200K** figure is **not** “pricing” for the product—it is the **execution investment** for a founding hybrid role across **DevRel, growth engineering, partnerships, demos, content, and pipeline influence**.

Public DevRel listings support upper-end positioning when scope is that broad: **Arize** Bay Area DevRel **$100K–$175K**; **Builder.io** US DevRel **$140K–$200K**.

---

## Closing

Hybrid **local-first + CoreThink reasoning + governed execution** is the right **product–market** fit for **2026**: it **upgrades** the local-first instinct instead of fighting it. **Protect your agents**, keep **sensitive data** on **your** metal by default, and **serve improved inferences** only where the task **earns** the cost—**SML → CoreThink → optional cloud** is the ladder we document, ship, and measure.

— Dylan
