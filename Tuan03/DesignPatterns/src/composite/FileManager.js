import { File } from './File.js';
import { Folder } from './Folder.js';

/**
 * FileManager - Client trong Composite Pattern
 * 
 * Quản lý và thao tác với hệ thống file/folder thông qua interface chung.
 * Không cần phân biệt File hay Folder khi sử dụng.
 */
export class FileManager {
    constructor() {
        this.root = null;
    }

    /**
     * Thiết lập thư mục gốc
     * @param {Folder} rootFolder 
     */
    setRoot(rootFolder) {
        if (!(rootFolder instanceof Folder)) {
            throw new Error("Root must be a Folder");
        }
        this.root = rootFolder;
        console.log(`🏠 Đã thiết lập thư mục gốc: "${rootFolder.getName()}"`);
    }

    /**
     * Lấy thư mục gốc
     * @returns {Folder}
     */
    getRoot() {
        return this.root;
    }

    /**
     * Hiển thị cấu trúc cây của hệ thống file
     */
    displayTree() {
        if (!this.root) {
            console.log("⚠️ Chưa có thư mục gốc!");
            return;
        }
        console.log("\n" + "=".repeat(50));
        console.log("📂 CẤU TRÚC THƯ MỤC:");
        console.log("=".repeat(50));
        this.root.display(0);
        console.log("=".repeat(50));
    }

    /**
     * Tạo File mới
     * @param {string} name - Tên file
     * @param {number} size - Kích thước
     * @param {string} content - Nội dung
     * @returns {File}
     */
    createFile(name, size = 0, content = '') {
        const file = new File(name, size, content);
        console.log(`📄 Đã tạo file: "${name}"`);
        return file;
    }

    /**
     * Tạo Folder mới
     * @param {string} name - Tên folder
     * @returns {Folder}
     */
    createFolder(name) {
        const folder = new Folder(name);
        console.log(`📁 Đã tạo thư mục: "${name}"`);
        return folder;
    }

    /**
     * Tìm kiếm file/folder theo tên
     * @param {string} name 
     * @returns {FileSystemComponent|null}
     */
    find(name) {
        if (!this.root) return null;
        if (this.root.getName() === name) return this.root;
        return this.root.find(name);
    }

    /**
     * Tính tổng kích thước của hệ thống
     * @returns {number}
     */
    getTotalSize() {
        if (!this.root) return 0;
        return this.root.getSize();
    }

    /**
     * Hiển thị thống kê
     */
    showStatistics() {
        if (!this.root) {
            console.log("⚠️ Chưa có thư mục gốc!");
            return;
        }
        console.log("\n" + "=".repeat(50));
        console.log("📊 THỐNG KÊ HỆ THỐNG:");
        console.log("=".repeat(50));
        console.log(`   Tổng số item: ${this.root.getTotalItemCount()}`);
        console.log(`   Tổng kích thước: ${this.formatSize(this.getTotalSize())}`);
        console.log("=".repeat(50));
    }

    /**
     * Format kích thước
     * @param {number} bytes 
     * @returns {string}
     */
    formatSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
}
