// all of this is needed to make valtio work
// we can kind of think of this as react-context
// whatever we define in here is usable throughout the entire application
import { proxy } from 'valtio';

const state = proxy({ 
  intro: true, //are we currently on the homepage
  color: '#EFBD48',
  isLogoTexture: true, //is logo currently on our shirt
  isFullTexture: false, //is the entire shirt a texture
  logoDecal: './threejs.png', //initial logo decal
  fullDecal: './threejs.png', //initial full texture shirt decal
 });

 export default state;