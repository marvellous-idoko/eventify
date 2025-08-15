var express = require("express");
const { pay, verifyTransaction } = require("./modules/pay");
const router = express.Router();
module.exports = router;


router.get("/buy-ticket", (req, res) => {

  try {
    console.log(req.query, 10)
    pay(res, req.query.price, req.query.email)
  }
  catch (e) {
    res.statusCode(500).json({ msg: 'Error Occured', e })
    console.log(e)
  }
})
router.get("/verify-transaction", (req, res) => {

  try {
    console.log(req.query, 10)
    verifyTransaction(res, req.query.reference, req.query.trxn__id)
  }
  catch (e) {
    res.statusCode(500).json({ msg: 'Error Occured', e })
    console.log(e)
  }
})
