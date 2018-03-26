#!/bin/bash
echo "Activate enviorement"
source virtualenv/bin/activate
echo "Start"
./manage.py runserver 127.0.0.1:8000
