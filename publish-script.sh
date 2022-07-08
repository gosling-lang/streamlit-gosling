#!/bin/bash

echo '1. make sure you have set _RELEASE = True in __init__.py'

echo '2. check the version number in setup.py'

echo '3. publish to Test PyPi'
echo 'yes or no'
read ans

# build front end 
cd streamlit_gosling/frontend
npm run build
cd ../../

# create wheel from the source code
rm -r dist/
python setup.py sdist bdist_wheel

if [ "$ans" = "yes" ]; then
    # upload to test pypi
    python3 -m twine upload --repository testpypi dist/*
else
    # upload to pypi
    python3 -m twine upload dist/*
fi

# download from test pypi
# python -m pip install --index-url https://test.pypi.org/simple/ --no-deps streamlit_gosling


