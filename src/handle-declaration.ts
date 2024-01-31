import css from "css";
import Rules from "./rules.js";

export default (selector: string, declaration: css.Declaration, position: css.Position | undefined, media: string, rules: Rules): boolean => {
  let fails = false;
  //todo make sure the media is properly sorted and formatted
  if (rules[selector]) {
    if (rules[selector][media]) {
      if (rules[selector][media][declaration.property || '']) {
        fails = true;
        console.error(`${declaration.property} of ${selector} overwrites a previous definition in line ${position?.line} for media ${media}.`);
      }
    }
    if (media !== '' && rules[selector]) {
      if (rules[selector]['']) {
        if (rules[selector][''][declaration.property || ''] && rules[selector][''][declaration.property || ''] === declaration.value || '') {
          fails = true;
          console.error(`${declaration.property} of ${selector} overwrites a previous definition in line ${position?.line} general with the same value.`);
        }
      }
      const parts = media.split('and',);
      if (parts.length > 1) {
        for (const part of parts) {
          const md = part.replace(/^\s+|\s+$/gu, '');
          if (rules[selector][md] && rules[selector][md][declaration.property || ''] && rules[selector][md][declaration.property || ''] === declaration.value || '') {
            fails = true;
            console.error(`${declaration.property} of ${selector} overwrites a previous definition in line ${position?.line} @media ${md} with the same value.`);
          }
        }
      }
    }
  }
  rules[selector] = rules[selector] || {};
  rules[selector][media] = rules[selector][media] || {};
  rules[selector][media][declaration.property || ''] = declaration.value || '';
  return fails;
}
