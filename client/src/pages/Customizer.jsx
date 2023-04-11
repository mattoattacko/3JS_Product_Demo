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
  const [activeEditorTab, setActiveEditorTab] = useState('');
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
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg} //loading state
          handleSubmit={handleSubmit} //handle file upload
        />
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      default:
        return null;
    }
  }

  // handle file upload
  // async function that takes in the type of decal (logo or full texture)
  const handleSubmit = async (type) => {
    if(!prompt) return alert('Please enter a prompt');

    try {
      // call BE to generate image
      setGeneratingImg(true); //start loading

      // we make a post request of type json to localhost:8080/api/v1/dalle, passing over the prompt.
      // this is calling the server we created (the route 'router.route('/').post(async(req, res) => {.....)) which generates the image from the DALLE API, which returns it as a photo
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      // get the response from the server
      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  }

  // Handle File Upload //
  // type can be a logo or full texture
  const handleDecals = (type, result) => {
    // first get decal type
    const decalType = DecalTypes[type];

    //then update the state (state being the index.js file in the store folder)
    state[decalType.stateProperty] = result;

    // need to figure out if the decal is currently active (either as a logo or texture)
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  // handle active filter tab
  // checks are we showing the logo or texture? Both? Neither?
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      // if the case is 'logoShirt', then we add the state that isLogoTexture is not active. Toggle it on/off
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      // if the case is 'stylishShirt', then we add the state that isFullTexture is not activeFilterTab. Toggle it on/off
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, we need to update the activeFilterTab
    // since we are working with the previous state, we need to use the callback function containing the previous state
    // we need to return an object that spreads the previous state, but then it needs to update the tabName to be equal to the previous state of the tabName
    // then we take the tabName and set it to the opposite of the previous state of the tabName (toggle it on/off)
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  // pass to reader function to get file data
  // we pass the file to the decals of the shirt depending on the type of image
  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab(''); //reset active tab
      })
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
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer