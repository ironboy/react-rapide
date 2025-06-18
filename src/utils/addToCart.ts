export default async function addToCart(
  { productId = 0, setState = () => { }, relative = true, quantity = 1 }: any
) {
  await fetch('/api/change-product-in-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity, add: relative })
  });

  setState('showShoppingCart', true);
}
