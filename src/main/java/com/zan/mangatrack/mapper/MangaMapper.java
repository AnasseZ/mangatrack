package com.zan.mangatrack.mapper;

import com.zan.mangatrack.business.MangaBo;
import com.zan.mangatrack.dto.MangaDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface MangaMapper {

    MangaBo toBo(MangaDto manga);

    MangaDto toDto(MangaBo manga);

    default Page<MangaBo> toBo(Page<MangaDto> mangas) {
        return mangas.map(this::toBo);
    }

    default Page<MangaDto> toDto(Page<MangaBo> mangas) {
        return mangas.map(this::toDto);
    }

    @AfterMapping
    default void setTotalTrackers(MangaBo mangaBo, @MappingTarget MangaDto mangaDto) {
        mangaDto.setNbTrackers(mangaBo.getMangasTracked().size());
    }
}
