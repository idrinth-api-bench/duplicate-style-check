import css from "css";
import Media from "./media.js";
import RuleStore from "./rule-store.js";

export default (selector: string, declaration: css.Declaration, position: css.Position, media: Media, rules: RuleStore): boolean => {
  let fails = false;
  const property = declaration.property || '';
  const latest = rules.latest(selector, media, property);
  if (latest) {
    if (latest.media.toString() === media.toString()) {
      fails = true;
      console.error(`${property} of ${selector} in line:column ${position.line}:${position.column} overwrites a previous definition for the same @media in line:column ${latest.line}:${latest.column}.`);
    } else if (latest.value === declaration.value) {
      fails = true;
      console.error(`${property} of ${selector} in line:column ${position.line}:${position.column} overwrites a previous definition in line:column ${latest.line}:${latest.column} with the same value.`);
    }
  }
  rules.add(selector, media, property, declaration.value, position.line, position.column)
  return fails;
}
