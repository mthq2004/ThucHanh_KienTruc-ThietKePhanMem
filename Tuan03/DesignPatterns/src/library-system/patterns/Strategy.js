/**
 * Strategy Pattern - Search Strategies
 * 
 * Cho phép thay đổi chiến lược tìm kiếm sách dựa trên lựa chọn của người dùng.
 * Có thể tìm theo tên, tác giả, hoặc thể loại.
 */

/**
 * SearchStrategy - Interface cho các chiến lược tìm kiếm
 */
export class SearchStrategy {
    constructor() {
        if (this.constructor === SearchStrategy) {
            throw new Error("Cannot instantiate abstract class SearchStrategy");
        }
    }

    /**
     * Tìm kiếm sách
     * @param {Array} books - Danh sách sách
     * @param {string} query - Từ khóa tìm kiếm
     * @returns {Array}
     */
    search(books, query) {
        throw new Error("Method 'search()' must be implemented.");
    }

    /**
     * Lấy tên chiến lược
     * @returns {string}
     */
    getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }
}

/**
 * SearchByTitle - Tìm kiếm theo tên sách
 */
export class SearchByTitle extends SearchStrategy {
    constructor() {
        super();
    }

    search(books, query) {
        const normalizedQuery = query.toLowerCase().trim();
        return books.filter(book =>
            book.getTitle().toLowerCase().includes(normalizedQuery)
        );
    }

    getName() {
        return "Tìm theo tên sách";
    }
}

/**
 * SearchByAuthor - Tìm kiếm theo tác giả
 */
export class SearchByAuthor extends SearchStrategy {
    constructor() {
        super();
    }

    search(books, query) {
        const normalizedQuery = query.toLowerCase().trim();
        return books.filter(book =>
            book.getAuthor().toLowerCase().includes(normalizedQuery)
        );
    }

    getName() {
        return "Tìm theo tác giả";
    }
}

/**
 * SearchByCategory - Tìm kiếm theo thể loại
 */
export class SearchByCategory extends SearchStrategy {
    constructor() {
        super();
    }

    search(books, query) {
        const normalizedQuery = query.toLowerCase().trim();
        return books.filter(book =>
            book.getCategory().toLowerCase().includes(normalizedQuery)
        );
    }

    getName() {
        return "Tìm theo thể loại";
    }
}

/**
 * SearchByYear - Tìm kiếm theo năm xuất bản
 */
export class SearchByYear extends SearchStrategy {
    constructor() {
        super();
    }

    search(books, query) {
        const year = parseInt(query);
        if (isNaN(year)) return [];
        return books.filter(book => book.getYear() === year);
    }

    getName() {
        return "Tìm theo năm";
    }
}

/**
 * SearchByType - Tìm kiếm theo loại sách
 */
export class SearchByType extends SearchStrategy {
    constructor() {
        super();
    }

    search(books, query) {
        const normalizedQuery = query.toLowerCase().trim();
        return books.filter(book =>
            book.getType().toLowerCase().includes(normalizedQuery)
        );
    }

    getName() {
        return "Tìm theo loại sách";
    }
}

/**
 * SearchContext - Context cho Strategy Pattern
 * 
 * Quản lý chiến lược tìm kiếm hiện tại và thực hiện tìm kiếm.
 */
export class SearchContext {
    constructor(strategy = null) {
        this.strategy = strategy || new SearchByTitle();
        this.searchHistory = [];
    }

    /**
     * Thiết lập chiến lược tìm kiếm
     * @param {SearchStrategy} strategy 
     */
    setStrategy(strategy) {
        if (!(strategy instanceof SearchStrategy)) {
            throw new Error("Strategy must be an instance of SearchStrategy");
        }
        this.strategy = strategy;
        console.log(`   🔄 Đã chuyển sang chiến lược: "${strategy.getName()}"`);
    }

    /**
     * Lấy chiến lược hiện tại
     * @returns {SearchStrategy}
     */
    getStrategy() {
        return this.strategy;
    }

    /**
     * Thực hiện tìm kiếm
     * @param {Array} books - Danh sách sách
     * @param {string} query - Từ khóa
     * @returns {Array}
     */
    executeSearch(books, query) {
        console.log(`\n   🔍 ${this.strategy.getName()}: "${query}"`);

        const startTime = Date.now();
        const results = this.strategy.search(books, query);
        const endTime = Date.now();

        // Lưu lịch sử tìm kiếm
        this.searchHistory.push({
            strategy: this.strategy.getName(),
            query,
            resultCount: results.length,
            timestamp: new Date(),
            duration: endTime - startTime
        });

        console.log(`   📋 Tìm thấy ${results.length} kết quả (${endTime - startTime}ms)`);
        return results;
    }

    /**
     * Hiển thị kết quả tìm kiếm
     * @param {Array} results 
     */
    displayResults(results) {
        if (results.length === 0) {
            console.log("   ⚠️ Không tìm thấy sách nào!");
            return;
        }

        console.log("\n   📚 KẾT QUẢ TÌM KIẾM:");
        console.log("   " + "─".repeat(50));
        for (const book of results) {
            book.display();
        }
        console.log("   " + "─".repeat(50));
    }

    /**
     * Lấy lịch sử tìm kiếm
     * @returns {Array}
     */
    getSearchHistory() {
        return this.searchHistory;
    }

    /**
     * Xóa lịch sử tìm kiếm
     */
    clearHistory() {
        this.searchHistory = [];
    }
}

/**
 * SearchStrategyFactory - Factory cho các chiến lược tìm kiếm
 */
export class SearchStrategyFactory {
    static StrategyType = {
        TITLE: 'title',
        AUTHOR: 'author',
        CATEGORY: 'category',
        YEAR: 'year',
        TYPE: 'type'
    };

    /**
     * Tạo chiến lược tìm kiếm
     * @param {string} type 
     * @returns {SearchStrategy}
     */
    static create(type) {
        switch (type.toLowerCase()) {
            case SearchStrategyFactory.StrategyType.TITLE:
                return new SearchByTitle();
            case SearchStrategyFactory.StrategyType.AUTHOR:
                return new SearchByAuthor();
            case SearchStrategyFactory.StrategyType.CATEGORY:
                return new SearchByCategory();
            case SearchStrategyFactory.StrategyType.YEAR:
                return new SearchByYear();
            case SearchStrategyFactory.StrategyType.TYPE:
                return new SearchByType();
            default:
                throw new Error(`Unknown search strategy: ${type}`);
        }
    }

    /**
     * Lấy danh sách các loại chiến lược
     * @returns {Array}
     */
    static getAvailableStrategies() {
        return Object.values(SearchStrategyFactory.StrategyType);
    }
}
