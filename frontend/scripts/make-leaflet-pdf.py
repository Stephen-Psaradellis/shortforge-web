"""Render /websites to a PDF leaflet.

Single source of truth: the PDF is printed from the live page, so it can never
drift from what is on the site. Run `npm run dev` first, then:

    python scripts/make-leaflet-pdf.py [output.pdf]
"""
import sys
import pathlib
from playwright.sync_api import sync_playwright

URL = "http://localhost:3000/websites"
DEFAULT_OUT = pathlib.Path(__file__).resolve().parents[1] / "public" / "shortforge-websites.pdf"


def main() -> None:
    out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUT
    out.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1100, "height": 1400})
        page.goto(URL, wait_until="networkidle", timeout=90000)

        # Force every lazy image in before printing, or the proof shots come out blank.
        page.evaluate("""async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 400) {
            window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
          await Promise.all([...document.images]
            .filter(i => !i.complete)
            .map(i => new Promise(r => { i.onload = i.onerror = r; })));
        }""")
        page.wait_for_timeout(1200)
        page.emulate_media(media="print")

        page.pdf(
            path=str(out),
            format="Letter",
            print_background=True,
        )
        browser.close()

    print(f"{out}  ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
