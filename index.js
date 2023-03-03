import chalk from "chalk";
import fs from "fs";

function handleError(error) {
  throw new Error(chalk.red(error.code, "Erro ao ler arquivo!"));
}

async function readFile(path) {
  try {
    const content = await fs.promises.readFile(path, "utf-8");
    console.log(chalk.green(content));
  } catch (error) {
    handleError(error);
  } finally {
    console.log(chalk.yellow("Operação concluída!"));
  }
}

readFile("./files/text.md");
