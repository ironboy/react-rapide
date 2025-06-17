import type { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import addToCart from "../utils/addToCart";
import emptyCart from "../utils/emptyCart";
import Image from "../parts/Image";
import NotImplementedModal from "../parts/NotImplementedModal";
import { currentLang } from "../utils/routeLocalize";

interface CartLine {
  productId: number,
  productName: string,
  quantity: number,
  productPrice$: number,
  rowSum$: number;
}

export default function ShoppingCart({ show, hideMe }: { show: boolean; hideMe: Function; }) {

  const [cartContents, setCartContents] = useState<any>([]);
  const [showNotImplemented, setShowNotImplemented] = useState(false);

  useEffect(() => {
    if (!show) { return; }
    (async () => {
      setCartContents(await (await fetch(`/api/${currentLang()}/cart`)).json());
    })();
  }, [show]);

  async function quantityChange(e: ChangeEvent<HTMLInputElement>, productId: number) {
    // get input element
    let input = e.target as HTMLInputElement;
    // check that the value is within allowed range, otherwise change it
    let value = +input.value;
    let max = +(input.getAttribute('max') || 99);
    let min = +(input.getAttribute('min') || 1);
    if (isNaN(value) || value < min) { value = min; }
    if (value > max) { value = max; }
    if (value != +input.value && input.value !== '') {
      input.value = value + '';
    }
    // update that cart
    setCartContents(await addToCart({
      productId, relative: false, quantity: value
    }));
  }

  return <>
    <Offcanvas show={show} onHide={hideMe} placement="end" className="shopping-cart">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <i className="cart-icon bi bi-bag-heart-fill float-start"></i>
          <b>Your Good Groceries</b>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>

        {cartContents.status ||
          <table className="table table-primary table-sm table-striped">
            <tbody>
              {cartContents.map(
                ({ productId, productName, quantity, productPrice$, rowSum$ }: CartLine, i: number) =>
                  <tr key={i} style={productId ? {} : { fontWeight: 'bold' }}>
                    {productId && <td>{!productId ? '' :
                      <Image
                        className="mb-0"
                        src={'/images/products/' + productId + '.jpg'}
                        alt={'Product image of the product ' + productName + '.'}
                      />}
                    </td>}
                    <td colSpan={productId ? 1 : 2}>{productName}</td>
                    <td className="text-end">{productId ? '$' + productPrice$.toFixed(2) : ''}</td>
                    <td className="text-center">{productId ? '×' : ''}</td>
                    <td className="text-end">{!productId ? '' :
                      <input
                        placeholder="1"
                        type="number"
                        min="1"
                        max="99"
                        defaultValue={quantity}
                        onChange={e => quantityChange(e, productId)}
                      />}
                    </td>

                    <td className="text-end">${rowSum$.toFixed(2)}</td>
                    <td>{productId ?
                      <i
                        className="bi bi-trash3-fill"
                        onClick={async () => setCartContents(await addToCart({
                          productId, relative: false, quantity: 0
                        }))}
                      ></i> :
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                    }</td>
                  </tr>
              )}
            </tbody>
          </table>
        }
        {cartContents.status ? <>
          <p className="mt-3">What do you want to buy today?</p>
          <p>Have a look around and read more about our amazing organic groceries...
            <i className="ps-2 bi bi-emoji-smile"></i></p>
        </> : <div>
          <Button
            variant="danger"
            onClick={async () => setCartContents(await emptyCart())}
          >
            <i className="bi bi-cart-x-fill pe-3"></i>Empty cart
          </Button>
          <Button
            variant="primary"
            className="float-end"
            onClick={() => setShowNotImplemented(true)}
          >
            <i className="bi bi-cart-check-fill pe-3"></i>Checkout
          </Button>
        </div>}
      </Offcanvas.Body>
    </Offcanvas>
    {showNotImplemented ? <NotImplementedModal
      message="The checkout is not implemented yet."
      setHidden={() => setShowNotImplemented(false)}
    /> : ''}
  </>;
}