// Robust polyfill to fix a bug of Alpine.js with <template> elements inside SVGs.
// Without this, the x-for directive fails silently on Firefox and Safari due to SVG namespace conflicts.
if (typeof document !== 'undefined') {
  const setupSvgTemplates = () => {
    document.querySelectorAll('svg template').forEach(template => {
      if (!('content' in template) || !template.content) {
        const fragment = document.createDocumentFragment();
        while (template.firstChild) {
          fragment.appendChild(template.firstChild);
        }
        Object.defineProperty(template, 'content', {
          get() { return fragment; },
          configurable: true
        });
      }
    });
  };
  // Immediate execution: the script being loaded at the end of the page, SVG elements are already parsed.
  setupSvgTemplates();
  // Additional security: re-execute on full load in case SVGs are injected later.
  document.addEventListener('DOMContentLoaded', setupSvgTemplates);
}

(function () {
  const DIMENSIONS = [
    { name: "Knowledge", max: 5 },
    { name: "Familiarization", max: 4 },
    { name: "Uses", max: 5 },
    { name: "Advanced Uses", max: 3 },
    { name: "Expert Uses", max: 3 }
  ];

  const QUESTIONS = [
    {
      id: "Q01",
      category: "knowledge",
      dimension: "Knowledge",
      label: "I know what AI is and how it works.",
      points: 1
    },
    {
      id: "Q02",
      category: "knowledge",
      dimension: "Knowledge",
      label: "I know what AI can be used for in my daily life.",
      points: 1
    },
    {
      id: "Q03",
      category: "knowledge",
      dimension: "Knowledge",
      label: "I know that AI can give false answers, so I verify.",
      points: 1
    },
    {
      id: "Q04",
      category: "knowledge",
      dimension: "Knowledge",
      label: "I know the legal frameworks related to AI, notably GDPR and the AI Act.",
      points: 1
    },
    {
      id: "Q05",
      category: "knowledge",
      dimension: "Knowledge",
      label: "I know how a generative model is created, for example via pre-training.",
      points: 1
    },
    {
      id: "Q06",
      category: "familiarization",
      dimension: "Familiarization",
      label: "I have already used a chatbot or AI assistant, for example ChatGPT, Gemini, or Copilot.",
      points: 1
    },
    {
      id: "Q07",
      category: "familiarization",
      dimension: "Familiarization",
      label: "I have created my own account on an AI tool, for example ChatGPT, Gemini, or Claude.",
      points: 1
    },
    {
      id: "Q08",
      category: "familiarization",
      dimension: "Familiarization",
      label: "I have tested several chatbots and I know how to differentiate them.",
      points: 1
    },
    {
      id: "Q09",
      category: "familiarization",
      dimension: "Familiarization",
      label: "I know how to evaluate an AI response and rephrase my request.",
      points: 1
    },
    {
      id: "Q10",
      category: "uses",
      dimension: "Uses",
      label: "I use AI to write or improve texts.",
      points: 1
    },
    {
      id: "Q11",
      category: "uses",
      dimension: "Uses",
      label: "I use AI to create or modify images.",
      points: 1
    },
    {
      id: "Q12",
      category: "uses",
      dimension: "Uses",
      label: "I use AI to analyze documents or data, for example an Excel spreadsheet.",
      points: 1
    },
    {
      id: "Q13",
      category: "uses",
      dimension: "Uses",
      label: "I write prompts with a framework, for example RTF, RAFT, or CRAFTI.",
      points: 1
    },
    {
      id: "Q14",
      category: "uses",
      dimension: "Uses",
      label: "I organize and reuse my best prompts.",
      points: 1
    },
    {
      id: "Q15",
      category: "advanced_uses",
      dimension: "Advanced Uses",
      label: "I have a paid subscription to an AI tool, for example ChatGPT, Gemini, or Copilot.",
      points: 1
    },
    {
      id: "Q16",
      category: "advanced_uses",
      dimension: "Advanced Uses",
      label: "I have created my own chatbot, for example a Custom GPT or a Gem.",
      points: 1
    },
    {
      id: "Q17",
      category: "advanced_uses",
      dimension: "Advanced Uses",
      label: "I have installed an AI software on my computer, for example Ollama.",
      points: 1
    },
    {
      id: "Q18",
      category: "expert_uses",
      dimension: "Expert Uses",
      label: "I use AI to code or fix code, for example with Codex, Copilot, or Cursor.",
      points: 1
    },
    {
      id: "Q19",
      category: "expert_uses",
      dimension: "Expert Uses",
      label: "I have created an agent to automate simple tasks.",
      points: 1
    },
    {
      id: "Q20",
      category: "expert_uses",
      dimension: "Expert Uses",
      label: "I have created an agent connected to APIs or external services.",
      points: 1
    }
  ];

  const CATEGORIES = [
    {
      key: "knowledge",
      shortTitle: "Knowledge",
      title: "Understand the basics of AI",
      description:
        "General understanding of AI, its practical applications, its limitations, and its regulatory framework."
    },
    {
      key: "familiarization",
      shortTitle: "Familiarization",
      title: "Navigating the tools",
      description:
        "Familiarity with chatbots and ability to test, compare, and refine your prompts."
    },
    {
      key: "uses",
      shortTitle: "Uses",
      title: "Using AI daily",
      description:
        "Concrete daily uses: content writing, image generation, document analysis, and prompt structuring."
    },
    {
      key: "advanced_uses",
      shortTitle: "Advanced Uses",
      title: "Personalizing your AI environment",
      description:
        "Level of autonomy: using Pro subscriptions, custom chatbots, or locally installed tools."
    },
    {
      key: "expert_uses",
      shortTitle: "Expert Uses",
      title: "Automating and connecting AI",
      description:
        "Advanced and technical uses: assisted development, autonomous agents, and API connections to third-party services."
    }
  ];

  const LEVELS = [
    {
      min: 0,
      max: 2,
      level: "Novice",
      profile: "AI Discoverer",
      summary:
        "You are starting your AI discovery, it's the perfect time to explore a field that will transform the way you work.",
      priorities: [
        "Test three simple uses: rephrase a message, summarize a document, generate ideas.",
        "Verify each answer with a reliable source.",
        "Keep effective prompts in a note."
      ],
      vigilance: "Do not confuse response speed with information reliability.",

      nextStep:
        "Create your account on an AI tool and complete a first full mini-exercise in 15 minutes."
    },
    {
      min: 3,
      max: 5,
      level: "Beginner",
      profile: "Assisted User",
      summary:
        "You have taken the first steps and are starting to perceive the potential of AI, all you have to do is put it into regular practice.",
      priorities: [
        "Compare two AI tools on the same instruction.",
        "Specify the context, objective, and expected format.",
        "Use AI on a weekly task and measure the time saved."
      ],
      vigilance: "Avoid staying in one-off experimentation without a method.",

      nextStep:
        "Choose a recurring task from your studies and use AI to process it every week for a month."
    },
    {
      min: 6,
      max: 10,
      level: "Intermediate",
      profile: "Augmented Operator",
      summary:
        "You already use AI daily and master the essential basics to get a real benefit in your professional activities.",
      priorities: [
        "Write structured prompts: context, role, expected deliverable.",
        "Build a prompt library for your work.",
        "Apply a simple rule to protect sensitive data."
      ],
      vigilance: "Without capitalization, your gains remain limited and difficult to reproduce.",

      nextStep:
        "Build a library of 10 reliable prompts for your main academic use cases."
    },
    {
      min: 11,
      max: 15,
      level: "Advanced",
      profile: "AI Architect",
      summary:
        "You have a solid mastery of generative AI tools and uses, and you are able to support and inspire your colleagues.",
      priorities: [
        "Automate a repetitive task in your week.",
        "Verify the time saved on 2 to 3 real cases.",
        "Share your method with a classmate, then improve it."
      ],
      vigilance: "Keep a clear human supervision on each automation put in place.",

      nextStep:
        "Create a mini-agent connected to a simple tool (Notion, Google Sheets, or Gmail) for a concrete use."
    },
    {
      min: 16,
      max: 20,
      level: "Expert",
      profile: "AI Strategist",
      summary:
        "You are among the most experienced users, capable of designing custom AI solutions and anticipating future developments.",
      priorities: [
        "Design a complete workflow, from collection to final deliverable.",
        "Define three criteria to evaluate the agent's results.",
        "Document your method so it can be reused."
      ],
      vigilance: "Manage the risks of compliance, tool dependency, and output quality.",

      nextStep:
        "Prototype an agent connected to an external service and test it on a real scenario, from brief to final result."
    }
  ];

  // Dynamic display system for AI tools based on the user's global score :
  // Each tool has an eligibility window [min, max].
  // At the end of the test, the algorithm filters and selects les 9 outils les plus pertinents pour le score obtenu.
  // The choice is made by 'centrality' : the closer the user's score is to the middle of the tool's range, the more this tool will be pushed as a priority.
  const TOOL_RANGES = [
    // --- Universal companions (present at all or almost all levels) ---
    { name: "ChatGPT",         min: 0,    max: 20, companion: true },
    { name: "Claude",           min: 0,    max: 20, companion: true },
    { name: "Gemini",           min: 0,    max: 20 },
    { name: "Perplexity",       min: 0,    max: 18 },

    // --- Entry tools (disappear when going beyond basics) ---
    { name: "Microsoft Copilot", min: 0,   max: 8 },
    { name: "Google Workspace",  min: 0,   max: 7 },
    { name: "NotebookLM",        min: 0.5, max: 12 },
    { name: "Notion",            min: 1,   max: 10 },

    // --- Visual creation and presentations ---
    { name: "Canva",            min: 2,    max: 12 },
    { name: "Gamma",            min: 2,    max: 11 },

    // --- Alternative models (LLMs comparison) ---
    { name: "Grok",             min: 4,    max: 13 },
    { name: "Mistral",          min: 4,    max: 16 },
    { name: "DeepSeek",         min: 5,    max: 16 },
    { name: "Qwen",             min: 6,    max: 16 },

    // --- No-code / low-code automation ---
    { name: "Zapier",           min: 3,    max: 12 },
    { name: "Make",             min: 4,    max: 13 },
    { name: "Airtable",         min: 4,    max: 12 },
    { name: "Apify",            min: 7,    max: 15 },
    { name: "n8n",              min: 8,    max: 17 },

    // --- Models and data exploration ---
    { name: "Hugging Face",     min: 7,    max: 18 },
    { name: "Kaggle",            min: 8,    max: 17 },

    // --- Coding with AI (accessible → advanced) ---
    { name: "Replit",           min: 5,    max: 12 },
    { name: "v0",               min: 5,    max: 13 },
    { name: "Lovable",          min: 6,    max: 16 },

    // --- Local AI and agent platforms ---
    { name: "Dify",             min: 9,    max: 17 },
    { name: "Ollama",           min: 10,   max: 19 },
    { name: "LM Studio",        min: 11,   max: 17 },
    { name: "Langflow",         min: 11,   max: 17 },
    { name: "Flowise",          min: 11,   max: 17 },
    { name: "Windmill",         min: 13,   max: 18 },

    // --- Expert: IDE, autonomous agents, frameworks ---
    { name: "GitHub Copilot",   min: 11,   max: 20 },
    { name: "Cursor",           min: 12,   max: 20 },
    { name: "Claude Code",      min: 14,   max: 20 },
    { name: "LangChain",        min: 14,   max: 20 },
    { name: "Antigravity",      min: 15,   max: 20 },
    { name: "Manus",            min: 15,   max: 20 },
    { name: "MCP",              min: 15,   max: 20 },
    { name: "OpenClaw",         min: 15.5, max: 19 },
    { name: "LangGraph",        min: 16,   max: 20 },
    { name: "MLflow",           min: 17,   max: 20 },
  ];

  const TOOL_ICON_RULES = [
    // --- Beginner & Intermediate Level (Consumer and productivity tools) ---
    { pattern: /(chatgpt|openai|custom gpt|gpt)/i, slug: "chatgpt" },
    { pattern: /(gemini|gems?)/i, slug: "gemini" },
    { pattern: /google workspace/i, slug: "googleworkspace" },
    { pattern: /perplexity/i, slug: "perplexity" },
    { pattern: /notebooklm/i, slug: "notebooklm" },
    { pattern: /notion/i, slug: "notion" },
    { pattern: /canva/i, slug: "canva" },
    { pattern: /\bgamma\b/i, slug: "gamma" },
    { pattern: /hugging\s*face/i, slug: "huggingface" },
    { pattern: /kaggle/i, slug: "kaggle" },

    // --- Advanced Level (Automation, No-code and Alternative models) ---
    { pattern: /make/i, slug: "make" },
    { pattern: /zapier/i, slug: "zapier" },
    { pattern: /ollama/i, slug: "ollama" },
    { pattern: /qwen/i, slug: "qwen" },
    { pattern: /mistral/i, slug: "mistral" },
    { pattern: /deepseek/i, slug: "deepseek" },
    { pattern: /grok/i, slug: "grok" },
    { pattern: /apify/i, slug: "apify" },
    { pattern: /airtable/i, slug: "airtable" },
    { pattern: /windmill/i, slug: "windmill" },
    { pattern: /langflow/i, slug: "langflow" },
    { pattern: /flowise/i, slug: "flowise" },
    { pattern: /dify/i, slug: "dify" },
    { pattern: /lm\s*studio/i, slug: "lmstudio" },

    // --- Expert Level (Development, Frameworks and Autonomous Agents) ---
    { pattern: /v0/i, slug: "v0" },
    { pattern: /replit/i, slug: "replit" },
    { pattern: /github\s*copilot/i, slug: "githubcopilot" }, // IMPORTANT : avant "copilot"
    { pattern: /copilot/i, slug: "copilot" },
    { pattern: /cursor/i, slug: "cursor" },
    { pattern: /claude\s*code/i, slug: "claudecode" }, // IMPORTANT : avant "claude"
    { pattern: /claude/i, slug: "claude" },
    { pattern: /lovable/i, slug: "lovable" },
    { pattern: /manus/i, slug: "manus" },
    { pattern: /openclaw/i, slug: "openclaw" },
    { pattern: /antigravity/i, slug: "antigravity" },
    { pattern: /langchain/i, slug: "langchain" },
    { pattern: /langgraph/i, slug: "langgraph" },
    { pattern: /mlflow/i, slug: "mlflow" },
    { pattern: /mcp\s*server/i, slug: "mcp" },
    { pattern: /\bmcp\b/i, slug: "mcp" },
    { pattern: /\bn8n\b/i, slug: "n8n" },
    { pattern: /agents? connect/i, slug: "agentvoice" }
  ];

  const TOOL_URL_RULES = [
    { pattern: /(chatgpt\s*plus)/i, url: "https://chatgpt.com" },
    { pattern: /custom gpt/i, url: "https://chatgpt.com/gpts" },
    { pattern: /(chatgpt|openai|gpt)/i, url: "https://chatgpt.com" },
    { pattern: /google gemini/i, url: "https://gemini.google.com" },
    { pattern: /(gemini|gems?)/i, url: "https://gemini.google.com" },
    { pattern: /google workspace/i, url: "https://workspace.google.com" },
    { pattern: /perplexity/i, url: "https://www.perplexity.ai" },
    { pattern: /notebooklm/i, url: "https://notebooklm.google" },
    { pattern: /notion/i, url: "https://www.notion.so" },
    { pattern: /canva/i, url: "https://www.canva.com" },
    { pattern: /\bgamma\b/i, url: "https://gamma.app" },
    { pattern: /hugging\s*face/i, url: "https://huggingface.co" },
    { pattern: /kaggle/i, url: "https://www.kaggle.com" },
    { pattern: /make/i, url: "https://www.make.com" },
    { pattern: /zapier/i, url: "https://zapier.com" },
    { pattern: /ollama/i, url: "https://ollama.com" },
    { pattern: /qwen/i, url: "https://chat.qwenlm.ai" },
    { pattern: /mistral/i, url: "https://mistral.ai" },
    { pattern: /deepseek/i, url: "https://chat.deepseek.com" },
    { pattern: /grok/i, url: "https://x.ai" },
    { pattern: /apify/i, url: "https://apify.com" },
    { pattern: /airtable/i, url: "https://www.airtable.com" },
    { pattern: /windmill/i, url: "https://www.windmill.dev" },
    { pattern: /langflow/i, url: "https://www.langflow.org" },
    { pattern: /flowise/i, url: "https://flowiseai.com" },
    { pattern: /dify/i, url: "https://dify.ai" },
    { pattern: /lm\s*studio/i, url: "https://lmstudio.ai" },
    { pattern: /v0/i, url: "https://v0.dev" },
    { pattern: /replit/i, url: "https://replit.com" },
    { pattern: /github\s*copilot/i, url: "https://github.com/features/copilot" },
    { pattern: /microsoft copilot/i, url: "https://copilot.microsoft.com" },
    { pattern: /copilot/i, url: "https://copilot.microsoft.com" },
    { pattern: /cursor/i, url: "https://www.cursor.com" },
    { pattern: /claude\s*code/i, url: "https://claude.com/product/claude-code" },
    { pattern: /claude pro/i, url: "https://claude.com/pricing" },
    { pattern: /claude plugins/i, url: "https://claude.ai/customize/connectors" },
    { pattern: /claude skills/i, url: "https://claude.ai/customize/skills" },
    { pattern: /claude/i, url: "https://claude.ai" },
    { pattern: /lovable/i, url: "https://lovable.dev" },
    { pattern: /manus/i, url: "https://manus.im" },
    { pattern: /openclaw/i, url: "https://openclaw.ai/" },
    { pattern: /antigravity/i, url: "https://antigravity.google/" },
    { pattern: /langchain/i, url: "https://www.langchain.com" },
    { pattern: /langgraph/i, url: "https://www.langchain.com/langgraph" },
    { pattern: /mlflow/i, url: "https://mlflow.org" },
    { pattern: /mcp\s*server/i, url: "https://modelcontextprotocol.io" },
    { pattern: /\bmcp\b/i, url: "https://modelcontextprotocol.io" },
    { pattern: /\bn8n\b/i, url: "https://n8n.io" },
    { pattern: /agents? connect/i, url: "https://make.com" }
  ];


  function shortDimensionLabel(name) {
    const labels = {
      "Knowledge": "Knowledge",
      "Familiarization": "Familiarization",
      "Uses": "Uses",
      "Advanced Uses": "Advanced Uses",
      "Expert Uses": "Expert Uses"
    };

    return labels[name] || name;
  }

  function clampPercent(percent) {
    return Math.max(0, Math.min(100, percent));
  }

  function scoreToPercent(score, max) {
    if (!max) {
      return 0;
    }

    return Math.round((score / max) * 100);
  }

  function resolveToolIconUrl(toolName) {
    const match = TOOL_ICON_RULES.find((rule) => rule.pattern.test(toolName));
    return match ? `assets/public/icons/${match.slug}.webp` : "";
  }

  function resolveToolUrl(toolName) {
    const match = TOOL_URL_RULES.find((rule) => rule.pattern.test(toolName));
    return match ? match.url : "https://google.com/search?q=" + encodeURIComponent(toolName);
  }


  function buildToolFallback(toolName) {
    const words = toolName
      .replace(/[^A-Za-z0-9À-ÿ\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    if (!words.length) {
      return "AI";
    }

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  function normalizeScoreMap(ids) {
    const map = {};
    ids.forEach((id) => {
      map[id] = 0;
    });
    return map;
  }

  function getStrengthsAndFocuses(rows) {
    const sortedByRatioDesc = [...rows].sort((a, b) => b.ratio - a.ratio);
    const sortedByRatioAsc = [...rows].sort((a, b) => a.ratio - b.ratio);

    return {
      strengths: sortedByRatioDesc.slice(0, 2),
      focuses: sortedByRatioAsc.slice(0, 2)
    };
  }

  function getPdfLibrary() {
    if (typeof window === "undefined") {
      return null;
    }

    const html2canvas = window.html2canvas;
    const jsPdfFactory = window.jspdf && window.jspdf.jsPDF;
    if (typeof html2canvas !== "function" || typeof jsPdfFactory !== "function") {
      return null;
    }

    return { html2canvas, jsPdfFactory };
  }

  function initFloatingHero() {
    const hero = document.querySelector(".an-hero-fx");
    if (!hero) {
      return;
    }

    const icons = Array.from(hero.querySelectorAll("[data-float-icon]"));
    if (!icons.length) {
      return;
    }

    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let frame = null;

    const getRadius = () => Math.max(140, Math.min(210, hero.clientWidth * 0.17));
    const getMaxForce = () => Math.max(34, Math.min(56, hero.clientWidth * 0.045));

    const applyRepulsion = () => {
      frame = null;
      const radius = getRadius();
      const maxForce = getMaxForce();

      icons.forEach((icon) => {
        if (!pointerActive) {
          icon.style.setProperty("--an-repel-x", "0px");
          icon.style.setProperty("--an-repel-y", "0px");
          return;
        }

        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = pointerX - centerX;
        const deltaY = pointerY - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance >= radius) {
          icon.style.setProperty("--an-repel-x", "0px");
          icon.style.setProperty("--an-repel-y", "0px");
          return;
        }

        const angle = Math.atan2(deltaY, deltaX);
        const force = (1 - distance / radius) * maxForce;
        const repelX = -Math.cos(angle) * force;
        const repelY = -Math.sin(angle) * force;

        icon.style.setProperty("--an-repel-x", `${repelX.toFixed(2)}px`);
        icon.style.setProperty("--an-repel-y", `${repelY.toFixed(2)}px`);
      });
    };

    const queueFrame = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(applyRepulsion);
      }
    };

    hero.addEventListener("pointermove", (event) => {
      pointerActive = true;
      pointerX = event.clientX;
      pointerY = event.clientY;
      queueFrame();
    }, { passive: true });

    hero.addEventListener("pointerleave", () => {
      pointerActive = false;
      queueFrame();
    });

    window.addEventListener("resize", queueFrame);
    queueFrame();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFloatingHero, { once: true });
  } else {
    initFloatingHero();
  }

  window.diagnosticIA = function diagnosticIA() {
    return {
      step: "intro",
      categories: CATEGORIES,
      questions: QUESTIONS,
      dimensions: DIMENSIONS,
      levels: LEVELS,
      answers: {},
      currentCategoryIndex: 0,
      avgScore: null,
      avgDimensions: null,

      init() {
        this.answers = normalizeScoreMap(this.questions.map((q) => q.id));
      },

      get currentCategory() {
        return this.categories[this.currentCategoryIndex];
      },

      get currentQuestions() {
        if (!this.currentCategory) {
          return [];
        }

        return this.questions.filter((q) => q.category === this.currentCategory.key);
      },

      get isLastCategory() {
        return this.currentCategoryIndex === this.categories.length - 1;
      },

      get progressLabel() {
        return `Step ${this.currentCategoryIndex + 1}/${this.categories.length}`;
      },

      get scoreTotal() {
        return Object.values(this.answers).reduce((sum, val) => sum + Number(val), 0);
      },

      get currentLevel() {
        const roundedScore = Math.floor(this.scoreTotal);
        return this.levels.find(
          (lvl) => roundedScore >= lvl.min && roundedScore <= lvl.max
        );
      },

      get dimensionScores() {
        return this.dimensions.map((dimension) => {
          const score = this.questions
            .filter((q) => q.dimension === dimension.name)
            .reduce((sum, q) => sum + (this.answers[q.id] !== undefined ? Number(this.answers[q.id]) * q.points : 0), 0);

          const ratio = dimension.max === 0 ? 0 : score / dimension.max;
          return {
            name: dimension.name,
            score,
            max: dimension.max,
            ratio,
            percent: Math.round(ratio * 100)
          };
        });
      },

      get scorePercent() {
        return scoreToPercent(this.scoreTotal, this.questions.length);
      },

      get scoreRingStyle() {
        return `--an-progress:${clampPercent(this.scorePercent)}`;
      },

      get scoreAriaLabel() {
        return `Score global ${this.scoreTotal} sur ${this.questions.length}`;
      },

      get categoryScores() {
        return this.categories.map((category) => {
          const categoryQuestions = this.questions.filter((q) => q.category === category.key);
          const score = categoryQuestions.reduce(
            (sum, q) => sum + (this.answers[q.id] !== undefined ? Number(this.answers[q.id]) * q.points : 0),
            0
          );
          const max = categoryQuestions.reduce((sum, q) => sum + q.points, 0);
          const percent = scoreToPercent(score, max);

          return {
            key: category.key,
            shortLabel: category.shortTitle,
            score,
            max,
            percent
          };
        });
      },

      get barChart() {
        const width = 500;
        const height = 180;
        const paddingX = 35;
        const topPad = 24;
        const bottomPad = 28;
        const barAreaHeight = height - topPad - bottomPad;
        const categories = this.categoryScores;
        const count = categories.length || 1;
        const gap = 16;
        const barAreaWidth = width - paddingX * 2;
        const totalGaps = (count - 1) * gap;
        const groupWidth = (barAreaWidth - totalGaps) / count;

        const hasAvg = !!this.avgDimensions;
        const subGap = hasAvg ? 4 : 0;
        const barWidth = hasAvg ? (groupWidth - subGap) / 2 : groupWidth;

        const bars = categories.map((category, index) => {
          const groupX = paddingX + index * (groupWidth + gap);
          const x = groupX;
          const barHeight = (barAreaHeight * category.percent) / 100;
          const y = topPad + barAreaHeight - barHeight;
          return {
            key: category.key,
            shortLabel: category.shortLabel,
            x: Number(x.toFixed(2)),
            y: Number(y.toFixed(2)),
            width: Number(barWidth.toFixed(2)),
            height: Number(Math.max(2, barHeight).toFixed(2)),
            labelX: Number((groupX + groupWidth / 2).toFixed(2)),
            valueX: Number((x + barWidth / 2).toFixed(2)),
            labelY: height - 6,
            percent: category.percent
          };
        });

        let avgBars = [];
        if (hasAvg) {
          const dimNames = ["Knowledge", "Familiarization", "Uses", "Advanced Uses", "Expert Uses"];
          avgBars = dimNames.map((dimName, index) => {
            const groupX = paddingX + index * (groupWidth + gap);
            const x = groupX + barWidth + subGap;
            const avgData = this.avgDimensions[dimName];
            const avgPercent = avgData ? avgData.percent : 0;
            const bh = (barAreaHeight * avgPercent) / 100;
            const y = topPad + barAreaHeight - bh;
            return {
              key: `avg-${dimName}`,
              x: Number(x.toFixed(2)),
              y: Number(y.toFixed(2)),
              width: Number(barWidth.toFixed(2)),
              height: Number(Math.max(2, bh).toFixed(2)),
              valueX: Number((x + barWidth / 2).toFixed(2)),
              percent: avgPercent
            };
          });
        }

        return { bars, avgBars, baseY: topPad + barAreaHeight };
      },

      get radarChart() {
        const center = 130;
        const radius = 86;
        const ringSteps = [0.25, 0.5, 0.75, 1];
        const rows = this.dimensionScores;
        const count = rows.length || 1;
        const angleShift = -Math.PI / 2;

        const pointAt = (index, distance) => {
          const angle = (Math.PI * 2 * index) / count + angleShift;
          return {
            x: center + Math.cos(angle) * distance,
            y: center + Math.sin(angle) * distance
          };
        };

        const rings = ringSteps.map((scale) => {
          const points = rows
            .map((_, index) => {
              const p = pointAt(index, radius * scale);
              return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
            })
            .join(" ");

          return {
            scale,
            points
          };
        });

        const axes = rows.map((row, index) => {
          const edge = pointAt(index, radius);
          const label = pointAt(index, radius + 24);
          const scorePoint = pointAt(index, radius * (row.percent / 100));
          return {
            key: row.name,
            shortLabel: shortDimensionLabel(row.name),
            x: Number(edge.x.toFixed(2)),
            y: Number(edge.y.toFixed(2)),
            labelX: Number(label.x.toFixed(2)),
            labelY: Number(label.y.toFixed(2)),
            scoreX: Number(scorePoint.x.toFixed(2)),
            scoreY: Number(scorePoint.y.toFixed(2))
          };
        });

        const shape = axes.map((axis) => `${axis.scoreX},${axis.scoreY}`).join(" ");

        let avgShape = null;
        if (this.avgDimensions) {
          avgShape = rows.map((row, index) => {
            const avgData = this.avgDimensions[row.name];
            const avgPercent = avgData ? avgData.percent : 0;
            const p = pointAt(index, radius * (avgPercent / 100));
            return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
          }).join(" ");
        }

        return {
          center,
          rings,
          axes,
          shape,
          avgShape
        };
      },

      get toolVisuals() {
        const score = this.scoreTotal;
        const maxTools = 9;

        // 1. Initial filtering: we only keep tools whose range includes the current score
        const eligible = TOOL_RANGES.filter(
          (tool) => score >= tool.min && score <= tool.max
        );

        // 2. We separate the so-called 'Companions' tools (e.g. ChatGPT, Claude) which have a display pass
        const companions = eligible.filter((t) => t.companion);
        const others = eligible.filter((t) => !t.companion);

        // 3. Centrality sorting of classic tools: we prioritize those whose core target corresponds to the student's score
        others.sort((a, b) => {
          const centerA = (a.min + a.max) / 2;
          const halfA = (a.max - a.min) / 2 || 0.5;
          const centralityA = 1 - Math.abs(score - centerA) / halfA;

          const centerB = (b.min + b.max) / 2;
          const halfB = (b.max - b.min) / 2 || 0.5;
          const centralityB = 1 - Math.abs(score - centerB) / halfB;

          return centralityB - centralityA;
        });

        // 4. We reserve the first places for Companions (only if score >= 2 to not overwhelm a complete beginner)
        // and we fill the remaining slots (up to 9) with the most relevant classic tools.
        const companionSlots = (score >= 2) ? companions : [];
        const remainingSlots = maxTools - companionSlots.length;
        const selected = [...companionSlots, ...others.slice(0, remainingSlots)];

        // 5. Final visual sorting: we display from the most basic (low min) to the most demanding (high min).
        // In case of equality on the min, the tool with the narrowest range (therefore more specialized) will be displayed after.
        selected.sort((a, b) => a.min - b.min || a.max - b.max);

        return selected.map((tool) => ({
          name: tool.name,
          iconUrl: resolveToolIconUrl(tool.name),
          fallback: buildToolFallback(tool.name),
          url: resolveToolUrl(tool.name)
        }));
      },


      get strengths() {
        return getStrengthsAndFocuses(this.dimensionScores).strengths;
      },

      get focusAreas() {
        return getStrengthsAndFocuses(this.dimensionScores).focuses;
      },

      get pdfSummary() {
        const level = this.currentLevel ? `${this.currentLevel.level} · ${this.currentLevel.profile}` : "";

        return [
          `Score ${this.scoreTotal}/20`,
          level ? `Level ${level}` : ""
        ]
          .filter(Boolean)
          .join(" - ");
      },

      get pdfMeta() {
        const snapshotDate = new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
        return `Diagnostic generated on ${snapshotDate}.`;
      },

      start() {
        this.step = "questions";
      },

      previousCategory() {
        if (this.currentCategoryIndex > 0) {
          this.currentCategoryIndex -= 1;
        } else {
          this.step = "intro";
        }
      },

      nextCategory() {
        if (!this.isLastCategory) {
          this.currentCategoryIndex += 1;
        }
      },

      showResults() {
        this.step = "results";
        this._submitAndFetchStats();
      },

      async _submitAndFetchStats() {
        try {
          await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answers: this.answers,
              scoreTotal: this.scoreTotal
            })
          });
        } catch (_) { /* server not running */ }

        try {
          const res = await fetch("/api/stats");
          if (res.ok) {
            const stats = await res.json();
            if (stats.avgScore !== null) {
              this.avgScore = stats.avgScore;
              this.avgDimensions = stats.avgDimensions;
            }
          }
        } catch (_) { /* server not running */ }
      },

      reset() {
        this.step = "intro";
        this.currentCategoryIndex = 0;
        this.answers = normalizeScoreMap(this.questions.map((q) => q.id));
        this.avgScore = null;
        this.avgDimensions = null;
      },

      get avgScoreLabel() {
        if (this.avgScore === null) return null;
        return `Average score: ${this.avgScore}/20`;
      },

      async waitForImages(element) {
        const images = Array.from(element.querySelectorAll("img"));
        if (!images.length) {
          return;
        }

        await Promise.all(
          images.map((img) => {
            img.loading = "eager";
            img.decoding = "sync";

            if (img.complete) {
              return Promise.resolve();
            }

            return new Promise((resolve) => {
              let settled = false;
              const done = () => {
                if (settled) {
                  return;
                }
                settled = true;
                resolve();
              };

              img.addEventListener("load", done, { once: true });
              img.addEventListener("error", done, { once: true });
              window.setTimeout(done, 5000);
            });
          })
        );
      },

      preparePdfCaptureFallbacks(captureNode) {
        const cleanups = [];
        const dpr = Math.max(3, Math.min(4, (window.devicePixelRatio || 1) + 1));
        const pdfLabelFontFamily = "Roboto, 'Segoe UI', Arial, sans-serif";

        const createHiDpiCanvas = (width, height) => {
          const safeWidth = Math.max(1, Math.round(width));
          const safeHeight = Math.max(1, Math.round(height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(safeWidth * dpr);
          canvas.height = Math.round(safeHeight * dpr);
          canvas.style.width = `${safeWidth}px`;
          canvas.style.height = `${safeHeight}px`;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.scale(dpr, dpr);
          }
          return { canvas, ctx, width: safeWidth, height: safeHeight };
        };

        const svgTemplates = Array.from(
          captureNode.querySelectorAll(".an-radar-svg template, .an-bar-chart-svg template")
        );
        svgTemplates.forEach((templateNode) => {
          const placeholder = document.createComment("pdf-template-placeholder");
          templateNode.parentNode.insertBefore(placeholder, templateNode);
          templateNode.remove();
          cleanups.push(() => {
            if (!placeholder.parentNode) {
              return;
            }
            placeholder.parentNode.insertBefore(templateNode, placeholder);
            placeholder.remove();
          });
        });

        const scoreRing = captureNode.querySelector(".an-score-ring");
        if (scoreRing) {
          const rect = scoreRing.getBoundingClientRect();
          const { canvas, ctx, width, height } = createHiDpiCanvas(rect.width || 176, rect.height || 176);
          let didRenderScore = false;

          if (ctx) {
            const cx = width / 2;
            const cy = height / 2;
            const trackRadius = Math.min(width, height) / 2 - 10;
            const lineWidth = Math.max(10, Math.round(Math.min(width, height) * 0.11));
            const progress = clampPercent(this.scorePercent) / 100;

            ctx.clearRect(0, 0, width, height);
            ctx.lineCap = "round";
            ctx.lineWidth = lineWidth;

            ctx.strokeStyle = "rgba(29, 86, 216, 0.14)";
            ctx.beginPath();
            ctx.arc(cx, cy, trackRadius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = "#1d56d8";
            ctx.beginPath();
            ctx.arc(cx, cy, trackRadius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
            ctx.stroke();

            ctx.fillStyle = "#1d56d8";
            ctx.font = `800 ${Math.round(width * 0.255)}px Roboto`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(String(this.scoreTotal), cx, cy - height * 0.03);

            ctx.fillStyle = "#6f809f";
            ctx.font = `700 ${Math.round(width * 0.09)}px Roboto`;
            ctx.fillText(`/20`, cx, cy + height * 0.18);
            didRenderScore = true;
          }

          if (didRenderScore) {
            const replacement = document.createElement("div");
            replacement.className = "an-pdf-canvas-fallback an-pdf-canvas-score";
            replacement.style.width = `${canvas.style.width}`;
            replacement.style.height = `${canvas.style.height}`;
            replacement.appendChild(canvas);

            const previousDisplay = scoreRing.style.display;
            scoreRing.style.display = "none";
            scoreRing.insertAdjacentElement("afterend", replacement);

            cleanups.push(() => {
              scoreRing.style.display = previousDisplay;
              replacement.remove();
            });
          }
        }

        const radarSvg = captureNode.querySelector(".an-radar-svg");
        if (radarSvg) {
          const rect = radarSvg.getBoundingClientRect();
          const { canvas, ctx, width, height } = createHiDpiCanvas(rect.width || 320, rect.height || 320);
          const radar = this.radarChart || { center: 130, rings: [], axes: [], shape: "" };
          const axes = Array.isArray(radar.axes) ? radar.axes : [];
          let didRenderRadar = false;

          if (ctx) {
            const scaleX = width / 320;
            const scaleY = height / 260;
            const scale = Math.min(scaleX, scaleY);
            const offsetX = (width - 320 * scale) / 2;
            const offsetY = (height - 260 * scale) / 2;
            const center = 130;

            const toCanvasPoint = (x, y) => ({
              x: offsetX + (x + 30) * scale,
              y: offsetY + y * scale
            });

            const drawPolygon = (points, options) => {
              if (!Array.isArray(points) || !points.length) {
                return;
              }
              ctx.beginPath();
              points.forEach((point, index) => {
                const p = toCanvasPoint(point.x, point.y);
                if (index === 0) {
                  ctx.moveTo(p.x, p.y);
                } else {
                  ctx.lineTo(p.x, p.y);
                }
              });
              ctx.closePath();

              if (options.fill) {
                ctx.fillStyle = options.fill;
                ctx.fill();
              }
              if (options.stroke) {
                ctx.strokeStyle = options.stroke;
                ctx.lineWidth = options.lineWidth || 1;
                ctx.stroke();
              }
            };

            const ringScales = [0.25, 0.5, 0.75, 1];
            ringScales.forEach((ringScale) => {
              const ringPoints = axes.map((_, index) => {
                const angle = (Math.PI * 2 * index) / Math.max(axes.length, 1) - Math.PI / 2;
                return {
                  x: center + Math.cos(angle) * 86 * ringScale,
                  y: center + Math.sin(angle) * 86 * ringScale
                };
              });
              drawPolygon(ringPoints, {
                stroke: "rgba(29, 86, 216, 0.12)",
                lineWidth: 1
              });
            });

            axes.forEach((axis) => {
              const c = toCanvasPoint(center, center);
              const p = toCanvasPoint(axis.x, axis.y);
              ctx.strokeStyle = "rgba(29, 86, 216, 0.12)";
              ctx.lineWidth = 1;
              ctx.setLineDash([3, 3]);
              ctx.beginPath();
              ctx.moveTo(c.x, c.y);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();
            });
            ctx.setLineDash([]);

            const shapePoints = axes.map((axis) => ({ x: axis.scoreX, y: axis.scoreY }));
            drawPolygon(shapePoints, {
              fill: "rgba(29, 86, 216, 0.28)",
              stroke: "#1d56d8",
              lineWidth: 1.6
            });

            if (radar.avgShape) {
              const avgPoints = radar.avgShape.split(" ").map(pt => {
                const coords = pt.split(",");
                return { x: parseFloat(coords[0]), y: parseFloat(coords[1]) };
              });
              ctx.setLineDash([5 * scale, 3 * scale]);
              drawPolygon(avgPoints, {
                fill: "rgba(29, 156, 204, 0.10)",
                stroke: "#1d9ccc",
                lineWidth: 1.4
              });
              ctx.setLineDash([]);
            }

            axes.forEach((axis) => {

              const label = toCanvasPoint(axis.labelX, axis.labelY);
              ctx.fillStyle = "#3e5278";
              ctx.font = `700 ${Math.max(9, Math.round(10 * scale))}px ${pdfLabelFontFamily}`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(shortDimensionLabel(axis.shortLabel), label.x, label.y);
            });

            didRenderRadar = axes.length > 0;
          }

          if (didRenderRadar) {
            const replacement = document.createElement("div");
            replacement.className = "an-pdf-canvas-fallback an-pdf-canvas-radar";
            replacement.style.width = `${canvas.style.width}`;
            replacement.style.height = `${canvas.style.height}`;
            replacement.appendChild(canvas);

            const previousDisplay = radarSvg.style.display;
            radarSvg.style.display = "none";
            radarSvg.insertAdjacentElement("afterend", replacement);

            cleanups.push(() => {
              radarSvg.style.display = previousDisplay;
              replacement.remove();
            });
          }
        }

        const barChartSvg = captureNode.querySelector(".an-bar-chart-svg");
        if (barChartSvg) {
          const rect = barChartSvg.getBoundingClientRect();
          const { canvas, ctx, width, height } = createHiDpiCanvas(rect.width || 500, rect.height || 180);
          const chart = this.barChart || { bars: [], avgBars: [], baseY: 152 };
          const bars = Array.isArray(chart.bars) ? chart.bars : [];
          const avgBars = Array.isArray(chart.avgBars) ? chart.avgBars : [];
          let didRenderBars = false;

          if (ctx && bars.length) {
            const sx = width / 500;
            const sy = height / 180;

            const drawBar = (bar, color, valueColor, borderOptions) => {
              const bx = bar.x * sx;
              const by = bar.y * sy;
              const bw = bar.width * sx;
              const bh = bar.height * sy;

              ctx.fillStyle = color;
              const r = Math.min(3 * sx, bw / 2);
              ctx.beginPath();
              ctx.moveTo(bx + r, by);
              ctx.lineTo(bx + bw - r, by);
              ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
              ctx.lineTo(bx + bw, by + bh);
              ctx.lineTo(bx, by + bh);
              ctx.lineTo(bx, by + r);
              ctx.quadraticCurveTo(bx, by, bx + r, by);
              ctx.closePath();
              ctx.fill();

              if (borderOptions) {
                ctx.lineWidth = borderOptions.width || 1;
                ctx.strokeStyle = borderOptions.color;
                if (borderOptions.dash) {
                  ctx.setLineDash(borderOptions.dash.map(d => d * Math.min(sx, sy)));
                }
                ctx.stroke();
                ctx.setLineDash([]);
              }

              ctx.fillStyle = valueColor;
              ctx.font = `800 ${Math.max(7, Math.round(8 * Math.min(sx, sy)))}px ${pdfLabelFontFamily}`;
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
              ctx.fillText(`${bar.percent}%`, bar.valueX * sx, by - 3 * sy);
            };

            avgBars.forEach((bar) => {
              drawBar(bar, "rgba(29, 156, 204, 0.15)", "#1d9ccc", {
                color: "#1d9ccc",
                dash: [5, 3]
              });
            });

            bars.forEach((bar) => {
              drawBar(bar, "rgba(29, 86, 216, 0.28)", "#1646b5", {
                color: "#1d56d8",
                width: 1
              });
              
              ctx.fillStyle = "#42567d";
              ctx.font = `700 ${Math.max(8, Math.round(8.5 * Math.min(sx, sy)))}px ${pdfLabelFontFamily}`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(bar.shortLabel, bar.labelX * sx, bar.labelY * sy);
            });

            didRenderBars = true;
          }

          if (didRenderBars) {
            const replacement = document.createElement("div");
            replacement.className = "an-pdf-canvas-fallback an-pdf-canvas-barchart";
            replacement.style.width = `${canvas.style.width}`;
            replacement.style.height = `${canvas.style.height}`;
            replacement.appendChild(canvas);

            const previousDisplay = barChartSvg.style.display;
            barChartSvg.style.display = "none";
            barChartSvg.insertAdjacentElement("afterend", replacement);

            cleanups.push(() => {
              barChartSvg.style.display = previousDisplay;
              replacement.remove();
            });
          }
        }

        captureNode.classList.add("an-pdf-capture-mode");
        cleanups.push(() => {
          captureNode.classList.remove("an-pdf-capture-mode");
        });

        return () => {
          while (cleanups.length) {
            const cleanup = cleanups.pop();
            try {
              cleanup();
            } catch (error) {
              void error;
            }
          }
        };
      },

      sanitizeCaptureNode(captureNode) {
        const allNodes = [captureNode, ...Array.from(captureNode.querySelectorAll("*"))];
        allNodes.forEach((node) => {
          const attrs = Array.from(node.attributes || []);
          attrs.forEach((attr) => {
            const name = attr.name;
            if (name === "x-ignore") {
              return;
            }
            if (name.startsWith("x-") || name.startsWith(":") || name.startsWith("@")) {
              node.removeAttribute(name);
            }
          });
        });

        // We purge <template> tags: these are internal Alpine.js instructions qui pollueraient le rendu PDF.
        captureNode.querySelectorAll("template").forEach((templateNode) => {
          templateNode.remove();
        });

        // We completely freeze the cloned DOM tree with the x-ignore attribute.
        // Without this, Alpine.js would try to re-evaluate javascript in the phantom clone, ce qui ferait planter l'export PDF.
        captureNode.setAttribute("x-ignore", "");
      },

      async downloadDiagnosticPdf() {
        if (typeof window === "undefined") {
          return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        const pdfLib = getPdfLibrary();
        if (!pdfLib) {
          window.alert("The PDF module is not loaded. Reload the page and try again.");
          return;
        }

        if (!this.$root) {
          window.alert("Impossible to generate the PDF.");
          return;
        }

        const sourceNode = this.$root.querySelector(".an-results-shell");
        if (!sourceNode) {
          window.alert("Impossible to generate the PDF without the results screen.");
          return;
        }

        const sourceRect = sourceNode.getBoundingClientRect();
        const captureNode = sourceNode.cloneNode(true);
        captureNode.classList.add("an-pdf-capture-shell");
        captureNode.style.position = "fixed";
        captureNode.style.left = "-100000px";
        captureNode.style.top = "0";
        captureNode.style.zIndex = "-1";
        captureNode.style.pointerEvents = "none";
        captureNode.style.opacity = "1";
        captureNode.style.transform = "none";
        captureNode.style.margin = "0";
        captureNode.style.width = `${Math.max(
          960,
          Math.round(sourceRect.width || sourceNode.scrollWidth || 960)
        )}px`;
        captureNode.querySelectorAll("[x-cloak]").forEach((node) => {
          node.removeAttribute("x-cloak");
        });
        captureNode.querySelectorAll(".an-results-actions").forEach((node) => {
          node.remove();
        });
        this.sanitizeCaptureNode(captureNode);
        document.body.appendChild(captureNode);

        const cleanupFallbacks = this.preparePdfCaptureFallbacks(captureNode);

        try {
          if (
            document.fonts &&
            document.fonts.ready &&
            typeof document.fonts.ready.then === "function"
          ) {
            await document.fonts.ready;
          }

          await this.waitForImages(captureNode);
          await new Promise((resolve) => window.requestAnimationFrame(resolve));
          await new Promise((resolve) => window.requestAnimationFrame(resolve));

          const captureWidth = Math.max(
            1,
            Math.ceil(captureNode.scrollWidth || captureNode.getBoundingClientRect().width || 960)
          );
          const captureHeight = Math.max(
            1,
            Math.ceil(captureNode.scrollHeight || captureNode.getBoundingClientRect().height || 1)
          );

          const scale = Math.max(3, Math.min(4, (window.devicePixelRatio || 1) + 1));
          const canvas = await pdfLib.html2canvas(captureNode, {
            scale,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
            scrollX: 0,
            scrollY: 0,
            windowWidth: captureWidth,
            windowHeight: captureHeight,
            ignoreElements: (element) =>
              Boolean(
                element &&
                typeof element.hasAttribute === "function" &&
                element.hasAttribute("data-html2canvas-ignore")
              )
          });

          if (!canvas || !canvas.width || !canvas.height) {
            throw new Error("Invalid PDF Canvas (null dimensions).");
          }

          const pdf = new pdfLib.jsPdfFactory({
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            compress: false
          });

          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const margin = 6;
          const printableWidth = pageWidth - margin * 2;
          const printableHeight = pageHeight - margin * 2;
          const widthRatio = printableWidth / canvas.width;
          const heightRatio = printableHeight / canvas.height;
          const renderRatio = Math.min(widthRatio, heightRatio);

          if (!Number.isFinite(renderRatio) || renderRatio <= 0) {
            throw new Error("Invalid PDF render ratio.");
          }

          const renderWidth = canvas.width * renderRatio;
          const renderHeight = canvas.height * renderRatio;
          const offsetX = (pageWidth - renderWidth) / 2;
          const offsetY = margin;

          if (
            !Number.isFinite(renderWidth) ||
            !Number.isFinite(renderHeight) ||
            renderWidth <= 0 ||
            renderHeight <= 0 ||
            !Number.isFinite(offsetX) ||
            !Number.isFinite(offsetY)
          ) {
            throw new Error("Invalid PDF coordinates.");
          }

          pdf.addImage(canvas, "PNG", offsetX, offsetY, renderWidth, renderHeight);

          pdf.save("AI-Maturity-Diagnostic.pdf");
        } catch (error) {
          console.error("PDF export failed:", error);
          window.alert("PDF export impossible for the moment. Reload the page and try again.");
        } finally {
          cleanupFallbacks();
          if (captureNode && captureNode.parentNode) {
            captureNode.parentNode.removeChild(captureNode);
          }
        }
      }
    };
  };
})();
