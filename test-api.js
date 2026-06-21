const https = require('https');
const fs = require('fs');
const path = require('path');

// Read .env.local directly
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const apiKey = envContent.split('\n').find(line => line.startsWith('ANTHROPIC_API_KEY='))?.split('=')[1]?.trim();

console.log('API Key from .env.local:', apiKey ? 'YES - starts with ' + apiKey.substring(0, 15) + '...' : 'NO - KEY IS MISSING');
console.log('API Key ends with:', apiKey ? apiKey.substring(apiKey.length - 10) : 'N/A');
console.log('Full API Key:', apiKey);
console.log('---');

const data = JSON.stringify({
  model: 'claude-sonnet-4-6',
  max_tokens: 100,
  messages: [{ role: 'user', content: 'Say hello in one word.' }]
});

const options = {
  hostname: 'api.anthropic.com',
  path: '/v1/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01'
  }
};

console.log('Making request to api.anthropic.com...');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
  console.error('Full error:', e);
});

req.write(data);
req.end();
