import css from "css";
import Rules from "./rules.js";
import handleDeclaration from "./handle-declaration.js";

export default (rule: css.Rule, rules: Rules, media: string = '') => {
  let fails = false;
  for (const selector of rule.selectors || []) {
    for (const declaration of rule.declarations || []) {
      if (declaration.type === 'declaration') {
        fails = handleDeclaration(selector, declaration, rule.position?.start, media, rules) || fails;
      }
    }
  }
  return fails;
};
