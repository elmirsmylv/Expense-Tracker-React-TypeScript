import { Category } from "./category";

export interface RecordState {
  data: Record[];
  loading: boolean;
  error: string;
}

export interface Record {
  id: number;
  title: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
}

export interface RecordForm {
  title: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
}

interface GET_START {
  type: "GET_RECORDS_START";
}

interface GET_SUCCESS {
  type: "GET_RECORDS_SUCCESS";
  payload: Record[];
}

interface GET_ERROR {
  type: "GET_RECORDS_ERROR";
}

export type RecordAction = GET_START | GET_SUCCESS | GET_ERROR;
