/**
 * Subject - Abstract Subject trong Observer Pattern
 * 
 * Đây là lớp cơ sở cho các đối tượng bị theo dõi.
 * Quản lý danh sách observers và thông báo khi có thay đổi.
 */
export class Subject {
    constructor() {
        if (this.constructor === Subject) {
            throw new Error("Cannot instantiate abstract class Subject");
        }
        this.observers = [];
    }

    /**
     * Đăng ký một observer
     * @param {Observer} observer 
     */
    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`   ✅ ${observer.getName()} đã đăng ký theo dõi`);
        }
    }

    /**
     * Hủy đăng ký một observer
     * @param {Observer} observer 
     */
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log(`   ❌ ${observer.getName()} đã hủy đăng ký`);
        }
    }

    /**
     * Thông báo cho tất cả observers
     * @param {object} data - Dữ liệu thay đổi
     */
    notify(data) {
        console.log(`   📢 Gửi thông báo đến ${this.observers.length} người theo dõi...`);
        for (const observer of this.observers) {
            observer.update(data);
        }
    }

    /**
     * Lấy số lượng observers
     * @returns {number}
     */
    getObserverCount() {
        return this.observers.length;
    }
}
