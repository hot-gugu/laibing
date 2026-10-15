from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json, os, threading, tempfile
ROOT = Path(__file__).resolve().parent
LOCK = threading.Lock()
START = "<!-- prototype-annotations:start -->"
END = "<!-- prototype-annotations:end -->"
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def do_GET(self):
        if self.path == "/__prototype_annotations":
            payload = json.dumps({"service": "laibing-prototype-annotations", "text": (ROOT / "原型标注.md").read_text(encoding="utf-8")}, ensure_ascii=False).encode()
            self.send_response(200); self.send_header("Content-Type", "application/json; charset=utf-8"); self.send_header("Cache-Control", "no-store"); self.end_headers(); self.wfile.write(payload)
        else:
            super().do_GET()
    def do_PUT(self):
        if self.path != "/__prototype_annotations":
            self.send_error(404); return
        if self.headers.get("Origin") not in (None, "http://127.0.0.1:8765", "http://localhost:8765") or self.headers.get("X-Prototype-Write") != "1":
            self.send_error(403); return
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 5000000: raise ValueError("Invalid size")
            incoming = self.rfile.read(size).decode("utf-8")
            raw = incoming.split(START, 1)[1].split(END, 1)[0].strip()
            records = json.loads(raw.removeprefix("```json").removesuffix("```").strip())
            if not isinstance(records, list) or any(not isinstance(n, dict) or not n.get("id") for n in records): raise ValueError("Invalid records")
            with LOCK:
                target = ROOT / "原型标注.md"
                existing = target.read_text(encoding="utf-8")
                current_raw = existing.split(START, 1)[1].split(END, 1)[0].strip()
                current = json.loads(current_raw.removeprefix("```json").removesuffix("```").strip())
                merged = {n["id"]: n for n in current}
                for n in records:
                    old = merged.get(n["id"])
                    if old and (old.get("system") is False or old.get("deleted")) and n.get("system") is True: continue
                    if not old or (n.get("system") is False and old.get("system") is True) or n.get("updatedAt", "") > old.get("updatedAt", ""): merged[n["id"]] = n
                block = START + "\n```json\n" + json.dumps(list(merged.values()), ensure_ascii=False, indent=2) + "\n```\n"
                updated = existing.split(START,1)[0] + block + END + existing.split(END,1)[1]
                fd, name = tempfile.mkstemp(dir=ROOT, suffix=".tmp")
                try:
                    with os.fdopen(fd, "w", encoding="utf-8") as stream: stream.write(updated)
                    os.replace(name, target)
                finally:
                    if os.path.exists(name): os.unlink(name)
            self.send_response(204); self.end_headers()
        except Exception as error:
            self.send_error(400, str(error))
if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 8765), Handler).serve_forever()
