export async function addToCart(productId: number, setState: Function) {
  await fetch('/api/change-product-in-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity: 1, add: true })
  });
  setState('showShoppingCart', true);
}
