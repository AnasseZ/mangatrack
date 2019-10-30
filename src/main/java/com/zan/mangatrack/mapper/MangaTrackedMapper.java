package com.zan.mangatrack.mapper;

import com.zan.mangatrack.business.MangaTrackedBo;
import com.zan.mangatrack.dto.MangaTrackedDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MangaTrackedMapper {

    MangaTrackedBo toBo(MangaTrackedDto mangatracked);

    List<MangaTrackedBo> toBo(List<MangaTrackedDto> mangastracked);

    MangaTrackedDto toDto(MangaTrackedBo mangatracked);

    List<MangaTrackedDto> toDto(List<MangaTrackedBo> mangastracked);
}
