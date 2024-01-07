#!/usr/bin/env node
import lint from '../src/index.js';

process.exit(lint(process.argv[2] || process.cwd()) ? 1 : 0);
