package com.zan.mangatrack.business;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UserProfil {

    private Long id;

    @NotBlank
    @Size(min = 3, max = 40)
    private String username;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    private String newPassword;

    private String newPasswordAgain;

    private boolean modifyPassword;
}
