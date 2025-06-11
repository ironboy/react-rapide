
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";

interface CartLine {
  productName: string,
  quantity: number,
  productPrice$: number,
  rowSum$: number;
}

export default function ShoppingCart({ show, hideMe }: { show: boolean; hideMe: Function; }) {

  const [cartContents, setCartContents] = useState<any>([]);

  useEffect(() => {
    if (!show) { return; }
    (async () => {
      setCartContents(await (await fetch('/api/cart')).json());
    })();
  }, [show]);

  return (
    <Offcanvas show={show} onHide={hideMe} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <table className="table table-striped">
          [in need of styling + more ux, change quantity / empty]<br /><br />
          <tbody>
            {cartContents.status || cartContents.map(
              ({ productName, quantity, productPrice$, rowSum$ }: CartLine, i: number) =>
                <tr key={i}>
                  <td>{productName}</td>
                  <td className="text-end">{quantity}</td>
                  <td className="text-end"> {productPrice$}</td>
                  <td className="text-end">{rowSum$}</td>
                </tr>
            )}
          </tbody>
        </table>
      </Offcanvas.Body>
    </Offcanvas>
  );
}