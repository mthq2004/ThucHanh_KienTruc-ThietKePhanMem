/**
 * XmlService - Adaptee cho Adapter Pattern
 * 
 * Đây là hệ thống cũ chỉ hỗ trợ XML.
 * Không tương thích trực tiếp với JsonService.
 */
export class XmlService {
    constructor() {
        this.xmlData = '';
    }

    /**
     * Lấy dữ liệu dạng XML
     * @returns {string}
     */
    getXmlData() {
        return this.xmlData;
    }

    /**
     * Thiết lập dữ liệu XML
     * @param {string} xml 
     */
    setXmlData(xml) {
        this.xmlData = xml;
    }

    /**
     * Xử lý dữ liệu XML
     * @param {string} xmlData 
     * @returns {string}
     */
    processXmlData(xmlData) {
        console.log("   🔧 XML Service: Đang xử lý dữ liệu XML...");

        // Thêm metadata vào XML
        const timestamp = new Date().toISOString();
        const processedXml = `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <metadata>
        <processedAt>${timestamp}</processedAt>
        <format>XML</format>
        <version>1.0</version>
    </metadata>
    <data>
        ${xmlData}
    </data>
</root>`;

        this.xmlData = processedXml;
        console.log("   ✅ XML Service: Xử lý thành công!");
        return processedXml;
    }

    /**
     * Gửi dữ liệu XML
     * @param {string} xmlData 
     * @returns {boolean}
     */
    sendXmlData(xmlData) {
        console.log("   📤 XML Service: Đang gửi dữ liệu XML...");
        console.log("   📦 Dữ liệu gửi đi:");
        console.log(xmlData.split('\n').map(line => '      ' + line).join('\n'));
        console.log("   ✅ XML Service: Gửi thành công!");
        return true;
    }

    /**
     * Hiển thị dữ liệu XML
     * @param {string} xmlData 
     */
    displayXml(xmlData) {
        console.log("\n   📋 XML Data:");
        console.log("   " + "─".repeat(40));
        console.log(xmlData.split('\n').map(line => '   ' + line).join('\n'));
        console.log("   " + "─".repeat(40));
    }

    /**
     * Tạo dữ liệu XML mẫu cho user
     * @param {object} userData 
     * @returns {string}
     */
    createUserXml(userData) {
        return `<user>
    <id>${userData.id}</id>
    <name>${userData.name}</name>
    <email>${userData.email}</email>
    <phone>${userData.phone || ''}</phone>
    <address>
        <street>${userData.address?.street || ''}</street>
        <city>${userData.address?.city || ''}</city>
        <country>${userData.address?.country || ''}</country>
    </address>
</user>`;
    }

    /**
     * Tạo dữ liệu XML mẫu cho product
     * @param {object} productData 
     * @returns {string}
     */
    createProductXml(productData) {
        return `<product>
    <id>${productData.id}</id>
    <name>${productData.name}</name>
    <price>${productData.price}</price>
    <category>${productData.category}</category>
    <stock>${productData.stock || 0}</stock>
</product>`;
    }
}
