import css from "css";
import Rules from "./rules.js";

export default (selector: string, declaration: css.Declaration, position: css.Position | undefined, media: string, rules: Rules): boolean => {
  let fails = false;
  if (rules[selector]) {
    if (rules[selector][media]) {
      if (rules[selector][media][declaration.property || '']) {
        fails = true;
        console.error(`${declaration.property} of ${selector} overwrites a previous definition in line ${position?.line} for media ${media}.`);
      }
    }
    if (media !== '' && rules[selector]['']) {
      if (rules[selector][''][declaration.property || ''] && rules[selector][''][declaration.property || ''] === declaration.value || '') {
        fails = true;
        console.error(`${declaration.property} of ${selector} overwrites a previous definition in line ${position?.line} general with the same value.`);
      }
    }
  }
  rules[selector] = rules[selector] || {};
  rules[selector][media] = rules[selector][media] || {};
  rules[selector][media][declaration.property || ''] = declaration.value || '';
  return fails;
}
