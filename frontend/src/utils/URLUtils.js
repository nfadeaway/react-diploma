const getURL = (categoryId, isBtn, searchQuery, offset) => {

  const urlParams = {
    domain: import.meta.env.VITE_APP_SERVER_URL,
    all: '/api/items',
    cat: `/api/items?categoryId=${categoryId}`,
    all_more: `/api/items?offset=${offset}`,
    cat_more: `/api/items?categoryId=${categoryId}&offset=${offset}`,
    all_query: `/api/items?q=${searchQuery}`,
    cat_query: `/api/items?q=${searchQuery}&categoryId=${categoryId}`,
    all_query_more: `/api/items?q=${searchQuery}&offset=${offset}`,
    cat_query_more: `/api/items?q=${searchQuery}&categoryId=${categoryId}&offset=${offset}`,
  };

  let URL;
  categoryId === 'all' && !isBtn && !searchQuery && (URL = urlParams.domain + urlParams.all);
  categoryId !== 'all' && !isBtn && !searchQuery && (URL = urlParams.domain + urlParams.cat);
  categoryId === 'all' && isBtn && !searchQuery && (URL = urlParams.domain + urlParams.all_more);
  categoryId !== 'all' && isBtn && !searchQuery && (URL = urlParams.domain + urlParams.cat_more);
  categoryId === 'all' && !isBtn && searchQuery && (URL = urlParams.domain + urlParams.all_query);
  categoryId !== 'all' && !isBtn && searchQuery && (URL = urlParams.domain + urlParams.cat_query);
  categoryId === 'all' && isBtn && searchQuery && (URL = urlParams.domain + urlParams.all_query_more);
  categoryId !== 'all' && isBtn && searchQuery && (URL = urlParams.domain + urlParams.cat_query_more);

  return URL;
};

export default getURL;