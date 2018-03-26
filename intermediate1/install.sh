#!/bin/bash
echo "Delete old enviorement_________"
rm -rf virtualenv
echo "Create new environment_____________"
virtualenv virtualenv -p python3
echo "Start environment______________"
source virtualenv/bin/activate
echo "Install pip requirements_______"
pip install -r requirements.txt
echo "[Finish]"
