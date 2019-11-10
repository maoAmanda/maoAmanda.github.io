! function(a, b) {
    "undefined" != typeof module ? module.exports = b(a) : (b(a),
        "function" == typeof define && (define.amd || define.cmd) && define("browser", function() {
            return b(a)
        }))
}(window || this, function(a) {
    var b, c, d;
    return !a && (a = {}),
        a.browser ? a.browser : (b = navigator.userAgent.toLowerCase(),
            c = b.match(/(ios|android)_jfmore_(\d\.\d\.\d)/i),
            d = {
                ios: /(iphone|ipod|ipad|ios)/i.test(b),
                android: !!b.match(/android/i),
                weixin: !!b.match(/micromessenger/i),
                qq: !!b.match(/qq\/([\d\.]+)/),
                qzone: /qzone/.test(b),
                jfmore: c && c[2].trim() || "",
                webp: function() {
                    return 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
                }()
            },
            a.browser = d,
            d)
});