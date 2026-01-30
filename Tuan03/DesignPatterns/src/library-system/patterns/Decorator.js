/**
 * Decorator Pattern - Extended Book Features
 * 
 * Cho phép mở rộng chức năng mượn sách với các tính năng bổ sung
 * như gia hạn thời gian mượn, phiên bản đặc biệt (sách chữ nổi, bản dịch, v.v.)
 */

/**
 * BorrowableBook - Component Interface
 * 
 * Interface cơ bản cho việc mượn sách.
 */
export class BorrowableBook {
    constructor(book) {
        this.book = book;
        this.borrowDate = null;
        this.dueDate = null;
        this.user = null;
    }

    getBook() { return this.book; }
    getBorrowDate() { return this.borrowDate; }
    getDueDate() { return this.dueDate; }
    getUser() { return this.user; }

    /**
     * Mượn sách
     * @param {object} user 
     * @param {number} days - Số ngày mượn
     */
    borrow(user, days = 14) {
        this.user = user;
        this.borrowDate = new Date();
        this.dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        this.book.setAvailable(false);

        console.log(`   📖 Mượn sách: "${this.book.getTitle()}"`);
        console.log(`      👤 Người mượn: ${user.name}`);
        console.log(`      📅 Hạn trả: ${this.formatDate(this.dueDate)}`);
    }

    /**
     * Trả sách
     */
    returnBook() {
        this.book.setAvailable(true);
        console.log(`   📗 Trả sách: "${this.book.getTitle()}"`);
        return true;
    }

    /**
     * Lấy thông tin chi tiết mượn sách
     * @returns {object}
     */
    getDetails() {
        return {
            book: this.book.getTitle(),
            user: this.user?.name,
            borrowDate: this.borrowDate,
            dueDate: this.dueDate,
            features: ['Cơ bản']
        };
    }

    /**
     * Lấy phí (nếu có)
     * @returns {number}
     */
    getFee() {
        return 0;
    }

    /**
     * Format date
     * @param {Date} date 
     * @returns {string}
     */
    formatDate(date) {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
}

/**
 * BookDecorator - Base Decorator
 * 
 * Lớp cơ sở cho tất cả các decorator.
 */
export class BookDecorator extends BorrowableBook {
    constructor(borrowableBook) {
        super(borrowableBook.getBook());
        this.wrappedBook = borrowableBook;
    }

    borrow(user, days = 14) {
        this.wrappedBook.borrow(user, days);
        this.borrowDate = this.wrappedBook.getBorrowDate();
        this.dueDate = this.wrappedBook.getDueDate();
        this.user = this.wrappedBook.getUser();
    }

    returnBook() {
        return this.wrappedBook.returnBook();
    }

    getDetails() {
        return this.wrappedBook.getDetails();
    }

    getFee() {
        return this.wrappedBook.getFee();
    }
}

/**
 * ExtendedLoanDecorator - Gia hạn thời gian mượn
 */
export class ExtendedLoanDecorator extends BookDecorator {
    constructor(borrowableBook, extraDays = 7) {
        super(borrowableBook);
        this.extraDays = extraDays;
        this.extensionFee = 5000; // 5.000 VND
    }

    borrow(user, days = 14) {
        const totalDays = days + this.extraDays;
        super.borrow(user, totalDays);
        console.log(`      ⏰ Gia hạn thêm ${this.extraDays} ngày (Phí: ${this.formatCurrency(this.extensionFee)})`);
    }

    getDetails() {
        const details = super.getDetails();
        details.features = [...details.features, `Gia hạn +${this.extraDays} ngày`];
        details.extensionFee = this.extensionFee;
        return details;
    }

    getFee() {
        return super.getFee() + this.extensionFee;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
}

/**
 * BrailleBookDecorator - Sách chữ nổi
 */
export class BrailleBookDecorator extends BookDecorator {
    constructor(borrowableBook) {
        super(borrowableBook);
        this.brailleFee = 10000; // 10.000 VND phí chuyển đổi
    }

    borrow(user, days = 14) {
        super.borrow(user, days);
        console.log(`      ♿ Phiên bản chữ nổi Braille (Phí: ${this.formatCurrency(this.brailleFee)})`);
    }

    getDetails() {
        const details = super.getDetails();
        details.features = [...details.features, 'Phiên bản chữ nổi Braille'];
        details.brailleFee = this.brailleFee;
        return details;
    }

    getFee() {
        return super.getFee() + this.brailleFee;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
}

/**
 * TranslatedBookDecorator - Bản dịch
 */
export class TranslatedBookDecorator extends BookDecorator {
    constructor(borrowableBook, targetLanguage = 'Tiếng Việt') {
        super(borrowableBook);
        this.targetLanguage = targetLanguage;
        this.translationFee = 15000; // 15.000 VND
    }

    borrow(user, days = 14) {
        super.borrow(user, days);
        console.log(`      🌐 Bản dịch ${this.targetLanguage} (Phí: ${this.formatCurrency(this.translationFee)})`);
    }

    getDetails() {
        const details = super.getDetails();
        details.features = [...details.features, `Bản dịch ${this.targetLanguage}`];
        details.translationFee = this.translationFee;
        return details;
    }

    getFee() {
        return super.getFee() + this.translationFee;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
}

/**
 * PriorityDeliveryDecorator - Giao hàng ưu tiên
 */
export class PriorityDeliveryDecorator extends BookDecorator {
    constructor(borrowableBook, address) {
        super(borrowableBook);
        this.address = address;
        this.deliveryFee = 20000; // 20.000 VND
    }

    borrow(user, days = 14) {
        super.borrow(user, days);
        console.log(`      🚚 Giao hàng đến: ${this.address}`);
        console.log(`         Phí giao hàng: ${this.formatCurrency(this.deliveryFee)}`);
    }

    getDetails() {
        const details = super.getDetails();
        details.features = [...details.features, 'Giao hàng ưu tiên'];
        details.deliveryAddress = this.address;
        details.deliveryFee = this.deliveryFee;
        return details;
    }

    getFee() {
        return super.getFee() + this.deliveryFee;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
}

/**
 * DigitalCopyDecorator - Bản sao số
 */
export class DigitalCopyDecorator extends BookDecorator {
    constructor(borrowableBook, format = 'PDF') {
        super(borrowableBook);
        this.format = format;
        this.digitalFee = 25000; // 25.000 VND
    }

    borrow(user, days = 14) {
        super.borrow(user, days);
        console.log(`      💾 Kèm bản sao số (${this.format}) - Phí: ${this.formatCurrency(this.digitalFee)}`);
    }

    getDetails() {
        const details = super.getDetails();
        details.features = [...details.features, `Bản sao số (${this.format})`];
        details.digitalFormat = this.format;
        details.digitalFee = this.digitalFee;
        return details;
    }

    getFee() {
        return super.getFee() + this.digitalFee;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
}
