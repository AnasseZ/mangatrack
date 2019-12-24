package com.zan.mangatrack.mapper;

import com.zan.mangatrack.business.MangaStatusBo;
import com.zan.mangatrack.dto.MangaStatusDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MangaStatusMapper {


    MangaStatusBo toBo(MangaStatusDto mangaStatusDto);

    List<MangaStatusBo> toBo(List<MangaStatusDto> mangaStatusDtos);

    MangaStatusDto toDto(MangaStatusBo mangaStatusBo);

    List<MangaStatusDto> toDto(List<MangaStatusBo> mangaStatusBoList);
}
