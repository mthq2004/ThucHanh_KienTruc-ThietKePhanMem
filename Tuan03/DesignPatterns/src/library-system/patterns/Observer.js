/**
 * Observer Pattern - Notification System
 * 
 * Khi có sách mới hoặc sách đã hết hạn mượn, hệ thống sẽ gửi thông báo
 * cho những người quan tâm (nhân viên thư viện, người dùng đã đăng ký).
 */

/**
 * LibraryObserver - Interface cho Observer
 */
export class LibraryObserver {
    constructor(name, email) {
        if (this.constructor === LibraryObserver) {
            throw new Error("Cannot instantiate abstract class LibraryObserver");
        }
        this.name = name;
        this.email = email;
        this.notifications = [];
    }

    /**
     * Nhận thông báo từ thư viện
     * @param {object} data 
     */
    update(data) {
        throw new Error("Method 'update()' must be implemented.");
    }

    getName() { return this.name; }
    getEmail() { return this.email; }
    getNotifications() { return this.notifications; }

    /**
     * Lấy thông báo chưa đọc
     * @returns {Array}
     */
    getUnreadNotifications() {
        return this.notifications.filter(n => !n.read);
    }

    /**
     * Đánh dấu tất cả đã đọc
     */
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
    }
}

/**
 * LibraryStaff - Nhân viên thư viện
 */
export class LibraryStaff extends LibraryObserver {
    static Role = {
        LIBRARIAN: 'LIBRARIAN',
        MANAGER: 'MANAGER',
        ASSISTANT: 'ASSISTANT'
    };

    constructor(name, email, role = LibraryStaff.Role.LIBRARIAN) {
        super(name, email);
        this.role = role;
        this.id = `STAFF-${Date.now()}`;
    }

    /**
     * Nhận thông báo
     * @param {object} data 
     */
    update(data) {
        const notification = {
            ...data,
            receivedAt: new Date(),
            read: false
        };
        this.notifications.push(notification);

        let icon = '📌';
        switch (data.type) {
            case 'NEW_BOOK':
                icon = '📚';
                break;
            case 'OVERDUE_BOOK':
                icon = '⚠️';
                break;
            case 'BOOK_BORROWED':
                icon = '📖';
                break;
            case 'BOOK_RETURNED':
                icon = '📗';
                break;
        }

        console.log(`      ${icon} [${this.role}] ${this.name}: ${data.message}`);
    }

    getRole() { return this.role; }
}

/**
 * LibraryMember - Thành viên thư viện (độc giả)
 */
export class LibraryMember extends LibraryObserver {
    static MemberType = {
        STUDENT: 'STUDENT',
        TEACHER: 'TEACHER',
        PUBLIC: 'PUBLIC'
    };

    constructor(name, email, memberType = LibraryMember.MemberType.PUBLIC) {
        super(name, email);
        this.memberType = memberType;
        this.id = `MEMBER-${Date.now()}`;
        this.borrowedBooks = [];
        this.favoriteCategories = [];
    }

    /**
     * Nhận thông báo
     * @param {object} data 
     */
    update(data) {
        // Chỉ nhận thông báo về sách mới
        if (data.type === 'NEW_BOOK') {
            const notification = {
                ...data,
                receivedAt: new Date(),
                read: false
            };
            this.notifications.push(notification);

            console.log(`      📬 [Thành viên] ${this.name}: Có sách mới - "${data.book.getTitle()}"`);
        }

        // Nhận thông báo về sách quá hạn của mình
        if (data.type === 'OVERDUE_BOOK' && data.user?.id === this.id) {
            const notification = {
                ...data,
                receivedAt: new Date(),
                read: false
            };
            this.notifications.push(notification);

            console.log(`      ⚠️ [Thành viên] ${this.name}: Sách quá hạn!`);
        }
    }

    getMemberType() { return this.memberType; }

    /**
     * Thêm thể loại yêu thích
     * @param {string} category 
     */
    addFavoriteCategory(category) {
        if (!this.favoriteCategories.includes(category)) {
            this.favoriteCategories.push(category);
        }
    }

    getFavoriteCategories() {
        return this.favoriteCategories;
    }
}

/**
 * NotificationService - Dịch vụ thông báo
 */
export class NotificationService {
    constructor() {
        this.subscribers = [];
        this.notificationHistory = [];
    }

    /**
     * Đăng ký subscriber
     * @param {LibraryObserver} observer 
     */
    subscribe(observer) {
        if (!this.subscribers.includes(observer)) {
            this.subscribers.push(observer);
        }
    }

    /**
     * Hủy đăng ký
     * @param {LibraryObserver} observer 
     */
    unsubscribe(observer) {
        const index = this.subscribers.indexOf(observer);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    /**
     * Gửi thông báo cho tất cả subscribers
     * @param {object} notification 
     */
    broadcast(notification) {
        this.notificationHistory.push({
            ...notification,
            sentAt: new Date(),
            recipientCount: this.subscribers.length
        });

        for (const subscriber of this.subscribers) {
            subscriber.update(notification);
        }
    }

    /**
     * Gửi thông báo cho các subscribers có vai trò cụ thể
     * @param {object} notification 
     * @param {Array} roles 
     */
    broadcastToRoles(notification, roles) {
        for (const subscriber of this.subscribers) {
            if (subscriber instanceof LibraryStaff && roles.includes(subscriber.getRole())) {
                subscriber.update(notification);
            }
        }
    }

    /**
     * Lấy lịch sử thông báo
     * @returns {Array}
     */
    getHistory() {
        return this.notificationHistory;
    }
}
