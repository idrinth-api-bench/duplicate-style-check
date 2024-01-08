import css from "css";
import Rules from "./rules.js";
import handleRule from "./handle-rule.js";

export default (rule: css.Media, rules: Rules): boolean => {
  let fails = false;
  for (const rul of rule.rules || []) {
    fails = handleRule(rul, rules, rule.media) || fails;
  }
  return fails;
};
