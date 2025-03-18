import { Response } from 'express';
import camelize from 'camelize';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
};

type Meta = {
  currentPage: number;
  recordsPerPage: number;
  totalRecords: number;
  previousPage?: number;
  nextPage?: number;
  lastPage: number;
};

export const initializeMeta: Meta = {
  currentPage: 0,
  recordsPerPage: 0,
  totalRecords: 0,
  lastPage: 0,
};

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  meta?: Meta
) => {
  res.set(headers);
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data: data ? camelize(data) : null,
    meta: meta || null,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null
) => {
  res.set(headers);
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: data ? camelize(data) : null,
  });
};

export const pagination = (
  data: any,
  totalRecords: number,
  currentPage: number,
  limit: number
) => {
  const lastPage = Math.ceil(totalRecords / limit);
  const meta: Meta = {
    currentPage,
    recordsPerPage: limit,
    totalRecords,
    lastPage,
    previousPage: currentPage > 1 ? currentPage - 1 : undefined,
    nextPage: currentPage < lastPage ? currentPage + 1 : undefined,
  };

  return {
    data: camelize(data),
    meta,
  };
};
