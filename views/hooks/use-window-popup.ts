import {useCallback, useEffect} from "react";
import * as React from "react";

type Props = {
  onDataReceived : ()=>void
  dataKey: string
  url: string
  pageTitle: string
}

export function useWindowPopup({onDataReceived, url, dataKey, pageTitle} : Props) : ()=>void {

  const onMessage = useCallback((e: MessageEvent)=>{
    if (e.data && e.data[dataKey] && e.origin === window.origin){
      onDataReceived();
    }
  }, [onDataReceived, dataKey])

  useEffect(()=>{
    window.addEventListener('message',onMessage)
    return ()=>{
      window.removeEventListener('message', onMessage)
    }
  }, [onMessage])
  const openWindow =React.useCallback( () => {
    let options = '';
    const width = 500;
    const height = 500;
    options += `,width=${  width}`;
    options += `,height=${  height}`;
    if (url){
      window.open(url, "Login", options);
    }
  }, [url])
  return openWindow;
}
