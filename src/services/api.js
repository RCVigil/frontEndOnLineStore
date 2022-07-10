export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const getApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    return getApi(url);
  }
  if (categoryId) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    return getApi(url);
  }
  if (query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    return getApi(url);
  }
}
