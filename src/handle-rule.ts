import css from "css";
import handleDeclaration from "./handle-declaration.js";
import Media from "./media.js";
import RuleStore from "./rule-store.js";

export default (rule: css.Rule, rules: RuleStore, media: Media, file: string|undefined) => {
  let fails = false;
  for (const selector of rule.selectors || []) {
    for (const declaration of rule.declarations || []) {
      if (declaration.type === 'declaration') {
        fails = handleDeclaration(selector, declaration, rule.position?.start, media, rules, file) || fails;
      }
    }
  }
  return fails;
};
