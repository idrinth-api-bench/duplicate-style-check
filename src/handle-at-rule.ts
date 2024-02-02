import css from "css";
import handleRule from "./handle-rule.js";
import Media from "./media.js";
import RuleStore from "./rule-store.js";

const handleAtRule = (rule: css.Media, rules: RuleStore, media: Media): boolean => {
  let fails = false;
  for (const rul of rule.rules || []) {
    if (rul.type === 'rule') {
      fails = handleRule(rul, rules, media) || fails;
    } else if (rul.type === 'media') {
      fails = handleAtRule(rul, rules, media.createChild(rul.media || '',))
    }
  }
  return fails;
};
export default handleAtRule;
