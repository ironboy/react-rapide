import { LoremIpsum } from 'react-lorem-ipsum';

export default function StartPage() {
  return <>
    <h2>Start</h2>
    <p>This is our start page. Here we say: "Welcome"!</p>
    <LoremIpsum p={2} random={true} />
  </>;
}