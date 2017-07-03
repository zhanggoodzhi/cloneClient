import { push } from 'react-router-redux';
import { stringify } from 'qs';

let store;

const fetch = (input: RequestInfo, init?: RequestInit) => {
  const _defaults: RequestInit = {
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const options = { ..._defaults, ...init };

  //  后台判断用的头
  options.headers['X-Requested-With'] = 'XMLHttpRequest';

  // 表单格式数据转换
  if (
    options.body &&
    typeof options.body === 'object' &&
    options.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    options.body = stringify(options.body);
  }

  return window.fetch(input, options)
    .then((res) => {
      let error = true;
      let href = '';

      switch (res.status) {
        case 401:
          href = '/passport/login';
          break;
        default:
          error = false;
          break;
      }

      console.log(href);
      if (error) {
        if (store) {
          store.dispatch(push(href));
        }
        return null;
      } else {
        return res.json();
      }
    });
};

// 临时处理方案，redux不应该在这里使用。
export function initRedux(s) {
  store = s;
}

export default fetch;
