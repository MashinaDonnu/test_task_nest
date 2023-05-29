export type TSortOptions<T> = {
  [key in keyof T]?: 'ASC' | 'DESC';
};
