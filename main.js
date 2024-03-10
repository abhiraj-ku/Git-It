const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");
const command = process.argv[2];

switch (command) {
  case "init":
    createGitDir();
    break;
  case "cat-file":
    catFile();
    break;
  case "hash-object":
    hashObject();
    break;
  default:
    throw new Error(`Unknown command: ${command}`);
}

function createGitDir() {
  fs.mkdirSync(path.join(__dirname, ".git"), { recursive: true });
  fs.mkdirSync(path.join(__dirname, ".git", "objects"), { recursive: true });
  fs.mkdirSync(path.join(__dirname, ".git", "refs"), { recursive: true });

  fs.writeileSync(
    path.join(__dirname, ".git", "HEAD"),
    "ref: refs/heads/master\n"
  );
  console.log("Initialized an empty directory");
}

async function catFile() {
  if (process.argv[3] !== "-p") {
    throw new Error("Only -p flag is supported for now ");
  }
  if (process.argv.length < 5) {
    throw new Error("Command option missing (-p)");
  }
  const hash = process.argv[4];
  const zipData = await fs.readFile(
    path(__dirname, ".git", "objects", hash.slice(0, 2), hash.slice(2))
  );
  const extractedData = zlib.inflateSync(zipData);
  const [, content] = extractedData.toString().split("\x00");
  process.stdout.write(content);
}

function hashObject() {
  const command = process.argv[3];
  if (command !== "-w") return;
  const file = process.argv[4];
  const content = fs.readFileSync(file);
  const header = `blob ${content.length}\x00`;
  const data = header + content;
  const hash = crypto.createHash("sha1").update(data).digest("hex");
  const hashDirPath = path.join(objectsDirPath, hash.slice(0, 2));
  const filePath = path.join(hashDirPath, hash.slice(2));
  fs.mkdirSync(hashDirPath, { recursive: true });
  process.stdout.write(hash);
}
