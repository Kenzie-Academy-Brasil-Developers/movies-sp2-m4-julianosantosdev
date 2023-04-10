import express, { Application, json } from 'express';
import { startDatabase } from './database';
import {
  createMovie,
  deleteMovie,
  listAllMovies,
  listMovieByID,
  updateMovie,
} from './logic';
import { verifyIfMovieExists, verifyIfNameExists } from './middlewares';

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
app.post('/movies', verifyIfNameExists, createMovie);
app.get('/movies', listAllMovies);
app.get('/movies/:id', verifyIfMovieExists, listMovieByID);
app.patch('/movies/:id', verifyIfMovieExists, verifyIfNameExists, updateMovie);
app.delete('/movies/:id', verifyIfMovieExists, deleteMovie);
