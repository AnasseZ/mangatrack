import {apiRoot, mangaRoot, mangadexApiRoot} from "../constantes/apiInformations";
import { get, post, put } from "../util/http";


export const postManga = (data, doWhenOK, doWhenError, token) => {
  post(apiRoot + "api/search_mangas", data, doWhenOK, doWhenError, token);
};

export const getMangasByUser = (userId, doWhenOK, doWhenError, token) => {
  get(
    apiRoot + "api/users/" + userId + "/search_mangas",
    doWhenOK,
    doWhenError,
    token
  );
};


/**  MANGADEX MANGAS FROM OUR API **/
export const searchMangaByName = (mangaName, page, doWhenOK, doWhenError, token) => {
  get(apiRoot + mangaRoot + "/search/" + mangaName + "?page=" + page, doWhenOK, doWhenError, token);
};

export const updateManga = (data, doWhenOK, doWhenError, token) => {
  put(apiRoot + "api/search_mangas/" + data.id , data, doWhenOK, doWhenError, token);
};

export const getLastChapterOut = (id, doWhenOK, doWhenError, token) => {
  get(apiRoot + "api/mangas/" + id + "/lastChapterOut", doWhenOK, doWhenError, token);
};



/** MANGADEX MANGAS FROM MANGADEX API **/

export const getMangaInformations = (mangaId, doWhenOK, doWhenError) => {
  get(mangadexApiRoot + mangaId, doWhenOK, doWhenError);
};