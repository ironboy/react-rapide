export default function SpeciesPhoto({ species }: { species: string; }) {
  return <img
    src={'/images/' + species + 's.jpg'}
    alt={'A photo of ' + species + 's.'}
  />;
}