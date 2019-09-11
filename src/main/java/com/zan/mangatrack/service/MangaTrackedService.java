package com.zan.mangatrack.service;

import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.business.User;
import com.zan.mangatrack.business.UserPrincipal;
import com.zan.mangatrack.repository.MangaTrackedRepository;
import com.zan.mangatrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MangaTrackedService {

    @Autowired
    MangaTrackedRepository mangaTrackedRepository;

    @Autowired
    UserRepository userRepository;

    public List<MangaTrackedBo> list() {
        return this.mangaTrackedRepository.findAll();
    }

    public Optional<MangaTrackedBo> get(final long id) {
        return this.mangaTrackedRepository.findById(id);
    }

    public MangaTrackedBo persist(final MangaTrackedBo mangaTrackedBo, final UserPrincipal currentUser) {
        Optional<User> retrievedUser = userRepository.findById(currentUser.getId());
        mangaTrackedBo.setUser(retrievedUser.get());
        return this.mangaTrackedRepository.save(mangaTrackedBo);
    }
}
