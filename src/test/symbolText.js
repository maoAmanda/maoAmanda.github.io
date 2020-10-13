(function () {
  var root = this;
  var symbolInstance = function Symbol(description) {
    // 因为symbol可以作为对象的健值，并且唯一
    var generateName = (function (desc) {
      var postfix = 0;
      return function (descString) {
        postfix++;
        return "@@" + descString + "_" + postfix;
      }
    })();
    // 不能new
    if (this instanceof symbolInstance) throw new TypeError("Symbol is not a constructor");
    // 如果有描述，就将它变成字符串
    let descString = description === undefined ? undefined : String(description);
    //  给Symbol添加tostring方法
    let symbol = Object.create({
      toString: function () {
        return "Symbol(" + this.__Description + ")";
      },
      valueOf: function () {
        // 参与计算，会隐式调用valueof
        return new Error("cannot convert a Symbol value");
      }

    });
    Object.defineProperties(symbol, {
      "__Description": {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      "__Name__": {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      }
    });
    return symbol;
  }
  // 因为symbol可以通过for实现同一个symbol值。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。
  // keyFor 方法返回一个已登记的 Symbol 类型值的 key
  var forMap = {};
  Object.defineProperties(symbolInstance, {
    "for": {
      value: function (description) {
        var descString = description === undefined ? undefined : String(description)
        return forMap[descString] ? forMap[descString] : forMap[descString] = symbolInstance(descString);
      },
      writable: true,
      enumerable: false,
      configurable: true
    },
    "keyfor": {
      value: function (symbol) {
        for (var key in forMap) {
          if (forMap[key] === symbol) return key;
        }
      },
      writable: true,
      enumerable: false,
      configurable: true
    }
  });
  root.symbolInstance = symbolInstance;
})();