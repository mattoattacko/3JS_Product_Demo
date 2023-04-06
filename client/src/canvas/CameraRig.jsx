import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

const CameraRig = ({ children }) => {
  const group = useRef(); //used to move camera closer & update state
  const snap = useSnapshot(state);

  // useFrame hook lets us execute code on every rendered frame
  // delta is the time between the last frame that happened and the current frame
  useFrame((state, delta) => {
    const isDesktop = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 768;

    //set initial model position
    let targetPosition = [-0.4, 0, 2];

    if (snap.intro) { //if(snap.intro) means if we are on the home page
      if (isDesktop) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0, 2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set camera model position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set smooth model rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0], //x,y,z axis
      0.25, //smoothTime
      delta
    )
  })

  return (
    <group ref={group}>
      {children}
    </group>
  )

}

export default CameraRig