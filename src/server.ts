import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const server = createServer(app);

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, message: 'Hello World' });
});

export async function startServer(): Promise<void> {
  return new Promise((resolve, rejects) => {
    try {
      server.listen(process.moon.server.port, () => {
        console.log('Server is listenning on port:', process.moon.server.port);
        resolve();
      });
    } catch (error) {
      rejects(error);
    }
  });
}
