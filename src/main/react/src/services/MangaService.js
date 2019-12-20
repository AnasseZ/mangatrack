import {apiRoot, mangaRoot, API_MANGATRACKED_ROOT} from "../constantes/apiInformations";
import { get, post, put } from "../util/http";

/** MANGATRACKED MANGAS **/
export const postMangaTracked = (data, doWhenOK, doWhenError, token) => {
  post(apiRoot + API_MANGATRACKED_ROOT, data, doWhenOK, doWhenError, token);
};

export const getMangaTracked = (id, doWhenOK, doWhenError) => {
  get(apiRoot + API_MANGATRACKED_ROOT + id , doWhenOK, doWhenError, true);
};

export const updateLastChapterRead = (data, doWhenOK, doWhenError, token) => {
  put(
    apiRoot + API_MANGATRACKED_ROOT + data.id,
    data,
    doWhenOK,
    doWhenError,
    token
  );
};

export const getMangasTracked = (doWhenOK, doWhenError) => {
  get(apiRoot + API_MANGATRACKED_ROOT, doWhenOK, doWhenError, true);
};

export const getMangaTrackedUpdatedInformations = (id, doWhenOK, doWhenError, token) => {
  get(apiRoot + API_MANGATRACKED_ROOT + id + "/updated-informations", doWhenOK, doWhenError, token);
};

/** MANGAS **/
export const searchMangaByName = (mangaName, page, doWhenOK, doWhenError, token) => {
  get(apiRoot + mangaRoot + "search/" + mangaName + "?page=" + page, doWhenOK, doWhenError, token);
};

export const getUpdatedInformations = (id, doWhenOK, doWhenError, token) => {
  get(apiRoot + mangaRoot + id + "/updated-informations", doWhenOK, doWhenError, token);
};

