import { Observer } from './Observer.js';

/**
 * TeamMember - Concrete Observer cho Observer Pattern
 * 
 * Đại diện cho một thành viên trong nhóm phát triển.
 * Nhận thông báo khi trạng thái công việc thay đổi.
 */
export class TeamMember extends Observer {
    /**
     * Vai trò trong nhóm
     */
    static Role = {
        DEVELOPER: 'DEVELOPER',
        DESIGNER: 'DESIGNER',
        TESTER: 'TESTER',
        PROJECT_MANAGER: 'PROJECT_MANAGER',
        TECH_LEAD: 'TECH_LEAD'
    };

    /**
     * Tạo một TeamMember mới
     * @param {string} name - Tên thành viên
     * @param {string} email - Email
     * @param {string} role - Vai trò
     */
    constructor(name, email, role = TeamMember.Role.DEVELOPER) {
        super(name);
        this.email = email;
        this.role = role;
        this.notifications = [];
        this.assignedTasks = [];
    }

    /**
     * Nhận thông báo về thay đổi task
     * @param {object} data - Dữ liệu thay đổi
     */
    update(data) {
        let notificationMessage = '';
        let icon = '';

        switch (data.type) {
            case 'TASK_STATUS_CHANGE':
                icon = this.getStatusEmoji(data.newStatus);
                notificationMessage = `Task "${data.taskTitle}" đã chuyển từ ${data.oldStatus} sang ${data.newStatus}`;
                break;
            case 'TASK_ASSIGNED':
                icon = '👤';
                notificationMessage = `Task "${data.taskTitle}" được giao cho ${data.newAssignee}`;
                break;
            case 'TASK_PRIORITY_CHANGE':
                icon = '⚡';
                notificationMessage = `Task "${data.taskTitle}" thay đổi ưu tiên từ ${data.oldPriority} sang ${data.newPriority}`;
                break;
            default:
                icon = '📌';
                notificationMessage = `Có cập nhật mới về task "${data.taskTitle || data.taskId}"`;
        }

        const notification = {
            type: data.type,
            message: notificationMessage,
            taskId: data.taskId,
            timestamp: data.timestamp,
            read: false
        };
        this.notifications.push(notification);

        console.log(`      ${icon} [${this.role}] ${this.name}: ${notificationMessage}`);
    }

    /**
     * Lấy emoji cho trạng thái
     * @param {string} status 
     * @returns {string}
     */
    getStatusEmoji(status) {
        const emojis = {
            'TODO': '📝',
            'IN_PROGRESS': '🔄',
            'IN_REVIEW': '👁️',
            'TESTING': '🧪',
            'DONE': '✅',
            'BLOCKED': '🚫'
        };
        return emojis[status] || '📌';
    }

    /**
     * Lấy tất cả thông báo
     * @returns {Array}
     */
    getNotifications() {
        return this.notifications;
    }

    /**
     * Lấy thông báo chưa đọc
     * @returns {Array}
     */
    getUnreadNotifications() {
        return this.notifications.filter(n => !n.read);
    }

    /**
     * Đánh dấu tất cả thông báo đã đọc
     */
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
    }

    /**
     * Lấy thông tin chi tiết
     * @returns {object}
     */
    getDetails() {
        return {
            name: this.name,
            email: this.email,
            role: this.role,
            notificationCount: this.notifications.length,
            unreadCount: this.getUnreadNotifications().length
        };
    }
}
