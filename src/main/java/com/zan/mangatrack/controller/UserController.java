package com.zan.mangatrack.controller;

import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.business.UserProfil;
import com.zan.mangatrack.security.CurrentUser;
import com.zan.mangatrack.security.HasUserRole;
import com.zan.mangatrack.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@HasUserRole
public class UserController {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @GetMapping("/me")
    public UserPrincipal getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return currentUser;
    }

    @PutMapping("/{id}")
    public UserPrincipal update(
            @CurrentUser UserPrincipal currentUser,
            @PathVariable Long id,
            @RequestBody  @Valid UserProfil user
    ) throws Exception {

        final Long currentUserId = currentUser.getId();

        // has right to update
        if (!id.equals(currentUserId) || !user.getId().equals(currentUserId)) {
            throw new Exception("Can't update this user.");
        }

        // want modify the password
        if (user.isModifyPassword()) {

            // check new password
            if (!user.getNewPassword().equals(user.getNewPasswordAgain())) {
                throw new Exception("Differents passwords. Can't update the user.");
            }

            if(user.getNewPassword().length() < 8) {
                throw new Exception("Password under 8 characters.");
            }

            if(user.getNewPassword().length() > 100) {
                throw new Exception("Password longer than 100 characters.");
            }
        }

        return UserPrincipal.create(customUserDetailsService.updateUser(currentUserId, user));
    }
}
