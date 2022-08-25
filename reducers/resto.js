export default function (restoSelected=[], action) {
    if (action.type === 'addRestoSelected') {
        var restoSelectedCopy= [];
        restoSelectedCopy.push(action.restoSelected);
        // console.log(JSON.stringify(restoSelectedCopy));
        // console.log(restoSelectedCopy)

        return restoSelectedCopy;
    } else {
        return restoSelected;
    }
}