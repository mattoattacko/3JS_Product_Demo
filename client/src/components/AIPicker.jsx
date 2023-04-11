// just a form and 2 buttons that calls our backend API
import React from 'react'

import CustomButton from './CustomButton'

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className='aipicker-container'>
      <textarea 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
        rows={5}
        className='aipicker-textarea'
      />

      <div className="flex flex-wrap gap-3">
        {/* are we currently loading? Are we generating an image? If so, show loading-ish button. If not, show a react fragment w/ 2 different buttons */}
        {generatingImg ? (
          <CustomButton 
            type='outline'
            title='Asking AI...'
            customStyles='text-xs'
          />
        ) : (
          <>
            {/* generate logo */}
            <CustomButton 
              type='outline'
              title='AI Logo'
              handleClick={() => handleSubmit('logo')}
              customStyles='text-xs'
            />            
            
            {/* generate full image */}
            <CustomButton 
              type='filled'
              title='AI Full'
              handleClick={() => handleSubmit('full')}
              customStyles='text-xs'
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker