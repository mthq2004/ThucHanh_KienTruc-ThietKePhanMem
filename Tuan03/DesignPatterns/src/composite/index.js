/**
 * COMPOSITE DESIGN PATTERN - Demo
 * 
 * Họ và tên: Mai Thành Hải Quân
 * MSSV: 22653671
 * 
 * Mô tả bài toán:
 * Xây dựng hệ thống quản lý thư mục và tập tin theo mô hình cây (tree structure)
 * - Thư mục (Folder) có thể chứa nhiều tập tin (File) hoặc thư mục con
 * - Tập tin (File) chỉ chứa dữ liệu, không thể chứa thư mục hay tập tin khác
 * - Cả thư mục và tập tin đều có thể hiển thị thông tin thông qua cơ chế xử lý thống nhất
 */

import { FileManager } from './FileManager.js';

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║         COMPOSITE DESIGN PATTERN - FILE SYSTEM DEMO            ║");
console.log("║                                                                 ║");
console.log("║  Họ và tên: Mai Thành Hải Quân                                  ║");
console.log("║  MSSV: 22653671                                                 ║");
console.log("╚════════════════════════════════════════════════════════════════╝");

// Khởi tạo FileManager
const fileManager = new FileManager();

console.log("\n🔧 KHỞI TẠO CẤU TRÚC THƯ MỤC...\n");

// Tạo thư mục gốc
const rootFolder = fileManager.createFolder("MyProject");

// Tạo các thư mục con
const srcFolder = fileManager.createFolder("src");
const componentsFolder = fileManager.createFolder("components");
const utilsFolder = fileManager.createFolder("utils");
const assetsFolder = fileManager.createFolder("assets");
const imagesFolder = fileManager.createFolder("images");

// Tạo các file
const indexFile = fileManager.createFile("index.js", 2048, "// Main entry point");
const appFile = fileManager.createFile("App.js", 4096, "// App component");
const headerFile = fileManager.createFile("Header.js", 1024, "// Header component");
const footerFile = fileManager.createFile("Footer.js", 856, "// Footer component");
const helperFile = fileManager.createFile("helpers.js", 512, "// Helper functions");
const constantsFile = fileManager.createFile("constants.js", 256, "// Constants");
const logo = fileManager.createFile("logo.png", 102400, "[binary image data]");
const background = fileManager.createFile("background.jpg", 204800, "[binary image data]");
const readmeFile = fileManager.createFile("README.md", 1536, "# Project Documentation");
const packageFile = fileManager.createFile("package.json", 768, "{}");

console.log("\n📂 XÂY DỰNG CẤU TRÚC CÂY...\n");

// Xây dựng cấu trúc cây
// components chứa Header và Footer
componentsFolder.add(headerFile);
componentsFolder.add(footerFile);

// utils chứa helpers và constants
utilsFolder.add(helperFile);
utilsFolder.add(constantsFile);

// images chứa logo và background
imagesFolder.add(logo);
imagesFolder.add(background);

// assets chứa images
assetsFolder.add(imagesFolder);

// src chứa index, App, components, utils
srcFolder.add(indexFile);
srcFolder.add(appFile);
srcFolder.add(componentsFolder);
srcFolder.add(utilsFolder);

// root chứa src, assets, README, package.json
rootFolder.add(srcFolder);
rootFolder.add(assetsFolder);
rootFolder.add(readmeFile);
rootFolder.add(packageFile);

// Thiết lập root
fileManager.setRoot(rootFolder);

// Hiển thị cấu trúc cây
fileManager.displayTree();

// Hiển thị thống kê
fileManager.showStatistics();

console.log("\n🔍 TÌM KIẾM FILE/FOLDER...\n");

// Tìm kiếm
const foundItem = fileManager.find("Header.js");
if (foundItem) {
    console.log(`   ✅ Tìm thấy: ${foundItem.getName()} (${foundItem.getSize()} bytes)`);
}

const foundFolder = fileManager.find("components");
if (foundFolder) {
    console.log(`   ✅ Tìm thấy: ${foundFolder.getName()}/ (${foundFolder.getItemCount()} items)`);
}

console.log("\n═══════════════════════════════════════════════════════");
console.log("           COMPOSITE PATTERN DEMO HOÀN TẤT!");
console.log("═══════════════════════════════════════════════════════\n");

export { FileManager };
