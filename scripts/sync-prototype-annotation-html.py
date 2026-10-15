"""从原型标注.md托管数据同步HTML阅读页，保留已有页面截图。"""
from pathlib import Path
import re,json,html
ROOT=Path(__file__).resolve().parent.parent
def sync():
    doc=(ROOT/'原型标注.md').read_text(encoding='utf-8')
    match=re.search(r'<!-- prototype-annotations:start -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- prototype-annotations:end -->',doc)
    if not match:raise ValueError('原型标注.md缺少托管数据')
    notes=json.loads(match[1])
    target=next(p for p in ROOT.iterdir() if p.name.lower()=='原型标注.html')
    source=target.read_text(encoding='utf-8')
    groups={}
    for note in notes:
        if note.get('deleted') or note.get('kind')=='layer-instance' or '::layer::' in note.get('context',''):continue
        groups.setdefault(note['page'],[]).append(note)
    sections=re.findall(r'<section id="([^"]+)">([\s\S]*?)</section>',source)
    pages=[];used=set()
    for id,content in sections:
        link=re.search(r'<header>[\s\S]*?<a href="([^"]+)"',content)
        if not link:continue
        page=html.unescape(link[1]);used.add(page)
        # Keep header and screenshots, regenerate descriptions from the Markdown data.
        prefix=content.split('<h3>二、功能说明</h3>')[0]
        pages.append((id,page,prefix))
    for page in groups:
        if page in used:continue
        id='page-'+str(len(pages)+1);title=page.removesuffix('.html')
        prefix=f'<header><span class="number">{len(pages)+1:02}</span><h2>{html.escape(title)}</h2><a href="{html.escape(page,quote=True)}" target="_blank" rel="noopener">打开原型页面 ↗</a></header>'
        pages.append((id,page,prefix))
    output=[];links=[]
    for id,page,prefix in pages:
        title=re.search(r'<h2>(.*?)</h2>',prefix)[1]
        links.append(f'<a href="#{id}">{title}</a>')
        rows=[]
        for note in groups.get(page,[]):
            title=html.escape(note.get('title',''));body=html.escape(note.get('body','')).replace('\n','<br>')
            rows.append(f'<li data-annotation-id="{html.escape(note["id"],quote=True)}"><h4>{title}</h4><p>{body}</p></li>')
        output.append(f'<section id="{id}">{prefix}<h3>二、功能说明</h3><ul class="features">'+''.join(rows)+'</ul></section>')
    source=re.sub(r'(<nav[^>]*>)[\s\S]*?</nav>',lambda m:m[1]+'<strong>原型标注 · 页面目录</strong>'+''.join(links)+'</nav>',source,count=1)
    main=source.index('<main>');end=source.index('</main>',main)
    source=source[:main]+'<main><h1>原型标注</h1><p class="intro">功能说明同步自原型标注.md；页面截图为原有截图快照。</p>'+''.join(output)+source[end:]
    target.write_text(source,encoding='utf-8')
    print(f'已同步 {len(pages)} 个页面、{sum(len(v) for v in groups.values())} 条标注')
if __name__=='__main__':sync()
