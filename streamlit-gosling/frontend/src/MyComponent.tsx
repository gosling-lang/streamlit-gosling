import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
  ComponentProps
} from "streamlit-component-lib"
import React, { ReactNode, useEffect } from "react"

import { GoslingComponent, GoslingSpec } from 'gosling.js';

interface Props {
  id: string
  spec: GoslingSpec,
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
const MyComponent = (props: ComponentProps) => {
  const { id, spec }: Props = props.args

  // otherwise, the height of iframe is 0
  useEffect(() => Streamlit.setFrameHeight(400));


  return (<div >
    <h3>{id}</h3>
    <GoslingComponent
      // Gosling specification
      spec={{
        tracks: [{
          data: {
            url: "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
            type: "multivec",
            row: "sample",
            column: "position",
            value: "peak",
            categories: ["sample 1"]
          },
          "mark": "rect",
          "x": { "field": "position", "type": "genomic" },
          "color": { "field": "peak", "type": "quantitative", "legend": true },
          "width": 600,
          "height": 130
        }]
      }}
      // Styles of Gosling Component
      margin={0}
      padding={30}
      border={'none'}
      id={"my-gosling-component-id"}
      className={"my-gosling-component-style"}
      // Styling theme (refer to https://github.com/gosling-lang/gosling-theme)
      theme={'light'}
    />
  </div>
  )
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
