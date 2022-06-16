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
  spec: string,
  height: number
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
const MyComponent = (props: ComponentProps) => {
  const { id, spec, height }: Props = props.args

  // otherwise, the height of iframe is 0
  useEffect(() => {
    Streamlit.setFrameHeight(height)
  });


  return (
    <GoslingComponent
      // Gosling specification
      spec={JSON.parse(spec)}
      // Styles of Gosling Component
      margin={0}
      padding={30}
      border={'none'}
      id={"my-gosling-component-id"}
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
