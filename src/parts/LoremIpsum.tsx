import { loremIpsum } from "lorem-ipsum";

export default function LoremIpsum() {
  const ipsum = loremIpsum({
    count: 2,
    units: 'paragraphs',
    paragraphLowerBound: 2,
    paragraphUpperBound: 4
  }).split('\n');
  return <>{ipsum.map((para, i) => <p key={i}>{para}</p>)}</>;
}