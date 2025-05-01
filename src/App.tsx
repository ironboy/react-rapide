export default function App() {

  // An array of objects is a very common data structure
  const animals = [
    { species: 'rabbit', description: 'fluffy' },
    { species: 'snake', description: 'smart' },
    { species: 'dog', description: 'loyal' },
    { species: 'cat', description: 'cheeky' }
  ];

  // Se what happens if you comment out the line with filter
  //  and/or the line with sort below!
  return <>
    <h1>Animals I like...</h1>
    {animals
      .filter(({ species }) => species !== 'snake')
      .sort((a, b) => a.species > b.species ? 1 : -1)
      .map(({ species, description }, i) => <section key={i}>
        <img src={'/images/' + species + 's.jpg'} />
        <h2>{species.slice(0, 1).toUpperCase() + species.slice(1)}s</h2>
        <p>I like {species}s. They are so {description}!</p>
      </section>)}
  </>;
}