<div align="center">

# Token Visualizer

![Token_Visualizer](https://github.com/user-attachments/assets/7bdfaa8b-13b4-4f5d-97b3-813fea62d43e)


### *Visualize How AI Reads Your Text*

> **Token Visualizer** is a free AI token counter and tokenizer. Paste text, choose a model, and instantly see token counts and estimated API costs. Paste your text. Pick your model. Watch your words decompose into beautiful, color-coded token chips in real time.

![License](https://img.shields.io/badge/License-MIT-blue)
<img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome" />
<img src="https://img.shields.io/badge/models-90%2B%20supported-purple" alt="90+ Models" />

  <b><a href="https://token-visualizer-tau.vercel.app/">🚀 Live Demo</a></b> &nbsp;·&nbsp;
  <b><a href="#-getting-started">Get Started Locally</a></b> &nbsp;·&nbsp;
  <b><a href="#-contributing">Contribute</a></b>


---
<div align="left">

## What is Token Visualizer ?
An interactive, browser-based tool for exploring how large language models tokenize text. Paste any text, pick a model, and instantly see individual tokens, token IDs, character/word/sentence counts, and estimated API costs all computed client-side with zero backend calls. 

Understanding tokens is the key to writing better prompts, controlling costs, and building smarter AI applications. Whether you're a developer optimizing a production pipeline, a student learning about large language models, or just curious what "Hello, world!" looks like to GPT-4o, this tool is for you.



<div align="left">

## ✨ Features

- **Real-time tokenization** — See tokens highlighted inline as you type, powered by [js-tiktoken](https://github.com/dqbd/tiktoken)
- **90+ models from 14 providers** — OpenAI, Anthropic, Google, Meta, xAI, Mistral, DeepSeek, Alibaba (Qwen), Microsoft, THUDM, Moonshot AI, NVIDIA, Cohere, and EleutherAI
- **Token ID inspector** — View the numeric token IDs for every token in your input
- **Chat template preview** — Visualize how system/user/assistant messages are structured before hitting the API
- **Cost estimator** — Calculate input/output costs per model using up-to-date pricing data
- **Model comparison table** — Browse and compare context windows, encodings, and pricing across all supported models
- **Dark / light theme** — Automatic system preference detection with manual toggle
- **Fully client-side** — No data leaves your browser, zero API keys required

## 📊 Supported Providers & Models

| Provider | Models | Examples |
|----------|--------|----------|
| **OpenAI** | 28 | GPT-5.x, GPT-4.x, GPT-4o, o3, o1 |
| **Anthropic** | 8 | Claude 4 Opus/Sonnet/Haiku, Claude 3.x |
| **Google** | 9 | Gemini 3/2.5/2.0/1.5, Gemma 1–3 |
| **Meta** | 8 | Llama 4 Scout/Maverick, Llama 1–3.3 |
| **xAI** | 5 | Grok-1 through Grok-4 |
| **Mistral** | 6 | Mistral Large/Medium/Small, Mixtral |
| **DeepSeek** | 4 | DeepSeek-R1, V3, V3.2, Coder |
| **Alibaba** | 7 | Qwen1–3, Qwen3-Max/235B/32B |
| **Microsoft** | 4 | Phi-1.5 through Phi-4 |
| **Others** | 6 | GLM-4, Kimi-K2, Nemotron, Command R+ |

> **Total: 90+ models** — with new models added regularly.



## 📋 Usage Guide

### Tokenizing a Prompt

1. Type or paste your text into the **"Your Prompt"** textarea on the left.
2. Select your target AI model from the **model dropdown** (grouped by provider).
3. Click **"Tokenize →"** - or results update live as you type (if auto-tokenize is enabled).
4. Your prompt appears as **color-coded token chips** on the right. Each chip is one token.
5. Hover any chip to reveal its **token ID** in a tooltip.
6. Toggle **"Show Token IDs"** to display all IDs inline beneath the chips.

### Estimating Cost

1. After tokenizing, scroll to the **"What Will This Cost?"** panel.
2. The input cost is calculated automatically from your token count.
3. Drag the **output token slider** to set your expected response length.
4. The panel displays a real-time cost estimate for the selected model.

### Using the System Prompt Panel

1. Scroll to the **"Try a System Prompt"** section.
2. The left textarea contains a pre-filled **START → PLAN → OUTPUT** chain-of-thought template — edit it freely.
3. Add your user message in the right textarea.
4. Token counts for both fields update live, showing the **total context consumption**.

### Switching Models

The model selector is global - changing it in the playground automatically updates the Cost Estimator and System Prompt Panel too.


## ✅ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Bun](https://bun.sh/) *(recommended - used in this project)* or [npm](https://www.npmjs.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/mohitpandeycs/Token-Visualizer.git
cd Token-Visualizer
```

**2. Install dependencies**

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```
**3. Start the development server**

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```
The app will be available at : **http://localhost:8080**

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```
---

## 🤝 Contributing

Contributions make open source great — all skill levels are welcome, whether it's fixing a typo, adding a new model, or building out a major feature.

### How to Contribute

**1. Fork the repository**

Click the **Fork** button at the top of this page.

**2. Create a feature branch**

```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/your-bug-description
```

**3. Make your changes**

Keep commits focused and write clear commit messages. If you're adding a new model, please include the encoding name and a link to the provider's tokenization documentation.

**4. Run tests and lint**

```bash
bun run test
bun run lint
```

**5. Open a Pull Request**

Push your branch and open a PR against `master`. Describe what you changed and why.




### 👉 Contributing Guidelines

- Follow PEP 8 code style
- Add tests for new features
- Update documentation
- Use meaningful commit messages


## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Vite + React |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Tokenizer** | `js-tiktoken`(WASM, runs in-browser) |
| **Testing** | Vitest |
| **Package Manager** | Bun |

All tokenization for OpenAI models happens **client-side** via WebAssembly. No text you enter is ever sent to a server.


## 📬 Contact

Built and maintained by **[Mohit Pandey :)](https://github.com/mohitpandeycs)**

-  GitHub — [@mohitpandeycs](https://github.com/mohitpandeycs)
-  LinkedIn — [in/mohitpandeycs](https://linkedin.com/in/mohitpandeycs)
-  Twitter / X — [@mohitpandeycs](https://twitter.com/mohitpandeycs)

Found a bug? [Open an issue](https://github.com/mohitpandeycs/Token-Visualizer/issues). Have a feature idea? [Start a discussion](https://github.com/mohitpandeycs/Token-Visualizer/discussions).



This project is licensed under the **MIT License** 

Copyright © **2026 - Present** Token Visualizer

---

<p align="center">
  If you find this useful, consider giving this repo a ⭐ Star, it helps other developers discover the project.
</p>








