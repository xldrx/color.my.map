#! /usr/bin/env python -u
# coding=utf-8
DB_FILE = "./map.json"

__author__ = 'xl'

import os.path
import json

def get_areas():
    ret = []
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as fp:
            ret = json.load(fp)
    return ret


def add_area(area):
    areas = get_areas()
    areas.append(area)
    with open(DB_FILE, "w") as fp:
        json.dump(areas, fp)