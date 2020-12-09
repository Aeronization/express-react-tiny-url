const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database')

const app = express();

const port = process.env.PORT || 5000;

// Body parser middleware. Url encoded.
app.use(bodyParser.urlencoded ({ extended: false }));
app.use(bodyParser.json());



/* (R. Friel - December 08, 2020) -  Here are our api routes that handle our core logic. */
const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect')
app.use('/api/redirect', redirect);



/* (R. Friel - December 08, 2020) - These are our paths on express. "/" is basically for testing.
We are about the "/:hash" more as this will redirect the user to their website. */
app.get('/', (request, response) => {
    response.send("hello world");
})

app.get('/:hash', (request, response) => {
    const hash = request.params.hash

    console.log(hash)

    let sql = 'SELECT * FROM urls WHERE hash = ?'

    connection.query(sql, [hash], (error, result) => {

        if (result.length > 0) {

            /* (R. Friel - December 08, 2020) - Need to include http here for redirect to work. */
            console.log(result[0].url)
            // response.redirect('http://' + result[0].url)
            response.redirect(result[0].url)

        } else {
            /* (R. Friel - December 08, 2020) - Using an invalid hash, just redirect to homepage. Try again. */
            response.redirect('/')
        }
    })

})




/* (R. Friel - December 08, 2020) -  So each time we start the server we make sure the urls Table is available. */
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

    // Ensure the database table is created on server start.
    let sql = 'CREATE TABLE IF NOT EXISTS urls(hash VARCHAR(255) PRIMARY KEY, url TEXT not NULL, clicks INT not NULL)';
    connection.query(sql, (error, result) => {
        if (error) {
            throw error;
        } else {
            // console.log(result)
        }
    })
})