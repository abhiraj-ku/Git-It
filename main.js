const fs = require("fs");
const path = require("path");

const command = process.argv[2];

switch (command) {
  case "init":
    createGitDir();
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
