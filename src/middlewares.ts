/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import format from 'pg-format';
import { client } from './database';
import { IMovie, IMovieFromRequest } from './interfaces';

/* -------------------------------- VERIFY ID ------------------------------- */
const verifyIfMovieExists = async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);

  const queryStringSearchMovie: string = format(`
    SELECT
      *
    FROM
      movies
    WHERE
      id = $1;
  `);

  const queryConfig: QueryConfig = {
    text: queryStringSearchMovie,
    values: [id],
  };

  const queryReturn: QueryResult<IMovie> = await client.query(queryConfig);

  if (queryReturn.rowCount === 0) {
    return response.status(404).json({ error: 'Movie not found!' });
  }

  response.locals.movieFound = queryReturn.rows[0];
  response.locals.id = id;

  return nextFunction();
};

/* ------------------------------- VERIFY NAME ------------------------------ */
const verifyIfNameExists = async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
): Promise<Response | void> => {
  const movie: IMovieFromRequest = request.body;

  const queryStringSearchName = format(`
    SELECT
      *
    FROM
      movies
    WHERE
      name = $1
    `);

  const queryConfig: QueryConfig = {
    text: queryStringSearchName,
    values: [movie.name],
  };

  const QueryReturn: QueryResult = await client.query(queryConfig);

  if (QueryReturn.rowCount > 0) {
    return response.status(409).json({ error: 'Movie name already exists!' });
  }

  return nextFunction();
};

export { verifyIfMovieExists, verifyIfNameExists };
