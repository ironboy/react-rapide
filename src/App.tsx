export default function App() {

  const animals = ['rabbit', 'cat', 'dog', 'snake'];

  return <>
    <h1>Animals I like</h1>
    {animals
      .filter(animal => animal !== 'snake')
      .sort((a, b) => a > b ? 1 : -1)
      .map((animal, i) => <p key={i}>I like {animal}s!</p>)}
  </>;
}