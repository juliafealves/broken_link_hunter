import fs from "fs";
import brokenLinkHunter from "./index.js";
import chalk from "chalk";

const path = process.argv[2];

function printLinksFile(links, fileName = "") {
  console.log(
    chalk.yellow("Lista de Links: "),
    chalk.black.bgGreen(fileName),
    links
  );
}

async function processFile(pathFile) {
  const links = await brokenLinkHunter(pathFile);
  printLinksFile(links, pathFile);
}

async function processPath(path) {
  try {
    const isFile = fs.lstatSync(path).isFile();
    if (isFile) {
      processFile(path);
    } else {
      const files = await fs.promises.readdir(path);
      files.forEach((file) => {
        const pathFile = `${path}/${file}`;
        if (fs.lstatSync(pathFile).isFile()) {
          processFile(pathFile);
        } else {
          processPath(pathFile);
        }
      });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(chalk.red("O arquivo ou diretório não existe!"));
    }
  }
}

(async () => await processPath(path))();
