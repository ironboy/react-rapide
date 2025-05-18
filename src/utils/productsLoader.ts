export default async function productsLoader() {
  let products = await (await fetch('/api/products')).json();

  // convert categories to array
  products = products.map((x: any) => ({
    ...x,
    categories: x.categories.split(',')
  }));

  return { products };
};