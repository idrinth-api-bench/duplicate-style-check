# Duplicate Style Check

This small tool checks for two cases of duplication so far:

- a rule's property has been defined before in the same media set
- a rule's property duplicates the value of the media query less rule

## Usage

Run `ilcd folder` or skip the folder and link the cwd recursively. The following patterns are ignored:

- node_modules
- dist
- coverage
