package com.zan.mangatrack.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("hasRole('USER')")
public @interface HasUserRole {
}
