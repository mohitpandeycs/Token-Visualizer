export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  encoding: string;
  contextWindow: number;
  inputCostPer1M: number;
  outputCostPer1M: number;
  tiktokenEncoding?: string; // for js-tiktoken
  tokensPerWord?: number; // heuristic ratio
}

export const MODEL_GROUPS: { provider: string; models: ModelInfo[] }[] = [
  {
    provider: "Popular",
    models: [
      { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 2.50, outputCostPer1M: 10.00, tiktokenEncoding: "o200k_base" },
      { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 3.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", provider: "Google", encoding: "gemini tokenizer (≈cl100k_base)", contextWindow: 1000000, inputCostPer1M: 1.25, outputCostPer1M: 5.00, tiktokenEncoding: "cl100k_base" },
      { id: "grok-3", name: "Grok-3", provider: "xAI", encoding: "grok tokenizer (≈cl100k_base)", contextWindow: 131072, inputCostPer1M: 3.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "deepseek-r1", name: "DeepSeek-R1", provider: "DeepSeek", encoding: "deepseek tokenizer (≈cl100k_base)", contextWindow: 65536, inputCostPer1M: 0.55, outputCostPer1M: 2.19, tiktokenEncoding: "cl100k_base" },
      { id: "llama-4-scout", name: "Llama 4 Scout", provider: "Meta", encoding: "llama tokenizer (≈cl100k_base)", contextWindow: 10000000, inputCostPer1M: 0.15, outputCostPer1M: 0.60, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "OpenAI",
    models: [
      { id: "gpt-5.4", name: "GPT-5.4", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 5.00, outputCostPer1M: 15.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-5.3", name: "GPT-5.3", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 5.00, outputCostPer1M: 15.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-5.2", name: "GPT-5.2", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 5.00, outputCostPer1M: 15.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-5.2-pro", name: "GPT-5.2 Pro", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 10.00, outputCostPer1M: 30.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-5.2-thinking", name: "GPT-5.2 Thinking", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 5.00, outputCostPer1M: 15.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-5.2-instant", name: "GPT-5.2 Instant", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 2.00, outputCostPer1M: 8.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-5.1", name: "GPT-5.1", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 5.00, outputCostPer1M: 15.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-5", name: "GPT-5", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 5.00, outputCostPer1M: 15.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-4.5", name: "GPT-4.5", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 75.00, outputCostPer1M: 150.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-4.1", name: "GPT-4.1", provider: "OpenAI", encoding: "o200k_base", contextWindow: 1047576, inputCostPer1M: 2.00, outputCostPer1M: 8.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", provider: "OpenAI", encoding: "o200k_base", contextWindow: 1047576, inputCostPer1M: 0.40, outputCostPer1M: 1.60, tiktokenEncoding: "o200k_base" },
      { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", provider: "OpenAI", encoding: "o200k_base", contextWindow: 1047576, inputCostPer1M: 0.10, outputCostPer1M: 0.40, tiktokenEncoding: "o200k_base" },
      { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 2.50, outputCostPer1M: 10.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 0.15, outputCostPer1M: 0.60, tiktokenEncoding: "o200k_base" },
      { id: "o4-mini", name: "o4 Mini", provider: "OpenAI", encoding: "o200k_base", contextWindow: 200000, inputCostPer1M: 1.10, outputCostPer1M: 4.40, tiktokenEncoding: "o200k_base" },
      { id: "o3", name: "o3", provider: "OpenAI", encoding: "o200k_base", contextWindow: 200000, inputCostPer1M: 10.00, outputCostPer1M: 40.00, tiktokenEncoding: "o200k_base" },
      { id: "o3-mini", name: "o3 Mini", provider: "OpenAI", encoding: "o200k_base", contextWindow: 200000, inputCostPer1M: 1.10, outputCostPer1M: 4.40, tiktokenEncoding: "o200k_base" },
      { id: "o3-mini-high", name: "o3 Mini High", provider: "OpenAI", encoding: "o200k_base", contextWindow: 200000, inputCostPer1M: 1.10, outputCostPer1M: 4.40, tiktokenEncoding: "o200k_base" },
      { id: "o1", name: "o1", provider: "OpenAI", encoding: "o200k_base", contextWindow: 200000, inputCostPer1M: 15.00, outputCostPer1M: 60.00, tiktokenEncoding: "o200k_base" },
      { id: "o1-mini", name: "o1 Mini", provider: "OpenAI", encoding: "o200k_base", contextWindow: 128000, inputCostPer1M: 3.00, outputCostPer1M: 12.00, tiktokenEncoding: "o200k_base" },
      { id: "o1-pro", name: "o1 Pro", provider: "OpenAI", encoding: "o200k_base", contextWindow: 200000, inputCostPer1M: 150.00, outputCostPer1M: 600.00, tiktokenEncoding: "o200k_base" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "OpenAI", encoding: "cl100k_base", contextWindow: 128000, inputCostPer1M: 10.00, outputCostPer1M: 30.00, tiktokenEncoding: "cl100k_base" },
      { id: "gpt-4-vision", name: "GPT-4 Vision", provider: "OpenAI", encoding: "cl100k_base", contextWindow: 128000, inputCostPer1M: 10.00, outputCostPer1M: 30.00, tiktokenEncoding: "cl100k_base" },
      { id: "gpt-4", name: "GPT-4", provider: "OpenAI", encoding: "cl100k_base", contextWindow: 8192, inputCostPer1M: 30.00, outputCostPer1M: 60.00, tiktokenEncoding: "cl100k_base" },
      { id: "gpt-4-32k", name: "GPT-4-32k", provider: "OpenAI", encoding: "cl100k_base", contextWindow: 32768, inputCostPer1M: 60.00, outputCostPer1M: 120.00, tiktokenEncoding: "cl100k_base" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI", encoding: "cl100k_base", contextWindow: 16385, inputCostPer1M: 0.50, outputCostPer1M: 1.50, tiktokenEncoding: "cl100k_base" },
      { id: "gpt-3.5", name: "GPT-3.5", provider: "OpenAI", encoding: "cl100k_base", contextWindow: 4096, inputCostPer1M: 0.50, outputCostPer1M: 1.50, tiktokenEncoding: "cl100k_base" },
      { id: "gpt-3", name: "GPT-3", provider: "OpenAI", encoding: "p50k_base", contextWindow: 4096, inputCostPer1M: 20.00, outputCostPer1M: 20.00, tiktokenEncoding: "p50k_base" },
      { id: "gpt-2", name: "GPT-2", provider: "OpenAI", encoding: "gpt2", contextWindow: 1024, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "gpt2" },
      { id: "gpt-1", name: "GPT-1", provider: "OpenAI", encoding: "gpt2", contextWindow: 512, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "gpt2" },
      { id: "text-embedding-ada-002", name: "text-embedding-ada-002", provider: "OpenAI", encoding: "cl100k_base", contextWindow: 8191, inputCostPer1M: 0.10, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Anthropic",
    models: [
      { id: "claude-4-opus", name: "Claude 4 Opus", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 15.00, outputCostPer1M: 75.00, tiktokenEncoding: "cl100k_base" },
      { id: "claude-4-sonnet", name: "Claude 4 Sonnet", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 3.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "claude-4-haiku", name: "Claude 4 Haiku", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 0.80, outputCostPer1M: 4.00, tiktokenEncoding: "cl100k_base" },
      { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 3.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 3.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 15.00, outputCostPer1M: 75.00, tiktokenEncoding: "cl100k_base" },
      { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 3.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic", encoding: "claude tokenizer (≈cl100k_base)", contextWindow: 200000, inputCostPer1M: 0.25, outputCostPer1M: 1.25, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Google",
    models: [
      { id: "gemini-3-pro", name: "Gemini 3 Pro", provider: "Google", encoding: "gemini tokenizer (≈cl100k_base)", contextWindow: 2000000, inputCostPer1M: 1.25, outputCostPer1M: 5.00, tiktokenEncoding: "cl100k_base" },
      { id: "gemini-3-flash", name: "Gemini 3 Flash", provider: "Google", encoding: "gemini tokenizer (≈cl100k_base)", contextWindow: 1000000, inputCostPer1M: 0.10, outputCostPer1M: 0.40, tiktokenEncoding: "cl100k_base" },
      { id: "gemini-3-flash-lite", name: "Gemini 3 Flash Lite", provider: "Google", encoding: "gemini tokenizer (≈cl100k_base)", contextWindow: 1000000, inputCostPer1M: 0.05, outputCostPer1M: 0.20, tiktokenEncoding: "cl100k_base" },
      { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", provider: "Google", encoding: "gemini tokenizer (≈cl100k_base)", contextWindow: 1000000, inputCostPer1M: 1.25, outputCostPer1M: 10.00, tiktokenEncoding: "cl100k_base" },
      { id: "gemini-2-0-flash", name: "Gemini 2.0 Flash", provider: "Google", encoding: "gemini tokenizer (≈cl100k_base)", contextWindow: 1000000, inputCostPer1M: 0.10, outputCostPer1M: 0.40, tiktokenEncoding: "cl100k_base" },
      { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", provider: "Google", encoding: "gemini tokenizer (≈cl100k_base)", contextWindow: 2000000, inputCostPer1M: 1.25, outputCostPer1M: 5.00, tiktokenEncoding: "cl100k_base" },
      { id: "gemma-3", name: "Gemma 3", provider: "Google", encoding: "gemma tokenizer (≈cl100k_base)", contextWindow: 8192, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
      { id: "gemma-2", name: "Gemma 2", provider: "Google", encoding: "gemma tokenizer (≈cl100k_base)", contextWindow: 8192, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
      { id: "gemma-1", name: "Gemma 1", provider: "Google", encoding: "gemma tokenizer (≈cl100k_base)", contextWindow: 8192, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Meta",
    models: [
      { id: "llama-4-scout", name: "Llama 4 Scout", provider: "Meta", encoding: "llama tokenizer (≈cl100k_base)", contextWindow: 10000000, inputCostPer1M: 0.15, outputCostPer1M: 0.60, tiktokenEncoding: "cl100k_base" },
      { id: "llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta", encoding: "llama tokenizer (≈cl100k_base)", contextWindow: 1000000, inputCostPer1M: 0.20, outputCostPer1M: 0.80, tiktokenEncoding: "cl100k_base" },
      { id: "llama-3-3", name: "Llama 3.3", provider: "Meta", encoding: "llama tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 0.10, outputCostPer1M: 0.10, tiktokenEncoding: "cl100k_base" },
      { id: "llama-3-2", name: "Llama 3.2", provider: "Meta", encoding: "llama tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 0.10, outputCostPer1M: 0.10, tiktokenEncoding: "cl100k_base" },
      { id: "llama-3-1", name: "Llama 3.1", provider: "Meta", encoding: "llama tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 0.10, outputCostPer1M: 0.10, tiktokenEncoding: "cl100k_base" },
      { id: "llama-3", name: "Llama 3", provider: "Meta", encoding: "llama tokenizer (≈cl100k_base)", contextWindow: 8192, inputCostPer1M: 0.10, outputCostPer1M: 0.10, tiktokenEncoding: "cl100k_base" },
      { id: "llama-2", name: "Llama 2", provider: "Meta", encoding: "llama tokenizer (≈p50k_base)", contextWindow: 4096, inputCostPer1M: 0.20, outputCostPer1M: 0.20, tiktokenEncoding: "p50k_base" },
      { id: "llama-1", name: "Llama", provider: "Meta", encoding: "llama tokenizer (≈p50k_base)", contextWindow: 2048, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "p50k_base" },
    ],
  },
  {
    provider: "xAI",
    models: [
      { id: "grok-4", name: "Grok-4", provider: "xAI", encoding: "grok tokenizer (≈cl100k_base)", contextWindow: 131072, inputCostPer1M: 5.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "grok-3", name: "Grok-3", provider: "xAI", encoding: "grok tokenizer (≈cl100k_base)", contextWindow: 131072, inputCostPer1M: 3.00, outputCostPer1M: 15.00, tiktokenEncoding: "cl100k_base" },
      { id: "grok-3-mini", name: "Grok-3 Mini", provider: "xAI", encoding: "grok tokenizer (≈cl100k_base)", contextWindow: 131072, inputCostPer1M: 0.30, outputCostPer1M: 0.50, tiktokenEncoding: "cl100k_base" },
      { id: "grok-2", name: "Grok-2", provider: "xAI", encoding: "grok tokenizer (≈cl100k_base)", contextWindow: 131072, inputCostPer1M: 2.00, outputCostPer1M: 10.00, tiktokenEncoding: "cl100k_base" },
      { id: "grok-1", name: "Grok-1", provider: "xAI", encoding: "grok tokenizer (≈cl100k_base)", contextWindow: 8192, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Mistral",
    models: [
      { id: "mistral-large", name: "Mistral Large", provider: "Mistral", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 2.00, outputCostPer1M: 6.00, tiktokenEncoding: "cl100k_base" },
      { id: "mistral-medium", name: "Mistral Medium", provider: "Mistral", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 2.70, outputCostPer1M: 8.10, tiktokenEncoding: "cl100k_base" },
      { id: "mistral-small", name: "Mistral Small", provider: "Mistral", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.10, outputCostPer1M: 0.30, tiktokenEncoding: "cl100k_base" },
      { id: "mistral-7b", name: "Mistral 7B", provider: "Mistral", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.25, outputCostPer1M: 0.25, tiktokenEncoding: "cl100k_base" },
      { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "Mistral", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.70, outputCostPer1M: 0.70, tiktokenEncoding: "cl100k_base" },
      { id: "mixtral-8x22b", name: "Mixtral 8x22B", provider: "Mistral", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 65536, inputCostPer1M: 1.20, outputCostPer1M: 1.20, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "DeepSeek",
    models: [
      { id: "deepseek-r1", name: "DeepSeek-R1", provider: "DeepSeek", encoding: "deepseek tokenizer (≈cl100k_base)", contextWindow: 65536, inputCostPer1M: 0.55, outputCostPer1M: 2.19, tiktokenEncoding: "cl100k_base" },
      { id: "deepseek-v3.2", name: "DeepSeek-V3.2", provider: "DeepSeek", encoding: "deepseek tokenizer (≈cl100k_base)", contextWindow: 65536, inputCostPer1M: 0.27, outputCostPer1M: 1.10, tiktokenEncoding: "cl100k_base" },
      { id: "deepseek-v3", name: "DeepSeek-V3", provider: "DeepSeek", encoding: "deepseek tokenizer (≈cl100k_base)", contextWindow: 65536, inputCostPer1M: 0.27, outputCostPer1M: 1.10, tiktokenEncoding: "cl100k_base" },
      { id: "deepseek-coder", name: "DeepSeek-Coder", provider: "DeepSeek", encoding: "deepseek tokenizer (≈cl100k_base)", contextWindow: 16384, inputCostPer1M: 0.14, outputCostPer1M: 0.28, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Alibaba (Qwen)",
    models: [
      { id: "qwen3-max", name: "Qwen3-Max", provider: "Alibaba", encoding: "qwen tokenizer (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.40, outputCostPer1M: 1.20, tiktokenEncoding: "cl100k_base" },
      { id: "qwen3-235b", name: "Qwen3-235B", provider: "Alibaba", encoding: "qwen tokenizer (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.80, outputCostPer1M: 2.40, tiktokenEncoding: "cl100k_base" },
      { id: "qwen3-32b", name: "Qwen3-32B", provider: "Alibaba", encoding: "qwen tokenizer (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.30, outputCostPer1M: 0.90, tiktokenEncoding: "cl100k_base" },
      { id: "qwen2.5", name: "Qwen2.5", provider: "Alibaba", encoding: "qwen tokenizer (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.30, outputCostPer1M: 0.90, tiktokenEncoding: "cl100k_base" },
      { id: "qwen2", name: "Qwen2", provider: "Alibaba", encoding: "qwen tokenizer (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.20, outputCostPer1M: 0.60, tiktokenEncoding: "cl100k_base" },
      { id: "qwen1.5", name: "Qwen1.5", provider: "Alibaba", encoding: "qwen tokenizer (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0.15, outputCostPer1M: 0.45, tiktokenEncoding: "cl100k_base" },
      { id: "qwen1", name: "Qwen1", provider: "Alibaba", encoding: "qwen tokenizer (≈cl100k_base)", contextWindow: 8192, inputCostPer1M: 0.10, outputCostPer1M: 0.30, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Microsoft",
    models: [
      { id: "phi-4", name: "Phi-4", provider: "Microsoft", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 16384, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
      { id: "phi-3", name: "Phi-3", provider: "Microsoft", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 4096, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
      { id: "phi-2", name: "Phi-2", provider: "Microsoft", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 2048, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
      { id: "phi-1.5", name: "Phi-1.5", provider: "Microsoft", encoding: "sentencepiece (≈cl100k_base)", contextWindow: 2048, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "THUDM (GLM)",
    models: [
      { id: "glm-4", name: "GLM-4", provider: "THUDM", encoding: "glm tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 0.60, outputCostPer1M: 0.60, tiktokenEncoding: "cl100k_base" },
      { id: "chatglm-4", name: "ChatGLM-4", provider: "THUDM", encoding: "glm tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 0.60, outputCostPer1M: 0.60, tiktokenEncoding: "cl100k_base" },
      { id: "glm-130b", name: "GLM-130B", provider: "THUDM", encoding: "glm tokenizer (≈cl100k_base)", contextWindow: 2048, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Moonshot AI",
    models: [
      { id: "kimi-k2", name: "Kimi-K2", provider: "Moonshot AI", encoding: "moonshot tokenizer (≈cl100k_base)", contextWindow: 131072, inputCostPer1M: 0.60, outputCostPer1M: 1.80, tiktokenEncoding: "cl100k_base" },
      { id: "kimi-k1", name: "Kimi-K1", provider: "Moonshot AI", encoding: "moonshot tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 0.40, outputCostPer1M: 1.20, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "NVIDIA",
    models: [
      { id: "nemotron", name: "Nemotron", provider: "NVIDIA", encoding: "nemotron tokenizer (≈cl100k_base)", contextWindow: 32768, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Cohere",
    models: [
      { id: "command-r-plus", name: "Command R+", provider: "Cohere", encoding: "cohere tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 2.50, outputCostPer1M: 10.00, tiktokenEncoding: "cl100k_base" },
      { id: "command-r", name: "Command R", provider: "Cohere", encoding: "cohere tokenizer (≈cl100k_base)", contextWindow: 128000, inputCostPer1M: 0.15, outputCostPer1M: 0.60, tiktokenEncoding: "cl100k_base" },
    ],
  },
  {
    provider: "Open Source",
    models: [
      { id: "gpt-neo", name: "GPT-Neo", provider: "EleutherAI", encoding: "gpt2", contextWindow: 2048, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "gpt2" },
      { id: "gpt-j", name: "GPT-J", provider: "EleutherAI", encoding: "gpt2", contextWindow: 2048, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "gpt2" },
      { id: "gpt-neox", name: "GPT-NeoX", provider: "EleutherAI", encoding: "gpt2", contextWindow: 2048, inputCostPer1M: 0, outputCostPer1M: 0, tiktokenEncoding: "gpt2" },
    ],
  },
];

export const ALL_MODELS = MODEL_GROUPS.flatMap(g => g.models);

export function getModel(id: string): ModelInfo | undefined {
  return ALL_MODELS.find(m => m.id === id);
}
