import { getModel } from "./models";

export interface TokenResult {
  tokens: { text: string; id: number }[];
  totalTokens: number;
  encoding: string;
  isEstimated: boolean;
}

// Cache for tiktoken encodings
const encodingCache: Record<string, any> = {};

async function getTiktokenEncoding(encodingName: string) {
  if (encodingCache[encodingName]) return encodingCache[encodingName];

  try {
    const { getEncoding } = await import("js-tiktoken");
    const enc = getEncoding(encodingName as any);
    encodingCache[encodingName] = enc;
    return enc;
  } catch (e) {
    console.error("Failed to load tiktoken encoding:", e);
    return null;
  }
}

function estimateTokens(text: string, tokensPerWord: number = 1.33): TokenResult {
  if (!text.trim()) return { tokens: [], totalTokens: 0, encoding: "estimated", isEstimated: true };

  // Split by whitespace and punctuation, keeping them as separate tokens
  const parts = text.match(/\S+|\s+/g) || [];
  const tokens: { text: string; id: number }[] = [];
  let id = 0;

  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      tokens.push({ text: part, id: id++ });
    } else {
      // Split words into subword-like chunks based on tokensPerWord ratio
      const avgCharsPerToken = Math.round(part.length / (part.split(/\b/).filter(Boolean).length * tokensPerWord));
      const chunkSize = Math.max(2, avgCharsPerToken || 3);

      if (part.length <= chunkSize + 1) {
        tokens.push({ text: part, id: id++ });
      } else {
        for (let i = 0; i < part.length; i += chunkSize) {
          tokens.push({ text: part.slice(i, i + chunkSize), id: id++ });
        }
      }
    }
  }

  return { tokens, totalTokens: tokens.length, encoding: "estimated", isEstimated: true };
}

export async function tokenize(text: string, modelId: string): Promise<TokenResult> {
  if (!text.trim()) return { tokens: [], totalTokens: 0, encoding: "none", isEstimated: false };

  const model = getModel(modelId);
  if (!model) return estimateTokens(text);

  // Try tiktoken for models with tiktokenEncoding
  if (model.tiktokenEncoding) {
    try {
      const enc = await getTiktokenEncoding(model.tiktokenEncoding);
      if (enc) {
        const encoded = enc.encode(text);
        const tokens: { text: string; id: number }[] = [];
        const decoder = new TextDecoder("utf-8", { fatal: false });

        for (const tokenId of encoded) {
          const bytes = enc.decode([tokenId]);
          const tokenText = typeof bytes === "string" ? bytes : decoder.decode(new Uint8Array(bytes));
          tokens.push({ text: tokenText, id: tokenId });
        }

        // Mark as approximate if it's not a native OpenAI encoding
        const nativeEncodings = ["o200k_base", "cl100k_base", "p50k_base", "p50k_edit", "r50k_base", "gpt2"];
        const isNative = model.provider === "OpenAI" || model.provider === "EleutherAI";

        return {
          tokens,
          totalTokens: encoded.length,
          encoding: model.encoding,
          isEstimated: !isNative,
        };
      }
    } catch (e) {
      console.warn("Tiktoken failed, falling back to estimate:", e);
    }
  }

  // Heuristic for non-OpenAI models
  const result = estimateTokens(text, model.tokensPerWord);
  result.encoding = model.encoding;
  return result;
}
