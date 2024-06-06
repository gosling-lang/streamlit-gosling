from os.path import dirname
from os.path import join
import setuptools


def readme() -> str:
    """Utility function to read the README file.
    :return: content of README.md
    """
    return open(join(dirname(__file__), "readme.md")).read()


setuptools.setup(
    name="streamlit-gosling",
    version="0.1.4",
    author="Qianwen Wang",
    author_email="qianwen.april.wang@gmail.com",
    description="Gosling custom component for Streamlit",
    long_description=readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/gosling-lang/streamlit-gosling",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.9",
    install_requires=[
        "streamlit >= 1.20.0",
        "gosling >= 0.2.1"
    ]
)
