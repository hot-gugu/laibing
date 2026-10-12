const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync('prototype-annotations.js','utf8');
new vm.Script(script);
const documentPath='原型标注.md',original=fs.readFileSync(documentPath,'utf8');
function runtime(cache='[]',fileText=original){
 const ctx={location:{pathname:'/index.html'},window:{PROTOTYPE_ANNOTATIONS:[]},localStorage:{getItem:()=>cache,setItem:(key,value)=>ctx.cached=value},console,Date};
 vm.createContext(ctx);
 let source=script.slice(script.indexOf('const PAGE='),script.indexOf('const root='));
 source+=script.slice(script.indexOf('function cache()'),script.indexOf('async function idb'));
 source+=script.slice(script.indexOf('function persist()'),script.indexOf("$('pa-bind').onclick"));
 source+='\nfunction status(message,error){globalThis.message=message;globalThis.error=error}\nglobalThis.api={parse,merge,persist,records:()=>Object.values(notes),setHandle:value=>handle=value};';
 vm.runInContext(source,ctx);
 ctx.file={queryPermission:async()=> 'granted',getFile:async()=>({text:async()=>fileText}),createWritable:async()=>({write:async text=>{fileText=text},close:async()=>{}})};
 ctx.getFileText=()=>fileText;return ctx;
}
(async()=>{
 const r=runtime();const defaults=r.api.parse(original);assert.equal(defaults.length,36);r.api.merge(defaults);
 const timestamp='2026-10-12T20:00:00.000Z';
 const custom={id:'custom-regression-test',page:'index.html',context:'index.html::page',target:'main',title:'人工新增',body:'第一行\n第二行',updatedAt:timestamp};
 const edit={...defaults[0],title:'人工修改默认',body:'连续输入甲乙',updatedAt:timestamp};
 const move={...defaults[1],offset:{x:76,y:29},updatedAt:timestamp};
 const deleted={...defaults[2],deleted:true,updatedAt:timestamp};
 r.api.merge([custom,edit,move,deleted]);r.api.setHandle(r.file);assert.equal(await r.api.persist(),true);
 const after=r.getFileText();assert(after.includes('custom-regression-test'));assert(after.includes(timestamp));assert.equal(after.slice(0,after.indexOf('<!-- prototype-annotations:start -->')),original.slice(0,original.indexOf('<!-- prototype-annotations:start -->')));
 const fresh=runtime(r.cached,after);fresh.api.merge(fresh.api.parse(after));fresh.api.merge(defaults);const records=fresh.api.records();assert.equal(records.find(n=>n.id===custom.id).body,custom.body);assert.equal(records.find(n=>n.id===edit.id).title,edit.title);assert.equal(records.find(n=>n.id===move.id).offset.x,76);assert.equal(records.find(n=>n.id===deleted.id).deleted,true);
 const cleared=runtime('[]',after);cleared.api.merge(cleared.api.parse(after));assert.equal(cleared.api.records().find(n=>n.id===custom.id).title,custom.title);
 const unbound=runtime();unbound.api.merge([custom]);assert.equal(await unbound.api.persist(),false);assert(unbound.message.includes('尚未写入项目'));
 r.api.setHandle({...r.file,createWritable:async()=>{throw Error('模拟写入失败')}});assert.equal(await r.api.persist(),false);assert(r.message.includes('同步失败'));assert(r.api.records().some(n=>n.id===custom.id));
 assert(script.includes("c.querySelector('input').oninput=e=>draft.title=e.target.value"));assert(script.includes("c.querySelector('textarea').oninput=e=>draft.body=e.target.value"));
 assert(script.includes("if(e.target.closest('button,input,textarea,label,[contenteditable]'))return"));
 for(const page of ['index.html','green-cross.html','visitor-admin.html','visitor.html','安全生产移动端.html','绿十字管理移动端.html','访客管理移动端.html']){const html=fs.readFileSync(page,'utf8');assert.equal((html.match(/src="prototype-annotations.js"/g)||[]).length,1)}
 console.log('通过：7页接入、36条默认标注、人工新增/编辑/移动/删除刷新恢复、清空缓存后文档恢复、托管区外文字保留、同步失败提示。');
})();
// DOM-independent interaction checks for explicit input handlers and context isolation.
{
const renderSource=script.slice(script.indexOf('function render()'),script.indexOf('function draw()'));
class Card{
 constructor(){this.dataset={};this.controls={}}
 set innerHTML(value){this.html=value;this.controls={input:{},textarea:{}};this.buttons=[...value.matchAll(/data-pa-op="([^"]+)"/g)].map(m=>({dataset:{paOp:m[1]}}))}
 querySelector(q){return this.controls[q]||null}
 querySelectorAll(){return this.buttons}
}
let paints=0;const children=[];const doc={createElement:()=>new Card()};const panel={textContent:''};const cards={replaceChildren:()=>{paints++;children.length=0},append:c=>children.push(c),querySelector:()=>({focus(){}})};
const n={id:'n',page:'index.html',context:'index.html::page',target:'main',title:'原名称',body:'原说明'};
const ctx={document:doc,cards,notes:{n:{...n}},drafts:new Map([['n',{note:{...n},title:n.title,body:n.body}]]),selected:'n',active:true,layer:null,context:n.context,$:()=>panel,current:()=>Object.values(ctx.notes),draw(){},esc:x=>x,status(){},persist:async()=>true,handle:{},confirm:()=>true,Date};
vm.createContext(ctx);vm.runInContext(renderSource+'\nglobalThis.render=render;',ctx);ctx.render();const count=paints,card=children[0];
card.controls.input.oninput({target:{value:'甲'}});card.controls.input.oninput({target:{value:'甲乙'}});card.controls.textarea.oninput({target:{value:'一'}});card.controls.textarea.oninput({target:{value:'一二\n三'}});assert.equal(paints,count);assert.equal(ctx.drafts.get('n').title,'甲乙');assert.equal(ctx.notes.n.title,'原名称');assert.equal(ctx.drafts.get('n').body,'一二\n三');
card.buttons.find(b=>b.dataset.paOp==='cancel').onclick();assert.equal(ctx.notes.n.title,'原名称');assert.equal(ctx.drafts.size,0);
console.log('通过：名称与正文连续输入不重建DOM、不隐式保存，取消保留原记录。');
}
{
const source=script.slice(script.indexOf('function refreshContext()'),script.indexOf('function current()'));
const modal=id=>({textContent:'申请详情 '+id,querySelector:q=>q==='h2,h3'?{textContent:'访客申请详情'}:{textContent:id}});
let top=null;const ctx={PAGE:'visitor-admin.html',context:'visitor-admin.html::page',layer:null,active:true,selecting:false,selected:null,lastBusinessKey:'',instances:new WeakMap(),hash:s=>s,activeLayer:()=>top,document:{querySelectorAll:()=>[],body:{classList:{remove(){}}}},addDefaults(){},waitForLayout(){}};
vm.createContext(ctx);vm.runInContext(source+'\nglobalThis.refresh=refreshContext;',ctx);
ctx.refresh();assert.equal(ctx.context,'visitor-admin.html::page');const outer=modal('LF-ONE');top=outer;ctx.refresh();const one=ctx.context;const inner=modal('LF-CONFIRM');top=inner;ctx.refresh();assert.notEqual(ctx.context,one);top=outer;ctx.refresh();assert.equal(ctx.context,one);
outer.textContent='申请详情 LF-TWO';outer.querySelector=q=>q==='h2,h3'?{textContent:'访客申请详情'}:{textContent:'LF-TWO'};ctx.refresh();assert.notEqual(ctx.context,one);top=null;ctx.refresh();assert.equal(ctx.context,'visitor-admin.html::page');console.log('通过：页面/抽屉/内层上下文切换、逐层恢复、复用DOM不同申请隔离。');
}
