const express = require('express');
const router = express.Router();
const connection = require('../../database')



router.get('/', (request, response) => {

    const hash = request.headers.hash;

    // let sql = `SELECT * FROM urls WHERE hash = ${hash}`
    let sql = 'SELECT * FROM urls WHERE hash = ?'

    connection.query(sql, [hash], (error, result) => {

        if (result.length > 0) {

            console.log(result)
            response.json({ url: result[0].url })

        } else {

            response.json({ status: 400, code: "Invalid Hash" })
        }
    })

})

module.exports = router;