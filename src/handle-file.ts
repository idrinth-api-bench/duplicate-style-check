import css from 'css';
import {readFileSync} from 'fs';
import Rules from "./rules.js";
import handleRule from "./handle-rule.js";
import handleAtRule from "./handle-at-rule.js";

export default(file: string): boolean => {
  const rules: Rules = {};
  let fails = false;
  console.log(file);
  const code = css.parse(readFileSync(file, 'utf8'));
  for (const rule of (code.stylesheet?.rules || [])) {
    if (rule.type === 'rule') {
      fails = handleRule(rule, rules) || fails;
    } else if(rule.type === 'media') {
      fails = handleAtRule(rule, rules) || fails;
    }
  }
  return !fails;
};
