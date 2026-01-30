/**
 * FileSystemComponent - Component Interface (Abstract Class)
 * 
 * Đây là lớp trừu tượng định nghĩa interface chung cho cả File và Folder.
 * Cả hai lớp con đều cần implement phương thức display().
 * 
 * @abstract
 */
export class FileSystemComponent {
    constructor(name) {
        if (this.constructor === FileSystemComponent) {
            throw new Error("Cannot instantiate abstract class FileSystemComponent");
        }
        this.name = name;
    }

    /**
     * Hiển thị thông tin của component
     * @param {number} indent - Số khoảng trắng để thụt lề
     * @abstract
     */
    display(indent = 0) {
        throw new Error("Method 'display()' must be implemented.");
    }

    /**
     * Lấy kích thước của component
     * @abstract
     * @returns {number} Kích thước tính bằng bytes
     */
    getSize() {
        throw new Error("Method 'getSize()' must be implemented.");
    }

    /**
     * Lấy tên của component
     * @returns {string}
     */
    getName() {
        return this.name;
    }
}
