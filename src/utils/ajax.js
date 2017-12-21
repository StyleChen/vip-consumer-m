const ajax = {
  json(res) {
    return res.json();
  },

  requestWithoutBody(method, url, credentials = false) {
    return fetch(url, {
      method,
      credentials: credentials ? 'same-origin' : 'omit',
    })
      .then(this.json);
  },

  requestWithBody(method, url, body, credentials = false) {
    const isFormData = body instanceof FormData;

    return fetch(url, {
      method,
      headers: isFormData ? {} : {
        'Content-Type': 'application/json',
      },
      credentials: credentials ? 'same-origin' : 'omit',
      body: isFormData ? body : JSON.stringify(body),
    })
      .then(this.json);
  },

  get(url, credentials) {
    return this.requestWithoutBody('GET', url, credentials);
  },

  post(url, body, credentials) {
    return this.requestWithBody('POST', url, body, credentials);
  },

  patch(url, body, credentials) {
    return this.requestWithBody('PATCH', url, body, credentials);
  },

  delete(url, credentials) {
    return this.requestWithoutBody('DELETE', url, credentials);
  },
};

export default ajax;
