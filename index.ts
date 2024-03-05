import { checkIsGitRepo, getDiff } from "./git";
import { askCommit } from "./model";
import "./parser";
import { config } from "./parser";

await checkIsGitRepo();

const aicommit = async () => {
  // await $`git add -u`.quiet();

  const diff = await getDiff(config["diff-per-file"]);
  if (!diff) process.exit(0);

  console.log(await askCommit(diff, config.language));
};

aicommit();
