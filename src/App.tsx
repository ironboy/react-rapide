import Animal from './Animal';
import Note from './Note';

export interface AnimalData {
  species: string,
  description: string;
}

export default function App() {

  // An array of objects is a very common data structure
  const animals: AnimalData[] = [
    { species: 'rabbit', description: 'fluffy' },
    { species: 'snake', description: 'smart' },
    { species: 'dog', description: 'loyal' },
    { species: 'cat', description: 'cheeky' }
  ];

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