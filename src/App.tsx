import animals from './json/animals.json';

export default function App() {

  // Se what happens if you comment out the line with filter
  //  and/or the line with sort below!
  return <>
    <h1>Animals I like...</h1>
    <p><b>Note:</b> The data with info about the animals is stored in a JSON file.</p>
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