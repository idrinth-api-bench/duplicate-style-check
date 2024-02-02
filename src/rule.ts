import Media from "./media.js";

export default class Rule {
  constructor(
    public readonly selector: string,
    public readonly property: string,
    public readonly media: Media,
    public readonly value: string,
    public readonly index: number,
    public readonly line: number|undefined = undefined,
    public readonly column: number|undefined = undefined,
  ) {
  }
}
