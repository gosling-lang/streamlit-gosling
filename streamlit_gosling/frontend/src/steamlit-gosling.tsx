import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps
} from "streamlit-component-lib"
import React, { useRef, useEffect } from "react"

import { GoslingComponent, GoslingSpec} from 'gosling.js';
import { GoslingApi } from 'gosling.js/dist/src/core/api';
import {GoslingRef} from 'gosling.js/dist/src/core/gosling-component';

import './streamlit-gosling.css'

interface Props {
  id: string
  spec: string,
  height: number,
  gosApi: GoslingApi,
  eventType: 'rawData' | 'mouseOver' | 'click' | 'rangeSelect',
  exportButton: boolean 
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
const StreamlitGoslingComponent = (props: ComponentProps) => {
  const { id, spec, height, eventType, exportButton }: Props = props.args

  const gosRef = useRef<GoslingRef>(null)

  // set frame height
  // otherwise, the height of iframe is 0
  useEffect(() => {
    Streamlit.setFrameHeight(height)
  });




  useEffect(() => {

    if (gosRef.current && eventType) {
        
        gosRef.current.api.subscribe(eventType, (type, eventData) => {
            Streamlit.setComponentValue(eventData.data);
        });
      
      return () => {
          gosRef.current?.api.unsubscribe(eventType);
      };
    }
  }, [gosRef.current]);
  


  return (
    <>
    <GoslingComponent
      // Gosling specification
      ref={gosRef}
      spec={JSON.parse(spec)}
      // Styles of Gosling Component
      margin={0}
      padding={30}
      border={'none'}
      id={id}
      className={"my-gosling-component-style"}
      // Styling theme (refer to https://github.com/gosling-lang/gosling-theme)
      theme={'light'}
    />

    {exportButton && <div className='export-meun'>
      Export
      <div className='sub-meun'>
        <button onClick={()=>gosRef.current?.api.exportPdf()}>pdf</button>
        <button onClick={()=>gosRef.current?.api.exportPng()}>png</button>
      </div>
    </div>}

    
    </>
  )
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(StreamlitGoslingComponent)
