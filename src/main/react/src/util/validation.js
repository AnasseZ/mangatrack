export const canFetchUpdatedInformations = lastFetchDateInformations => {
    //const timePassed = Date.now() - lastFetchDateInformations;

    // console.log("il s'est passé " + timePassed * 1000);
    // 15 minutes
    //return timePassed >= 900000;
    return true;
};

export const passwordsOk = (p1, p2) => {
    return passwordOk(p1) && samePasswords(p1, p2);
};

export const passwordOk = password => {
    return textNotNull(password) && passwordRangeOk(password);
};

export const textNotNull = text => text !== '';
export const samePasswords = (p1, p2) => p1 === p2;

export const passwordRangeOk = password => password.length >= 8 &&
    password.length <= 100;