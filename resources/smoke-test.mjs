// Run with a local preview server and Edge headless on port 9227.
import assert from 'node:assert/strict';

const tabs = await (await fetch('http://127.0.0.1:9227/json')).json();
const tab = tabs.find(item => item.url.includes('127.0.0.1:8765'));
assert(tab, '本地预览页面未打开');
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let sequence = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (!pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id); pending.delete(message.id);
  message.error ? reject(new Error(message.error.message)) : resolve(message.result);
});
function command(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
const pause = () => new Promise(resolve => setTimeout(resolve, 250));
async function waitFor(expression) {
  for (let attempt = 0; attempt < 20; attempt++) {
    if (await evaluate(expression)) return;
    await pause();
  }
  throw new Error(`页面未就绪：${expression}`);
}

await evaluate("location.href='http://127.0.0.1:8765/green-cross.html'");
await waitFor("document.querySelectorAll('.month-card').length === 12");
await evaluate('localStorage.clear(); location.reload()');
await waitFor("document.querySelectorAll('.month-card').length === 12");
assert.equal(await evaluate("document.querySelectorAll('.month-card').length"), 12);
assert.equal(await evaluate("document.querySelectorAll('.month-card:first-child .day:not(.invalid)').length"), 31);
await evaluate("document.querySelector('[data-action=report]').click()");
const date = await evaluate("document.querySelector('#report-date').value");
await evaluate("document.querySelector('#submit-report').click()");
assert.match(await evaluate("document.querySelector('#toast').textContent"), /已提交/);
assert.equal(await evaluate("document.querySelectorAll('#hierarchy [data-type=person]').length"), 0);
assert.equal(await evaluate("[...document.querySelectorAll('.month-card:nth-child(2) .cross-grid>*')].findIndex(x=>x.textContent==='28')"), 39);
assert.equal(await evaluate("[...document.querySelectorAll('.month-card:nth-child(7) .cross-grid>*')].findIndex(x=>x.textContent==='31')"), 45);
await evaluate("document.querySelector('[data-view=attention]').click()");
await waitFor("document.querySelectorAll('#attention-days .attention-day:not(.blank)').length >= 28");
assert.match(await evaluate("document.querySelector('#attention-detail').textContent"), /查询结果|日期尚未到达/);
await evaluate("document.querySelector('[data-action=configure-exempt]').click()");
assert.equal(await evaluate("document.querySelectorAll('[data-exempt-person]').length"), 14);
await evaluate("document.querySelector('[data-action=close-overlay]').click()");

await evaluate("location.href='http://127.0.0.1:8765/index.html'");
await waitFor("document.querySelectorAll('.team-card').length > 0");
await evaluate("document.querySelector('[data-action=new-team]').click()");
await evaluate("document.querySelector('#team-name').value='演示测试班'");
await evaluate("document.querySelector('#save-team').click()");
assert.match(await evaluate("document.querySelector('#team-list').textContent"), /演示测试班/);

socket.close();
console.log('交互冒烟检查通过：31格十字、日期对齐、双页签、月历明细、免填配置、班组新增。');
