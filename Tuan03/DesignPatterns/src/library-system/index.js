/**
 * LIBRARY MANAGEMENT SYSTEM - Demo
 * 
 * Họ và tên: Mai Thành Hải Quân
 * MSSV: 22653671
 * 
 * Hệ thống quản lý thư viện sử dụng 5 Design Patterns:
 * 1. Singleton Pattern - Library instance duy nhất
 * 2. Factory Method Pattern - Tạo các loại sách khác nhau
 * 3. Strategy Pattern - Chiến lược tìm kiếm sách
 * 4. Observer Pattern - Thông báo sách mới/quá hạn
 * 5. Decorator Pattern - Tính năng mượn sách mở rộng
 */

import { Library } from './patterns/Singleton.js';
import { BookFactory } from './patterns/Factory.js';
import {
    SearchContext,
    SearchByTitle,
    SearchByAuthor,
    SearchByCategory,
    SearchStrategyFactory
} from './patterns/Strategy.js';
import { LibraryStaff, LibraryMember } from './patterns/Observer.js';
import {
    BorrowableBook,
    ExtendedLoanDecorator,
    BrailleBookDecorator,
    TranslatedBookDecorator,
    PriorityDeliveryDecorator,
    DigitalCopyDecorator
} from './patterns/Decorator.js';

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║              LIBRARY MANAGEMENT SYSTEM DEMO                     ║");
console.log("║              (5 Design Patterns Combined)                       ║");
console.log("║                                                                 ║");
console.log("║  Họ và tên: Mai Thành Hải Quân                                  ║");
console.log("║  MSSV: 22653671                                                 ║");
console.log("╚════════════════════════════════════════════════════════════════╝");

// ==========================================
// PHẦN 1: SINGLETON PATTERN - Library
// ==========================================
console.log("\n");
console.log("═══════════════════════════════════════════════════════");
console.log("  1️⃣  SINGLETON PATTERN - THƯ VIỆN DUY NHẤT");
console.log("═══════════════════════════════════════════════════════");

Library.resetInstance(); // Reset cho demo
console.log("\n🏛️ Khởi tạo thư viện:");
const library = Library.getInstance();

// Thử tạo thêm instance (sẽ trả về cùng một instance)
const library2 = Library.getInstance();
console.log(`\n   ✅ library === library2: ${library === library2} (Singleton hoạt động!)`);

// ==========================================
// PHẦN 2: FACTORY METHOD PATTERN - Tạo sách
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("  2️⃣  FACTORY METHOD PATTERN - TẠO SÁCH");
console.log("═══════════════════════════════════════════════════════");

console.log("\n📚 Tạo sách bằng Factory:");

// Tạo sách giấy
const book1 = BookFactory.createPrintedBook({
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Lập trình',
    year: 2008,
    pages: 464,
    publisher: 'Prentice Hall'
});

const book2 = BookFactory.createPrintedBook({
    title: 'Design Patterns',
    author: 'Gang of Four',
    category: 'Lập trình',
    year: 1994,
    pages: 395,
    publisher: 'Addison-Wesley'
});

const book3 = BookFactory.createPrintedBook({
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    category: 'Kỹ năng sống',
    year: 1936,
    pages: 291,
    publisher: 'NXB Trẻ'
});

// Tạo sách điện tử
const ebook1 = BookFactory.createEBook({
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Lập trình',
    year: 2008,
    fileSize: 2.5,
    format: 'PDF'
});

const ebook2 = BookFactory.createEBook({
    title: 'Node.js Design Patterns',
    author: 'Mario Casciaro',
    category: 'Lập trình',
    year: 2020,
    fileSize: 8.2,
    format: 'EPUB'
});

// Tạo sách nói
const audiobook1 = BookFactory.createAudioBook({
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Phát triển bản thân',
    year: 2018,
    duration: 330,
    narrator: 'James Clear'
});

const audiobook2 = BookFactory.createAudioBook({
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'Lịch sử',
    year: 2014,
    duration: 900,
    narrator: 'Derek Perkins'
});

// Thêm sách vào thư viện
console.log("\n📥 Thêm sách vào thư viện:");
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(ebook1);
library.addBook(ebook2);
library.addBook(audiobook1);
library.addBook(audiobook2);

// Hiển thị danh sách sách
console.log("\n   📚 DANH SÁCH SÁCH TRONG THƯ VIỆN:");
console.log("   " + "─".repeat(50));
for (const book of library.getAllBooks()) {
    book.display();
}
console.log("   " + "─".repeat(50));

// ==========================================
// PHẦN 3: OBSERVER PATTERN - Đăng ký theo dõi
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("  3️⃣  OBSERVER PATTERN - ĐĂNG KÝ THEO DÕI");
console.log("═══════════════════════════════════════════════════════");

console.log("\n👥 Tạo nhân viên và thành viên thư viện:");

// Tạo nhân viên thư viện
const librarian = new LibraryStaff("Nguyễn Văn A", "nguyenvana@library.com", LibraryStaff.Role.LIBRARIAN);
const manager = new LibraryStaff("Trần Thị B", "tranthib@library.com", LibraryStaff.Role.MANAGER);

// Tạo thành viên thư viện
const student = new LibraryMember("Lê Văn C", "levanc@student.edu", LibraryMember.MemberType.STUDENT);
const teacher = new LibraryMember("Phạm Thị D", "phamthid@teacher.edu", LibraryMember.MemberType.TEACHER);

