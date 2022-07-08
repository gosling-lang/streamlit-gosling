# Streamlit - Gosling

A Streamlit component to display [Genomic Visualization using Gosling](http://gosling-lang.org).

<img alt="https://user-images.githubusercontent.com/9922882/109852545-e05f3400-7c22-11eb-90f3-7371e4ddeb42.png" src="https://user-images.githubusercontent.com/9922882/109852545-e05f3400-7c22-11eb-90f3-7371e4ddeb42.png">

An online demo is host at [Streamlit Clound](https://wangqianwen0418-streamlit-gosling-demo-st-gos-demo-zo60pz.streamlitapp.com/).  
Checkout the [code of the demo](wangqianwen0418/streamlit-gosling-demo/main/st_gos_demo.py)


## Install

```shell script
pip install streamlit-gosling
```

also need to install its dependencies `gosling` and `streamlit`
```
pip install gosling
pip install streamlit
```


## Usage

```python

import streamlit as st
import gosling as gos
from streamlit_gosling import streamlit_gosling as st_gos

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
st_gos(spec=chart(), id='id', height=size+ 100)
```
[docs of gosling python package](https://gosling-lang.github.io/gos)  
[docs of streamlit](https://docs.streamlit.io/)

## API

### st_echarts API

```
st_gos(
    id: string,
    spec: a gosling visualization object
    height: number,
    eventType?: 'mouseOver' | 'click' | 'rangeSelect'
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

Demo example is on https://github.com/andfanilo/streamlit-echarts-demo.

```shell script
git clone https://github.com/andfanilo/streamlit-echarts-demo
cd streamlit-echarts-demo/
streamlit run app.py
```

## Static HTML file
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
```