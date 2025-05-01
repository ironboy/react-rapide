export default function App() {

  const animals = ['rabbit', 'snake', 'dog', 'cat'];

  // Se what happens if you comment out the line with filter
  //  and/or the line with sort below!
  return <>
    <h1>Animals I like...</h1>
    {animals
      .filter(animal => animal !== 'snake')
      .sort((a, b) => a > b ? 1 : -1)
      .map((animal, i) => <p key={i}>I like {animal}s!</p>)}
  </>;
}