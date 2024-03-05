import { $ } from "bun";

export const checkIsGitRepo = async () => {
  if (
    (await $`git rev-parse --is-inside-work-tree`.quiet().text()).trim() !==
    "true"
  ) {
    console.error(
      "fatal: not a git repository (or any of the parent directories): .git",
    );
    process.exit(1);
  }
};

export const getDiff = async (diff_per_file: boolean = false) => {
  if (diff_per_file) {
    const diff_files = (await $`git diff --cached --name-only`.quiet().text())
      .trim()
      .split("\n");
    const diff = await Promise.all(
      diff_files.map(async (file) => {
        const diff = await $`git diff --cached -- ${file}`.quiet().text();
        return diff;
      }),
    );

    return diff.join("\n");
  } else {
    return await $`git diff --cached`.quiet().text();
  }
};
