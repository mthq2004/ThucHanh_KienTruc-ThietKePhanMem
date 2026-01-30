/**
 * Factory Method Pattern - Book Factory
 * 
 * Tạo ra các loại sách khác nhau (sách giấy, sách điện tử, sách nói)
 * mà không cần biết chi tiết về cách tạo từng loại.
 */

// Base Book class
export class Book {
    constructor(id, title, author, category, year) {
        if (this.constructor === Book) {
            throw new Error("Cannot instantiate abstract class Book");
        }
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.year = year;
        this.available = true;
        this.createdAt = new Date();
    }

    getId() { return this.id; }
    getTitle() { return this.title; }
    getAuthor() { return this.author; }
    getCategory() { return this.category; }
    getYear() { return this.year; }
    isAvailable() { return this.available; }
    setAvailable(status) { this.available = status; }

    getType() {
        throw new Error("Method 'getType()' must be implemented.");
    }

    getDetails() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            category: this.category,
            year: this.year,
            type: this.getType(),
            available: this.available
        };
    }

    display() {
        const status = this.available ? '✅' : '❌';
        console.log(`      ${status} [${this.getType()}] "${this.title}" - ${this.author} (${this.year})`);
    }
}

/**
 * PrintedBook - Sách giấy
 */
export class PrintedBook extends Book {
    constructor(id, title, author, category, year, pages, publisher) {
        super(id, title, author, category, year);
        this.pages = pages;
        this.publisher = publisher;
        this.condition = 'new'; // new, good, fair, poor
    }

    getType() {
        return '📖 Sách giấy';
    }

    getPages() { return this.pages; }
    getPublisher() { return this.publisher; }
    getCondition() { return this.condition; }
    setCondition(condition) { this.condition = condition; }

    getDetails() {
        return {
            ...super.getDetails(),
            pages: this.pages,
            publisher: this.publisher,
            condition: this.condition
        };
    }
}

/**
 * EBook - Sách điện tử
 */
export class EBook extends Book {
    constructor(id, title, author, category, year, fileSize, format) {
        super(id, title, author, category, year);
        this.fileSize = fileSize; // MB
        this.format = format; // PDF, EPUB, MOBI
        this.downloadCount = 0;
    }

    getType() {
        return '💻 Sách điện tử';
    }

    getFileSize() { return this.fileSize; }
    getFormat() { return this.format; }
    getDownloadCount() { return this.downloadCount; }

    download() {
        this.downloadCount++;
        console.log(`   ⬇️ Đã tải "${this.title}" (${this.format}, ${this.fileSize}MB)`);
        return true;
    }

    getDetails() {
        return {
            ...super.getDetails(),
            fileSize: `${this.fileSize}MB`,
            format: this.format,
            downloadCount: this.downloadCount
        };
    }
}

/**
 * AudioBook - Sách nói
 */
export class AudioBook extends Book {
    constructor(id, title, author, category, year, duration, narrator) {
        super(id, title, author, category, year);
        this.duration = duration; // minutes
        this.narrator = narrator;
        this.playCount = 0;
    }

    getType() {
        return '🎧 Sách nói';
    }

    getDuration() { return this.duration; }
    getNarrator() { return this.narrator; }
    getPlayCount() { return this.playCount; }

    play() {
        this.playCount++;
        const hours = Math.floor(this.duration / 60);
        const minutes = this.duration % 60;
        console.log(`   ▶️ Đang phát "${this.title}" - Người đọc: ${this.narrator} (${hours}h ${minutes}m)`);
        return true;
    }

    getDetails() {
        return {
            ...super.getDetails(),
            duration: `${Math.floor(this.duration / 60)}h ${this.duration % 60}m`,
            narrator: this.narrator,
            playCount: this.playCount
        };
    }
}

/**
 * BookFactory - Factory Method Pattern
 * 
 * Factory để tạo các loại sách khác nhau.
 */
export class BookFactory {
    static BookType = {
        PRINTED: 'PRINTED',
        EBOOK: 'EBOOK',
        AUDIOBOOK: 'AUDIOBOOK'
    };

    static idCounter = 0;

    /**
     * Tạo sách mới dựa trên loại
     * @param {string} type - Loại sách
     * @param {object} data - Thông tin sách
     * @returns {Book}
     */
    static createBook(type, data) {
        BookFactory.idCounter++;
        const id = `BOOK-${String(BookFactory.idCounter).padStart(4, '0')}`;

        switch (type) {
            case BookFactory.BookType.PRINTED:
                return new PrintedBook(
                    id,
                    data.title,
                    data.author,
                    data.category,
                    data.year,
                    data.pages || 0,
                    data.publisher || 'Unknown'
                );

            case BookFactory.BookType.EBOOK:
                return new EBook(
                    id,
                    data.title,
                    data.author,
                    data.category,
                    data.year,
                    data.fileSize || 0,
                    data.format || 'PDF'
                );

            case BookFactory.BookType.AUDIOBOOK:
                return new AudioBook(
                    id,
                    data.title,
                    data.author,
                    data.category,
                    data.year,
                    data.duration || 0,
                    data.narrator || 'Unknown'
                );

            default:
                throw new Error(`Unknown book type: ${type}`);
        }
    }

    /**
     * Tạo sách giấy
     * @param {object} data 
     * @returns {PrintedBook}
     */
    static createPrintedBook(data) {
        return BookFactory.createBook(BookFactory.BookType.PRINTED, data);
    }

    /**
     * Tạo sách điện tử
     * @param {object} data 
     * @returns {EBook}
     */
    static createEBook(data) {
        return BookFactory.createBook(BookFactory.BookType.EBOOK, data);
    }

    /**
     * Tạo sách nói
     * @param {object} data 
     * @returns {AudioBook}
     */
    static createAudioBook(data) {
        return BookFactory.createBook(BookFactory.BookType.AUDIOBOOK, data);
    }
}
