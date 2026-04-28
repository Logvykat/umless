# Umless — Agent Guide

> Read this whole file before writing any code. It will save you and the user from
> a lot of avoidable rework.

---

## ⚠️ Critical: this is NOT the stack you know

This project uses bleeding-edge versions of everything. **APIs, conventions, and file structures may differ from your training data.** Specifically:

- **Next.js 16.2.1** — App Router, Turbopack-first. Has breaking changes from Next 14/15.
- **React 19.2.4** — new APIs around `use`, server actions, async transitions.
- **Tailwind v4** — uses `@import "tailwindcss"` (not `@tailwind` directives). Tokens live in `@theme inline` blocks. PostCSS-based, **no `tailwind.config.ts`** — config is in CSS.
- **shadcn 4** with **Base UI** primitives (`@base-ui/react`) — **not Radix**. Component APIs differ.
- **`base-nova` shadcn style** — newer style variant; classic shadcn examples may not apply.

Before writing any code that touches these, **read the relevant guide in `node_modules/<package>/dist/docs/`**. Heed deprecation notices. When in doubt, check the local docs over training-data muscle memory.

---

## What is Umless

A free, browser-based speech practice tool. The user records a speech (Toastmasters 5/6/7-minute milestones), and after they stop, the app analyzes the transcript for filler words, pauses, and pacing. No signup, no install, no payment.

It's a portfolio piece for a designer. Quality of design and code matters more than feature breadth.

**v1 hard constraints — do not violate without explicit user instruction:**
- English only (filler dictionary is English-specific)
- Toastmasters milestones hardcoded at 5/6/7 minutes
- Post-session analysis only — **not** live transcription
- Pause / resume supported
- All processing client-side. No server stores audio or transcripts.
- Web Speech API for transcription (note: Chrome streams audio to Google — disclose, don't hide)

---

## Stack snapshot

| Layer            | Choice                                              |
|------------------|-----------------------------------------------------|
| Framework        | Next.js 16.2.1 (App Router, `src/app/`)             |
| Runtime          | React 19.2.4                                        |
| Language         | TypeScript 5 (strict)                               |
| Styling          | Tailwind v4 (PostCSS, `@theme inline` in CSS)       |
| Component system | shadcn 4 (`base-nova` style) on Base UI             |
| Icons            | `lucide-react`                                      |
| Animation utils  | `tw-animate-css`, CVA + `clsx` + `tailwind-merge`   |
| Package manager  | npm                                                 |
| Deploy           | Vercel                                              |
| Path alias       | `@/*` → `./src/*`                                   |

---

## File structure

```
src/
  app/
    layout.tsx         Root layout, font wiring
    page.tsx           Single home page (state machine: landing | recording | results)
    globals.css        Tailwind v4 entry + tokens (@theme inline)
  components/
    ui/                shadcn primitives (Button, etc.) — generated, edit with caution
    [feature]/         Feature-scoped components (timer/, recording/, results/, ...)
  lib/
    utils.ts           cn() helper, etc.
  hooks/               Custom React hooks
components.json        shadcn config (style: base-nova, baseColor: neutral)
CLAUDE.md              → @AGENTS.md (re-export, do not edit)
AGENTS.md              This file
design-system.md       Token spec + Figma sync (see below)
component-spec.md      Bespoke (non-shadcn) components: timer, voice modulation, etc.
```

**Convention:** feature-scoped components live in `src/components/<feature>/`. Reusable primitives stay in `src/components/ui/`. Don't flatten.

---

## Design pipeline & sources of truth

This is **Figma-first**. Code follows design, not the other way around.

| For...                        | Source of truth                                    |
|-------------------------------|----------------------------------------------------|
| Design decisions, new tokens  | **Figma** (file: `fOb93S5nOD4oM5GkmlOL00`)         |
| What's running in the app     | **`src/app/globals.css`**                          |
| Snapshot connecting the two   | **`design-system.md`**                             |
| Custom component logic        | **`component-spec.md`**                            |

When Figma and code disagree:
- For **design intent** (what something *should* be) — Figma wins. Update code to match.
- For **what's shipped** (what's actually rendered) — code wins. Don't pretend Figma matches if it doesn't.
- Document drift in `design-system.md` rather than hide it.

When you (the agent) need design context, use the Figma MCP tools:
- `Figma:get_design_context` for layout / specs
- `Figma:get_screenshot` for visual reference
- `Figma:get_variable_defs` for tokens (pass `nodeId` to scope to a component)

Avoid `figma_take_screenshot` from Console MCP — payload often exceeds limits.

---

## The user journey (v1)

A single-page state machine. **No separate `/app` route, no separate idle/landing.** The landing page IS the entry to recording.

```
landing  ──(hit record)──►  recording  ──(hit stop)──►  results
   ▲                                                       │
   └────────────────(go again — same page)─────────────────┘
```

**State details:**

