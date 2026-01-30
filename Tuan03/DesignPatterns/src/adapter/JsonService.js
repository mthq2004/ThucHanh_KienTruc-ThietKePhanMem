/**
 * JsonService - Target Interface cho Adapter Pattern
 * 
 * Đây là interface mà client muốn sử dụng.
 * Dịch vụ web yêu cầu dữ liệu ở định dạng JSON.
 */
export class JsonService {
    /**
     * Lấy dữ liệu dạng JSON
     * @returns {object}
     */
    getJsonData() {
        throw new Error("Method 'getJsonData()' must be implemented.");
    }

    /**
     * Xử lý dữ liệu JSON
     * @param {object} jsonData 
     * @returns {object}
     */
    processJsonData(jsonData) {
        throw new Error("Method 'processJsonData()' must be implemented.");
    }

    /**
     * Gửi dữ liệu JSON đến server
     * @param {object} jsonData 
     * @returns {boolean}
     */
    sendJsonData(jsonData) {
        throw new Error("Method 'sendJsonData()' must be implemented.");
    }
}

/**
 * JsonWebService - Concrete Target
 * 
 * Dịch vụ web thực tế sử dụng JSON.
 */
export class JsonWebService extends JsonService {
    constructor() {
        super();
        this.data = {};
    }

    /**
     * Lấy dữ liệu dạng JSON
     * @returns {object}
     */
    getJsonData() {
        return this.data;
    }

    /**
     * Xử lý dữ liệu JSON
     * @param {object} jsonData 
     * @returns {object}
     */
    processJsonData(jsonData) {
        console.log("   🔧 JSON Service: Đang xử lý dữ liệu JSON...");

        // Validate JSON
        if (typeof jsonData !== 'object' || jsonData === null) {
            throw new Error("Invalid JSON data");
        }

        // Thêm metadata
        const processedData = {
            ...jsonData,
            _metadata: {
                processedAt: new Date().toISOString(),
                format: 'JSON',
                version: '1.0'
            }
        };

        this.data = processedData;
        console.log("   ✅ JSON Service: Xử lý thành công!");
        return processedData;
    }

    /**
     * Gửi dữ liệu JSON đến server
     * @param {object} jsonData 
     * @returns {boolean}
     */
    sendJsonData(jsonData) {
        console.log("   📤 JSON Service: Đang gửi dữ liệu JSON đến server...");
        console.log("   📦 Dữ liệu gửi đi:");
        console.log(JSON.stringify(jsonData, null, 6));
        console.log("   ✅ JSON Service: Gửi thành công!");
        return true;
    }

    /**
     * Hiển thị dữ liệu JSON
     * @param {object} jsonData 
     */
    displayJson(jsonData) {
        console.log("\n   📋 JSON Data:");
        console.log("   " + "─".repeat(40));
        console.log(JSON.stringify(jsonData, null, 6).split('\n').map(line => '   ' + line).join('\n'));
        console.log("   " + "─".repeat(40));
    }
}
