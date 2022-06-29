import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
  ComponentProps
} from "streamlit-component-lib"
import React, { useRef, useEffect } from "react"

import { GoslingComponent, GoslingSpec} from 'gosling.js';
import { GoslingApi } from 'gosling.js/dist/src/core/api';
import { HiGlassApi } from 'gosling.js/dist/src/core/higlass-component-wrapper'

interface Props {
  id: string
  spec: string,
  height: number,
  gosApi: GoslingApi
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
const MyComponent = (props: ComponentProps) => {
  const { id, spec, height }: Props = props.args

  type TGoslingRef =  {api: GoslingApi;
    hgRef: HiGlassApi | React.RefObject<HiGlassApi | undefined>}
  
  const gosRef = useRef<TGoslingRef>(null)

  // set frame height
  // otherwise, the height of iframe is 0
  useEffect(() => {
    Streamlit.setFrameHeight(height)
  });


  useEffect(() => {
    if (gosRef.current) {
        // gosRef.current.api.subscribe('rawdata', (type, data) => {
        // console.log('rawdata', data);
        // }
    
        // 
        // gosRef.current.api.zoomTo('bam-2', `chr${data.data.chr2}:${data.data.start2}-${data.data.end2}`, 2000);
        // console.log('click', data.data);
        // TODO: show messages on the right-bottom of the editor
        // gosRef.current.api.subscribe('mouseOver', (type, eventData) => {
        //     console.warn(type, eventData.id, eventData.genomicPosition, eventData.data);
        //     // setMouseEventInfo({ type: 'mouseOver', data: eventData.data, position: eventData.genomicPosition });
        // });
        gosRef.current.api.subscribe('click', (type, eventData) => {
            console.warn(type, eventData.data);
            // Streamlit.setComponentValue(eventData.data);
            // setMouseEventInfo({ type: 'click', data: eventData.data, position: eventData.genomicPosition });
        });
        // Range Select API
        // gosRef.current.api.subscribe('rangeSelect', (type, eventData) => {
        //     console.warn(type, eventData.id, eventData.genomicRange, eventData.data);
        // });
    }
    return () => {
        // gosRef.current?.api.unsubscribe('mouseover');
        gosRef.current?.api.unsubscribe('click');
        // gosRef.current?.api.unsubscribe('rangeSelect');
    };
}, [gosRef.current]);


  return (
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
  )
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
