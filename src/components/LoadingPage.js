import React, { useState, useEffect } from 'react';

const LoadingPage = () => {

  const [ text ] = useState(['Loading Flux Capacitor!', 'Generating critical Thingmybobs!', 'Incoming things from the interweb!', 'Hold on, right there!', 'We\'re on it!', 'Warming up Rockets', 'Sniffing data packets!', 'Earnestly Discombulating!', 'scanning all doofers!', 'A few bytes to eat, be right there!', 'compiling wire frame from etch-a-sketch !'])
  
  const [ selectedText, setSelectedText ] = useState(text[Math.floor(Math.random() * text.length)])

  const randomText = () => {
    setSelectedText(text[Math.floor(Math.random() * text.length)])
  }

  // This seems to be the way to best mimmick componentDidMount and ComponentWillUnmount via hooks...
  useEffect(() => {
    const timer = setInterval(() => {
      randomText();
    }, 850);
  
    // returned function will be called on component unmount 
    return () => {
      clearInterval(timer);
    }
  }, [])
  

  return (
    <div className="loader">
      <img className="loader__image" src="/images/loader.gif" />
      <p>{selectedText}</p>
    </div>
  )
}

export default LoadingPage;
