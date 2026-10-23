/* Shared visit-purpose configuration for the static management and visitor pages. */
(()=>{
  'use strict';
  const KEY='gt-visitor-purpose-tags-v1';
  const read=()=>{try{const data=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(data)?data.filter(x=>typeof x==='string'&&x.trim()&&Array.from(x).length<=10):[]}catch{return[]}};
  const write=tags=>{try{localStorage.setItem(KEY,JSON.stringify(tags));return true}catch{toast('保存失败，浏览器存储不可用');return false}};
  const validate=(value,tags,except=-1)=>{const text=value.trim();if(!text)return'请输入到访事由标签';if(Array.from(text).length>10)return'每个标签最多10个字';if(tags.some((x,i)=>i!==except&&x===text))return'该标签已存在';return''};
  if(document.body.dataset.view==='admin'){
    const content=document.querySelector('.admin-content'),menu=document.getElementById('parameters-menu'),visits=document.querySelector('.admin-sidebar nav a'),crumb=document.querySelector('.admin-topbar b'),roles=document.querySelector('.role-switch');
    const panel=document.createElement('main');panel.className='admin-content';panel.id='parameters-panel';panel.hidden=true;
    panel.innerHTML='<div class="admin-heading"><h1>参数配置</h1></div><div class="visit-time-tabs" role="tablist" aria-label="参数配置"><button class="active" type="button" role="tab" id="basic-info-tab" aria-selected="true" aria-controls="basic-info">基础信息</button></div><section id="basic-info" role="tabpanel" aria-labelledby="basic-info-tab" class="parameter-card"><h2>到访事由标签</h2><form id="purpose-add" class="purpose-editor"><input aria-label="新增到访事由标签" placeholder="请输入标签，最多10个字" required><small id="purpose-length">0 / 10</small><button class="btn primary" type="submit">新增标签</button></form><div id="purpose-config-list" class="parameter-list"></div></section>';
    content.after(panel);
    const show=()=>{const active=location.hash==='#parameters';content.hidden=active;panel.hidden=!active;roles.hidden=active;menu.classList.toggle('active',active);visits.classList.toggle('active',!active);crumb.textContent=active?'参数配置':'访客管理';if(active)render()};
    visits.onclick=e=>{e.preventDefault();if(location.hash)location.hash='';else show()};window.addEventListener('hashchange',show);
    const add=panel.querySelector('#purpose-add'),input=add.querySelector('input');input.addEventListener('input',()=>{input.setCustomValidity('');panel.querySelector('#purpose-length').textContent=Array.from(input.value).length+' / 10'});
    add.onsubmit=e=>{e.preventDefault();const tags=read(),error=validate(input.value,tags);if(error){input.setCustomValidity(error);input.reportValidity();return}if(write([...tags,input.value.trim()])){input.value='';panel.querySelector('#purpose-length').textContent='0 / 10';render();toast('标签已添加')}};
    function render(){const list=panel.querySelector('#purpose-config-list'),tags=read();list.replaceChildren();if(!tags.length){list.innerHTML='<div class="parameter-empty"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="7" y="11" width="34" height="28" rx="4" stroke="currentColor"/><path d="M15 20h18M15 27h12" stroke="currentColor"/></svg><p>暂无到访事由标签</p></div>';return}tags.forEach((tag,index)=>{const row=document.createElement('form');row.className='purpose-editor';const edit=document.createElement('input');edit.value=tag;edit.required=true;edit.setAttribute('aria-label','到访事由标签 '+(index+1));edit.oninput=()=>edit.setCustomValidity('');const save=document.createElement('button');save.type='submit';save.className='row-btn';save.textContent='保存';const remove=document.createElement('button');remove.type='button';remove.className='row-btn danger';remove.textContent='删除';row.append(edit,save,remove);row.onsubmit=e=>{e.preventDefault();const current=read();if(current[index]!==tag)return toast('配置已更新，请重新进入页面');const error=validate(edit.value,current,index);if(error){edit.setCustomValidity(error);edit.reportValidity();return}current[index]=edit.value.trim();if(write(current)){render();toast('标签已保存')}};remove.onclick=()=>{if(!confirm('确认删除“'+tag+'”标签？'))return;const current=read();if(current[index]!==tag)return toast('配置已更新，请重新进入页面');current.splice(index,1);if(write(current)){render();toast('标签已删除')}};list.append(row)})}
    show();
  }
  if(document.body.dataset.view==='visitor'){
    const field=document.querySelector('[name="purpose"]'),tags=document.createElement('div');tags.className='purpose-shortcuts';tags.setAttribute('role','group');tags.setAttribute('aria-label','快捷到访事由');field.after(tags);
    const sync=()=>tags.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===field.value)));
    const render=()=>{tags.replaceChildren();read().forEach(text=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=()=>{field.value=text;field.dispatchEvent(new Event('input',{bubbles:true}));field.focus()};tags.append(b)});tags.hidden=!tags.children.length;sync()};
    field.addEventListener('input',sync);window.addEventListener('storage',e=>{if(e.key===KEY)render()});document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});render();
  }
})();
