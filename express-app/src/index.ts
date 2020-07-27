import * as express from "express";
import { rootHandler, helloHandler } from "./handlers";

const app = express();
const port = 3000;

app.get('/', rootHandler);
app.get('/hello', helloHandler);

app.listen(port, err => {
    if (err) console.error(err);
    else console.log(`Server is listening on ${port}`);
});
