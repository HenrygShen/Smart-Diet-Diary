import pathlib
import json

# Imports for debugging
import matplotlib.pyplot as plt
from PIL import Image


# Set root for images
data_root = pathlib.Path('E:/Downloads/food-101')


# Get images for apple pies
all_image_paths = list(data_root.glob("images/apple_pie/*"))
all_image_paths = [str(path) for path in all_image_paths]


# Show image for apple pie - DEBUGGING
image_path = all_image_paths[900]
im = Image.open(image_path, 'r')
image = plt.imread(image_path)
plt.imshow(image)
plt.show()


# Read labels
with open("E:/Downloads/food-101/meta/labels.json", 'r') as file:
    labels_dict = json.load(file)
    labels = labels_dict['labels']

# Print labels with indices
label_to_index = dict((name, index) for index,name in enumerate(labels))
print(label_to_index)
