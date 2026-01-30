/**
 * ADAPTER DESIGN PATTERN - Demo
 * 
 * Họ và tên: Mai Thành Hải Quân
 * MSSV: 22653671
 * 
 * Mô tả bài toán:
 * Một dịch vụ web yêu cầu đầu vào ở định dạng JSON,
 * nhưng một hệ thống khác chỉ hỗ trợ XML.
 * Sử dụng Adapter để chuyển đổi dữ liệu giữa XML và JSON.
 */

import { JsonWebService } from './JsonService.js';
import { XmlService } from './XmlService.js';
import { XmlToJsonAdapter, JsonToXmlAdapter } from './XmlToJsonAdapter.js';

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║          ADAPTER DESIGN PATTERN - DATA CONVERSION DEMO         ║");
console.log("║                                                                 ║");
console.log("║  Họ và tên: Mai Thành Hải Quân                                  ║");
console.log("║  MSSV: 22653671                                                 ║");
console.log("╚════════════════════════════════════════════════════════════════╝");

// ==========================================
// PHẦN 1: TẠO CÁC SERVICE
// ==========================================
console.log("\n");
console.log("═══════════════════════════════════════════════════════");
console.log("       PHẦN 1: KHỞI TẠO CÁC SERVICE");
console.log("═══════════════════════════════════════════════════════");

// Tạo XmlService (hệ thống cũ)
console.log("\n🔧 Tạo XML Service (Hệ thống cũ - chỉ hỗ trợ XML)...");
const xmlService = new XmlService();

// Tạo JsonService (dịch vụ web mới)
console.log("🔧 Tạo JSON Web Service (Dịch vụ web mới - yêu cầu JSON)...");
const jsonService = new JsonWebService();

// Tạo Adapter
console.log("🔧 Tạo XML-to-JSON Adapter để kết nối hai hệ thống...");
const xmlToJsonAdapter = new XmlToJsonAdapter(xmlService);

console.log("\n✅ Đã khởi tạo xong các service!");

// ==========================================
// PHẦN 2: CHUYỂN ĐỔI XML → JSON
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("       PHẦN 2: CHUYỂN ĐỔI XML → JSON");
console.log("═══════════════════════════════════════════════════════");

// Tạo dữ liệu XML
const userData = {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    address: {
        street: '123 Lê Lợi',
        city: 'TP.HCM',
        country: 'Việt Nam'
    }
};

console.log("\n📥 DỮ LIỆU GỐC TỪ HỆ THỐNG XML:");
const userXml = xmlService.createUserXml(userData);
xmlService.displayXml(userXml);

// Chuyển đổi XML sang JSON thông qua Adapter
console.log("\n🔄 CHUYỂN ĐỔI QUA ADAPTER:");
const userJson = xmlToJsonAdapter.xmlToJson(userXml);
jsonService.displayJson(userJson);

// Xử lý dữ liệu JSON
console.log("\n🔧 XỬ LÝ DỮ LIỆU JSON:");
const processedJson = xmlToJsonAdapter.processXmlAsJson(userXml);
jsonService.displayJson(processedJson);

// Gửi dữ liệu JSON
console.log("\n📤 GỬI DỮ LIỆU JSON ĐẾN WEB SERVICE:");
xmlToJsonAdapter.sendXmlAsJson(userXml);

// ==========================================
// PHẦN 3: CHUYỂN ĐỔI JSON → XML
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("       PHẦN 3: CHUYỂN ĐỔI JSON → XML");
console.log("═══════════════════════════════════════════════════════");

// Tạo dữ liệu JSON
const productJson = {
    id: 101,
    name: 'iPhone 15 Pro',
    price: 29990000,
    category: 'Điện thoại',
    stock: 50,
    specs: {
        display: '6.1 inch',
        chip: 'A17 Pro',
        camera: '48MP'
    }
};

console.log("\n📥 DỮ LIỆU GỐC TỪ WEB SERVICE (JSON):");
jsonService.displayJson(productJson);

// Chuyển đổi JSON sang XML thông qua Adapter
console.log("\n🔄 CHUYỂN ĐỔI QUA ADAPTER:");
const productXml = xmlToJsonAdapter.jsonToXml(productJson, 'product');
xmlService.displayXml(productXml);

// Gửi dữ liệu XML
console.log("\n📤 GỬI DỮ LIỆU XML ĐẾN HỆ THỐNG CŨ:");
xmlToJsonAdapter.sendJsonAsXml(productJson, 'product');

// ==========================================
// PHẦN 4: DEMO TÍCH HỢP HAI HỆ THỐNG
// ==========================================
console.log("\n\n");
console.log("═══════════════════════════════════════════════════════");
console.log("       PHẦN 4: TÍCH HỢP HAI HỆ THỐNG");
console.log("═══════════════════════════════════════════════════════");

console.log("\n📋 VÍ DỤ: Đồng bộ đơn hàng giữa hai hệ thống");

// Đơn hàng từ hệ thống XML
const orderXml = `<order>
    <orderId>ORD-2024-001</orderId>
    <customerId>CUST-001</customerId>
    <customerName>Trần Thị B</customerName>
    <totalAmount>5990000</totalAmount>
    <status>pending</status>
    <items>
        <item>
            <productId>101</productId>
            <quantity>2</quantity>
        </item>
    </items>
</order>`;

console.log("\n📥 Đơn hàng từ hệ thống XML cũ:");
xmlService.displayXml(orderXml);

console.log("\n🔄 Đồng bộ đến Web Service (JSON):");
const orderJson = xmlToJsonAdapter.xmlToJson(orderXml);
jsonService.processJsonData(orderJson);
jsonService.displayJson(jsonService.getJsonData());

console.log("\n✅ Đồng bộ thành công! Cả hai hệ thống đều có thể đọc được dữ liệu.");

console.log("\n═══════════════════════════════════════════════════════");
console.log("           ADAPTER PATTERN DEMO HOÀN TẤT!");
console.log("═══════════════════════════════════════════════════════\n");

export { JsonWebService, XmlService, XmlToJsonAdapter, JsonToXmlAdapter };
