import ky from 'ky';

export const tzktApi = ky.extend({
  prefixUrl: 'https://api.tzkt.io/v1/',
});

export const tzToolsApi = ky.extend({
  prefixUrl: 'https://api.teztools.io/v1/',
});
