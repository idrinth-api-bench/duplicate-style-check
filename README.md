# Duplicate Style Check

This small tool checks for two cases of duplication so far:

- a rule's property has been defined before in the same media set
- a rule's property duplicates the value of the media query less rule

## Usage

Run `ilcd folder` or skip the folder and link the cwd recursively. The `node_modules` are ignored as file origin.

Add a `.idrinth-duplicate-style-check.json` configuration file in the cwd to define entry points to get better results, example:

```json
{
  "entrypoints": [
    "index.css",
    "src/hidden.css"
  ]
}
```
And yes, this can be run with npx as well: `npx @idrinth/duplicate-style-check`
