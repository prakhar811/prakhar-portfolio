import type { Project } from "@/types";

/**
 * Source of truth for every project on the homepage and in case studies.
 * Facts come from the owner's brief and the public READMEs of each repository.
 * Unknown / unverified items are `null` (and hidden in the UI) with a TODO.
 */
export const projects: Project[] = [
  {
    slug: "pitchfight",
    index: "01",
    tier: "flagship",
    name: "PitchFight AI",
    shortName: "PitchFight",
    kicker: "AI pitch simulation & adversarial evaluation",
    summary:
      "A multi-turn pitch simulator that extracts claims, tracks context, challenges contradictions and produces a structured scorecard.",
    visual: "pitchfight",
    badges: ["Flagship", "Demo video: V1"],
    award: {
      value: "$2K",
      label: "Community Prize",
      detail: "Hugging Face · Build Small Hackathon",
    },
    links: [
      {
        label: "Live Space",
        href: "https://huggingface.co/spaces/build-small-hackathon/PITCHFIGHT_AI",
        kind: "demo",
      },
      {
        label: "GitHub",
        href: "https://github.com/prakhar811/PitchFight",
        kind: "github",
      },
      {
        label: "README",
        href: "https://huggingface.co/spaces/build-small-hackathon/PITCHFIGHT_AI/blob/main/README.md",
        kind: "docs",
      },
      {
        label: "Demo video (V1)",
        href: "https://www.youtube.com/watch?v=s4_BzIBhqxc",
        kind: "video",
      },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Gradio",
      "NVIDIA Nemotron",
      "Prompt Engineering",
      "Structured LLM outputs",
      "Agentic workflow",
      "Voice mode",
    ],
    overview: [
      "PitchFight AI is an AI founder pressure arena. A founder pitches an idea, AI judges challenge the assumptions, follow-up questions escalate, a deal-style round tests the ask, and a scorecard shows what to fix.",
      "The shipped Space runs as a Hugging Face Gradio Space with a custom cinematic frontend instead of default Gradio components.",
    ],
    problem: [
      "Most student founders don't lose because the idea is bad. They lose because the first hard question arrives too late — in front of a real judge.",
    ],
    whyItMatters: [
      "Pitch practice with friends rarely applies real pressure. A simulator that pushes back on claims gives founders a private room to find weak spots before the real one.",
    ],
    howItWorks: [
      {
        title: "Founder briefing",
        body: "The raw idea is structured into problem, solution, users, traction, competitors and ask.",
      },
      {
        title: "Judge personas",
        body: "The founder chooses an opponent — Skeptical VC, Technical Judge or Hackathon Judge — and a pressure level.",
      },
      {
        title: "Pitch rounds",
        body: "Multi-turn questioning grounded in what the founder actually said. Voice mode supports speaking answers aloud.",
      },
      {
        title: "Deal round",
        body: "A negotiation-style round pressure-tests the ask.",
      },
      {
        title: "Scorecard",
        body: "Structured feedback on what landed, what broke and what to retry.",
      },
    ],
    decisions: [
      {
        title: "Custom frontend over default Gradio",
        body: "Gradio hosts the runtime and backend routes; the interface is a custom cinematic frontend.",
      },
      {
        title: "Hosted reasoning model, no fine-tuning",
        body: "Judge reasoning is powered by NVIDIA Nemotron through its hosted API. The project does not claim fine-tuning.",
      },
      {
        title: "Structured outputs",
        body: "Pitch briefing, judge feedback and scorecard are produced as structured LLM outputs rather than free text.",
      },
    ],
    // TODO: add verified challenges and lessons from the owner.
    challenges: null,
    learned: null,
    demo: {
      youtubeId: "s4_BzIBhqxc",
      label: "Original Product Demo / V1",
      note: "Recording of an earlier version. It does not show every V2 capability.",
    },
    versionNote: {
      from: "V1 — Prototype",
      to: "V2 — Agentic evaluation architecture",
      body: "The recorded demo is the original V1. The evolved V2 design consolidates the system into five agents — claim extraction, memory / context, contradiction & evidence, judge / follow-up, and evaluation.",
    },
  },
  {
    slug: "juriscode",
    index: "02",
    tier: "featured",
    name: "JurisCode Bharat",
    shortName: "JurisCode",
    kicker: "AI legal intelligence & courtroom simulation",
    summary:
      "Specialized legal workflows on a locally-run Qwen2.5-3B base with three task-specific LoRA adapters, retrieval, and structured outputs.",
    visual: "juriscode",
    badges: ["Engineering research system"],
    disclaimer:
      "An engineering and research system for legal literacy. Not legal advice.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/prakhar811/JurisCode",
        kind: "github",
      },
    ],
    technologies: [
      "Qwen2.5-3B-Instruct",
      "PEFT",
      "LoRA",
      "4-bit quantized inference",
      "RAG",
      "FastAPI",
      "SQLite",
      "PyTorch",
    ],
    overview: [
      "JurisCode is an AI-assisted platform for legal literacy and courtroom-style simulation, focused on Indian property litigation training. Learners work through factual scenarios, draft arguments, get adversarial pushback and receive structured feedback.",
      "It also includes a Mock Trial flow, artifact retrieval and a Citizen Legal Scenario Analyzer.",
    ],
    problem: null,
    whyItMatters: null,
    howItWorks: [
      {
        title: "Question / artifact",
        body: "A scenario, argument or legal artifact enters the system.",
      },
      {
        title: "Retrieval",
        body: "Relevant material is retrieved to ground the response.",
      },
      {
        title: "Context",
        body: "Retrieved evidence and session history are assembled into the prompt.",
      },
      {
        title: "Specialized adapter",
        body: "One of three LoRA adapters — premise generator, opposing counsel, objection evaluator — runs on a shared base model.",
      },
      {
        title: "Structured output",
        body: "Responses use structured fields with a safe parser fallback.",
      },
    ],
    decisions: [
      {
        title: "One base model, role-specific adapters",
        body: "A single shared Qwen2.5-3B-Instruct base with PEFT LoRA adapters per role, instead of three separate models.",
      },
      {
        title: "Local inference",
        body: "Core inference runs locally through PyTorch, Transformers and PEFT, with optional 4-bit loading on CUDA.",
      },
      {
        title: "Adversarial by design",
        body: "The opposing-counsel role is built to challenge title, possession, procedure and evidence, and must not invent case citations.",
      },
    ],
    // TODO: add verified challenges and lessons from the owner.
    challenges: null,
    learned: null,
  },
  {
    slug: "teamsync",
    index: "03",
    tier: "featured",
    name: "TeamSync",
    shortName: "TeamSync",
    kicker: "Team management & project archive system",
    summary:
      "A full-stack platform for student teams, faculty mentorship and a searchable project archive, spanning relational, document and vector storage.",
    visual: "teamsync",
    badges: ["Full-stack"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/prakhar811/DBMS_EL_Project",
        kind: "github",
      },
    ],
    technologies: [
      "FastAPI",
      "SQLAlchemy",
      "SQLite",
      "MongoDB",
      "Qdrant",
      "Sentence Transformers",
      "React",
      "Vite",
      "Tailwind CSS",
    ],
    overview: [
      "TeamSync manages student teams, faculty assignments and project archives. Students and faculty register, form teams with mentors, submit and review projects, and receive notifications.",
      "An archive system lets users browse historical projects and find similar ones with semantic vector search.",
    ],
    problem: null,
    whyItMatters: null,
    howItWorks: [
      {
        title: "Client",
        body: "A React + Vite single-page app with separate student and faculty dashboards.",
      },
      {
        title: "API",
        body: "A FastAPI backend with Pydantic validation, authentication and SQLAlchemy models.",
      },
      {
        title: "Storage",
        body: "SQLite holds user and team data, MongoDB holds authentication data, and Qdrant stores project embeddings.",
      },
      {
        title: "Semantic search",
        body: "Sentence-transformer embeddings power similar-project detection across the archive.",
      },
    ],
    decisions: [
      {
        title: "Right store per workload",
        body: "Relational data stays relational; embeddings live in a vector database built for similarity search.",
      },
      {
        title: "Similarity detection in the archive",
        body: "Vector search surfaces overlapping past projects instead of relying on keyword matching.",
      },
    ],
    // TODO: add verified challenges, lessons, scalability and caching notes from the owner.
    challenges: null,
    learned: null,
  },
  {
    slug: "fcv",
    index: "04",
    tier: "archive",
    name: "FCV — Fortran-C Interface Compatibility Validator",
    shortName: "FCV",
    kicker: "Static analysis for mixed-language interfaces",
    summary:
      "A CLI that checks a Fortran BIND(C) interface against a C header before link time, with text, JSON and HTML reports.",
    visual: "fcv",
    badges: ["Compiler tooling"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/prakhar811/fcv-validator",
        kind: "github",
      },
    ],
    technologies: [
      "C++",
      "LibClang",
      "Flang",
      "AST extraction",
      "Unified IR",
      "JSON / HTML reports",
    ],
    overview: [
      "Fortran and C compile independently, so a drifted declaration can link fine and still corrupt memory at runtime. FCV parses both sides, normalizes types under an explicit target ABI, validates compatibility and emits structured diagnostics.",
      "On its designed regression suite, both Fortran backends pass 49 of 49 cases. That is the designed suite, not a claim of universal correctness.",
    ],
    problem: [
      "Each compiler validates only its own translation unit. Parameter count, type width, pointer level, VALUE vs reference, array vs scalar and struct field order can all mismatch silently across the boundary.",
    ],
    whyItMatters: null,
    howItWorks: [
      {
        title: "Extract",
        body: "C declarations come from LibClang's AST; Fortran BIND(C) procedures come from a Flang parse-tree extractor or a structured parser.",
      },
      {
        title: "Normalize",
        body: "A type mapper converts both sides into one interface model under an explicit target ABI.",
      },
      {
        title: "Validate",
        body: "Bind names, types, passing modes, arrays, strings and flat structs are compared.",
      },
      {
        title: "Report",
        body: "PASS, PASS_WITH_WARNINGS or FAIL, with diagnostics in text, JSON and HTML.",
      },
    ],
    decisions: [
      {
        title: "Two Fortran backends",
        body: "A Flang-backed extractor and an in-repo structured parser, both exercised by the same regression harness.",
      },
      {
        title: "Explicit target ABI",
        body: "Type widths are reported against a chosen target (LP64 / LLP64) rather than assumed.",
      },
    ],
    challenges: null,
    learned: null,
  },
  {
    slug: "battery-ml",
    index: "05",
    tier: "archive",
    name: "ML Screening of Lithium-Ion Battery Materials",
    shortName: "Battery ML",
    kicker: "Materials informatics research workflow",
    summary:
      "A phase-wise pipeline that screens and prioritizes lithium-containing solid-state electrolyte candidates from Materials Project data.",
    visual: "battery",
    badges: ["Research workflow"],
    disclaimer:
      "First-stage screening only. It does not predict ionic conductivity, diffusivity or battery performance.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/prakhar811/sse-ml-screening-ev-batteries",
        kind: "github",
      },
    ],
    technologies: [
      "Python",
      "Materials Project",
      "Matminer / Magpie",
      "PCA",
      "K-Means",
      "Supervised classification",
    ],
    overview: [
      "A phase-wise materials-informatics pipeline: build a filtered lithium-containing candidate pool, profile and clean it, engineer interpretable domain features, then apply transparent screening and ML-assisted prioritization.",
    ],
    problem: null,
    whyItMatters: null,
    howItWorks: [
      {
        title: "Candidate pool",
        body: "Lithium-containing compounds are extracted and filtered from Materials Project data.",
      },
      {
        title: "Features",
        body: "Domain-informed features plus Matminer / Magpie descriptors.",
      },
      {
        title: "Structure",
        body: "PCA and K-Means expose structure in the feature space.",
      },
      {
        title: "Prioritization",
        body: "Heuristic scoring, robustness checks and classification rank candidates for further study.",
      },
    ],
    decisions: [
      {
        title: "Transparent scoring first",
        body: "The screening score is an explicit heuristic with sensitivity analysis; supervised models are not trained to predict that handmade score.",
      },
      {
        title: "Honest scope",
        body: "The repository states what it does not claim — conductivity, migration barriers and full battery performance are out of scope.",
      },
    ],
    challenges: null,
    learned: null,
  },
];

export const flagship = projects.find((p) => p.tier === "flagship")!;
export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const archiveProjects = projects.filter((p) => p.tier === "archive");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
