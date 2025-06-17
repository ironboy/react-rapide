import { useStateContext } from '../utils/useStateObject';

// an image component that automatically switches to black and white
// by adding the css class 'bw' if bwImages is true in our context
export default function Image(props: any) {
  const [{ bwImages }] = useStateContext() || [{}];
  props = { ...props };
  props.className =
    // Bootstrap specific classes
    'img-fluid w-100 border border-1 border-primary rounded mb-3'
    // Class for black and white
    + (bwImages ? ' bw ' : '')
    // Classes from props
    + (props.className || '');
  return <img {...props} />;
}