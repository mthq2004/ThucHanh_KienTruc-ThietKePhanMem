/**
 * Observer - Abstract Observer trong Observer Pattern
 * 
 * Đây là lớp cơ sở cho các đối tượng theo dõi.
 * Các lớp con cần implement phương thức update().
 */
export class Observer {
    constructor(name) {
        if (this.constructor === Observer) {
            throw new Error("Cannot instantiate abstract class Observer");
        }
        this.name = name;
    }

    /**
     * Nhận thông báo từ Subject
     * @param {object} data - Dữ liệu thay đổi
     * @abstract
     */
    update(data) {
        throw new Error("Method 'update()' must be implemented.");
    }

    /**
     * Lấy tên của observer
     * @returns {string}
     */
    getName() {
        return this.name;
    }
}
