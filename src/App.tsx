import useFetchJson from './utils/useFetchJson';
import Animal from './Animal';
import Note from './Note';

export interface AnimalData {
  species: string;
  description: string;
}

export default function App() {

  // Fetch the animals from an url returning json
  const animals = useFetchJson<AnimalData[]>('/json/animals.json');
  
  return animals && <>
    <h1>Animals I like...</h1>
    <Note />
    {animals
      .filter(({ species }) => species !== 'snake')
      .sort((a, b) => a.species > b.species ? 1 : -1)
      .map((props, i) => <Animal key={i} {...props} />)
    }
  </>;
}
