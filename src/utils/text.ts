

type Node = React.ReactElement | string | undefined;

export function JSXModifyText(e: Node, modifier: (s: string) => string): Node {

  console.log(e);
  // a. it's nothing. return and stop.
  if (!e) {
    console.log(1);
    return e;
  }
  // b. it's text. modify, return and stop.
  if (typeof e === "string") {
    console.log(2);
    return modifier(e);
  }
  // we have an element with something inside
  // let's return the outside and recursively work on the inside
  console.log(3);
  return {
    ...e,
    props: {
      ...e.props as any,
      children:
        // c. There's an array of nodes inside -> repeat for each one ⤴
        Array.isArray((e.props as any).children)
          ? (e.props as any).children.map((x: Node) => JSXModifyText(x, modifier))
          // d. There's just one node inside -> repeat for it ⤴
          : JSXModifyText((e.props as any).children, modifier),
    }
  };
}