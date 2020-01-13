import {tokenName} from "../constantes/apiInformations";

const request = (url, requestOptions, doWhenOK, doWhenError, params = null) => {
    if (params) {
        url = url + `?${params}`
    }

    fetch(url, requestOptions)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            throw new Error("error");
        })
        .then(
            result => {
                // resultat certes mais probleme lors de la requete donc erreur quand même
                if (result.code !== undefined && result.message !== undefined) {
                    doWhenError(result);
                } else {
                    doWhenOK(result);
                }
            },
            error => {
                doWhenError(error);
            }
        );
};

const authHeaders = (token = null) =>
    token ? {Authorization: `Bearer ${localStorage.getItem(tokenName)}`} : {};

export const get = (url, doWhenOK, doWhenError, token = null) =>
    request(
        url,
        {
            method: "GET",
            headers: authHeaders(token)
        },
        doWhenOK,
        doWhenError
    );

export const post = (url, data, doWhenOK, doWhenError, token = null) =>
    request(
        url,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: Object.assign(
                {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                authHeaders(token)
            )
        },
        doWhenOK,
        doWhenError
    );

export const put = (url, data, doWhenOK, doWhenError, token = null, params = null) =>
    request(
        url,
        {
            method: "PUT",
            body: JSON.stringify(data),
            headers: Object.assign(
                {
                    "Content-Type": "application/ld+json"
                },
                authHeaders(token)
            )
        },
        doWhenOK,
        doWhenError,
        params
    );

export const deleteRequest = (url, doWhenOK, doWhenError, token = null) =>
    request(
        url,
        {
            method: "DELETE",
            headers: authHeaders(token)
        },
        doWhenOK,
        doWhenError
    );
