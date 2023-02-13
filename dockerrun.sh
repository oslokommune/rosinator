#!/bin/bash

# This script is used to run the docker container
# build using dockerfile

docker build -t rosinator .

docker run -it --rm --name rosinator -p 5173:5173 rosinator