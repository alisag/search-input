import React from 'react';
import { useEffect, useState } from 'react';


 export const SearchInput= (props)=> {  
  const [inputValue, setInputValue, filteredOptions, setFilteredOptions, options, setOptions] = useState({props});


  const filteredList = options ? (options.length<10 ? options : options.slice(0, 10)) : [];
  const handleSearchSerultEnterClick=(event)=>{
    setFilteredOptions(event.target.value)
    setOptions([])
  } 
  return (
      <div className="SearchInputArea">
        <input
          type="text"
          onChange={() => setInputValue}
          onKeyDown={(e) => handleSearchSerultEnterClick(e)}
        />
        <button className='clearSearch' title="clean search" onClick={() => setInputValue("")}>x</button>
        <ul className="autocomplete-results">
          {inputValue.length > 0 &&
            filteredList.map((option) => (
              <li
                key={option}
                onClick={() => setFilteredOptions(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      </div>
    );
  }
