const fs = require('fs');
const p = 'd:/TECHNOGUIDE_INFOSOFT/day16/Day-16-AI-Resume-Builder/js/script.js';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/\\`/g, '`');
c = c.replace(/\\\$\{/g, '${');
c = c.replace(/\\\\n/g, '\\n');
fs.writeFileSync(p, c);
