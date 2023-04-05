import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { 
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';

import state from '../store';

const Home = () => {
  const snap = useSnapshot(state); //one current snapshot of the state
  
  return (
    <div>Home</div>
  )
}

export default Home