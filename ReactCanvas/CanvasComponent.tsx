// CanvasComponent.tsx
/*
To safely interact with a DOM element (like a <canvas>), you need to wait until it’s rendered and get a reference to it.
useRef: get and store a reference to a DOM element (like a <canvas>).

useEffect: run code after the component is mounted (rendered on screen) — perfect for drawing on the canvas.
*/
import React, { useRef, useEffect } from 'react';

const CanvasComponent: React.FC = () => {
  // Step 1: Create a ref to access the <canvas> DOM element
/*
Create a reference to a <canvas> DOM element.

useRef() starts off as null, and React will later assign it to the real DOM node after rendering.
*/
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

/*
The useEffect hook runs once after the component mounts (because of the [] dependency array).

Drawing on the canvas is a side effect.
*/

  useEffect(() => {
    // Step 2: Get the actual <canvas> DOM node

/*
Get the actual canvas DOM element via canvasRef.current.

*/


    const canvas = canvasRef.current;
    if (!canvas) return;

    // Step 3: Get the 2D rendering context from the canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Step 4: Use the canvas API to draw a rectangle
    ctx.fillStyle = 'skyblue'; // Fill color
    ctx.fillRect(50, 50, 200, 100); // x, y, width, height

    // Step 5: Draw some text inside the rectangle
/*
Ensures the useEffect runs only once, just like componentDidMount() in class components.
*/
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Hello Canvas!', 80, 110);
  }, []); // Runs once after mount


/*
ref={canvasRef}: attaches the canvasRef to this element so React can update canvasRef.current with the real DOM node.
*/
  return (
    <canvas
      ref={canvasRef} // Step 6: Attach the ref to the actual canvas
      width={400}
      height={300}
      style={{ border: '1px solid black' }} // Optional: makes canvas visible
    />
  );
};

export default CanvasComponent;
