import React from 'react'

import CustomButton from './CustomButton'

const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className='filepicker-container'>
      {/* 'flex-col' to show the elements one under the other. 'accept=image/*' means accept all images */}
      {/* setFile accepts the event of the first image we upload  */}
      <div className='flex flex-col flex-1'> 
        <input 
          type='file'
          id='file-upload'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          htmlFor='file-upload'
          className='filepicker-label'
        >
          Upload File
        </label>

        {/* show which file we've uploaded. Truncate if the file name is to long */}
        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file === '' ? 'No file chosen' : file.name}
        </p>
      </div>

      {/* Button Wrapper */}
      <div className='flex flex-wrap mt-4 gap-3'>
        <CustomButton 
          type='outline'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles='text-xs'
        />        
        <CustomButton 
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyles='text-xs'
        />
      </div>
    </div>
  )
}

export default FilePicker