console.log(`   - ${librarian.getName()} (${librarian.getRole()})`);
console.log(`   - ${manager.getName()} (${manager.getRole()})`);
console.log(`   - ${student.getName()} (${student.memberType})`);
console.log(`   - ${teacher.getName()} (${teacher.memberType})`);

// Đăng ký theo dõi
console.log("\n📝 Đăng ký theo dõi thư viện:");
library.subscribe(librarian);
library.subscribe(manager);
library.subscribe(student);
library.subscribe(teacher);

// Thêm sách mới (sẽ trigger thông báo)
console.log("\n📚 Thêm sách mới (trigger thông báo cho tất cả):");
const newBook = BookFactory.createPrintedBook({
    title: 'The Pragmatic Programmer',
    author: 'David Thomas',
    category: 'Lập trình',
    year: 2019,
    pages: 352,
    publisher: 'Addison-Wesley'
});
library.addBook(newBook);

// ==========================================
// PHẦN 4: STRATEGY PATTERN - Tìm kiếm sách
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("  4️⃣  STRATEGY PATTERN - TÌM KIẾM SÁCH");
console.log("═══════════════════════════════════════════════════════");

const searchContext = new SearchContext();
const allBooks = library.getAllBooks();

// Tìm theo tên sách
console.log("\n🔍 Tìm kiếm với các chiến lược khác nhau:");
searchContext.setStrategy(new SearchByTitle());
let results = searchContext.executeSearch(allBooks, "Design");
searchContext.displayResults(results);

// Tìm theo tác giả
searchContext.setStrategy(new SearchByAuthor());
results = searchContext.executeSearch(allBooks, "Martin");
searchContext.displayResults(results);

// Tìm theo thể loại
searchContext.setStrategy(new SearchByCategory());
results = searchContext.executeSearch(allBooks, "Lập trình");
searchContext.displayResults(results);

// Sử dụng Factory để tạo strategy
console.log("\n🔧 Sử dụng Strategy Factory:");
const yearStrategy = SearchStrategyFactory.create('category');
searchContext.setStrategy(yearStrategy);
results = searchContext.executeSearch(allBooks, "Lịch sử");
searchContext.displayResults(results);

// ==========================================
// PHẦN 5: DECORATOR PATTERN - Mượn sách
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("  5️⃣  DECORATOR PATTERN - MƯỢN SÁCH MỞ RỘNG");
console.log("═══════════════════════════════════════════════════════");

console.log("\n📖 TRƯỜNG HỢP 1: Mượn sách thường");
console.log("   " + "─".repeat(40));
let borrowable1 = new BorrowableBook(book1);
borrowable1.borrow({ id: 1, name: "Sinh viên A" });
console.log(`   💵 Tổng phí: ${formatCurrency(borrowable1.getFee())}`);

console.log("\n📖 TRƯỜNG HỢP 2: Mượn sách + Gia hạn 7 ngày");
console.log("   " + "─".repeat(40));
let borrowable2 = new BorrowableBook(book2);
borrowable2 = new ExtendedLoanDecorator(borrowable2, 7);
borrowable2.borrow({ id: 2, name: "Sinh viên B" });
console.log(`   💵 Tổng phí: ${formatCurrency(borrowable2.getFee())}`);

console.log("\n📖 TRƯỜNG HỢP 3: Mượn sách + Bản dịch tiếng Việt + Giao hàng");
console.log("   " + "─".repeat(40));
let borrowable3 = new BorrowableBook(ebook1);
borrowable3 = new TranslatedBookDecorator(borrowable3, "Tiếng Việt");
borrowable3 = new PriorityDeliveryDecorator(borrowable3, "123 Nguyễn Văn Linh, Q.7, TP.HCM");
borrowable3.borrow({ id: 3, name: "Giảng viên C" });
console.log(`   💵 Tổng phí: ${formatCurrency(borrowable3.getFee())}`);

console.log("\n📖 TRƯỜNG HỢP 4: Mượn sách + Nhiều tính năng");
console.log("   " + "─".repeat(40));
let borrowable4 = new BorrowableBook(book3);
borrowable4 = new ExtendedLoanDecorator(borrowable4, 14);
borrowable4 = new BrailleBookDecorator(borrowable4);
borrowable4 = new DigitalCopyDecorator(borrowable4, "PDF");
borrowable4.borrow({ id: 4, name: "Độc giả D" });
console.log(`   💵 Tổng phí: ${formatCurrency(borrowable4.getFee())}`);

// Hiển thị chi tiết đơn mượn sách
console.log("\n   📋 CHI TIẾT ĐƠN MƯỢN SÁCH CUỐI CÙNG:");
const details = borrowable4.getDetails();
console.log("   " + "─".repeat(40));
console.log(`   📚 Sách: ${details.book}`);
console.log(`   👤 Người mượn: ${details.user}`);
console.log(`   🔧 Tính năng: ${details.features.join(', ')}`);
console.log("   " + "─".repeat(40));

// ==========================================
// THỐNG KÊ CUỐI CÙNG
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("             📊 THỐNG KÊ THƯ VIỆN");
console.log("═══════════════════════════════════════════════════════");
library.displayStatistics();

console.log("\n═══════════════════════════════════════════════════════");
console.log("      LIBRARY MANAGEMENT SYSTEM DEMO HOÀN TẤT!");
console.log("═══════════════════════════════════════════════════════\n");

// Helper function
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

export { Library, BookFactory, SearchContext, LibraryStaff, LibraryMember, BorrowableBook };
