import LoremIpsum from "react-lorem-ipsum";

export default function AboutPage() {
  return <>
    <h2>Our products</h2>
    <img src="/images/products.jpg"></img>
    <p>Are products are fantastic. We will list them here shortly.</p>
    <LoremIpsum p={2} random={true} />
  </>;
}