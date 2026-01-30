import { Subject } from './Subject.js';

/**
 * Stock - Concrete Subject cho Observer Pattern
 * 
 * Đại diện cho một cổ phiếu trên sàn chứng khoán.
 * Khi giá thay đổi, tất cả nhà đầu tư đã đăng ký sẽ được thông báo.
 */
export class Stock extends Subject {
    /**
     * Tạo một Stock mới
     * @param {string} symbol - Mã cổ phiếu (ví dụ: AAPL, GOOGL)
     * @param {string} name - Tên công ty
     * @param {number} price - Giá ban đầu
     */
    constructor(symbol, name, price) {
        super();
        this.symbol = symbol;
        this.companyName = name;
        this.price = price;
        this.priceHistory = [{ price, timestamp: new Date() }];
    }

    /**
     * Lấy mã cổ phiếu
     * @returns {string}
     */
    getSymbol() {
        return this.symbol;
    }

    /**
     * Lấy giá hiện tại
     * @returns {number}
     */
    getPrice() {
        return this.price;
    }

    /**
     * Cập nhật giá cổ phiếu và thông báo cho investors
     * @param {number} newPrice 
     */
    setPrice(newPrice) {
        const oldPrice = this.price;
        this.price = newPrice;
        this.priceHistory.push({ price: newPrice, timestamp: new Date() });

        const change = newPrice - oldPrice;
        const changePercent = ((change / oldPrice) * 100).toFixed(2);
        const direction = change >= 0 ? '📈' : '📉';

        console.log(`\n   ${direction} ${this.symbol} (${this.companyName})`);
        console.log(`      Giá cũ: ${this.formatCurrency(oldPrice)}`);
        console.log(`      Giá mới: ${this.formatCurrency(newPrice)}`);
        console.log(`      Thay đổi: ${change >= 0 ? '+' : ''}${this.formatCurrency(change)} (${changePercent}%)`);

        // Thông báo cho tất cả investors
        this.notify({
            type: 'STOCK_PRICE_CHANGE',
            symbol: this.symbol,
            companyName: this.companyName,
            oldPrice,
            newPrice,
            change,
            changePercent: parseFloat(changePercent),
            timestamp: new Date()
        });
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
        }).format(amount * 1000); // Giả sử đơn vị là nghìn VND
    }

    /**
     * Lấy lịch sử giá
     * @returns {Array}
     */
    getPriceHistory() {
        return this.priceHistory;
    }

    /**
     * Lấy thông tin chi tiết
     * @returns {object}
     */
    getDetails() {
        return {
            symbol: this.symbol,
            companyName: this.companyName,
            currentPrice: this.price,
            observerCount: this.getObserverCount()
        };
    }
}
