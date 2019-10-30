import {apiRoot, mangaRoot, mangadexApiRoot} from "../constantes/apiInformations";
import { get, post, put } from "../util/http";


/** MANGATRACKED MANGAS **/
export const postMangaTracked = (data, doWhenOK, doWhenError, token) => {
  post(apiRoot + "api/mangas-tracked", data, doWhenOK, doWhenError, token);
};

export const updateLastChapterRead = (data, doWhenOK, doWhenError, token) => {
  put(
    apiRoot + "api/mangas-tracked/" + data.id,
    data,
    doWhenOK,
    doWhenError,
    token
  );
};

export const getMangasTracked = (doWhenOK, doWhenError) => {
  get(apiRoot + "api/mangas-tracked", doWhenOK, doWhenError, true);
};


/**  MANGADEX MANGAS FROM OUR API **/
export const searchMangaByName = (mangaName, page, doWhenOK, doWhenError, token) => {
  get(apiRoot + mangaRoot + "/search/" + mangaName + "?page=" + page, doWhenOK, doWhenError, token);
};

export const updateManga = (data, doWhenOK, doWhenError, token) => {
  put(apiRoot + "api/search_mangas/" + data.id , data, doWhenOK, doWhenError, token);
};

export const getUpdatedInformations = (id, doWhenOK, doWhenError, token) => {
  get(apiRoot + "api/mangas/" + id + "/updated-informations", doWhenOK, doWhenError, token);
};

export const getMangaTrackedUpdatedInformations = (id, doWhenOK, doWhenError, token) => {
  get(apiRoot + "api/mangas-tracked/" + id + "/updated-informations", doWhenOK, doWhenError, token);
};



/** MANGADEX MANGAS FROM MANGADEX API **/

export const getMangaInformations = (mangaId, doWhenOK, doWhenError) => {
  get(mangadexApiRoot + mangaId, doWhenOK, doWhenError);
};