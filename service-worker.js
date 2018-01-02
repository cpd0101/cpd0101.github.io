this.addEventListener('fetch', function (event) {
  var request = event.request;
  var url = request.url;
  if (!/^http(s)?\:/.test(url)) {
    return;
  }
  var reg = /^http(s)?\:\/\/(.+\.)?(anyproxy|proxyit|baidu|zhihu|sohu|alipayobjects|bdstatic|gtimg|qq|itc|sohucs|taobao|tmall)\.(cc|cn|com|net|org)/i;
  if (reg.test(url)) {
    return;
  }
  var targetURL = 'https://www.proxyit.cc/proxy?target=' + btoa(encodeURI(url)) + '&nocookie=true';
  var initOptions = {
    method: request.method,
    headers: request.headers
  };
  if (request.referrer) {
    if (request.referrer.indexOf(location.origin) === 0) {
      initOptions.referrer = request.referrer;
    } else {
      initOptions.referrer = 'https://www.proxyit.cc/proxy?target=' + btoa(encodeURI(request.referrer)) + '&nocookie=true';
    }
  }
  var method = request.method.toUpperCase();
  if (method === 'GET' || method === 'HEAD') {
    event.respondWith(fetch(new Request(targetURL, initOptions)));
  } else {
    event.respondWith(request.arrayBuffer().then(function (body) {
      initOptions.body = body;
      return fetch(new Request(targetURL, initOptions));
    }));
  }
});
