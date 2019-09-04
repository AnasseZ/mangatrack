package com.zan.mangatrack.repository;

import com.zan.mangatrack.business.Role;
import com.zan.mangatrack.business.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
