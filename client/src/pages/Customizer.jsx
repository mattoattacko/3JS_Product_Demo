import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import config from '../config/config'; //used to set up URL on the backend
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers'; //helper functions
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { slideAnimation, fadeAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);//need our state so we know if we are on the homepage or customizer page

  const [file, setFile] = useState(''); //file to upload

  const [prompt, setPrompt] = useState(''); //prompt to display on the file picker
  const [generatingImg, setGeneratingImg] = useState(false); //show loading spinner when generating image
  // keep track of the active tab
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on active tab
  // 'switch' looks for activeEditorTab
  // if the activeEditorTab is ColorPicker, then show the ColorPicker component
  // displayed on top of other components with absolute 
  const generateTabContent = () => {
    // switch (activeEditorTab) {
    //   case 'ColorPicker':
    //     return <ColorPicker />
    //   case 'AIPicker':
    //     return <AIPicker />
    //   default:
    //     return <FilePicker prompt={prompt} />
    // }

    switch (activeEditorTab) {
      case 'colorpicker': 
        return <ColorPicker />
      case 'aipicker':
        return <AIPicker />
      case 'filepicker':
        return <FilePicker />
      default:
        return null;
    }
  }

  return (
    <AnimatePresence>
      {/* check if we are currently on the homepage */}
      {!snap.intro && (
        <>
          {/* side tabs */}
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>

                {/* Editor Tabs */}
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()} 
                {/* will show on top once we activate a specific tab */}
              </div>
            </div>
          </motion.div>

          {/* back button */}
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => state.intro = true} //go back to homepage
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          {/* toggles */}
          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => {}}
                isFilterTab
                isActiveTab=''
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer