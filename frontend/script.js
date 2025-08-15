const BASE_URL = 'https://eventify.onrender.com/api'
function buy(price) {
    email = document.getElementById('inputEmail')
    email.style.display = 'block'
    console.log(email.value)
    if (email.value.length < 1) {
        alert('email required')
        return;
    }
    if (!email.value.includes('@') || !email.value.includes('.')) {
        alert('enter valid email')
        return;
    }
    document.getElementById('btn').innerHTML = "Loading . . ."
    fetch(`${BASE_URL}/buy-ticket?price=${price}&email=${email.value}`).catch((e)=>{
        if(e)console.error(e);
    }).
    catch((e)=>{
        console.error(e)
        alert('An error occured! try again')
    }).
    then(async (r)=>{
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return r.json();
    }).then((r)=>{
        if(r.status){
            window.location.replace(r.data.authorization_url)
        }
    })
}
function verifyTrxn(ref, trxn__id) {
    fetch(`${BASE_URL}/verify-transaction?reference=${ref}&trxn__id=${trxn__id}`).catch((e) => {
        if (e) console.error(e);
    })
        .
        catch((e) => {
            console.error(e)
            alert('An error occured! try again')
        }).
        then(async (r) => {
            if (!r.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return r.json();
        }).then((r) => {
            if (r.status) {
                document.getElementById('text').innerHTML = 'Payment Verified.'
            }
        })
}
const urlParams = new URLSearchParams(window.location.search);
if (
    urlParams.has('reference') &&
    urlParams.has('trxn__id')
) {
    verifyTrxn(urlParams.get('reference'), urlParams.get('trxn__id'))
}
