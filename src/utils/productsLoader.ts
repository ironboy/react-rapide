export default async function productsLoader() {
  return {
    products:
      await (await fetch('/json/products.json')).json()
  };
};