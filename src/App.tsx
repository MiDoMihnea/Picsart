import React, { useState } from 'react';
import './App.css';
import ColorDropper from './components/ColorDropper/ColorDropper';
import IconColorPicker from './assets/IconColorPicker.svg';
import background from './assets/background.jpg';

const App: React.FC = () => {
  const [pickingColor, setPickingColor] = useState<boolean>(false);
  const [pickedColor, setPickedColor] = useState<string>('');

  const handleColorPick = (color: string) => {
    setPickedColor(color);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="color-dropper-icon" onClick={() => setPickingColor((prev) => !prev)}>
          <img src={IconColorPicker} alt="Color Picker" />
        </div>
        {pickedColor && <div className="picked-color">Picked Color: {pickedColor}</div>}
        <ColorDropper
          imageSrc={background}
          pickingColor={pickingColor}
          setPickingColor={setPickingColor}
          onColorPick={handleColorPick}
        />
      </header>
    </div>
  );
};

export default App;
