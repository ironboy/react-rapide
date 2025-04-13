import LoremIpsum from '../parts/LoremIpsum';

StartPage.route = {
  element: <StartPage />,
  path: '/',
  menuLabel: 'Start'
};

export default function StartPage() {
  return <>
    <h2>Start</h2>
    <img src="/images/start.jpg"></img>
    <p>This is our start page. Here we say: "Welcome"!</p>
    <LoremIpsum />
  </>;
}