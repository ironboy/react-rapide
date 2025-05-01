import { loremIpsum, ILoremIpsumParams } from "lorem-ipsum";

export default function LoremIpsum(props: ILoremIpsumParams = {
  count: 2,
  units: 'paragraphs',
  paragraphLowerBound: 2,
  paragraphUpperBound: 4
}) {
  const ipsum = loremIpsum(props).split('\n');
  return <>{ipsum.map((para, i) => <p key={i}>{para}</p>)}</>;
}