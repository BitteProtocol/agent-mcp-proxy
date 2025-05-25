// scripts/build.cjs
const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const domain = process.env.VERCEL_URL || 'localhost:3000';

console.log('domain', domain);
console.log('VERCEL_URL env var:', process.env.VERCEL_URL);

// Replace both possible patterns
let updatedHtml = html
  .replace(
    'https://localhost:3000/mcp?agentId={YOUR_AGENT_ID}',
    `https://${domain}/mcp?agentId={YOUR_AGENT_ID}`
  )
  .replace(
    'https://{process.env.VERCEL_URL}/mcp?agentId={YOUR_AGENT_ID}',
    `https://${domain}/mcp?agentId={YOUR_AGENT_ID}`
  );

fs.writeFileSync('public/index.html', updatedHtml);
console.log('Build complete - HTML updated');
console.log('Updated content includes:', updatedHtml.includes(`https://${domain}/mcp`));