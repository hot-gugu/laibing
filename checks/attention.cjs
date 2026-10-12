const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('green-cross.html', 'utf8');
const script = html.match(/<script data-source="app.js">([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
function fn(name) {
  const start = script.indexOf(`  function ${name}(`);
  const end = script.indexOf('\n  function ', start + 1);
  return script.slice(start, end);
}
const setup = script.slice(script.indexOf("  const KEY"), script.indexOf('  function toast('));
const sandbox = { document: { body: { dataset: { page: 'cross' } } }, localStorage: { getItem: () => null, setItem() {} }, console, assert };
vm.runInNewContext(setup + ['grade', 'recordKey', 'assignmentAt', 'memberInObject', 'membersOf', 'attentionResult', 'dept', 'teamNameAt', 'team', 'attentionExportRows'].map(fn).join('\n') + `
const month = today.slice(0,7);
for (const [day, expected] of [[2,null],[3,'slight'],[4,'minor'],[5,'serious'],[6,'death']]) {
  const date = month+'-'+String(day).padStart(2,'0');
  if(date > today) continue;
  const result = attentionResult(date);
  assert.equal(result.top?.id ?? null, expected);
  if (!expected) assert.ok(result.missing.length);
}
const result = attentionResult(today);
assert.ok(result.accidents.length && result.missing.length, 'Default date needs accidents and missing reports');
currentObject = {type:'team',id:'t2'};
assert.ok(attentionResult(today).accidents.length && attentionResult(today).missing.length);
attentionFilter = 'missing';
let exported = attentionExportRows();
assert.equal(exported.length, attentionResult(today).missing.length);
assert.ok(exported.every(row => row[6] === '未填报' && row[0] === today));
attentionFilter = 'accident';
exported = attentionExportRows();
assert.equal(exported.length, attentionResult(today).accidents.length);
attentionSearch = exported[0][1];
assert.equal(attentionExportRows().length, 1);
attentionSearch = '不存在的人';
assert.equal(attentionExportRows().length, 0);
attentionDate = '2999-01-01';
assert.equal(attentionExportRows().length, 0);
console.log('PASS: export date, status filter, name search, no matches, future date');
const snapshot = JSON.stringify(data);
ensureDemoAccidents(data);
assert.equal(JSON.stringify(data), snapshot, 'Migration must run once');
console.log('PASS: script syntax, five date states, default mixed results, team scope, migration idempotence');
`, sandbox);
assert.match(html, /attention-calendar\{align-self:stretch/);
assert.match(html, /result.missing.length \? '#6654f7'/);
console.log('PASS: equal-height CSS and distinct missing-report color');

assert.match(html, /grid-template-columns:minmax\(0,2fr\) minmax\(0,3fr\)/);
assert.match(html, /grid-template-rows:repeat\(6,minmax\(0,1fr\)\)/);
assert.match(html, /overflow-y:auto;margin-top:0/);
assert.match(html, /case 'export-attention': exportAttention\(\);/);
console.log('PASS: 2:3 columns, six-week grid, list scrolling, export action wiring');
