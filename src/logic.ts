/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Request, Response } from 'express';
import { client } from './database';
import { QueryConfig, QueryResult } from 'pg';
import { IMovie, IMovieFromRequest } from './interfaces';
import format from 'pg-format';

/* ----------------------------------- POST ---------------------------------- */

const createMovie = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const newMovie: IMovieFromRequest = request.body;

  const queryString: string = format(
    `
  INSERT INTO 
    movies
    (%I)
  VALUES 
    (%L)
  RETURNING *;
  `,
    Object.keys(newMovie),
    Object.values(newMovie)
  );

  const queryReturn: QueryResult<IMovie> = await client.query(queryString);

  return response.status(201).json(queryReturn.rows[0]);
};

/* -------------------------------- GET ------------------------------- */
const listAllMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const queryParam = request.query.category;

  if (queryParam === 'Animação') {
    const queryString: string = `
      SELECT
        *
      FROM
        movies
      WHERE
        category = $1
    ;`;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [queryParam],
    };

    const queryReturn: QueryResult<IMovie> = await client.query(queryConfig);
    return response.status(200).json(queryReturn.rows);
  }

  const queryString: string = `
    SELECT 
      * 
    FROM 
      movies;
  `;

  const queryReturn: QueryResult<IMovie> = await client.query(queryString);
  return response.status(200).json(queryReturn.rows);
};

/* -------------------------------- GET BY ID ------------------------------- */
const listMovieByID = (request: Request, response: Response): Response => {
  const movieFound: IMovie = response.locals.movieFound;

  return response.status(200).json(movieFound);
};

/* ---------------------------------- PATCH ---------------------------------- */
const updateMovie = (request: Request, response: Response): Response => {
  return response.json('funcionando').send();
};

/* --------------------------------- DELETE --------------------------------- */
const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  const id = request.params.id;

  const quertStringDeleteMovie = format(`
    DELETE FROM 
      movies 
    WHERE 
      id = $1;
  `);

  const queryConfig: QueryConfig = {
    text: quertStringDeleteMovie,
    values: [id],
  };

  await client.query(queryConfig);

  return response.status(204).send();
};

export { createMovie, listAllMovies, listMovieByID, updateMovie, deleteMovie };
