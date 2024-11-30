import fs from "node:fs/promises";
import path from "node:path";
const folderName = "randomText";

const currentFolderPath = import.meta.dirname;
try {
  const allFiles = await fs.readdir(currentFolderPath);
  //   const createFolder = fs.mkdir(folderName); //Create a folder

  let folderPath, filePath, fileName;
  allFiles.map((data) => {
    if (data === "text.txt") {
      fileName = data;
      const currentPath = path.join(currentFolderPath, data);
      filePath = currentPath;
    }

    if (data === folderName) {
      const currentPath = path.join(currentFolderPath, data);
      folderPath = currentPath;
    }
  });

  const changePath = await fs.rename(filePath, `${folderPath}/${fileName}`);
} catch (error) {
  console.error(error.message);
}

// Its not working at all, find out why ! Chatgpt version was working
