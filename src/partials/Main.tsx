import { Outlet } from 'react-router-dom';
import { useStateObject } from '../utils/useStateObject';
import { categories, sortDescriptions }
  from '../utils/productPageHelpers';

export default function Main() {
  // a state to use with outlet context
  const stateAndSetter = useStateObject({
    categoryChoice: categories[0],
    sortChoice: sortDescriptions[0],
    bwImages: false
  });

  return <main>
    <Outlet context={stateAndSetter} />
  </main>;
}