import pathlib
import IPython.display as display
import random
from PIL import Image
import matplotlib.pyplot as plt
import json
import scipy as sp

data_root = pathlib.Path('E:/Downloads/food-101')
# print(data_root)
# all_image_paths = []

# for path in data_root.iterdir():
#     print(path)
    # all_image_paths.append(tuple(path))

all_image_paths = list(data_root.glob("images/apple_pie/*"))
all_image_paths = [str(path) for path in all_image_paths]
random.shuffle(all_image_paths)
print(all_image_paths[0])
#
# image_count = len(all_image_paths)
# print(image_count)

image_path = random.choice(all_image_paths)
# im = Image.open(image_path, 'r')

image = plt.imread(image_path)
plt.imshow(image)
plt.show()

with open("E:/Downloads/food-101/meta/labels.json", 'r') as f:
    distros_dict = json.load(f)
    labels = distros_dict['labels']

label_to_index = dict((name, index) for index,name in enumerate(labels))
print(label_to_index)
