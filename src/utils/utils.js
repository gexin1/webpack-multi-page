import qs from "qs";
export const translateText = dataArr => {
  dataArr &&
    dataArr.length &&
    dataArr.forEach(v => {
      $(`[data-translate="${v}"]`).text(i18n.i18nFormat(v));
    });
};
export const translateTitleAndText = dataArr => {
  dataArr &&
    dataArr.length &&
    dataArr.forEach(v => {
      $(`[data-translate="${v}"]`)[0].title = i18n.i18nFormat(v);
      $(`[data-translate="${v}"]`)[1].innerText = i18n.i18nFormat(v);
    });
};

/**
 * 获取当前页面参数
 */
export const getQuery = () => {
  const url = window.location.search.replace(/^\?/, "");
  const query = qs.parse(url, {
    addQueryPrefix: true
  });
  return query || {};
};
