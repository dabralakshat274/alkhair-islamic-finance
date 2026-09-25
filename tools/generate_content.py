"""Converts each downloaded page's Elementor markup into a TypeScript content file for the React project.
Applies the Bank -> Finance rebrand and rewrites links to the new routes."""
import json, re, html as htmlmod
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

SRC = Path(__file__).parent / "original-pages"
OUT = Path(__file__).parent.parent / "src" / "content" / "pages"
OUT.mkdir(parents=True, exist_ok=True)

PAGES = [
    # file, route, key
    ("home", "/", "home"),
    ("alkhair", "/alkhair", "alkhair"),
    ("alkhair-baitulmaal-co-op-credit-soc", "/alkhair-baitulmaal-co-op-credit-soc", "baitulmaal"),
    ("alkhair-bank-aurangabad", "/alkhair-finance-aurangabad", "aurangabad"),
    ("alkhair-finance", "/alkhair-finance", "finance"),
    ("alkhair-islamic-bank", "/alkhair-islamic-finance", "islamicFinance"),
    ("alkhair-loan", "/alkhair-loan", "loan"),
    ("contact", "/contact", "contact"),
]

# old site paths -> new routes (also covers the broken al-khair-* links used in the footer)
ROUTE_MAP = {
    "": "/", "/": "/",
    "/contact": "/contact", "/contact/": "/contact",
    "/alkhair/": "/alkhair", "/al-khair/": "/alkhair",
    "/alkhair-baitulmaal-co-op-credit-soc/": "/alkhair-baitulmaal-co-op-credit-soc",
    "/al-khair-baitulmaal-co-op-credit-soc/": "/alkhair-baitulmaal-co-op-credit-soc",
    "/alkhair-bank-aurangabad/": "/alkhair-finance-aurangabad", "/al-khair-bank-aurangabad/": "/alkhair-finance-aurangabad",
    "/alkhair-finance/": "/alkhair-finance", "/al-khair-finance/": "/alkhair-finance",
    "/alkhair-islamic-bank/": "/alkhair-islamic-finance", "/al-khair-islamic-bank/": "/alkhair-islamic-finance",
    "/alkhair-loan/": "/alkhair-loan",
}

IMAGE_KEYS = {
    "depositphotos_130975284-stock-photo-young-disappointed-arab.webp": "hero",
    "AlKhairBiharMPOs29may2022.jpeg": "office",
    "location-3.png": "iconLocation",
    "time.png": "iconPhone",
    "send.png": "iconContact",
}


def rebrand(s: str) -> str:
    """Bank -> Finance, case preserved. 'the bank' on its own becomes 'the finance company';
    'bank statements' (a document type) is left alone."""
    if not s:
        return s
    s = s.replace("bank statements", "\u0000STATEMENTS\u0000")
    s = re.sub(r"\b([Tt])he bank\b", lambda m: m.group(1) + "he finance company", s)
    s = re.sub(r"\bBANK\b", "FINANCE", s)
    s = re.sub(r"\bBank\b", "Finance", s)
    s = re.sub(r"\bbank\b", "finance", s)
    return s.replace("\u0000STATEMENTS\u0000", "bank statements")


def route_for(href: str) -> str:
    href = htmlmod.unescape(href or "")
    for dom in ("https://www.alkhairsocietys.org.in", "https://www.alkhairbanksociety.org.in"):
        if href.startswith(dom):
            href = href[len(dom):]
    if href.startswith("/") or href == "":
        return ROUTE_MAP.get(href, ROUTE_MAP.get(href.rstrip("/") + "/", href))
    return href


def classes(tag: Tag) -> str:
    return " ".join(tag.get("class", []))


def widget_type(tag: Tag):
    wt = tag.get("data-widget_type")
    return wt.split(".")[0] if wt else None


def inner_html(tag: Tag) -> str:
    return rebrand(tag.decode_contents().strip())


