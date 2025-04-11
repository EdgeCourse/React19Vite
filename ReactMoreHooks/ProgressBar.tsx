import React, { useEffect, useRef } from 'react';

const ProgressBar = () => {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const animate = () => {
      progressRef.current += 0.5;
      if (progressRef.current > 100) progressRef.current = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'blue';
      ctx.fillRect(0, 0, (canvas.width * progressRef.current) / 100, 20);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} width="200" height="20" />;
};

export default ProgressBar;
