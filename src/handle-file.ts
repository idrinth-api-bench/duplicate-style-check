import css from 'css';
import {readFileSync} from 'fs';
import handleRule from "./handle-rule.js";
import handleAtRule from "./handle-at-rule.js";
import Media from "./media.js";
import RuleStore from "./rule-store.js";

export default(file: string): boolean => {
  const rules = new RuleStore();
  let fails = false;
  console.log(file);
  const code = css.parse(readFileSync(file, 'utf8'));
  for (const rule of (code.stylesheet?.rules || [])) {
    if (rule.type === 'rule') {
      fails = handleRule(rule, rules, new Media('')) || fails;
    } else if(rule.type === 'media') {
      fails = handleAtRule(rule, rules, new Media(rule.media || '')) || fails;
    }
  }
  return !fails;
};
