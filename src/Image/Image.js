import React from 'react'
const Image = ({ src, alt, isLoaded }) => {
  return (
    <>
        {isLoaded ? (
          <div className="lds-spinner">
              {new Array(12).map((index) => <div key={index+Math.random()} />)}
          </div>
        ) : (
          <img className="image-search__image" src={src} alt={alt} />
        )}
    </>
  )
}

export default Image


