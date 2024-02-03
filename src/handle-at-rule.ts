import css from "css";
import handleRule from "./handle-rule.js";
import Media from "./media.js";
import RuleStore from "./rule-store.js";
import handleFile from "./handle-file.js";

const handleAtRule = (rule: css.Media, rules: RuleStore, media: Media): boolean => {
  let fails = false;
  for (const rul of rule.rules || []) {
    if (rul.type === 'rule') {
      const ru: css.Rule = rul;
      fails = handleRule(ru, rules, media, ru.position.source) || fails;
    } else if (rul.type === 'media') {
      const ru: css.Media = rul;
      fails = handleAtRule(ru, rules, media.createChild(ru.media || '',))
    } else if (rul.type === 'import') {
      const ru: css.Import = rul;
      if (rul.import.match(/^[^/]/,)) {
        fails = handleFile(ru.position.source.replace(/[\\/].*?\.css$/, '/') + ru.import, rules, media);
      }
    }
  }
  return fails;
};
export default handleAtRule;
