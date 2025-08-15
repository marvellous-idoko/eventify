const crypto = require('crypto');
const transactions = require('../schemas/transactions');

const params = JSON.stringify({
    "email": "customer@email.com",
    "amount": "20000"
})
let headers = {
    Authorization: `Bearer ${process.env.PAYSTACKTOKEN}`,
    'Content-Type': 'application/json'

}
async function pay(res, amount, email) {
    let options = { method: "POST", headers, redirect: "follow" };

    try {
        const tId = generateRandomCharacters(10)
        options.body = JSON.stringify({ email, amount: parseFloat(amount) * 100, callback_url: `${process.env.BASE_URL}/verify-trxn?trxn__id=${tId}` });

        let r = await (await fetch(
            `${process.env.PAYSTACKURL}/transaction/initialize`,
            options,
        )).json()
        if (r.status) {
            let trxn = new transactions({
                ...r.data,
                amount,
                trxn__id: tId

            }).save()
            console.log(await trxn)
            res.json(r)
        }
    }
    catch (e) {
        res.statusCode(500).json({ msg: 'Error Occured', e })
        console.error(e)
    }
}
async function verifyTransaction(res, reference, trxn__id) {
    let options = { method: "GET", headers, redirect: "follow" };

    try {
        const trxn = await transactions.findOne({ trxn__id, reference })
        console.log(trxn)
        let r = await (await fetch(
            `${process.env.PAYSTACKURL}/transaction/verify/${reference}`,
            options,
        )).json()
        if (r.status) {
            if (r.status && parseFloat(r.data.amount) / 100 == parseFloat(trxn.amount))
                res.json(r)
            else {
                console.error('fraud detected')
            }
        }

    }
    catch (e) {
        console.error(e)
        res.statusCode(500).json({ msg: 'Error Occured', e })
    }
}
function generateRandomCharacters(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    const randomBytes = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
        result += characters.charAt(randomBytes[i] % charactersLength);
    }

    return result;
}

// Generate 10 random characters
const randomChars = generateRandomCharacters(10);

module.exports = { pay, verifyTransaction }