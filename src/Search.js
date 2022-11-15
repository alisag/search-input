import './Search.css';
import { useEffect, useState, useRef } from 'react';
import SearchList from './SearchList';
import list from './data/MOCK_DATA.json';


function Search() {
  const [inputValue, setInputValue] = useState("");
  const [filteredResults, setFilteredResults] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionsToView, setOptionsToView]= useState(options);
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const inputEl = useRef(null);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    const optionsList = options ? options.filter(op => op.includes(e.target.value)) : [];
    const filteredOptionList = optionsList.length > 0 ? optionsList : [];
    setOptionsToView(filteredOptionList.reverse())
    if (filteredOptionList.length > 0) {
      setShowOptions(true)
    }
  };
  const clearValue = () => {
    setInputValue("");
    setFilteredResults(null)
    setShowOptions(false)
  };

  /*const handleKeyPress = (e) => {
    const currentIndex = options.length && options.findIndex((item) => selectedOption === item) || 0
    if (e.key === "Escape") {
      setInputValue("");
      setShowOptions(false)
    }
    if (e.key === "ArrowDown" && options[currentIndex + 1]) {
      setSelectedOption(options[currentIndex + 1])
    }
    if (e.key === "ArrowUp" && options[currentIndex - 1]) {
      setSelectedOption(options[currentIndex + 1])
    }

  }*/
  const handleClickOutsideBox=(event)=> {
    const autocompleteDiv = document.getElementById('autocompleteBox');
    if (autocompleteDiv && !autocompleteDiv.contains(event.target)) {
      setShowOptions(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutsideBox)
  },[]);

 const onSelectOption = (key, option) => {
    if (key === 'Enter') {
      const filteredList = option.length > 0 ? list.filter(item =>
        item.title.toLowerCase().includes(option)
      ) : [];
      setFilteredResults(filteredList);
      let optionList = options.indexOf(option) !== -1 ? options : options.concat(option);
      setOptions(optionList.reverse())
      setOptionsToView(optionList.reverse())
      setInputValue(option)
      setShowOptions(false)
    }
  }
  useEffect(() => {
    inputEl.current.focus();
    },[]);

  return (
    <div className="SearchInput">
    <div className='searchTitle'>Search here</div>
      <div className="SearchInputArea">
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          ref={inputEl}
          value={inputValue}
          onKeyPress={(e)=>onSelectOption(e.key, inputValue)}
        />
        {inputValue.length && <button className='clearSearch' title="clean search" onClick={() => clearValue()}>x</button>}
        {showOptions ? <div className="autocomplete-results" id="autocompleteBox">

          {optionsToView.filter((i, index) => (index < 10)).map((option, i) => (
            <div
              className={`autocomplete-results-item ${option===selectedOption ? "selected": ""}`}
              key={option + "_" + i}
              onMouseOver={() => setSelectedOption(option)}
              onClick={(e)=>onSelectOption("Enter", option)}
            >

              {option}
            </div>
          ))}
        </div> : null}
      </div>
      {filteredResults!==null && <span className="resultAmout">{filteredResults.length>0 ? `Total results ${filteredResults.length}` : `No Results`}</span>}
      {filteredResults!==null && filteredResults.length > 0 && <SearchList list={filteredResults}/>}
    </div>
  );
}

export default Search;




