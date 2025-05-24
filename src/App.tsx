import useFetchJsonArray from './utils/useFetchJsonArray';
import Animal from './Animal';
import Note from './Note';

export interface AnimalData {
  species: string;
  description: string;
}

export default function App() {

  // Fetch the animlas from a url returning json
  let animals = useFetchJsonArray<AnimalData>('/json/animals.json');

  // Se what happens if you comment out the line with filter
  //  and/or the line with sort below!
  return !animals.length ? null : <>
    <h1>Animals I like...</h1>
    <Note />
    {animals
      .filter(({ species }) => species !== 'snake')
      .sort((a, b) => a.species > b.species ? 1 : -1)
      .map((props, i) => <Animal key={i} {...props} />)
    }
  </>;
}