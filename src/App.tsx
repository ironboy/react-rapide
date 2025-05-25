import { useState } from 'react';
import useFetchJsonArray from './utils/useFetchJson';
import Animal from './Animal';

export interface AnimalData {
  species: string;
  description: string;
  category: string;
}

export default function App() {

  // State variables
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('a-z');

  // Fetch the animals from an url returning json
  const animals = useFetchJsonArray<AnimalData[]>('/json/animals.json');

  return animals && <>
    <h1>Animals I like...</h1>
    <label>
      <select onChange={e => setFilterCategory(e.target.value)}>
        {['All', 'Mammals', 'Reptilia'].map(x => <option>{x}</option>)}
      </select>
    </label>
    <label>
      <select onChange={e => setSortOrder(e.target.value)}>
        {['a-z', 'z-a'].map(x => <option>{x}</option>)}
      </select>
    </label>
    {animals
      .filter(({ category }) =>
        filterCategory === 'All' || category === filterCategory)
      .sort((a, b) => (sortOrder === 'a-z' ? 1 : -1)
        * (a.species > b.species ? 1 : -1))
      .map((props, i) => <Animal key={i} {...props} />)
    }
  </>;
}