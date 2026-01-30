/**
 * OBSERVER DESIGN PATTERN - Demo
 * 
 * Họ và tên: Mai Thành Hải Quân
 * MSSV: 22653671
 * 
 * Mô tả bài toán:
 * 1. Khi giá cổ phiếu thay đổi, các nhà đầu tư đã đăng ký sẽ nhận thông báo
 * 2. Khi trạng thái công việc thay đổi, các thành viên trong nhóm sẽ nhận thông báo
 */

import { Stock } from './Stock.js';
import { Investor } from './Investor.js';
import { Task } from './Task.js';
import { TeamMember } from './TeamMember.js';

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║          OBSERVER DESIGN PATTERN - NOTIFICATION DEMO           ║");
console.log("║                                                                 ║");
console.log("║  Họ và tên: Mai Thành Hải Quân                                  ║");
console.log("║  MSSV: 22653671                                                 ║");
console.log("╚════════════════════════════════════════════════════════════════╝");

// ==========================================
// PHẦN 1: THEO DÕI GIÁ CỔ PHIẾU
// ==========================================
console.log("\n");
console.log("═══════════════════════════════════════════════════════");
console.log("       PHẦN 1: THEO DÕI GIÁ CỔ PHIẾU");
console.log("═══════════════════════════════════════════════════════");

// Tạo các cổ phiếu
console.log("\n📊 Tạo các cổ phiếu:");
const vinStock = new Stock("VIC", "Vingroup", 85.5);
const fptStock = new Stock("FPT", "FPT Corporation", 125.0);

console.log(`   - ${vinStock.getSymbol()} (${vinStock.companyName}): ${vinStock.getPrice()}`);
console.log(`   - ${fptStock.getSymbol()} (${fptStock.companyName}): ${fptStock.getPrice()}`);

// Tạo các nhà đầu tư
console.log("\n👥 Tạo các nhà đầu tư:");
const investor1 = new Investor("Nguyễn Văn A", "nguyenvana@email.com");
const investor2 = new Investor("Trần Thị B", "tranthib@email.com");
const investor3 = new Investor("Lê Văn C", "levanc@email.com");

console.log(`   - ${investor1.getName()} (${investor1.email})`);
console.log(`   - ${investor2.getName()} (${investor2.email})`);
console.log(`   - ${investor3.getName()} (${investor3.email})`);

// Đăng ký theo dõi
console.log("\n📝 Đăng ký theo dõi cổ phiếu:");
console.log("\n   VIC - Vingroup:");
vinStock.subscribe(investor1);
vinStock.subscribe(investor2);

console.log("\n   FPT - FPT Corporation:");
fptStock.subscribe(investor2);
fptStock.subscribe(investor3);

// Thay đổi giá cổ phiếu
console.log("\n💹 THAY ĐỔI GIÁ CỔ PHIẾU:");
vinStock.setPrice(92.3);  // Tăng giá
fptStock.setPrice(118.5); // Giảm giá
vinStock.setPrice(88.0);  // Giảm giá

// Hủy đăng ký
console.log("\n🔕 Hủy đăng ký:");
vinStock.unsubscribe(investor1);

// Thay đổi giá lần nữa (investor1 không nhận được thông báo VIC)
console.log("\n💹 THAY ĐỔI GIÁ SAU KHI HỦY ĐĂNG KÝ:");
vinStock.setPrice(95.0);

// Thống kê thông báo
console.log("\n📊 THỐNG KÊ THÔNG BÁO:");
console.log(`   - ${investor1.getName()}: ${investor1.getNotifications().length} thông báo`);
console.log(`   - ${investor2.getName()}: ${investor2.getNotifications().length} thông báo`);
console.log(`   - ${investor3.getName()}: ${investor3.getNotifications().length} thông báo`);

// ==========================================
// PHẦN 2: THEO DÕI TRẠNG THÁI CÔNG VIỆC
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("       PHẦN 2: THEO DÕI TRẠNG THÁI CÔNG VIỆC");
console.log("═══════════════════════════════════════════════════════");

// Tạo các công việc
console.log("\n📋 Tạo các công việc:");
const task1 = new Task("TASK-001", "Implement User Login", "Xây dựng chức năng đăng nhập");
const task2 = new Task("TASK-002", "Design Dashboard UI", "Thiết kế giao diện dashboard");

console.log(`   - [${task1.getId()}] ${task1.title}`);
console.log(`   - [${task2.getId()}] ${task2.title}`);

// Tạo các thành viên trong nhóm
console.log("\n👥 Tạo các thành viên nhóm:");
const developer = new TeamMember("Phạm Văn D", "phamvand@email.com", TeamMember.Role.DEVELOPER);
const designer = new TeamMember("Hoàng Thị E", "hoangthie@email.com", TeamMember.Role.DESIGNER);
const pm = new TeamMember("Ngô Văn F", "ngovanf@email.com", TeamMember.Role.PROJECT_MANAGER);
const tester = new TeamMember("Vũ Thị G", "vuthig@email.com", TeamMember.Role.TESTER);

console.log(`   - ${developer.getName()} (${developer.role})`);
console.log(`   - ${designer.getName()} (${designer.role})`);
console.log(`   - ${pm.getName()} (${pm.role})`);
console.log(`   - ${tester.getName()} (${tester.role})`);

// Đăng ký theo dõi task
console.log("\n📝 Đăng ký theo dõi công việc:");
console.log("\n   TASK-001 - Implement User Login:");
task1.subscribe(developer);
task1.subscribe(pm);
task1.subscribe(tester);

console.log("\n   TASK-002 - Design Dashboard UI:");
task2.subscribe(designer);
task2.subscribe(pm);

// Thay đổi trạng thái task
console.log("\n🔄 THAY ĐỔI TRẠNG THÁI CÔNG VIỆC:");

// Task 1: TODO -> IN_PROGRESS -> IN_REVIEW -> TESTING -> DONE
task1.setStatus(Task.Status.IN_PROGRESS);
task1.setStatus(Task.Status.IN_REVIEW);
task1.setStatus(Task.Status.TESTING);
task1.setStatus(Task.Status.DONE);

// Task 2: TODO -> IN_PROGRESS -> BLOCKED
task2.setStatus(Task.Status.IN_PROGRESS);
task2.setPriority(Task.Priority.HIGH);
task2.setStatus(Task.Status.BLOCKED);

// Thống kê thông báo
console.log("\n📊 THỐNG KÊ THÔNG BÁO:");
console.log(`   - ${developer.getName()} (${developer.role}): ${developer.getNotifications().length} thông báo`);
console.log(`   - ${designer.getName()} (${designer.role}): ${designer.getNotifications().length} thông báo`);
console.log(`   - ${pm.getName()} (${pm.role}): ${pm.getNotifications().length} thông báo`);
console.log(`   - ${tester.getName()} (${tester.role}): ${tester.getNotifications().length} thông báo`);

console.log("\n═══════════════════════════════════════════════════════");
console.log("           OBSERVER PATTERN DEMO HOÀN TẤT!");
console.log("═══════════════════════════════════════════════════════\n");

export { Stock, Investor, Task, TeamMember };
