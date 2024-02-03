import css from 'css';
import {readFileSync} from 'fs';
import handleRule from "./handle-rule.js";
import handleAtRule from "./handle-at-rule.js";
import Media from "./media.js";
import RuleStore from "./rule-store.js";

const handleFile = (file: string, ruleStore: RuleStore|undefined = undefined, parentMedia: Media|undefined = undefined): boolean => {
  const rules = ruleStore || new RuleStore();
  const media = parentMedia || new Media('');
  let fails = false;
  const code = css.parse(readFileSync(file, 'utf8'), {
    source: file,
  });
  for (const rule of (code.stylesheet?.rules || [])) {
    if (rule.type === 'rule') {
      const rul: css.Rule = rule;
      fails = handleRule(rul, rules, media, rul.position.source) || fails;
    } else if(rule.type === 'media') {
      const rul: css.Media = rule;
      fails = handleAtRule(rul, rules, media.createChild(rul.media)) || fails;
    } else if (rule.type === 'import') {
      const rul: css.Import = rule;
      if (rul.import.match(/^[^/]/,)) {
        fails = handleFile(file.replace(/[\\/].*?\.css$/, '/') + rul.import, rules, media);
      }
    }
  }
  return !fails;
};
export default handleFile;
