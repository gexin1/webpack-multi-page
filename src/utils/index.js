import qs from 'qs';

/**
 * 获取当前页面参数
 * @returns { object }
 */
export const getQuery = () => {
  const url = window.location.search;
  const query = qs.parse(url, {
    ignoreQueryPrefix: true,
  });
  return query || {};
};
