/**
 * Poem DB object shape.
 */
export interface Poem {
  title: string;
  author: string;
  lines: Array<string>;
  linecount: number;
}
