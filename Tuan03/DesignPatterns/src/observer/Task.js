import { Subject } from './Subject.js';

/**
 * Task - Concrete Subject cho Observer Pattern
 * 
 * Đại diện cho một công việc trong dự án phần mềm.
 * Khi trạng thái thay đổi, các thành viên trong nhóm sẽ được thông báo.
 */
export class Task extends Subject {
    /**
     * Trạng thái của task
     */
    static Status = {
        TODO: 'TODO',
        IN_PROGRESS: 'IN_PROGRESS',
        IN_REVIEW: 'IN_REVIEW',
        TESTING: 'TESTING',
        DONE: 'DONE',
        BLOCKED: 'BLOCKED'
    };

    /**
     * Mức độ ưu tiên
     */
    static Priority = {
        LOW: 'LOW',
        MEDIUM: 'MEDIUM',
        HIGH: 'HIGH',
        CRITICAL: 'CRITICAL'
    };

    /**
     * Tạo một Task mới
     * @param {string} id - ID của task
     * @param {string} title - Tiêu đề
     * @param {string} description - Mô tả
     * @param {string} assignee - Người được giao
     */
    constructor(id, title, description = '', assignee = null) {
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.status = Task.Status.TODO;
        this.priority = Task.Priority.MEDIUM;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.statusHistory = [{ status: this.status, timestamp: this.createdAt }];
    }

    /**
     * Lấy ID của task
     * @returns {string}
     */
    getId() {
        return this.id;
    }

    /**
     * Lấy trạng thái hiện tại
     * @returns {string}
     */
    getStatus() {
        return this.status;
    }

    /**
     * Cập nhật trạng thái và thông báo cho team members
     * @param {string} newStatus 
     */
    setStatus(newStatus) {
        const oldStatus = this.status;
        this.status = newStatus;
        this.updatedAt = new Date();
        this.statusHistory.push({ status: newStatus, timestamp: this.updatedAt });

        const statusEmoji = this.getStatusEmoji(newStatus);
        console.log(`\n   ${statusEmoji} Task [${this.id}]: ${this.title}`);
        console.log(`      Trạng thái: ${oldStatus} → ${newStatus}`);

        // Thông báo cho tất cả team members
        this.notify({
            type: 'TASK_STATUS_CHANGE',
            taskId: this.id,
            taskTitle: this.title,
            oldStatus,
            newStatus,
            assignee: this.assignee,
            timestamp: new Date()
        });
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
     * Giao task cho ai đó
     * @param {string} assignee 
     */
    assign(assignee) {
        const oldAssignee = this.assignee;
        this.assignee = assignee;
        this.updatedAt = new Date();

        console.log(`\n   👤 Task [${this.id}] được giao cho: ${assignee}`);

        this.notify({
            type: 'TASK_ASSIGNED',
            taskId: this.id,
            taskTitle: this.title,
            oldAssignee,
            newAssignee: assignee,
            timestamp: new Date()
        });
    }

    /**
     * Thay đổi mức độ ưu tiên
     * @param {string} priority 
     */
    setPriority(priority) {
        const oldPriority = this.priority;
        this.priority = priority;
        this.updatedAt = new Date();

        console.log(`\n   ⚡ Task [${this.id}] thay đổi ưu tiên: ${oldPriority} → ${priority}`);

        this.notify({
            type: 'TASK_PRIORITY_CHANGE',
            taskId: this.id,
            taskTitle: this.title,
            oldPriority,
            newPriority: priority,
            timestamp: new Date()
        });
    }

    /**
     * Lấy thông tin chi tiết
     * @returns {object}
     */
    getDetails() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            priority: this.priority,
            assignee: this.assignee,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            observerCount: this.getObserverCount()
        };
    }
}
