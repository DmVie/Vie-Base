import React, { useState, useEffect } from 'react';

const LoadingPage = () => {

  const [ text ] = useState(['Loading Flux Capacitor!', 'Generating critical Thingmybobs!', 'Incoming things from the interweb!', 'Hold on, right there!', 'We\'re on it!', 'Warming up jets', 'Sniffing data packets!', 'Earnestly Discombulating!', 'Scanning all doofers!', 'A few bytes to eat..', 'Compiling wire frame from etch-a-sketch !', 'Analyzing lego replica..'])
  
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
      <img className="loader__image" src="https://dmvie1.s3.us-east-2.amazonaws.com/misc/loader.gif" />
      <p>{selectedText}</p>
    </div>
  )
}

export default LoadingPage;
