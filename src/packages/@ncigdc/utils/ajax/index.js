// @flow
import { CALL_API } from 'redux-api-middleware';
import urlJoin from 'url-join';
import { API, AUTH } from '@ncigdc/utils/constants';

const DEFAULTS = {
  method: 'get',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': true,
    'X-Auth-Token': 'secret admin token',
  },
};

export function fetchAuth(options: { endpoint: string }): Object {
  return {
    [CALL_API]: {
      ...DEFAULTS,
      ...options,
      endpoint: urlJoin(AUTH, options.endpoint),
    },
  };
}

// $FlowIgnore
export const fetchApi = (endpoint, opts = {}) => {
  if (opts.body) {
    opts.body = opts.body ? JSON.stringify(opts.body) : '';
    opts.method = 'POST';
  }
  return fetch(urlJoin(API, endpoint), opts).then(r => r.json());
};