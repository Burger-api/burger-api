import express from 'express';
import body_parser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';

import token_middleware from './middlewares/token';
import auth_middleware from './middlewares/auth';

import * as routes from './routes';

const app = express();
const server = new http.Server(app);

app.set('trust proxy', true);

app.use(helmet());

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

app.use(token_middleware);
app.use(auth_middleware);

app.use(cors());

app.use(...Object.values(routes));

app.use('*', (req, res) => {
  res.status(404).end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
