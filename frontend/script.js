const BASE_URL = 'http://localhost:3000/api'
function buy(price, email) {
    fetch(`${BASE_URL}/buy-ticket?price=${price}&email=idokomarvelous@gmail.com`).catch((e)=>{
        if(e)console.error(e);
    })
}
function verifyTrxn(ref, trxn__id){
    fetch(`${BASE_URL}/verify-transaction?reference=${ref}&trxn__id=${trxn__id}`).catch((e)=>{
        if(e)console.error(e);
    })
}
const urlParams = new URLSearchParams(window.location.search);
if(
    urlParams.has('reference') &&
    urlParams.has('trxn__id') 
){
    verifyTrxn(urlParams.get('reference'), urlParams.get('trxn__id'))
}
