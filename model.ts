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
Choose a type from the type-to-description JSON below that best describes the git diff:
${JSON.stringify({
  docs: "Documentation only changes",
  style:
    "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
  refactor: "A code change that neither fixes a bug nor adds a feature",
  perf: "A code change that improves performance",
  test: "Adding missing tests or correcting existing tests",
  build: "Changes that affect the build system or external dependencies",
  ci: "Changes to our CI configuration files and scripts",
  chore: "Other changes that don't modify src or test files",
  revert: "Reverts a previous commit",
  feat: "A new feature",
  fix: "A bug fix",
})}
Given the following git diff, suggest a concise and descriptive commit message in ${language}:
Exclude anything unnecessary such as translation. Your entire response will be passed directly into git commit.
---- ${diff}
    `.trim();

  const response = await model.generateContent(prompts);

  return response.response.text();
};
