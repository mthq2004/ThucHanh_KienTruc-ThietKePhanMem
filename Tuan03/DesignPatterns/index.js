/**
 * DESIGN PATTERNS PRACTICE - Main Entry Point
 * 
 * Họ và tên: Mai Thành Hải Quân
 * MSSV: 22653671
 * 
 * Bài thực hành: Observer, Composite, Adapter Design Patterns
 * & Hệ thống quản lý thư viện với 5 Design Patterns
 */

console.log("╔═══════════════════════════════════════════════════════════════════════╗");
console.log("║                    DESIGN PATTERNS PRACTICE                            ║");
console.log("║                                                                         ║");
console.log("║                    Họ và tên: Mai Thành Hải Quân                        ║");
console.log("║                    MSSV: 22653671                                       ║");
console.log("╚═══════════════════════════════════════════════════════════════════════╝");

console.log("\n\n");
console.log("█████████████████████████████████████████████████████████████████████████");
console.log("█                                                                         █");
console.log("█           I. COMPOSITE DESIGN PATTERN                                  █");
console.log("█           (Hệ thống quản lý thư mục và tập tin)                        █");
console.log("█                                                                         █");
console.log("█████████████████████████████████████████████████████████████████████████");
await import('./src/composite/index.js');

console.log("\n\n");
console.log("█████████████████████████████████████████████████████████████████████████");
console.log("█                                                                         █");
console.log("█           II. OBSERVER DESIGN PATTERN                                   █");
console.log("█           (Theo dõi giá cổ phiếu & trạng thái công việc)               █");
console.log("█                                                                         █");
console.log("█████████████████████████████████████████████████████████████████████████");
await import('./src/observer/index.js');

console.log("\n\n");
console.log("█████████████████████████████████████████████████████████████████████████");
console.log("█                                                                         █");
console.log("█           III. ADAPTER DESIGN PATTERN                                   █");
console.log("█           (Chuyển đổi dữ liệu XML ↔ JSON)                              █");
console.log("█                                                                         █");
console.log("█████████████████████████████████████████████████████████████████████████");
await import('./src/adapter/index.js');

console.log("\n\n");
console.log("█████████████████████████████████████████████████████████████████████████");
console.log("█                                                                         █");
console.log("█           IV. LIBRARY MANAGEMENT SYSTEM                                 █");
console.log("█           (Singleton + Factory + Strategy + Observer + Decorator)       █");
console.log("█                                                                         █");
console.log("█████████████████████████████████████████████████████████████████████████");
await import('./src/library-system/index.js');

console.log("\n\n");
console.log("╔═══════════════════════════════════════════════════════════════════════╗");
console.log("║                                                                         ║");
console.log("║           ✅ TẤT CẢ CÁC DESIGN PATTERNS ĐÃ ĐƯỢC THI HÀNH!              ║");
console.log("║                                                                         ║");
console.log("║   Các Design Patterns đã triển khai:                                   ║");
console.log("║   ┌────────────────────────────────────────────────────────────────┐   ║");
console.log("║   │ 1. Composite Pattern  - Quản lý thư mục/tập tin               │   ║");
console.log("║   │ 2. Observer Pattern   - Theo dõi cổ phiếu & task              │   ║");
console.log("║   │ 3. Adapter Pattern    - Chuyển đổi XML ↔ JSON                 │   ║");
console.log("║   │ 4. Singleton Pattern  - Library duy nhất                       │   ║");
console.log("║   │ 5. Factory Pattern    - Tạo các loại sách                      │   ║");
console.log("║   │ 6. Strategy Pattern   - Chiến lược tìm kiếm                    │   ║");
console.log("║   │ 7. Decorator Pattern  - Mở rộng tính năng mượn sách            │   ║");
console.log("║   └────────────────────────────────────────────────────────────────┘   ║");
console.log("║                                                                         ║");
console.log("║                    Họ và tên: Mai Thành Hải Quân                        ║");
console.log("║                    MSSV: 22653671                                       ║");
console.log("║                                                                         ║");
console.log("╚═══════════════════════════════════════════════════════════════════════╝");
