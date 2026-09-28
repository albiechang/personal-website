const fs = require("node:fs");
const path = require("node:path");

const output = path.resolve(process.cwd(), "_site");
const expected = path.join(path.resolve(process.cwd()), "_site");

if (output !== expected || path.basename(output) !== "_site") {
  throw new Error(`Refusing to clean unexpected output path: ${output}`);
}

fs.rmSync(output, { recursive: true, force: true });
