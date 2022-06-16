# Streamlit - Gosling

A Streamlit component to display [Genomic Visualization using Gosling](http://gosling-lang.org).


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
Create a python file as below, then run it using `streamlit run app.py`.

```python
# app.py
import streamlit as st
import gosling as gos
from streamlit_gosling import streamlit_gosling as st_gos

size = 500
data = gos.matrix("https://server.gosling-lang.org/api/v1/tileset_info/?d=leung2015-hg38")
# data = gos.matrix('/path/to/dataset.cool') # local dataset

@st.cache
def chart():
    return gos.Track(data).mark_bar().encode(
    x=gos.X("xs:G", axis="bottom"),
    xe="xe:G",
    y=gos.Y("ys:G", axis="left"),
    ye="ye:G",
    color=gos.Color("value:Q", range="hot", legend=True),
    ).properties(width=size, height=size).view()

st_gos(spec=chart(), id='id', height=size+ 100)

```

## API

### st_echarts API

```
st_gos(
    id: string,
    spec: a gosling visualization object
    height: number
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
