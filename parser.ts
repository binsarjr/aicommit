import { consola } from "consola";
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    "diff-per-file": {
      type: "boolean",
      default: false,
    },
    language: {
      type: "string",
      default: "en",
      required: true,
    },
    apikey: {
      type: "string",
      required: true,
    },
    emoji: {
      type: "boolean",
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
});

if (!values.apikey) {
  consola.error("fatal: apikey is required");
  process.exit(1);
}

export const config = values;
