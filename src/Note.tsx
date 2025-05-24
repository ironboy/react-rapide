export default function Note() {
  return <p>
    <b>Note: </b><br />
    Now we have 4 components in our React app:<br />
    <i>App</i>, <i>Note</i>, <i>Animal</i> and <i>SpeciesPhoto</i>. <br />
    We load the animal data from a JSON url, <br /> using our custom hook <i>useFetchJson</i>.
  </p>;
}