import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { 
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';

import { CustomButton } from '../components';
import state from '../store';

const Home = () => {
  const snap = useSnapshot(state); //one current snapshot of the state

  return (
    <AnimatePresence>
      {/* check if we are currently on the homepage */}
      {snap.intro && (
        <motion.section 
          className='home' 
          {...slideAnimation('left')}
        >
          <motion.header
            {...slideAnimation('down')}
          >
            <img 
              src="./threejs.png"
              alt="logo"
              className='w-8 h-8 object-contain'
            />
          </motion.header>

          <motion.div
            className='home-content'
            {...headContainerAnimation}
          >
            <motion.div {...headTextAnimation}>
              <h1 className='head-text'>
                BUTTS <br className='xl:block hidden'/> ARE <br /> BIG.
              </h1>
            </motion.div>

            <motion.div
              {...headContentAnimation}
              className='flex flex-col gap-5'
            >
              <p className='max-w-md font-normal text-gray-600 text-base'>
                Create an exclusive shirt with our cutting edge customization tool. <strong>Unleash your imagination</strong>{' '} and define your own style. I hope there are butts...
              </p>

              {/* Button */}
              <CustomButton 
                type='filled'
                title='Customize Now'
                handleClick={() => state.intro = false} //update the state
                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              />

            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home