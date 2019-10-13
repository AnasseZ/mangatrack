export const canFetchUpdatedInformations = lastFetchDateInformations => {
    //const timePassed = Date.now() - lastFetchDateInformations;

    // console.log("il s'est passé " + timePassed * 1000);
    // 15 minutes
    //return timePassed >= 900000;
    return true;
};