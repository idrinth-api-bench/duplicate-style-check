import Media from "./media.js";
import Rule from "./rule.js";
import Rules from "./rules.js";

export default class RuleStore {
  private index = 0;
  private data: Rules = {};
  public latest(selector: string, media: Media, property: string): Rule|undefined
  {
    if (typeof this.data[selector] === 'undefined' || typeof this.data[selector][property] === 'undefined') {
      return;
    }
    let latest: Rule = undefined;
    for (const md of Object.keys(this.data[selector][property])) {
      if(media.contains(this.data[selector][property][md].media)) {
        if (typeof latest === 'undefined') {
          latest = this.data[selector][property][md];
        } else if (latest.index < this.data[selector][property][md].index) {
          latest = this.data[selector][property][md];
        }
      }
    }
    return latest;
  }
  public add(
    selector: string,
    media: Media,
    property: string,
    value: string,
    line: number|undefined = undefined,
    column: number|undefined = undefined,
    file: string|undefined = undefined,
  ): void {
    this.data[selector] = this.data[selector] || {};
    this.data[selector][property] = this.data[selector][property] || {};
    this.data[selector][property][media.toString()] = new Rule(selector, property, media, value, this.index, line, column, file);
    this.index++;
  }
}
