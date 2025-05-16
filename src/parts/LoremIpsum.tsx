import type { ILoremIpsumParams } from "lorem-ipsum";
import { loremIpsum } from "lorem-ipsum";

export default function LoremIpsum(props: ILoremIpsumParams) {
  props = Object.assign({
    count: 2,
    units: 'paragraphs',
    paragraphLowerBound: 2,
    paragraphUpperBound: 4
  }, props);
  const ipsum = loremIpsum(props).split('\n');
  return <>{ipsum.map((para, i) => <p key={i}>{para}</p>)}</>;
}