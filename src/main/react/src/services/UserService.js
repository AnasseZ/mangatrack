import { apiRoot } from "../constantes/apiInformations";
import { get, post, put } from "../util/http";

export const getCurrentUser = (token, doWhenOK, doWhenError) => {
  get(apiRoot + "api/users/me", doWhenOK, doWhenError, token);
};


export const getUserToken = (username, password,doWhenOK, doWhenError) => {
  post(
    apiRoot + "auth/signin",
    {
      usernameOrEmail: username,
      password: password
    },
    doWhenOK,
    doWhenError
  );
};

export const register = (data, doWhenOK, doWhenError) => {
  post(apiRoot + "auth/signup", data, doWhenOK, doWhenError);
};

export const updateUser = (id, data, doWhenOK, doWhenError) => {
    put(apiRoot + "api/users/" + id, data, doWhenOK, doWhenError, true);
};