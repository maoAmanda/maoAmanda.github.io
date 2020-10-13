// 获取用户的IP 
export function getYourIp() { //获取ip return ip
  function updateDisplay(newAddr) {
    if (newAddr in addrs) return;
    else addrs[newAddr] = true;
    var displayAddrs = Object.keys(addrs).filter(function (k) {
      return addrs[k];
    });
    for (var i = 0; i < displayAddrs.length; i++) {
      if (displayAddrs[i].length > 16) {
        displayAddrs.splice(i, 1);
        i--;
      }
    }
    ip = displayAddrs[0];
  }

  function grepSDP(sdp) {
    sdp.split('\r\n').forEach(function (line) {
      let parts = [],
        addr = null,
        type = null;
      if (~line.indexOf("a=candidate")) {
        parts = line.split(' ');
        addr = parts[4];
        type = parts[7];
        if (type === 'host') updateDisplay(addr);
      } else if (~line.indexOf("c=")) {
        parts = line.split(' ');
        addr = parts[2];
        updateDisplay(addr);
      }
    });
  }
  let ip = '';
  let RTCPeerConnection = window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection;
  if (RTCPeerConnection) {
    var rtc = new RTCPeerConnection({
      iceServers: []
    });
    if (window.mozRTCPeerConnection) {
      rtc.createDataChannel('', {
        reliable: false
      });
    }
    rtc.onicecandidate = function (evt) {
      if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
    };
    rtc.createOffer(function (offerDesc) {
      grepSDP(offerDesc.sdp);
      rtc.setLocalDescription(offerDesc);
      // eslint-disable-next-line no-console
    }, function (e) {
      console.warn("offer failed", e);
    });

    var addrs = Object.create(null);
    addrs["0.0.0.0"] = false;
  }
  return ip;
}

/**
 *
 * @param num
 * @param precision
 * @param separator
 * @returns {*}
 *=======================================================
 *     formatNumber(10000)="10,000"
 *     formatNumber(10000, 2)="10,000.00"
 *     formatNumber(10000.123456, 2)="10,000.12"
 *     formatNumber(10000.123456, 2, ' ')="10 000.12"
 *     formatNumber(.123456, 2, ' ')="0.12"
 *     formatNumber(56., 2, ' ')="56.00"
 *     formatNumber(56., 0, ' ')="56"
 *     formatNumber('56.')="56"
 *     formatNumber('56.a')=NaN
 *=======================================================
 */
export function formatNumber(num, precision = 2, separator) {
  let parts;
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    num = Number(num);
    // 处理小数点位数
    num = (typeof precision !== 'undefined' ?
      num.toFixed(precision) :
      num
    ).toString();
    // 分离数字的小数部分和整数部分
    parts = num.split('.');
    // 整数部分加[separator]分隔, 借用一个著名的正则表达式
    parts[0] = parts[0]
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

    return parts.join('.');
  }
  return NaN;
}