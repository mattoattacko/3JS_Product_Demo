import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';
import { getContrastingColor } from '../config/helpers'; // helper function to get contrasting color for buttons. This file was written by ChatGPT

const CustomButton = ({ title, type, customStyles, handleClick }) => {

  const snap = useSnapshot(state);

  // styles for the custom buttons
  const generateStyle = (type) => {
    if(type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      }
    } else if(type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      }
    }
  }

  // can read the background color and auto apply proper contrast so that we can see the buttons clearly. We use ChatGPT's helper function to get the contrasting color

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton