# Smirti Bhatta - Interactive Civil Engineering Portfolio with Real-time Multi-Cursor Construction

A high-performance, blueprint-inspired interactive portfolio for **Smirti Bhatta** (Diploma Civil Engineer & B.E. Civil Engineering enrolled at Far Western University, Nepal). As the user enters and scrolls, a simulated multi-role civil engineering crew (CAD Designer, Site Engineer, Estimator, Structural Lead) interactively builds and drafts components with animated dimension lines, grid layouts, and CAD drafting effects that advance with scroll and reverse on scroll-up.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following design choices were confirmed by the user in Phase 1:
> - **Visual Aesthetic**: Civil engineering blueprint theme with deep technical navy, cyan CAD gridlines, dimension callouts, and safety amber construction accents.
> - **Multi-Cursor Builders**: Labeled engineering crew ("CAD Designer", "Site Engineer", "Estimator", "Structural Lead") that spawn and assemble UI sections.
> - **Interactive Feature**: Built-in Civil Quantity Estimation & Bill of Quantities (BOQ) Calculator with real-time material calculations and printable export.

---

### 1. Overview & Core Concept

- **What It Does**: Presents Smirti Bhatta's civil engineering credentials, academic journey, AutoCAD & surveying skills, and projects through an interactive "construction site" digital experience. Multiple synchronized cursors draft structural blueprints, snap cards into place, measure coordinates, and calculate costs live.
- **Target Audience**: Engineering firms, infrastructure contractors, academic evaluators, and project recruiters looking for a dedicated Civil Engineer with AutoCAD, estimation, and site supervision capabilities.
- **Key Value**: Demonstrates both engineering rigor and digital craftsmanship—turning a static CV into an engaging, interactive narrative of structural construction.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Interactive Construction Genesis**:
   - Page initializes in blueprint grid mode with architectural crosshairs.
   - Four specialized cursors appear:
     - 🔷 **CAD Designer** (Cyan cursor): Measures coordinate offsets, draws wireframe containers, and aligns snap grids.
     - 🔶 **Site Engineer** (Safety Amber cursor): Deploys structural cards, sets foundations, and activates the hero profile.
     - 🟢 **Estimator** (Emerald cursor): Calculates areas, loads quantity surveying formulas, and annotates skills.
     - 🟣 **Structural Lead** (Indigo cursor): Places reinforcing trusses, validates declarations, and signs off sections.
2. **Scroll-Driven Construction Progress**:
   - Scrolling down advances the construction phase from **Phase 01: Site Survey & Foundation** $\rightarrow$ **Phase 02: Structural Framing (Academics & Objective)** $\rightarrow$ **Phase 03: Technical Outfitting (Skills & CAD Drawings)** $\rightarrow$ **Phase 04: Estimation & BOQ Engine** $\rightarrow$ **Phase 05: Handover & Contact**.
   - Scrolling up reverses the building sequence smoothly with zero jitter, deconstructing components back to their blueprint frames.
   - An engineering HUD (Construction Control Strip) offers playback scrubbing, step controls, and cursor visibility toggles.
3. **Interactive Civil Quantity & BOQ Calculator**:
   - Users can test Smirti's practical estimation skills using an interactive calculator for concrete volume (slabs, columns, footings), cement/sand/aggregate ratios (1:1.5:3, 1:2:4), brickwork masonry, and steel rebar weight (kg/m).
   - Generates an itemized Bill of Quantities with configurable unit rates, tax/contingency, and instant print/PDF export.
4. **Interactive CAD Blueprint & CV Inspector**:
   - High-fidelity interactive blueprint viewer with layer toggles (Grid, Structural Beams, Dimensions, Electrical/Plumbing overlay).
   - Modal inspection of original verified CV document with direct download.

#### Visual Identity & Theme
- **Dominant Neutral Canvas (60%)**: Architectural deep blueprint navy (`#090d16` / `#0f172a`) with subtle 24px isometric/orthographic technical grid patterns.
- **Structural Surfaces (30%)**: Translucent blueprint vellum cards (`rgba(15, 23, 42, 0.75)`) with crisp 1px cyan/slate hairline borders (`border-cyan-500/20`), corner bracket markers (`+` crosshairs), and CAD dimension labels.
- **Accent Budget (10%)**: Safety Amber (`#f59e0b`) for active structural elements and primary CTAs, Electric Blueprint Cyan (`#38bdf8`) for CAD lines and cursors.
- **Typography**:
  - Headings: `Outfit` & `Plus Jakarta Sans` for clean, bold architectural titles.
  - Body: `DM Sans` for high legibility (15px, 1.6 line-height).
  - Technical & Data: `JetBrains Mono` / tabular numerals (`tabular-nums`) for coordinates, dimensions, and BOQ calculations.
- **Strict Anti-Slop Discipline**:
  - No fake AI telemetry badges, no static pill sandwiches, no purple gradients.
  - Clean unboxed metadata with `·` separators.
  - Strict Top Bar Contract with single-line links and high-contrast primary CTA.

---

### 3. Key Product Decisions & Trade-Offs

