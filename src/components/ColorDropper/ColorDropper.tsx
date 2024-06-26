import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import './ColorDropper.css';

interface ColorDropperProps {
  imageSrc: string;
  pickingColor: boolean;
  setPickingColor: (picking: boolean) => void;
  onColorPick: (color: string) => void;
}

const ColorDropper: React.FC<ColorDropperProps> = ({ imageSrc, pickingColor, setPickingColor, onColorPick }) => {
  const [color, setColor] = useState<string>('#0D87C3');
  const [hovered, setHovered] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    if (!pickingColor) return;

    const rect = imageRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.drawImage(imageRef.current!, 0, 0, rect.width, rect.height);
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hexColor = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
    setColor(hexColor);
  };

  const handleClick = () => {
    onColorPick(color);
    setPickingColor(!pickingColor);
  };

  useEffect(() => {
    if (!pickingColor) {
      setHovered(false);
    }
  }, [pickingColor]);

  return (
    <div className="color-dropper-container">
      <canvas ref={canvasRef} width="4000" height="4000" style={{ display: 'none' }}></canvas>
      <img
        src={imageSrc}
        ref={imageRef}
        alt="Hover to pick color"
        className="color-dropper-image"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => pickingColor && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
      />
      {hovered && (
        <div
          className="color-dropper-circle"
          style={{
            top: position.y - 100,
            left: position.x - 100,
            borderColor: color,
          }}
        >
          <div
            className="color-dropper-magnified"
            style={{
              backgroundImage: `url(${imageSrc})`,
              backgroundPosition: `-${position.x - 100}px -${position.y - 100}px`,
              backgroundSize: `${imageRef.current!.offsetWidth}px ${imageRef.current!.offsetHeight}px`,
              filter: 'blur(10px)',
            }}
          />
          <span className="color-dropper-hex">{color}</span>
        </div>
      )}
    </div>
  );
};

export default ColorDropper;
