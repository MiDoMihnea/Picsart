import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColorDropper from './ColorDropper';

const imageSrc = 'test-image.jpg';

describe('ColorDropper', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ColorDropper imageSrc={imageSrc} pickingColor={false} setPickingColor={jest.fn()} onColorPick={jest.fn()} />
    );
    expect(container).toBeInTheDocument();
  });

  it('displays the picked hex code in the header on click', () => {
    const setPickingColor = jest.fn();
    const onColorPick = jest.fn();
    render(<ColorDropper imageSrc={imageSrc} pickingColor={true} setPickingColor={setPickingColor} onColorPick={onColorPick} />);

    const image = screen.getByAltText('Hover to pick color');
    fireEvent.click(image);

    expect(onColorPick).toHaveBeenCalledWith(expect.stringMatching(/^#/));
  });
});
