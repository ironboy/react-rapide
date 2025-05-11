import useStateObject from '../utils/useStateObject';
import { Link } from 'react-router-dom';
import Select from '../parts/Select';
import {
  products, categories, SortOption,
  sortOptions, sortDescriptions
} from '../utils/productPageHelpers';

ProductsPage.route = {
  path: '/',
  menuLabel: 'Products',
  index: 1,
  parent: '/'
};

export default function ProductsPage() {

  // state object (instead of several calls to useState)
  const [
    { categoryChoice, sortChoice, bwImages },
    setState
  ] = useStateObject({
    categoryChoice: 'All',
    sortChoice: 'Price (low to high)',
    bwImages: false
  });

  // get the chosen category without the product count part
  const category = categoryChoice.split(' (')[0];
  // get the key and order to from the chosen sort option
  const { key: sortKey, order: sortOrder } =
    sortOptions.find(x => x.description === sortChoice) as SortOption;

  return <>
    <h2>Our products</h2>
    <p>
      Our products are fantastic, organic and fresh.
      They are also very reasonably priced, considering
      they are all harvested with the greatest care.
    </p>
    <p>Click on a product for detailed info.</p>
    <section className="products">
      {/* User choices connected to states */}
      <button onClick={() => setState('bwImages', !bwImages)}>
        {'Show images in ' +
          (bwImages ? 'color' : 'black and white')}
      </button>
      <Select
        label="Category"
        value={categoryChoice}
        changeHandler={(x: string) => setState('categoryChoice', x)}
        options={categories}
      />
      <Select
        label="Sort by"
        value={sortChoice}
        changeHandler={(x: string) => setState('sortChoice', x)}
        options={sortDescriptions}
      />
      {/* Show a filtered and sorted product list */}
      {products
        // filter by the chosen category
        .filter(x => category === 'All' || x.categories.includes(category))
        // sort by the chosen choice for sorting
        .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * sortOrder)
        .map((
          { id, name, quantity, price$, slug }
        ) => (
          <Link key={id} to={'/products/' + slug}>
            <img
              className={bwImages ? 'bw' : ''}
              src={'/images/products/' + id + '.jpg'}
              alt={'Product image of the product ' + name + '.'}
            />
            <h3>{name}</h3>
            <p><strong>Quantity</strong>: {quantity}</p>
            <p><strong>Price: ${price$.toFixed(2)}</strong></p>
          </Link>
        ))}
    </section >
  </>;
}