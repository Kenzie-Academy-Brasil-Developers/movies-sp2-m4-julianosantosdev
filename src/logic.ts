import { Request, Response } from 'express';
import { client } from './database';
import { QueryResult } from 'pg';
import { IMovie } from './interfaces';

/* ----------------------------------- POST ---------------------------------- */

const createMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  // const newMovie = request.body;
  // return response.json(newMovie).send();

  const queryString = `INSERT INTO movies
    (name, category, duration, price)
    VALUES ('filme teste', 'ação', 120, 10)
    RETURNING *;`;

  const queryReturn: QueryResult<IMovie> = await client.query(queryString);

  console.log(queryReturn);

  return response.status(201).json(queryReturn.rows[0]);
};

/* -------------------------------- GET ------------------------------- */
const listAllMovies = (request: Request, response: Response): Response => {
  return response.json('funcionando').send();
};

/* -------------------------------- GET BY ID ------------------------------- */
const listMoviesByID = (request: Request, response: Response): Response => {
  return response.json('funcionando').send();
};

/* ---------------------------------- POST ---------------------------------- */
const updateMovie = (request: Request, response: Response): Response => {
  return response.json('funcionando').send();
};

/* --------------------------------- DELETE --------------------------------- */

const deleteMovie = (request: Request, response: Response): Response => {
  return response.json('funcionando').send();
};

export { createMovie, listAllMovies, listMoviesByID, updateMovie, deleteMovie };
