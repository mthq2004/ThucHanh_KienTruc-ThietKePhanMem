/**
 * Singleton Pattern - Library
 * 
 * Đảm bảo chỉ có một đối tượng Library duy nhất trong hệ thống.
 * Quản lý tất cả các sách trong thư viện.
 */

// Private instance
let instance = null;

export class Library {
    /**
     * Constructor private (được mô phỏng bằng cách check instance)
     */
    constructor() {
        if (instance) {
            throw new Error("Library đã được khởi tạo! Sử dụng Library.getInstance() thay vì new Library()");
        }

        this.books = [];
        this.borrowedBooks = [];
        this.users = [];
        this.observers = [];
        this.name = "Thư viện Đại học Công nghiệp TP.HCM";
        this.createdAt = new Date();

        console.log(`   📚 Thư viện "${this.name}" đã được khởi tạo!`);
        instance = this;
    }

    /**
     * Lấy instance duy nhất của Library (Singleton)
     * @returns {Library}
     */
    static getInstance() {
        if (!instance) {
            instance = new Library();
        }
        return instance;
    }

    /**
     * Reset instance (chỉ dùng cho testing)
     */
    static resetInstance() {
        instance = null;
    }

    /**
     * Thêm sách vào thư viện
     * @param {object} book 
     */
    addBook(book) {
        this.books.push(book);
        console.log(`   ➕ Đã thêm sách: "${book.getTitle()}" (${book.getType()})`);

        // Thông báo cho observers về sách mới
        this.notifyObservers({
            type: 'NEW_BOOK',
            book: book,
            message: `Sách mới: "${book.getTitle()}" đã có tại thư viện!`,
            timestamp: new Date()
        });
    }

    /**
     * Xóa sách khỏi thư viện
     * @param {string} bookId 
     * @returns {boolean}
     */
    removeBook(bookId) {
        const index = this.books.findIndex(b => b.getId() === bookId);
        if (index > -1) {
            const book = this.books[index];
            this.books.splice(index, 1);
            console.log(`   ➖ Đã xóa sách: "${book.getTitle()}"`);
            return true;
        }
        return false;
    }

    /**
     * Lấy tất cả sách
     * @returns {Array}
     */
    getAllBooks() {
        return this.books;
    }

    /**
     * Lấy sách có sẵn (chưa được mượn)
     * @returns {Array}
     */
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable());
    }

    /**
     * Tìm sách theo ID
     * @param {string} bookId 
     * @returns {object|null}
     */
    findBookById(bookId) {
        return this.books.find(b => b.getId() === bookId) || null;
    }

    /**
     * Mượn sách
     * @param {string} bookId 
     * @param {object} user 
     * @returns {object|null}
     */
    borrowBook(bookId, user) {
        const book = this.findBookById(bookId);
        if (!book) {
            console.log(`   ❌ Không tìm thấy sách với ID: ${bookId}`);
            return null;
        }

        if (!book.isAvailable()) {
            console.log(`   ❌ Sách "${book.getTitle()}" đã được mượn!`);
            return null;
        }

        book.setAvailable(false);
        const borrowRecord = {
            bookId,
            book,
            user,
            borrowDate: new Date(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 ngày
            returnDate: null
        };

        this.borrowedBooks.push(borrowRecord);
        console.log(`   📖 ${user.name} đã mượn sách: "${book.getTitle()}"`);

        return borrowRecord;
    }

    /**
     * Trả sách
     * @param {string} bookId 
     * @param {object} user 
     * @returns {boolean}
     */
    returnBook(bookId, user) {
        const recordIndex = this.borrowedBooks.findIndex(
            r => r.bookId === bookId && r.user.id === user.id && !r.returnDate
        );

        if (recordIndex === -1) {
            console.log(`   ❌ Không tìm thấy bản ghi mượn sách!`);
            return false;
        }

        const record = this.borrowedBooks[recordIndex];
        record.returnDate = new Date();
        record.book.setAvailable(true);

        // Kiểm tra quá hạn
        if (record.returnDate > record.dueDate) {
            const overdueDays = Math.ceil((record.returnDate - record.dueDate) / (24 * 60 * 60 * 1000));
            console.log(`   ⚠️ Sách "${record.book.getTitle()}" trả quá hạn ${overdueDays} ngày!`);

            this.notifyObservers({
                type: 'OVERDUE_BOOK',
                book: record.book,
                user: user,
                overdueDays,
                message: `Sách "${record.book.getTitle()}" đã được trả quá hạn ${overdueDays} ngày!`,
                timestamp: new Date()
            });
        }

        console.log(`   📗 ${user.name} đã trả sách: "${record.book.getTitle()}"`);
        return true;
    }

    /**
     * Lấy sách đã mượn
     * @returns {Array}
     */
    getBorrowedBooks() {
        return this.borrowedBooks.filter(r => !r.returnDate);
    }

    /**
     * Đăng ký observer (Observer Pattern)
     * @param {object} observer 
     */
    subscribe(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`   ✅ ${observer.getName()} đã đăng ký theo dõi thư viện`);
        }
    }

    /**
     * Hủy đăng ký observer
     * @param {object} observer 
     */
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log(`   ❌ ${observer.getName()} đã hủy đăng ký theo dõi`);
        }
    }

    /**
     * Thông báo cho tất cả observers
     * @param {object} data 
     */
    notifyObservers(data) {
        if (this.observers.length > 0) {
            console.log(`   📢 Gửi thông báo đến ${this.observers.length} người theo dõi...`);
            for (const observer of this.observers) {
                observer.update(data);
            }
        }
    }

    /**
     * Lấy thống kê thư viện
     * @returns {object}
     */
    getStatistics() {
        return {
            name: this.name,
            totalBooks: this.books.length,
            availableBooks: this.getAvailableBooks().length,
            borrowedBooks: this.getBorrowedBooks().length,
            registeredUsers: this.users.length,
            observers: this.observers.length
        };
    }

    /**
     * Hiển thị thống kê
     */
    displayStatistics() {
        const stats = this.getStatistics();
        console.log("\n   📊 THỐNG KÊ THƯ VIỆN:");
        console.log("   " + "─".repeat(35));
        console.log(`   📚 Tổng số sách: ${stats.totalBooks}`);
        console.log(`   ✅ Sách có sẵn: ${stats.availableBooks}`);
        console.log(`   📖 Sách đang mượn: ${stats.borrowedBooks}`);
        console.log(`   👤 Người theo dõi: ${stats.observers}`);
        console.log("   " + "─".repeat(35));
    }
}
