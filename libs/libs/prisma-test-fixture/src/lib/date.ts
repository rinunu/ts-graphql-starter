import parse from 'date-fns/parse';

/**
 * 2022-10-10
 */
export function date(s: string | Date | null | undefined) {
  if (!s) {
    return null;
  }

  if (s instanceof Date) {
    return s;
  }

  return parse(s, 'yyyy-MM-dd', new Date());
}
