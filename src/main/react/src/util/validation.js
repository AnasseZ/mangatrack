export const canFetchUpdatedInformations = lastFetchDateInformations => {
    //const timePassed = Date.now() - lastFetchDateInformations;

    // console.log("il s'est passé " + timePassed * 1000);
    // 15 minutes
    //return timePassed >= 900000;
    return true;
};

export const passwordOk = (passwordValue, passwordAgainValue) => {
    if (
        passwordValue !== "" &&
        passwordValue === passwordAgainValue &&
        passwordValue.length >= 8 &&
        passwordValue.length <= 100
    ) {
        return true;
    }

    return false;
};