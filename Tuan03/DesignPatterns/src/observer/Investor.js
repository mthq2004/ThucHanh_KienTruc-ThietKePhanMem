import { Observer } from './Observer.js';

/**
 * Investor - Concrete Observer cho Observer Pattern
 * 
 * Đại diện cho một nhà đầu tư theo dõi giá cổ phiếu.
 * Nhận thông báo khi giá cổ phiếu thay đổi.
 */
export class Investor extends Observer {
    /**
     * Tạo một Investor mới
     * @param {string} name - Tên nhà đầu tư
     * @param {string} email - Email
     */
    constructor(name, email) {
        super(name);
        this.email = email;
        this.notifications = [];
        this.portfolio = [];
    }

    /**
     * Nhận thông báo về thay đổi giá cổ phiếu
     * @param {object} data - Dữ liệu thay đổi
     */
    update(data) {
        if (data.type === 'STOCK_PRICE_CHANGE') {
            const notification = {
                message: this.createMessage(data),
                timestamp: data.timestamp,
                read: false
            };
            this.notifications.push(notification);

            const direction = data.change >= 0 ? '🟢' : '🔴';
            console.log(`      ${direction} [${this.name}] Nhận thông báo: ${data.symbol} ${data.change >= 0 ? 'tăng' : 'giảm'} ${Math.abs(data.changePercent)}%`);
        }
    }

    /**
     * Tạo nội dung thông báo
     * @param {object} data 
     * @returns {string}
     */
    createMessage(data) {
        const direction = data.change >= 0 ? 'tăng' : 'giảm';
        return `Cổ phiếu ${data.symbol} (${data.companyName}) đã ${direction} ${Math.abs(data.changePercent)}%. ` +
            `Giá hiện tại: ${this.formatCurrency(data.newPrice)}`;
    }

    /**
     * Format tiền tệ
     * @param {number} amount 
     * @returns {string}
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount * 1000);
    }

    /**
     * Lấy tất cả thông báo
     * @returns {Array}
     */
    getNotifications() {
        return this.notifications;
    }

    /**
     * Lấy thông báo chưa đọc
     * @returns {Array}
     */
    getUnreadNotifications() {
        return this.notifications.filter(n => !n.read);
    }

    /**
     * Đánh dấu tất cả thông báo đã đọc
     */
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
    }

    /**
     * Thêm cổ phiếu vào portfolio
     * @param {string} symbol 
     * @param {number} quantity 
     * @param {number} buyPrice 
     */
    addToPortfolio(symbol, quantity, buyPrice) {
        this.portfolio.push({ symbol, quantity, buyPrice, timestamp: new Date() });
    }

    /**
     * Lấy thông tin chi tiết
     * @returns {object}
     */
    getDetails() {
        return {
            name: this.name,
            email: this.email,
            notificationCount: this.notifications.length,
            unreadCount: this.getUnreadNotifications().length,
            portfolioSize: this.portfolio.length
        };
    }
}
