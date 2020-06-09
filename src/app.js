import express from 'express';
import body_parser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';

import * as routes from './routes';

const app = express();
const server = new http.Server(app);

app.set('trust proxy', true);

app.use(helmet());

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

app.use(cors());

app.use(...Object.values(routes));

app.use('*', (req, res) => {
  res.status(404).end();
});

const port = process.env.PORT || 3005;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
