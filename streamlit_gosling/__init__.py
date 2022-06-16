import os
import streamlit.components.v1 as components
import gosling as gos

# False while we're developing
# the component, and True when we're ready to package and distribute it.
_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_gosling",
        url="http://localhost:3001",
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_gosling", path=build_dir)


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
def streamlit_gosling(id, spec, height = 400, key=None):
    """Create a new instance of "streamlit_gosling".

    Parameters
    ----------
    id: str
        id of the gosling visualization
    height: int
    spec: a gosling visualization object, created using gos

    """
   
    #  do not need a return value in our case, so set default to ''
    component_value = _component_func(id=id, spec=spec.to_json(), height=height, key=key, default='')

    return component_value

if not _RELEASE:
    import streamlit as st
    import gosling as gos

    st.write('DEV MODE')

    size = 500
    data = gos.matrix("https://server.gosling-lang.org/api/v1/tileset_info/?d=leung2015-hg38")
    # data = gos.matrix('/path/to/dataset.cool') # local dataset

    @st.cache
    def goschart():
        chart = gos.Track(data).mark_bar().encode(
        x=gos.X("xs:G", axis="bottom"),
        xe="xe:G",
        y=gos.Y("ys:G", axis="left"),
        ye="ye:G",
        color=gos.Color("value:Q", range="hot", legend=True),
        ).properties(width=size, height=size).view()

        return chart

    streamlit_gosling(spec=goschart(), id='id', height=size*1.5)