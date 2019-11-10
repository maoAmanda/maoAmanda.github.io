! function() {
    var a = window,
        b = document,
        c = b.documentElement,
        d = "clientWidth",
        e = "addEventListener",
        f = "orientationchange",
        g = "resize",
        h = "DOMContentLoaded",
        i = 16,
        j = c.getAttribute("data-pagewidth") || 750,
        k = function() {
            c[d] && (c.style.fontSize = 16 * 100 * (Math.min(750, c[d]) / j) / i + "px")
        };
    try {
        i = window.getComputedStyle(document.documentElement, null).fontSize.replace("px", "") || 16
    } catch (l) {}
    a[e] && a[e](f in a ? f : g, k, !1), b[e] && b[e](h, k, !1), b.querySelector("html").classList.add("webview-rem"), k()
}();