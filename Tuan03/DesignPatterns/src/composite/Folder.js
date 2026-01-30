import { FileSystemComponent } from './FileSystemComponent.js';

/**
 * Folder - Composite trong Composite Pattern
 * 
 * Đại diện cho một thư mục trong hệ thống.
 * Folder có thể chứa nhiều File hoặc các Folder con.
 */
export class Folder extends FileSystemComponent {
    /**
     * Tạo một Folder mới
     * @param {string} name - Tên thư mục
     */
    constructor(name) {
        super(name);
        this.children = [];
        this.createdAt = new Date();
        this.modifiedAt = new Date();
    }

    /**
     * Thêm một component (File hoặc Folder) vào thư mục
     * @param {FileSystemComponent} component 
     */
    add(component) {
        if (!(component instanceof FileSystemComponent)) {
            throw new Error("Can only add FileSystemComponent instances");
        }
        this.children.push(component);
        this.modifiedAt = new Date();
        console.log(`✅ Đã thêm "${component.getName()}" vào thư mục "${this.name}"`);
    }

    /**
     * Xóa một component khỏi thư mục
     * @param {FileSystemComponent} component 
     */
    remove(component) {
        const index = this.children.indexOf(component);
        if (index > -1) {
            this.children.splice(index, 1);
            this.modifiedAt = new Date();
            console.log(`🗑️ Đã xóa "${component.getName()}" khỏi thư mục "${this.name}"`);
        }
    }

    /**
     * Lấy component con theo index
     * @param {number} index 
     * @returns {FileSystemComponent}
     */
    getChild(index) {
        return this.children[index];
    }

    /**
     * Lấy tất cả component con
     * @returns {FileSystemComponent[]}
     */
    getChildren() {
        return this.children;
    }

    /**
     * Hiển thị cấu trúc cây của thư mục
     * @param {number} indent - Số khoảng trắng để thụt lề
     */
    display(indent = 0) {
        const prefix = ' '.repeat(indent);
        console.log(`${prefix}📁 ${this.name}/ (${this.formatSize(this.getSize())})`);

        for (const child of this.children) {
            child.display(indent + 4);
        }
    }

    /**
     * Tính tổng kích thước của thư mục (bao gồm tất cả nội dung bên trong)
     * @returns {number} Tổng kích thước tính bằng bytes
     */
    getSize() {
        let totalSize = 0;
        for (const child of this.children) {
            totalSize += child.getSize();
        }
        return totalSize;
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
     * Đếm số lượng item trong thư mục (không đệ quy)
     * @returns {number}
     */
    getItemCount() {
        return this.children.length;
    }

    /**
     * Đếm tổng số lượng item trong thư mục (đệ quy)
     * @returns {number}
     */
    getTotalItemCount() {
        let count = 0;
        for (const child of this.children) {
            count++;
            if (child instanceof Folder) {
                count += child.getTotalItemCount();
            }
        }
        return count;
    }

    /**
     * Tìm kiếm component theo tên
     * @param {string} name 
     * @returns {FileSystemComponent|null}
     */
    find(name) {
        for (const child of this.children) {
            if (child.getName() === name) {
                return child;
            }
            if (child instanceof Folder) {
                const found = child.find(name);
                if (found) return found;
            }
        }
        return null;
    }

    /**
     * Lấy thông tin chi tiết của folder
     * @returns {object}
     */
    getDetails() {
        return {
            name: this.name,
            itemCount: this.getItemCount(),
            totalItemCount: this.getTotalItemCount(),
            totalSize: this.getSize(),
            createdAt: this.createdAt,
            modifiedAt: this.modifiedAt,
            type: 'folder'
        };
    }
}
