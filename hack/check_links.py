#!/usr/bin/env python3
"""Checks a built site for broken internal links and for old WordPress URLs that no longer resolve.

Usage: python3 hack/check_links.py [public-dir]
Exits non-zero if any internal link or any URL in hack/old-urls.txt is missing.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
SITE_HOST = 'dok.community'


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if value and ((tag in ('a', 'link') and name == 'href') or (tag in ('img', 'script', 'source', 'iframe') and name == 'src')):
                self.links.append(value)
            elif value and name == 'srcset':
                self.links.extend(part.strip().split(' ')[0] for part in value.split(','))


def exists(public, path):
    path = unquote(path.split('#')[0].split('?')[0])
    target = public / path.lstrip('/')
    return target.is_file() or (target / 'index.html').is_file()


def main():
    public = Path(sys.argv[1] if len(sys.argv) > 1 else 'public').resolve()
    broken = {}
    for page in public.rglob('*.html'):
        parser = LinkParser()
        parser.feed(page.read_text(encoding='utf-8', errors='replace'))
        base = '/' + page.parent.relative_to(public).as_posix() + '/'
        for link in parser.links:
            url = urlparse(link)
            if url.scheme in ('mailto', 'tel', 'javascript', 'data') or link.startswith('#'):
                continue
            if url.netloc and url.netloc != SITE_HOST:
                continue
            path = url.path if url.path.startswith('/') else base + url.path
            path = re.sub(r'/\./', '/', path)
            if path and not exists(public, path):
                broken.setdefault(path, set()).add('/' + page.relative_to(public).as_posix())

    old_missing = [u for u in (ROOT / 'old-urls.txt').read_text().split() if not exists(public, u)]

    for path, pages in sorted(broken.items()):
        print(f'BROKEN {path}  (on {len(pages)} page(s), e.g. {sorted(pages)[0]})')
    for u in old_missing:
        print(f'OLD URL MISSING {u}')
    print(f'{len(broken)} broken internal link targets, {len(old_missing)} old URLs missing')
    sys.exit(1 if broken or old_missing else 0)


if __name__ == '__main__':
    main()
