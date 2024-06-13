import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routerApi from './routes/routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(compression());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/', routerApi);

app.get('/test', async(req,res)=> {
    res.send("Hola");
})

app.use(express.static(__dirname+'/browser/'))

app.get('*', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'browser', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Servidor escuhando en el puerto " + port);
})
