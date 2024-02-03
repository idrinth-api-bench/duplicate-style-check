import css from "css";
import Media from "./media.js";
import RuleStore from "./rule-store.js";

export default (selector: string, declaration: css.Declaration, position: css.Position, media: Media, rules: RuleStore, file: string): boolean => {
  let fails = false;
  const property = declaration.property || '';
  const latest = rules.latest(selector, media, property);
  if (latest) {
    if (latest.media.toString() === media.toString()) {
      fails = true;
      console.error(`${property} of ${selector} in file:line:column ${file}:${position.line}:${position.column} overwrites a previous definition for the same @media in file:line:column ${latest.file}:${latest.line}:${latest.column}.`);
    } else if (latest.value === declaration.value) {
      fails = true;
      console.error(`${property} of ${selector} in file:line:column ${file}:${position.line}:${position.column} overwrites a previous definition in file:line:column ${latest.file}:${latest.line}:${latest.column} with the same value.`);
    }
  }
  rules.add(selector, media, property, declaration.value, position.line, position.column, file)
  return fails;
}