def convert(tag: Tag):
    cls = classes(tag)
    wt = widget_type(tag)
    base = {"id": tag.get("data-id"), "className": cls}
    if tag.get("data-settings"):
        base["settings"] = tag["data-settings"]
    if wt == "heading":
        h = tag.find(re.compile(r"^h[1-6]$"))
        return {"type": "heading", **base, "tag": h.name, "text": rebrand(h.get_text(" ", strip=True))}
    if wt == "text-editor":
        return {"type": "text", **base, "html": inner_html(tag)}
    if wt == "button":
        a = tag.find("a")
        return {"type": "button", **base, "to": route_for(a.get("href")), "text": rebrand(a.get_text(strip=True))}
    if wt == "image":
        img = tag.find("img")
        name = img["src"].rsplit("/", 1)[-1]
        return {"type": "image", **base, "image": IMAGE_KEYS[name], "width": int(img.get("width", 0)),
                "height": int(img.get("height", 0)), "alt": rebrand(img.get("alt", "")), "imgClass": " ".join(img.get("class", []))}
    if wt == "formidable":
        return {"type": "form", **base}
    if wt == "image-box":
        img = tag.find("img")
        name = img["src"].rsplit("/", 1)[-1]
        return {"type": "image-box", **base, "image": IMAGE_KEYS[name],
                "title": rebrand(tag.select_one(".elementor-image-box-title").get_text(strip=True)),
                "description": rebrand(tag.select_one(".elementor-image-box-description").get_text(strip=True))}
    if tag.name == "section" and "elementor-section" in cls:
        cols = []
        for col in tag.select(":scope > .elementor-container > .elementor-column"):
            wrap = col.select_one(":scope > .elementor-widget-wrap")
            cols.append({"id": col.get("data-id"), "className": classes(col), "wrapClass": classes(wrap),
                         "children": [convert(c) for c in wrap.children if isinstance(c, Tag)]})
        return {"type": "section", **base, "columns": cols}
    if "e-con" in cls.split():
        return {"type": "container", **base, "children": [convert(c) for c in tag.children if isinstance(c, Tag)]}
    raise SystemExit(f"unhandled element: <{tag.name} class='{cls}'>")


def meta(soup: BeautifulSoup, name: str) -> str:
    m = soup.find("meta", attrs={"name": name})
    return rebrand(m["content"]) if m else ""


out_index = []
for fname, route, key in PAGES:
    soup = BeautifulSoup((SRC / f"{fname}.html").read_text(encoding="utf-8"), "html.parser")
    root = soup.select_one("main .elementor[data-elementor-type]")
    nodes = [convert(c) for c in root.children if isinstance(c, Tag)]
    page_header = None
    ph = soup.select_one("main header.page-header")
    if ph:
        page_header = {"title": rebrand(ph.select_one(".page-header-title").get_text(strip=True)),
                       "crumb": rebrand(ph.select_one(".trail-end").get_text(strip=True))}
    body_classes = [c for c in soup.body.get("class", []) if not c.startswith(("wp-singular", "wp-embed", "wp-theme", "wp-custom"))]
    page = {
        "key": key,
        "route": route,
        "postId": int(root["data-elementor-id"]),
        "elementorType": root["data-elementor-type"],
        "title": rebrand(soup.title.get_text(strip=True)),
        "description": meta(soup, "description"),
        "keywords": meta(soup, "keywords"),
        "bodyClasses": body_classes,
        "pageHeader": page_header,
        "nodes": nodes,
    }
    ts = "import type { PageContent } from \"../types\";\n\n" \
         f"export const {key}Page: PageContent = " + json.dumps(page, ensure_ascii=False, indent=2) + ";\n"
    (OUT / f"{key}.ts").write_text(ts, encoding="utf-8")
    out_index.append(key)
    print(f"{key:15} {route:38} nodes={len(nodes)} bytes={len(ts)}")

(OUT / "index.ts").write_text(
    "".join(f"export {{ {k}Page }} from \"./{k}\";\n" for k in out_index)
    + "\nimport type { PageContent } from \"../types\";\n"
    + "".join(f"import {{ {k}Page }} from \"./{k}\";\n" for k in out_index)
    + "\nexport const pages: PageContent[] = [" + ", ".join(f"{k}Page" for k in out_index) + "];\n",
    encoding="utf-8",
)

# sanity: any 'bank' left in generated text (other than 'bank statements')?
left = set()
for f in OUT.glob("*.ts"):
    for m in re.finditer(r"[^\"]{0,25}\bbank\b[^\"]{0,25}", f.read_text(encoding="utf-8"), flags=re.I):
        left.add(m.group(0))
print("remaining 'bank' mentions:", left or "none")
