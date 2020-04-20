import React, { useState } from 'react'



const SelectService = ({addClass, options, onChange, value}) => {


  return (
    <>      
      <select 
        className={addClass} 
        onChange={onChange}
        value={value}
        >
        {options.map((option) => {
          return <option key={option.optionValue} value={option.optionValue}>{option.textContent}</option>
        })}
      </select>
    </>
  )
}

export default SelectService
