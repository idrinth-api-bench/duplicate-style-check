import Rule from "./rule.js";

export default interface Rules {
  [selector: string]: {
    [property: string]: {
      [media: string]: Rule
    }
  }
}
