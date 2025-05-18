import type Product from '../interfaces/Product';
import productsJson from '../json/products.json';

export const products = productsJson as Product[];

export const categories = [
  'All (' + products.length + ')',
  ...products
    // map to category arrays from each product
    .map(x => x.categories)
    // flatten to one array
    .flat()
    // add count of products in to each category
    .map((x, _i, a) => x + ' ('
      + a.filter(y => x === y).length + ')')
    // remove duplicates
    .filter((x, i, a) => a.indexOf(x) === i)
    // sort (by name)
    .sort()
];

export interface SortOption {
  description: string;
  key: keyof Product,
  order: number;
}

export const sortOptions: SortOption[] = [
  { description: 'Price (low to high)', key: 'price$', order: 1 },
  { description: 'Price (high to low)', key: 'price$', order: -1 },
  { description: 'Product name (a-z)', key: 'name', order: 1 },
  { description: 'Product name (z-a)', key: 'name', order: -1 }
];

export const sortDescriptions = sortOptions
  .map(x => x.description);