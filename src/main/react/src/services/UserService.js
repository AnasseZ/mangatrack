import { apiRoot } from "../constantes/apiInformations";
import { get, post } from "../util/http";

export const getUserById = (userId, token, doWhenOK, doWhenError) => {
  get(apiRoot + "api/users/" + userId, doWhenOK, doWhenError, token);
};


export const getUserToken = (username, password,doWhenOK, doWhenError) => {
  post(
    apiRoot + "api/login_check",
    {
      username: username,
      password: password
    },
    doWhenOK,
    doWhenError
  );
}

export const register = (data, doWhenOK, doWhenError) => {
  post(apiRoot + "register", data, doWhenOK, doWhenError);
}