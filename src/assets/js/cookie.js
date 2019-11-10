! function(a, b) {
    "undefined" != typeof module ? module.exports = b(a) : (b(a),
        "function" == typeof define && (define.amd || define.cmd) && define("cookie", function() {
            return b(a)
        }))
}(window || this, function(a) {
    var b, c;
    return !a.CY && (a.CY = {}),
        a.CY.cookie ? a.CY.cookie : (b = function(a) {
                return Object.prototype.toString.call(a).split(/\s(\w+)/)[1].toLowerCase()
            },
            c = {
                set: function(a, c, d) {
                    var e, f, g, h, i, j;
                    if (d = d || {},
                        null === c) {
                        c = "",
                            e = {};
                        for (f in d)
                            d.hasOwnProperty(f) && (e[f] = d[f]);
                        d = e,
                            d.expires = -1
                    }
                    g = "",
                        d.expires && ("number" == b(d.expires) || d.expires.toUTCString) && ("number" == b(d.expires) ? (h = new Date,
                                h.setTime(h.getTime() + 1e3 * 60 * 60 * 24 * d.expires)) : h = d.expires,
                            g = "; expires=" + h.toUTCString()),
                        d.path = d.path || "/",
                        i = d.path ? "; path=" + d.path : "",
                        j = d.domain ? "; domain=" + d.domain : "",
                        f = d.secure ? "; secure" : "",
                        document.cookie = [a, "=", encodeURIComponent(c), g, i, j, f].join("")
                },
                get: function(a) {
                    var c, d, e, b = null;
                    if (document.cookie && "" != document.cookie)
                        for (c = document.cookie.split(";"),
                            d = 0; d < c.length; d++)
                            if (e = (c[d] || "").replace(/^\s+|\s+$/g, ""),
                                e.substring(0, a.length + 1) == a + "=") {
                                b = decodeURIComponent(e.substring(a.length + 1));
                                break
                            }
                    return b
                }
            },
            a.CY.cookie = c,
            c)
});