import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./parser";

export const askCommit = async (diff: string, language = "en") => {
  const genAI = new GoogleGenerativeAI(config.apikey!);

  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.2,
    },
  });

  const prompts = `
You are a commit message generator that strictly follows the Conventional Commits specification validated via regex /^(feat|fix|docs|style|refactor|test|chore|revert|perf|build|ci)([\\w-]+): .+$/.
Exclude anything unnecessary such as translation. Your entire response will be passed directly into git commit.
Given the following git diff, suggest a concise and descriptive commit message in ${language}:
---- ${diff}
    `.trim();

  const response = await model.generateContent(prompts);

  return response.response.text();
};
