import css from 'css';
import {readFileSync} from 'fs';

interface Rules {
    [selector:string]: {
        [media:string]: {
            [property:string]: string
        }
    }
}
const handleDeclaration = (selector: string, declaration: css.Declaration, position: css.Position|undefined, media: string, rules: Rules) => {
    if (rules[selector]) {
        if (rules[selector][media]) {
            if (rules[selector][media][declaration.property || '']) {
                console.error(`${declaration.property} of ${selector} overwrites a previous definition in line ${position?.line} for media ${media}.`);
            }
        }
        if (media !== '' && rules[selector]['']) {
            if (rules[selector][''][declaration.property || ''] && rules[selector][''][declaration.property || ''] === declaration.value || '') {
                console.error(`${declaration.property} of ${selector} overwrites a previous definition in line ${position?.line} general with the same value.`);
            }
        }
    }
    rules[selector] = rules[selector] || {};
    rules[selector][media] = rules[selector][media] || {};
    rules[selector][media][declaration.property || ''] = declaration.value || '';
}
const handleRule = (rule: css.Rule, rules: Rules, media: string = '') => {
    for (const selector of rule.selectors || []) {
        for (const declaration of rule.declarations || []) {
            if (declaration.type === 'declaration') {
                handleDeclaration(selector, declaration, rule.position?.start, media, rules);
            }
        }
    }
};
const handleAtRule = (rule: css.Media, rules: Rules) => {
    for (const rul of rule.rules || []) {
        handleRule(rul, rules, rule.media)
    }
};
export default(file: string): void => {
    const rules: Rules = {};
    console.log(file);
    const code = css.parse(readFileSync(file, 'utf8'));
    for (const rule of (code.stylesheet?.rules || [])) {
        if (rule.type === 'rule') {
            handleRule(rule, rules)
        } else if(rule.type === 'media') {
            handleAtRule(rule, rules);
        }
    }
};
