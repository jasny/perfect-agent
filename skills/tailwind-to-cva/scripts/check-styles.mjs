#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const DEFAULTS = {
  root: "src",
  maxClassLength: 120,
  duplicateMin: 40,
};

const allowedExt = new Set([".ts", ".tsx"]);

function parseArgs(argv) {
  const args = { ...DEFAULTS };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "--root") {
      args.root = argv[++i];
      continue;
    }

    if (token === "--max-class-length") {
      args.maxClassLength = Number(argv[++i]);
      continue;
    }

    if (token === "--duplicate-min") {
      args.duplicateMin = Number(argv[++i]);
      continue;
    }

    if (token === "--help" || token === "-h") {
      printHelp();
      process.exit(0);
    }

    console.error(`Unknown argument: ${token}`);
    printHelp();
    process.exit(2);
  }

  if (!Number.isFinite(args.maxClassLength) || args.maxClassLength < 1) {
    console.error("--max-class-length must be a positive number");
    process.exit(2);
  }

  if (!Number.isFinite(args.duplicateMin) || args.duplicateMin < 1) {
    console.error("--duplicate-min must be a positive number");
    process.exit(2);
  }

  return args;
}

function printHelp() {
  console.log(`check-styles.mjs\n\nUsage:\n  node check-styles.mjs [--root <dir>] [--max-class-length <n>] [--duplicate-min <n>]\n\nDefaults:\n  --root src\n  --max-class-length 120\n  --duplicate-min 40`);
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      walk(p, out);
      continue;
    }
    if (allowedExt.has(path.extname(p))) out.push(p);
  }
  return out;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const root = path.resolve(process.cwd(), options.root);

  if (!fs.existsSync(root)) {
    console.error(`Root path does not exist: ${root}`);
    process.exit(2);
  }

  const files = walk(root);
  const errors = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const regex = /className\s*=\s*"([^"]+)"/g;
    const seen = new Map();

    let match;
    while ((match = regex.exec(content)) !== null) {
      const classes = match[1].trim();
      if (!classes) continue;

      if (classes.length > options.maxClassLength) {
        errors.push(
          `${path.relative(process.cwd(), file)}: className length ${classes.length} > ${options.maxClassLength}`
        );
      }

      if (classes.length >= options.duplicateMin) {
        seen.set(classes, (seen.get(classes) || 0) + 1);
      }
    }

    for (const [literal, count] of seen) {
      if (count > 1) {
        const preview = literal.slice(0, 110);
        const suffix = literal.length > 110 ? "..." : "";
        errors.push(
          `${path.relative(process.cwd(), file)}: repeated long class literal (${count}x): "${preview}${suffix}"`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error("Style check failed:\n");
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }

  console.log("Style check passed.");
}

main();
