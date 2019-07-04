import os
import mimetypes
import base64
import random
import json


import sys
import numpy as np
np.set_printoptions(threshold=sys.maxsize)

#Get working directory
working_dir = os.path.dirname(__file__)

# Read labels
with open("C:/Users/linco/Desktop/back-end-cherry/labels.json", 'r') as file:
    labels_dict = json.load(file)
    labels = labels_dict['labels']

# Print labels with indices
labels = dict((name, index) for index, name in enumerate(labels))

for key, value in labels.items():
    if value == 2:
        print(key)