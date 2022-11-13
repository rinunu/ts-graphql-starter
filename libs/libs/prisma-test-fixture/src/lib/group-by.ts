/**
 * https://qiita.com/nagtkk/items/e1cc3f929b61b1882bd1
 */
export const groupBy = <K, V>(
  array: readonly V[],
  getKey: (cur: V, i: number, src: readonly V[]) => K
): [K, V[]][] =>
  Array.from(
    array.reduce((map, cur, i, src) => {
      const key = getKey(cur, i, src);
      const list = map.get(key);
      if (list) {
        list.push(cur);
      } else {
        map.set(key, [cur]);
      }
      return map;
    }, new Map<K, V[]>())
  );
