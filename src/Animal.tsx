import type { AnimalData } from "./App";
import SpeciesPhoto from './SpeciesPhoto';

export default function Animal({ species, description }: AnimalData) {
  return <section>
    <SpeciesPhoto species={species} />
    <h2>{species.slice(0, 1).toUpperCase() + species.slice(1)}s</h2>
    <p>I like {species}s. They are so {description}!</p>
  </section>;
}