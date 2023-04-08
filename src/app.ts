import express, { Application, json } from 'express';
import { startDatabase } from './database';

/* --------------------------------- SERVER SETTINGS --------------------------------- */
const listeningPort = 3000;
const serverRunningMessage = `Server is running on http://localhost:${listeningPort}`;
const app: Application = express();
app.listen(listeningPort, async () => {
  startDatabase();
  console.log(serverRunningMessage);
});
app.use(json());

/* --------------------------------- ROUTES --------------------------------- */
