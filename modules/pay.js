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
        options.body = JSON.stringify({ email, amount: parseFloat(amount) * 100, callback_url: `http://localhost:3000/verify-trxn?trxn__id=${generateRandomCharacters(10)}` });
        console.log(options)

        let r = await (await fetch(
            `${process.env.PAYSTACKURL}/transaction/initialize`,
            options,
        )).json()
        console.log(r)
    }
    catch (e) {
        res.statusCode(500).json({ msg: 'Error Occured', e })
        console.error(e)
    }
}
async function verifyTransaction(res, ref, trxn__id) {
    let options = { method: "GET", headers, redirect: "follow" };

    try {
        // options.body = JSON.stringify({ email, amount: parseFloat(amount) * 100, callback_url:`http://localhost:3000/verify-trxn?trxn__id=${generateRandomCharacters(10)}` });
        console.log(options)
        const trxn = await transactions.findOne({ trxn__id, reference })

        let r = await (await fetch(
            `${process.env.PAYSTACKURL}/transaction/verify/${reference}`,
            options,
        )).json()

        console.log(r)
    }
    catch (e) {
        res.statusCode(500).json({ msg: 'Error Occured', e })
        console.error(e)
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