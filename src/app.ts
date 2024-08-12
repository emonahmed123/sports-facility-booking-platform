import express from 'express';
import cors from 'cors';
import router from './app/routes';
import gobleErrorhandler from './app/middleware/gobleErrorhandler';
import notFound from './app/middleware/Notfound';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(gobleErrorhandler);
app.use(notFound);
export default app;
