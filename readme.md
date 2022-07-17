# Streamlit - Gosling

A Streamlit component to display [Genomic Visualization using Gosling](http://gosling-lang.org).

<img src="./assets/demo.gif">

An online demo is host at [Streamlit Clound](https://wangqianwen0418-streamlit-gosling-demo-st-gos-demo-zo60pz.streamlitapp.com/).  
Checkout the [code of the demo](https://github.com/wangqianwen0418/streamlit-gosling-demo/blob/main/st_gos_demo.py)


## Install

```shell script
pip install streamlit-gosling streamlit
```

also need to install its dependencies `gosling` and `streamlit`
```
pip install gosling
pip install streamlit
```


## Usage

This library provides 2 functions to display gosling visualization :

- `from_gos` to display visualization from a gosling instances. Make sure you have `gosling` installed via `pip install gosling`.
- `from_json` to display visualization from Golsing spec in the form Python dict.

### using `from_gos`
```python

import streamlit as st
import gosling as gos
import streamlit_gosling as st_gos

size = 500


# create visualization using gosling
@st.cache
def chart():
    data = gos.matrix("https://server.gosling-lang.org/api/v1/tileset_info/?d=leung2015-hg38")
    return gos.Track(data).mark_bar().encode(
        x=gos.X("xs:G", axis="bottom"),
        xe="xe:G",
        y=gos.Y("ys:G", axis="left"),
        ye="ye:G",
        color=gos.Color("value:Q", range="hot", legend=True),
    ).properties(width=size, height=size).view()

# wrap gosling visualization as a streamlit component
st_gos.from_gos(
    spec=chart(), 
    id='id', 
    height=size+ 100
)
```

### using `from_json`
```python
import streamlit_gosling as st_gos

spec = {
  "title": "Basic Marks: bar",
  "subtitle": "Tutorial Examples",
  "tracks": [
    {
      "layout": "linear",
      "width": 800,
      "height": 180,
      "data": {
        "url": "https://resgen.io/api/v1/tileset_info/?d=UvVPeLHuRDiYA3qwFlm7xQ",
        "type": "multivec",
        "row": "sample",
        "column": "position",
        "value": "peak",
        "categories": ["sample 1"],
        "binSize": 5
      },
      "mark": "bar",
      "x": {"field": "start", "type": "genomic", "axis": "bottom"},
      "xe": {"field": "end", "type": "genomic"},
      "y": {"field": "peak", "type": "quantitative", "axis": "right"},
      "size": {"value": 5}
    }
  ]
}

st_gos.from_gos(
    spec=spec, 
    id='gos_bar', 
    height= 200
)
```


- [docs of gosling grammar](http://gosling-lang.org/docs)  
- [docs of gosling python package](https://gosling-lang.github.io/gos)  
- [docs of streamlit](https://docs.streamlit.io/)

## API

### streamlit-gosling API

```
from_gos(id: string,
    spec: a gosling visualization object,
    height: number,
    exportButton: boolean,
    eventType?: 'mouseOver' | 'click' | 'rangeSelect',
    api?
)
```

```
from_json(id: string,
    spec: a gosling JSON spec as python dicts
    height: number,
    exportButton: boolean,
    eventType?: 'mouseOver' | 'click' | 'rangeSelect',
    api?
)
```

- **id**: `string`
- **spec**: a visualization object created using Gosling or a gosling JSON spec as python dicts
- **height**: `number`
- **exportButton**: `boolean`, whether to include the export button in the gosling component
- **eventType**: `string`, one of 'mouseOver', 'click', and 'rangeSelect'. If specified, the event data of the specified mouse event will be returned by the streamlit-gosling component.
- **api**: Call an api function of the gosling visualization. 
  Three types of api actions are currently supported. 
  - `{ action: "zoomTo", viewId: string, position: string, padding?: number, duration?: number }`
  - `{ action: "zoomToExtent", viewId: string, duration?: number}`
  - `{ action: "zoomToGene", viewId: string, gene: string, padding?: number, duration?: number }`

  

  example
  ```python
  import streamlit as st
  from streamlit_gosling as st_gos

  # user select a chromosome using streamlit select box
  chr = st.select('zoom to a chromosome', [str(i) for i in range(1, 20)])

  # the visaulization will zoom to different chromosome based on users' selection above
  st_gos.from_gos(
      spec=/****/, 
      id='id', 
      height=350, 
      api={'action': 'zoomTo','viewId': 'track-1', 'position': f'chr{chr}'}
    )
  ```

## Development

### Install

- JS side

```shell script
cd frontend
npm install
```

- Python side

```shell script
conda create -n streamlit-gosling python=3.7
conda activate streamlit-gosling
pip install -e .
```

### Run

You need to run both the JS side and the Python side for development mode.

- JS side

```shell script
cd frontend
npm run start
```

- Python side

```shell script
git clone https://github.com/andfanilo/streamlit-echarts-demo
cd streamlit-echarts-demo/
streamlit run app.py
```

<!-- ## Static HTML file
If you only need static rendering of gosling, with no communication from Gosling back to Streamlit, then you may not need `streamlit-gosling`.
Using  `components.html` will be the easiest way.
```python
import gosling as gos
import streamlit.components.v1

import urllib.request as urllib
import json

URL = "https://gist.githubusercontent.com/sehilyi/54eaeecd2f07203a707e1516b1cf8e60/raw/d7728224b475a87604f97ba5522e1501edc2565a/gosling.js"

def load_schema():
    with urllib.urlopen(urllib.Request(URL)) as response:
        raw = response.read()
        conf = json.loads(raw)
    return conf

if __name__ == "__main__":
    schema = load_schema()
    html = gos.View(**schema)._repr_mimebundle_()['text/html']
    streamlit.components.v1.html(html, width=800, height=300)
``` -->
