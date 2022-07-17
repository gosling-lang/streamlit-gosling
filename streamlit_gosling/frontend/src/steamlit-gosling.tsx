import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps
} from "streamlit-component-lib"
import React, { useRef, useEffect } from "react"

import { GoslingComponent } from 'gosling.js';
import { GoslingRef } from 'gosling.js/dist/src/core/gosling-component';

import './streamlit-gosling.css'
type ZoomToAPI = {
  action: "zoomTo", viewId: string, position: string, padding?: number, duration?: number
}

type ZoomToExtentAPI = {
  action: "zoomToExtent", viewId: string, duration?: number
}

type ZoomToGeneAPI = {
  action: "zoomToGene", viewId: string, gene: string, padding?: number, duration?: number
}
type GosAPI = ZoomToAPI | ZoomToExtentAPI | ZoomToGeneAPI


interface Props {
  id: string
  spec: string,
  height: number,
  eventType: 'rawData' | 'mouseOver' | 'click' | 'rangeSelect',
  exportButton: boolean,
  gosAPI?: GosAPI
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
const StreamlitGoslingComponent = (props: ComponentProps) => {
  const { id, spec, height, eventType, exportButton, gosAPI }: Props = props.args

  const gosRef = useRef<GoslingRef>(null)

  // set frame height
  // otherwise, the height of iframe is 0
  useEffect(() => {
    Streamlit.setFrameHeight(height)
  });




  // subscribe event
  useEffect(() => {
    const currentRef = gosRef.current
    if (currentRef && eventType) {

      currentRef.api.subscribe(eventType, (type, eventData) => {
        Streamlit.setComponentValue(eventData.data);
      });

      return () => {
        currentRef?.api.unsubscribe(eventType);
      };
    }
  }, [eventType]);


  useEffect(() => {
    if (gosRef.current && gosAPI) {
      const { viewId, action, duration } = gosAPI
      const viewIds = gosRef.current.api.getViewIds()
      if (viewIds.includes(viewId)) {
        if (action === 'zoomTo') {
          const { position, padding } = gosAPI as ZoomToAPI
          gosRef.current.api.zoomTo(viewId, position, padding)
        } else if (action === 'zoomToExtent') {
          gosRef.current.api.zoomToExtent(viewId, duration)
        } else if (action === 'zoomToGene') {
          const { gene, padding } = gosAPI as ZoomToGeneAPI
          gosRef.current.api.zoomToGene(viewId, gene, padding, duration)
        } else {
          console.warn(`action ${action} is not supported`)
        }

      } else {
        console.warn(`${viewId} does not exist in ${viewIds}`)
      }

    }
  }, [gosAPI])


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
          <button onClick={() => gosRef.current?.api.exportPdf()}>pdf</button>
          <button onClick={() => gosRef.current?.api.exportPng()}>png</button>
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