- **landing** — hero, value props, big "hit record" CTA. Functions as the breath moment.
- **recording** — timer ring, voice modulation visual, pause/stop/restart controls.
- **results** — transcript with filler highlights, summary metrics, "go again" + "done" CTAs. "Done" returns to landing (curtain lifts).

**Mic permission:** browser prompts on first hit-record. If denied, the landing page surfaces a denied state inline (no separate route, no separate screen). The user can retry from there.

**Visual continuity:** the timer is the spine — it's present in landing (idle), recording (active), and results (settled). Surrounding content fades around it. This is intentional; don't break it.

See `component-spec.md` for the timer and voice modulation behavior, including the Toastmasters milestone arcs and the sin × cos modulation formula.

---

## Tokens & styling conventions

Tokens live in `src/app/globals.css` in two layers:

1. **`:root`** — shadcn semantic tokens as raw hex (`--primary`, `--muted`, `--card`, etc.)
2. **`@theme inline`** — surfaces those into Tailwind's namespace as `--color-*` plus product-specific extras (`--color-page-surface`, `--color-brand-800`, the spacing scale, the radius scale, shadows)

**Rules of engagement:**
- Use the shadcn semantic tokens (`bg-primary`, `text-muted-foreground`) by default.
- **Page background uses `bg-page-surface` (custom), not `bg-background`** — this is intentional, do not "fix" it.
- Avoid hardcoded hex in components. If a value isn't in the token system, add it to `globals.css` first, then use the token name. See `design-system.md` for the canonical list.
- For component variants, use CVA — there are existing patterns in `src/components/ui/` to mirror.

**Known gaps (documented, not bugs):**
- Brand neutrals (`--color-brand-800`, etc.) live as raw hex in `globals.css`. They should eventually become aliases pointing at primitives once the brand collection is built in Figma. Don't expand the raw-hex list — push new values through aliases.
- **Space Grotesk is wired in `layout.tsx` as a font variable but not surfaced in `@theme`.** Headings and buttons currently render in Inter, but Figma specs them as Space Grotesk. When building components that include headings or buttons, add the font variable to `@theme` (`--font-display: var(--font-space-grotesk)`) and apply via Tailwind utility (e.g., `font-display`).
- Geist was an exploration — pending removal from `layout.tsx` imports.

---

## Fonts

| Role                  | Font          | Wired in code?              |
|-----------------------|---------------|-----------------------------|
| Body / paragraph      | Inter         | ✅ as `--font-sans`          |
| Headings + buttons    | Space Grotesk | ⚠️ loaded, not yet surfaced |
| ~~Numerical accents~~ | ~~Geist~~     | ❌ pending removal           |

Loaded via `next/font/google` in `src/app/layout.tsx`.

---

## Run commands

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build
npm start        # Run production build
npm run lint     # ESLint
```

---

## Current state (as of last update)

- Next.js scaffold complete on Next 16 / React 19 / Tailwind v4 / shadcn 4 + Base UI
- Token system bootstrapped in `globals.css` (shadcn semantics + custom page-surface, brand neutrals, spacing, radius, shadows)
- Inter wired; Space Grotesk and Geist imported but not wired through to utilities
- Basic timer component generated by Claude Code (not yet final — will be regenerated against the new Figma spec once `design-system.md` and `component-spec.md` are written)
- Landing page: not yet built (designs done in Figma)

## Immediate next milestone

1. Write `design-system.md` (token + font spec, synced from Figma)
2. Write `component-spec.md` (timer, voice modulation, dotted hero, focus overlay)
3. Surface Space Grotesk in `@theme` and apply to headings + buttons
4. Remove Geist imports
5. Build the landing page from Figma
6. Regenerate the timer component against the new spec

Don't skip ahead — the docs are the foundation the build leans on.

---

## Working with this user

- **Push back, don't pile on.** The user prefers honest disagreement over reflexive agreement. If a request looks like scope creep, a wrong abstraction, or a regression, say so clearly with reasoning.
- **No emoji or excessive enthusiasm.** Match the tone of this doc.
- **Iteration is the process.** Earlier approaches that get superseded aren't failures — pivots are expected. Don't be self-critical about superseded work.
- **One artifact-producing chat at a time.** Side conversations are for discussion only. Avoid creating files in parallel sessions.
- **The Kitchen** is the user's Substack blog. The journey log captures raw material for it; build sessions occasionally surface "Kitchen-worthy" moments worth flagging.

---

## Don't do these things

- Don't use `tailwind.config.ts` — Tailwind v4 doesn't use it. Tokens go in CSS.
- Don't add new top-level routes for v1. Everything is one page with state.
- Don't bring in Radix — this project uses Base UI through shadcn 4.
- Don't write live-transcription code — v1 is post-session analysis only.
- Don't add features outside v1 scope (multi-language, custom milestones, AI feedback) without explicit user direction.
- Don't claim Figma matches code without verifying. Don't claim code matches Figma without verifying.
- Don't add hardcoded hex values in component files. Push through tokens.
- Don't "fix" `bg-page-surface` to `bg-background` on the body — the divergence is intentional.
