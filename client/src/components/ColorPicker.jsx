import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker 
        color={snap.color}
        disableAlpha //disable opacity
        onChange={(color) => state.color = color.hex} //update color in state
        // presetColors={[
        //   '#ccc',
        //   '#EFBD4E',
        //   '#80C670',
        //   '#762DE8',
        //   '#000',
        //   '#000',
        //   '#000',
        //   '#000',
        //   '#000',
        //   '#000',
        //   '#000',
        //   '#000',
        // ]} can add preset colors if we wanted
      />
    </div>
  )
}

export default ColorPicker