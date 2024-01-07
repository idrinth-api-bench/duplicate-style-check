import css from 'css';
import {readFileSync} from 'fs';

interface Rules {
    [selector:string]: {
        [media:string]: {
            [property:string]: string
        }
    }
}
const handleDeclaration = (selector: string, declaration: css.Declaration, position: css.Position|undefined, media: string, rules: Rules): boolean => {
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
const handleRule = (rule: css.Rule, rules: Rules, media: string = '') => {
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
const handleAtRule = (rule: css.Media, rules: Rules): boolean => {
  let fails = false;
  for (const rul of rule.rules || []) {
    fails = handleRule(rul, rules, rule.media) || fails;
  }
  return fails;
};
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
