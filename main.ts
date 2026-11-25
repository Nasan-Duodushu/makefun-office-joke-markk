// One-Line Office Jokes — a single line that makes office life funny,
// under 200 characters (gate: 1 to 199). It turns on a real detail of
// office life and lands the laugh in the last few words.
// Writes /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 199;

const JOKE = `Our printer only jams when the document is urgent, the boss is watching, and I have already told everyone it is fixed.`;

async function main(): Promise<void> {
  const line = JOKE.replace(/\s+/g, " ").trim();
  const length = [...line].length;
  if (length < 1 || length > LIMIT) {
    throw new Error(`entry must be 1-${LIMIT} chars, got ${length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // An office joke needs an office: the printer is the tell.
  if (!/printer/i.test(line)) {
    throw new Error("entry must be about office life");
  }
  // The laugh lands in the last few words: the ending must be the payoff.
  if (!/it is fixed\.$/.test(line)) {
    throw new Error("entry must land its punch in the last few words");
  }
  const target = join(OUTPUT_DIR, "entry.txt");
  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(target, line + "\n", "utf8");
  console.log(`${length} chars -> ${target}`);
  console.log(line);
}

await main();
