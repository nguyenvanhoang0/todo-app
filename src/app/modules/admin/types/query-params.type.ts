export type IQueryParams = {
  page: number;
  limit: number;
  query?: string | null;
  done?: 0 | 1 | null;
};
