import { JsonWebService } from './JsonService.js';
import { XmlService } from './XmlService.js';

/**
 * XmlToJsonAdapter - Adapter cho Adapter Pattern
 * 
 * Chuyển đổi giao diện của XmlService thành JsonService.
 * Cho phép client sử dụng XmlService thông qua interface của JsonService.
 */
export class XmlToJsonAdapter extends JsonWebService {
    /**
     * Tạo một Adapter mới
     * @param {XmlService} xmlService - XmlService cần adapt
     */
    constructor(xmlService) {
        super();
        this.xmlService = xmlService;
    }

    /**
     * Chuyển đổi XML sang JSON
     * @param {string} xmlData 
     * @returns {object}
     */
    xmlToJson(xmlData) {
        console.log("   🔄 Adapter: Đang chuyển đổi XML → JSON...");

        // Simple XML parser (cho demo purposes)
        const result = {};

        // Parse các cặp tag đơn giản
        const tagPattern = /<(\w+)>([^<]+)<\/\1>/g;
        let match;

        while ((match = tagPattern.exec(xmlData)) !== null) {
            const [, tagName, value] = match;
            result[tagName] = this.parseValue(value.trim());
        }

        // Parse nested tags (address)
        const addressPattern = /<address>([\s\S]*?)<\/address>/;
        const addressMatch = xmlData.match(addressPattern);
        if (addressMatch) {
            const addressContent = addressMatch[1];
            result.address = {};
            const addressTagPattern = /<(\w+)>([^<]*)<\/\1>/g;
            let addrMatch;
            while ((addrMatch = addressTagPattern.exec(addressContent)) !== null) {
                const [, tagName, value] = addrMatch;
                if (value.trim()) {
                    result.address[tagName] = value.trim();
                }
            }
        }

        console.log("   ✅ Adapter: Chuyển đổi thành công!");
        return result;
    }

    /**
     * Chuyển đổi JSON sang XML
     * @param {object} jsonData 
     * @param {string} rootTag 
     * @returns {string}
     */
    jsonToXml(jsonData, rootTag = 'data') {
        console.log("   🔄 Adapter: Đang chuyển đổi JSON → XML...");

        const convertToXml = (obj, indent = 4) => {
            let xml = '';
            const spaces = ' '.repeat(indent);

            for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    xml += `${spaces}<${key}>\n`;
                    xml += convertToXml(value, indent + 4);
                    xml += `${spaces}</${key}>\n`;
                } else if (Array.isArray(value)) {
                    for (const item of value) {
                        xml += `${spaces}<${key}>\n`;
                        if (typeof item === 'object') {
                            xml += convertToXml(item, indent + 4);
                        } else {
                            xml += `${spaces}    ${item}\n`;
                        }
                        xml += `${spaces}</${key}>\n`;
                    }
                } else {
                    xml += `${spaces}<${key}>${value ?? ''}</${key}>\n`;
                }
            }
            return xml;
        };

        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<${rootTag}>
${convertToXml(jsonData)}</${rootTag}>`;

        console.log("   ✅ Adapter: Chuyển đổi thành công!");
        return xmlContent;
    }

    /**
     * Parse giá trị từ string
     * @param {string} value 
     * @returns {any}
     */
    parseValue(value) {
        // Number
        if (!isNaN(value) && value !== '') {
            return Number(value);
        }
        // Boolean
        if (value.toLowerCase() === 'true') return true;
        if (value.toLowerCase() === 'false') return false;
        // String
        return value;
    }

    /**
     * Lấy dữ liệu từ XmlService và chuyển sang JSON
     * @returns {object}
     */
    getJsonData() {
        const xmlData = this.xmlService.getXmlData();
        return this.xmlToJson(xmlData);
    }

    /**
     * Xử lý dữ liệu JSON (từ XML)
     * @param {string} xmlData - Dữ liệu XML đầu vào
     * @returns {object}
     */
    processXmlAsJson(xmlData) {
        console.log("\n   🔧 Adapter: Bắt đầu xử lý XML như JSON...");

        // Chuyển XML thành JSON
        const jsonData = this.xmlToJson(xmlData);

        // Xử lý như JSON bình thường
        return this.processJsonData(jsonData);
    }

    /**
     * Gửi dữ liệu JSON (chuyển từ XML)
     * @param {string} xmlData - Dữ liệu XML
     * @returns {boolean}
     */
    sendXmlAsJson(xmlData) {
        const jsonData = this.xmlToJson(xmlData);
        return this.sendJsonData(jsonData);
    }

    /**
     * Gửi dữ liệu XML (chuyển từ JSON)
     * @param {object} jsonData - Dữ liệu JSON
     * @param {string} rootTag - Tag gốc
     * @returns {boolean}
     */
    sendJsonAsXml(jsonData, rootTag = 'data') {
        const xmlData = this.jsonToXml(jsonData, rootTag);
        return this.xmlService.sendXmlData(xmlData);
    }
}

/**
 * JsonToXmlAdapter - Adapter ngược lại
 * 
 * Chuyển đổi giao diện của JsonService thành XmlService.
 */
export class JsonToXmlAdapter extends XmlService {
    /**
     * Tạo một Adapter mới
     * @param {JsonWebService} jsonService 
     */
    constructor(jsonService) {
        super();
        this.jsonService = jsonService;
        this.xmlToJsonAdapter = new XmlToJsonAdapter(this);
    }

    /**
     * Lấy dữ liệu từ JsonService và chuyển sang XML
     * @returns {string}
     */
    getXmlData() {
        const jsonData = this.jsonService.getJsonData();
        return this.xmlToJsonAdapter.jsonToXml(jsonData);
    }

    /**
     * Xử lý dữ liệu JSON như XML
     * @param {object} jsonData 
     * @returns {string}
     */
    processJsonAsXml(jsonData) {
        console.log("\n   🔧 Adapter: Bắt đầu xử lý JSON như XML...");
        const xmlData = this.xmlToJsonAdapter.jsonToXml(jsonData);
        return this.processXmlData(xmlData);
    }
}
