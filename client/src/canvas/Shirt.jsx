import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  // import 3d model
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  // import textures
  const logoTexture = useTexture(snap.logoDecal); //middle of screen
  const fullTexture = useTexture(snap.fullDecal); //over entire shirt

  // apply color smoothly
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  // convert state to string so we can use it as a key
  const stateString = JSON.stringify(snap);

  return (
    <group
      // sometimes the shirt wont update properly w/o this
      // for some reason the key cant be the state, it needs to be the string of the state
      // this way React will render the shirt again anytime the state changes
      key={stateString}
    >
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* check if we are currently showing the logo on the shirt, or are we showing the full texture */}
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}  
            scale={1}
            map={fullTexture}
          />
        )}
        {/* if we do have the logo */}
        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16} //how much the texture is stretched
            depthTest={false} //so that the logo is always visible
            depthWrite={true} //so that the logo is always visible
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt