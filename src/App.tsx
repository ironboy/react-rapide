import Animal from './Animal';
import Note from './Note';
import animalsJson from './json/animals.json';

export interface AnimalData {
  species: string;
  description: string;
}

export default function App() {

  // Use the data from the json file
  const animals: AnimalData[] = animalsJson;

  // Se what happens if you comment out the line with filter
  //  and/or the line with sort below!
  return <>
    <h1>Animals I like...</h1>
    <Note />
    {animals
      .filter(({ species }) => species !== 'snake')
      .sort((a, b) => a.species > b.species ? 1 : -1)
      .map((props, i) => <Animal key={i} {...props} />)
    }
  </>;
}