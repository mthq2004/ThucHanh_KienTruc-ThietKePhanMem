package iuh.fit.maithanhhaiquan_22653671_tuan02.controller;

import iuh.fit.maithanhhaiquan_22653671_tuan02.model.User;
import iuh.fit.maithanhhaiquan_22653671_tuan02.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        long start = System.currentTimeMillis();

        User user = userService.getUserById(id);

        long end = System.currentTimeMillis();
        System.out.println(">>> TOTAL TIME: " + (end - start) + " ms"+ " userId:"+ user.getId());

        return user;
    }
}
