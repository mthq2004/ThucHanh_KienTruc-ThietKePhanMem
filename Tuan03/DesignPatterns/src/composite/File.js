import { FileSystemComponent } from './FileSystemComponent.js';

/**
 * File - Leaf trong Composite Pattern
 * 
 * Đại diện cho một tập tin trong hệ thống.
 * File chỉ chứa dữ liệu, không thể chứa các component khác.
 */
export class File extends FileSystemComponent {
    /**
     * Tạo một File mới
     * @param {string} name - Tên tập tin
     * @param {number} size - Kích thước tập tin (bytes)
     * @param {string} content - Nội dung tập tin
     */
    constructor(name, size = 0, content = '') {
        super(name);
        this.size = size;
        this.content = content;
        this.createdAt = new Date();
        this.modifiedAt = new Date();
    }

    /**
     * Hiển thị thông tin của File
     * @param {number} indent - Số khoảng trắng để thụt lề
     */
    display(indent = 0) {
        const prefix = ' '.repeat(indent);
        console.log(`${prefix}📄 ${this.name} (${this.formatSize(this.size)})`);
    }

    /**
     * Lấy kích thước của File
     * @returns {number} Kích thước tính bằng bytes
     */
    getSize() {
        return this.size;
    }

    /**
     * Format kích thước để hiển thị
     * @param {number} bytes 
     * @returns {string}
     */
    formatSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    /**
     * Lấy nội dung file
     * @returns {string}
     */
    getContent() {
        return this.content;
    }

    /**
     * Cập nhật nội dung file
     * @param {string} newContent 
     */
    setContent(newContent) {
        this.content = newContent;
        this.size = newContent.length;
        this.modifiedAt = new Date();
    }

    /**
     * Lấy thông tin chi tiết của file
     * @returns {object}
     */
    getDetails() {
        return {
            name: this.name,
            size: this.size,
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt,
            type: 'file'
        };
    }
}
