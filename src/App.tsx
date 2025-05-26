import { useState, useEffect } from 'react';
import useFetchJsonArray from './utils/useFetchJson';
import Animal from './Animal';
import Select from './Select';

export interface AnimalData {
  species: string;
  description: string;
  category: string;
}

export default function App() {

  // State variables
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('a-z');

  useEffect(() => {
    function mouseOverAnimal(e: Event) {
      const section = (e.target as HTMLElement).closest('section');
      if (!section) { return; }
      section.classList.add('hepp');
    }
    document.body.addEventListener('mouseover', mouseOverAnimal);
    return () => {

    };
  }, []);

  // Fetch the animals from an url returning json
  const animals = useFetchJsonArray<AnimalData[]>('/json/animals.json');

  return animals && <>
    <h1>Animals</h1>
    <Select {...{
      label: 'Category',
      values: ['All', 'Mammals', 'Reptilia'],
      setter: setFilterCategory
    }} />
    <Select {...{
      label: 'Sort',
      values: ['a-z', 'z-a'],
      setter: setSortOrder
    }} />
    {
      animals
        .filter(({ category }) =>
          filterCategory === 'All' || category === filterCategory)
        .sort((a, b) => (sortOrder === 'a-z' ? 1 : -1)
          * (a.species > b.species ? 1 : -1))
        .map((props, i) => <Animal key={i} {...props} />)
    }
  </>;
}