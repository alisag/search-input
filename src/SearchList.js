import React from 'react';

function SearchList({list}) {
    return (
        <div className="resultContainer">
            {list && list.map((item, i) => (
                <div className="item" key={i}>
                    <a href={item.url}>{item.title}</a>
                    <span className="description">{item.text}</span>
                </div>
            ))}
        </div>
    );
}

export default SearchList;