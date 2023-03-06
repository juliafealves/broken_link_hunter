import chalk from "chalk";
import fs from "fs";

function handleError(error) {
  throw new Error(chalk.red(error.code, "Erro ao ler arquivo!"));
}

async function readFile(path) {
  try {
    return await fs.promises.readFile(path, "utf-8");
  } catch (error) {
    handleError(error);
  } finally {
    console.log(chalk.yellow("Operação concluída!"));
  }
}

function searchLinksMarkdown(text) {
  const regex = /\[([^[\]]*?)]\((https?:\/\/[^\s?#.].\S*)\)/gm;
  const links = [...text.matchAll(regex)];
  return links.map((link) => ({ [link[1]]: link[2] }));
}

(async () => {
  const text = await readFile("./files/text.md");
  const links = searchLinksMarkdown(text);
  console.log(chalk.blue(links));
})();
