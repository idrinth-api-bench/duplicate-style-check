#!/usr/bin/env node
import lint from '../src/index.js';

lint(process.argv[2] || process.cwd());
