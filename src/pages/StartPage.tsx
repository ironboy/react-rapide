import LoremIpsum from '../parts/LoremIpsum';

StartPage.route = {
  path: '/',
  menuLabel: 'Start',
  index: 1
};

export default function StartPage() {
  return <>
    <h2>Start</h2>
    <img src="/images/start.jpg" alt="A runner's legs and hands at the starting line of a track race." />
    <p>This is our start page. Here we say: "Welcome"!</p>
    <LoremIpsum />
  </>;
}