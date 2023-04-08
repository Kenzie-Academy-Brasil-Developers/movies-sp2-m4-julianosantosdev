import express, { Application, json } from 'express';
import { startDatabase } from './database';
import {
  createMovie,
  deleteMovie,
  listAllMovies,
  listMoviesByID,
  updateMovie,
} from './logic';

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
app.post('/movies', createMovie);
app.get('/movies', listAllMovies);
app.get('/movies/:id', listMoviesByID);
app.patch('/movies/:id', updateMovie);
app.delete('movies/:id', deleteMovie);
