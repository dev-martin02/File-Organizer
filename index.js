import fs from "node:fs/promises";
import path from "node:path";

const fileTypes = [
  {
    category: "Documents",
    extensions: [
      ".pdf",
      ".doc",
      ".docx",
      ".xls",
      ".xlsx",
      ".txt",
      ".ppt",
      ".pptx",
    ],
  },
  {
    category: "Images",
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".tiff"],
  },
  {
    category: "Videos",
    extensions: [".mp4", ".mov", ".avi", ".mkv", ".flv", ".wmv"],
  },
  {
    category: "Audio",
    extensions: [".mp3", ".wav", ".aac", ".flac", ".ogg", ".m4a"],
  },
  {
    category: "Archives",
    extensions: [".zip", ".rar", ".7z", ".tar", ".gz"],
  },
  {
    category: "Applications",
    extensions: [".exe", ".dmg", ".pkg", ".msi"],
  },
  {
    category: "Code",
    extensions: [
      ".js",
      ".py",
      ".html",
      ".css",
      ".ts",
      ".java",
      ".c",
      ".cpp",
      ".json",
    ],
  },
  {
    category: "Miscellaneous",
    extensions: [], // Catch-all for unknown or unsupported file types
  },
];

const currentFolderPath = import.meta.dirname; // Get the current file path in ES module

try {
  const allFiles = await fs.readdir(currentFolderPath);

  let folderName, folderPath, filePath, fileName;

  for (const files of allFiles) {
    for (const type of fileTypes) {
      const fileType = type.extensions.find(
        (typeOfFile) => typeOfFile === path.extname(files).toLowerCase()
      );
      if (fileType) {
        console.log(fileType);
        console.log(type);
        await fs.mkdir(type.category, { recursive: true });
        folderName = type.category;
        console.log(folderName);
        folderPath = await path.join(currentFolderPath, folderName);

        fileName = files;
        filePath = path.join(currentFolderPath, fileName);
        const changePath = await fs.rename(
          filePath,
          `${folderPath}/${fileName}`
        );
      }
    }
  }
} catch (error) {
  console.error(error);
}
