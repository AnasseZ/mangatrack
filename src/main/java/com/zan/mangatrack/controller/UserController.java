package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.security.CurrentUser;
import com.zan.mangatrack.security.HasUserRole;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@HasUserRole
public class UserController {

    @GetMapping("/me")
    public UserPrincipal getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return currentUser;
    }
}
