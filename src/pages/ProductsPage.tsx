import { useLoaderData } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { useStateContext } from '../utils/useStateObject';
import Select from '../parts/Select';
import ProductCard from '../parts/ProductCard';
import productsLoader from '../utils/productsLoader';
import { getHelpers, SortOption }
  from '../utils/productPageHelpers';

ProductsPage.route = {
  path: '/',
  menuLabel: 'Products',
  index: 1,
  parent: '/',
  loader: productsLoader
};

export default function ProductsPage() {

  let {
    products,
    categories,
    sortOptions,
    sortDescriptions
  } = getHelpers(useLoaderData().products);

  // get state object and setter from the outlet context
  const [
    { categoryChoice, sortChoice, bwImages },
    setState
  ] = useStateContext();

  // get the chosen category without the product count part
  const category = categoryChoice.split(' (')[0];
  // get the key and order to from the chosen sort option
  const { key: sortKey, order: sortOrder } =
    sortOptions.find(x => x.description === sortChoice) as SortOption;

  return <>
    <Row>
      <Col>
        <h2 className="text-primary">Our products</h2>
        <p>
          Our products are fantastic, organic and fresh.
          They are also very reasonably priced, considering
          they are all harvested with the greatest care.
        </p>
      </Col>
    </Row>
    <Row>
      <Col className="px-4 pt-1 pb-4">
        <Row className="bg-primary-subtle pt-3 rounded">
          <Col md="4">
            <label className="d-block">
              <div className="d-none d-md-block">
                Show images this way:
              </div>
              <Button variant="primary" className="mt-2 mb-3 w-100"
                onClick={() => setState('bwImages', !bwImages)}
              >
                <span className="d-md-none">
                  Show images in
                </span>
                <span className="d-none d-md-inline">
                  In
                </span>
                {(bwImages ? ' color' : ' black & white')}
              </Button>
            </label>
          </Col>
          <Col md="4">
            <Select
              label="Category"
              value={categoryChoice}
              changeHandler={(x: string) => setState('categoryChoice', x)}
              options={categories}
            />
          </Col>
          <Col md="4">
            <Select
              label="Sort by"
              value={sortChoice}
              changeHandler={(x: string) => setState('sortChoice', x)}
              options={sortDescriptions}
            />
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      {products
        // filter by the chosen category
        .filter(x => category === 'All' || x.categories.includes(category))
        // sort by the chosen choice for sorting
        .sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * sortOrder)
        // map to product cards
        .map(product => <Col xs={12} lg={6} key={product.id}>
          <ProductCard {...product} />
        </Col>)
      }
    </Row>
  </>;
};