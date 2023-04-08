interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

type IMovieFromRequest = Omit<IMovie, 'id'>;

export type { IMovie, IMovieFromRequest };
