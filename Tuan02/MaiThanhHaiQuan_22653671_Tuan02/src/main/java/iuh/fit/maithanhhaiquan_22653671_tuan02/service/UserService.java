package iuh.fit.maithanhhaiquan_22653671_tuan02.service;

import iuh.fit.maithanhhaiquan_22653671_tuan02.model.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserService {   // ✅ KHÔNG final

    @Cacheable(value = "users", key = "#id.toString()")
    public User getUserById(Long id) {
        System.out.println(">>> METHOD ĐƯỢC GỌI");

        try {
            Thread.sleep(150);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        return new User(id, "User " + id);
    }
}