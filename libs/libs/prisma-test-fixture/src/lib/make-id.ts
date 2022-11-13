/**
 * 明示的な ID とバッティングしないような数値を選ぶ
 */
let nextId = 90000;

export function makeId(prefix = '') {
  return prefix + nextId++;
}
