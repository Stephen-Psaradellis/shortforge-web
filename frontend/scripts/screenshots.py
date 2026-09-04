"""Full-page screenshots of every route at phone and desktop widths.

Run `npm run dev` first, then:

    python scripts/screenshots.py [outdir] [route ...]

Defaults to frontend/.screenshots (gitignored) and every public route.
"""
import pathlib
import sys

from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
ROUTES = [
    "/",
    "/websites",
    "/automation",
    "/work/chicago-street-markets",
    "/about",
    "/contact",
    "/privacy",
    "/websites/leaflet",
    "/this-page-does-not-exist",
]
SIZES = {"phone": (390, 844), "desktop": (1440, 900)}


def main() -> None:
    args = sys.argv[1:]
    out = (
        pathlib.Path(args[0])
        if args
        else pathlib.Path(__file__).resolve().parents[1] / ".screenshots"
    )
    routes = args[1:] or ROUTES
    out.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        for size_name, (w, h) in SIZES.items():
            ctx = browser.new_context(viewport={"width": w, "height": h})
            page = ctx.new_page()
            for route in routes:
                page.goto(BASE + route, wait_until="networkidle", timeout=90000)
                # Walk the page so lazy images load and in-view reveals fire.
                page.evaluate(
                    """async () => {
                      document.documentElement.style.scrollBehavior = 'auto';
                      for (let y = 0; y < document.body.scrollHeight; y += 500) {
                        window.scrollTo(0, y);
                        await new Promise(r => setTimeout(r, 80));
                      }
                      window.scrollTo(0, 0);
                    }"""
                )
                page.wait_for_timeout(700)
                slug = route.strip("/").replace("/", "-") or "home"
                target = out / f"{slug}.{size_name}.png"
                page.screenshot(path=str(target), full_page=True)
                print(target)
            ctx.close()
        browser.close()


if __name__ == "__main__":
    main()
