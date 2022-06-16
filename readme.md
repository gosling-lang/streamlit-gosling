# Streamlit - Gosling

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)]()

A Streamlit component to display [Genomic Visualization using Gosling](http://gosling-lang.org).


## Install

```shell script
pip install streamlit-gosling
```

## Usage



```python
import gosling as gos
from streamlit_gosling import st_gos

# create a matrix visualization
size = 500
data = gos.matrix("https://server.gosling-lang.org/api/v1/tileset_info/?d=leung2015-hg38")

chart = gos.Track(data).mark_bar().encode(
    x=gos.X("xs:G", axis="bottom"),
    xe="xe:G",
    y=gos.Y("ys:G", axis="left"),
    ye="ye:G",
    color=gos.Color("value:Q", range="hot", legend=True),
    ).properties(width=size, height=size).view()


st_gos('id', chart.to_json(), height=size)
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
