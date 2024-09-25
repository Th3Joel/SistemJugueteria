export enum ResTypeMessages {
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  VALIDATION = "Validation"
}

//Response

export type IErrors<T> = T;
export type IData<T> = T;

export interface IResponseFetch<T> {
  status: boolean;
  msj: string;
  type: string;
  errors?: IErrors<T>;
  find: IData<T>
  all: IAll<T>
}
//Datos de tabla
export interface IAll<T> {
  data: T[]
  count: number
  pages: number
  page: number
  pageSize: number
}

export interface IParams {
  [key: string]: string
  id: string
}
export interface IRes{
  status: boolean
  msj: string
}