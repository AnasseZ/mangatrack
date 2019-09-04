import { apiRoot } from "../constantes/apiInformations";
import { get, post, put } from "../util/http";

export const postManga = (data, doWhenOK, doWhenError, token) => {
  post(apiRoot + "api/mangas", data, doWhenOK, doWhenError, token);
};

export const getMangaTracked = (mangaRef, doWhenOK, doWhenError) => {
  get(apiRoot + "getMangaTracked/" + mangaRef, doWhenOK, doWhenError);
};

export const getMangasByUser = (userId, doWhenOK, doWhenError, token) => {
  get(
    apiRoot + "api/users/" + userId + "/mangas",
    doWhenOK,
    doWhenError,
    token
  );
};

export const searchMangaByName = (mangaName, doWhenOK, doWhenError,) => {
  get(apiRoot + "getMatchingByName/" + mangaName, doWhenOK, doWhenError);
}

export const updateManga = (data, doWhenOK, doWhenError, token) => {
  put(apiRoot + "api/mangas/" + data.id , data, doWhenOK, doWhenError, token);
} 