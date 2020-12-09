const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const connection = require('../../database')

// Handle CORS for time being.
router.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

router.get('/test', (request, response) => {
    response.json( {msg: 'API is working'} )
})


router.post('/', (request, response) => {

    if (request.body.url) {
        // Logic to find url.
        let url = request.body.url

        // let sql = `SELECT * FROM urls WHERE url = ${url}`
        let sql = 'SELECT * FROM urls WHERE url = ?'

        connection.query(sql, [url], (error, result) => {
            if (result.length > 0) {
                console.log("Url already exists")

                let hash = result[0].hash
                response.json({ url: url, hash: hash, status: 200, statusText: "Ok" })


            } else {
                let hash = uniqid()
                // let sql = `INSERT INTO urls(hash, url, clicks)values(${hash}, ${url}, 1)`
                let sql = 'INSERT INTO urls values(?, ?, 1)'

                connection.query(sql, [hash, url], (error, result) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(result)
                    }
                })

                response.json({ url: url, hash: hash, status: 200, statusText: "Ok" })

            }
        })

    } else {
        // Error.
        // console.log(request)
    }
})


module.exports = router