- **Multi-Cursor Simulation Engine**:
  - *Chosen Approach*: Lightweight requestAnimationFrame / motion-interpolated vector coordinates driven by scroll progress and timeline hooks, with physics-smoothed trailing lines and drafting lasers.
  - *Why*: Delivers 60fps buttery smooth performance, operates bidirectionally on scroll, and works across both mobile touch and desktop trackpads without blocking main thread interactions.
  - *Alternative Considered*: Full Canvas 2D overlay; rejected because DOM elements allow rich accessibility, text selection, and screen-reader legibility while cursors float above.
- **Civil BOQ Calculator Integration**:
  - *Chosen Approach*: Real, standardized civil engineering estimation formulas (IS 1200 / standard Nepalese & international civil codes: dry volume factor 1.54 for concrete, nominal mix proportions M15/M20/M25, $D^2/162$ rebar weight formula).
  - *Why*: Proves technical competence and gives immediate tangible utility to potential employers and clients.
- **Interactive Construction Scrubber**:
  - *Chosen Approach*: Sticky top-right HUD permitting manual progress scrubbing (0% to 100%), auto-play presentation mode, and instant "Finished View" toggle.
  - *Why*: Allows visitors in a hurry to immediately inspect the full portfolio without requiring full scroll exploration.

---

### 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [Smirti Bhatta | Wordmark] ── [Nav Links] ── [Construction Scrubber] │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                 Multi-Cursor Construction Engine (Canvas / HUD)        │
│    CAD Designer (Cyan)   Site Engineer (Amber)   Estimator (Emerald)   │
│             ── Trailing Vector Beams & Dimension Callouts ──           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
    ┌──────────────────────────────┼──────────────────────────────┐
    │                              │                              │
┌───▼─────────────────────┐ ┌──────▼─────────────────────┐ ┌─────▼────────────────────┐
│ 01. Hero & Foundation   │ │ 02. Academic Framework     │ │ 03. Technical Outfitting │
│ • Smirti Bhatta Profile │ │ • B.E. Civil (FWU)         │ │ • AutoCAD 2D/3D & Survey │
│ • Civil Engineer Title  │ │ • Diploma in Civil (CTEVT) │ │ • Building Construction  │
│ • Pokhara, Nepal        │ │ • Secondary (SEE)          │ │ • Site Supervision & Mat │
└───┬─────────────────────┘ └──────┬─────────────────────┘ └─────┬────────────────────┘
    │                              │                              │
    └──────────────────────────────┼──────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ 04. Interactive Civil Estimation & BOQ Engine                          │
│ • Concrete Volume & Mix Proportions (Cement / Sand / Aggregate)        │
│ • Steel Rebar Weight Calculator ($D^2/162$)                             │
│ • Brickwork & Mortar Estimator                                         │
│ • Itemized BOQ Table + Live Cost Breakdown + Export                    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ 05. CAD Blueprint Viewer & Verified CV Document                        │
│ • Interactive Architectural Plan with Toggled Inspection Layers        │
│ • Official CV Inspection Lightbox Modal + Download                     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ 06. Site Inspection Sign-off & Contact Portal                          │
│ • Interactive inquiry form with project specification                  │
│ • Formal Declaration & Professional Commitment                         │
└────────────────────────────────────────────────────────────────────────┘
```

#### State & Interaction Mapping
- `scrollProgress` ($0.0 \rightarrow 1.0$): Global motion value driving cursor coordinates, wireframe clipping paths, and component opacity/translate transforms.
- `activePhase`: Current active construction milestone displayed in the sticky HUD.
- `manualScrub`: Override state when user drags the timeline slider or clicks "Auto Play".
- `boqState`: Dynamic calculations for concrete dimensions, mix ratios, steel tonnage, and calculated costs.
- `cvModalOpen`: Lightbox modal displaying the uploaded CV document with zoom and download capabilities.

---

### 5. Implementation Sequence

1. **Step 1: Setup & Theme Foundation**:
   - Configure Tailwind v4 architectural blueprint palette, typography imports (`Outfit`, `Plus Jakarta Sans`, `DM Sans`, `JetBrains Mono`), and grid canvas patterns.
2. **Step 2: Multi-Cursor Simulation Engine**:
   - Build `ConstructionCursorCrew.tsx` managing 4 labeled cursors with vector laser guides, coordinate badges, and scroll-linked waypoint interpolation.
3. **Step 3: Core CV Portfolio Sections**:
   - Implement Hero Foundation with Smirti's verified details, photo, and Pokhara location.
   - Build Academic Timeline (FWU B.E. Civil & CTEVT Diploma) and Technical Matrix with engineering specs.
4. **Step 4: Interactive Civil BOQ & Quantity Calculator**:
   - Implement live calculations for concrete volume, cement bags, sand/gravel tons, brickwork, and steel reinforcement with itemized pricing.
5. **Step 5: CAD Blueprint Viewer & CV Lightbox**:
   - Build interactive CAD drawing viewer with layer controls and original CV viewer modal.
6. **Step 6: Construction HUD & Final Polish**:
   - Floating construction controller (Play/Pause, Scrub, Quick Skip), responsiveness testing, and compilation verification.
