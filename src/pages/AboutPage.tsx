import LoremIpsum from "react-lorem-ipsum";

export default function AboutPage() {
  return <>
    <h2>About us</h2>
    <p>This is our start page. We will tell you more about our company here.</p>
    <LoremIpsum p={2} random={true} />
  </>;
}