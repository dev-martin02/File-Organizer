import fs from "node:fs/promises";
import path from "node:path";

// Define file categories and their associated extensions
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

// Define the folder to organize
const currentFolderPath = "C:/Users/marti_c96mbmi/Downloads";

// Function to get the category of a file based on its extension
const getFileCategory = (fileName) => {
  const fileExtension = path.extname(fileName).toLowerCase();
  for (const type of fileTypes) {
    if (type.extensions.includes(fileExtension)) {
      return type.category;
    }
  }
  return "Miscellaneous"; // Default category for unsupported file types
};

try {
  // Read all files in the current folder
  const allFiles = await fs.readdir(currentFolderPath);
  console.log("Files found:", allFiles);

  for (const fileName of allFiles) {
    const category = getFileCategory(fileName); // Determine the file's category
    const folderPath = path.join(currentFolderPath, category); // Path to the category folder
    const filePath = path.join(currentFolderPath, fileName); // Path to the current file

    // Ensure the category folder exists
    await fs.mkdir(folderPath, { recursive: true });

    // Move the file to the category folder
    const newFilePath = path.join(folderPath, fileName);
    await fs.rename(filePath, newFilePath);

    console.log(`Moved "${fileName}" to "${folderPath}"`);
  }
} catch (error) {
  console.error("Error organizing files:", error);
}
