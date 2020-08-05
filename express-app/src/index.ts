import * as express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('receive');
    res.send(`You send request from [My IP: ${req.headers['x-real-ip']}] | [Load Balancer IP: ${req.connection.remoteAddress}] to [Server IP: ${req.connection.localAddress}]`);
} );

app.listen(port, err => {
    if (err) console.error(err);
    else console.log(`Server is listening on ${port}`);
});
