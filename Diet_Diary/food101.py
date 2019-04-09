import pathlib
import json
import numpy
# Imports for debugging
import matplotlib.pyplot as plt
import tensorflow as tf
from PIL import Image


# Set root for images
# data_root = pathlib.Path('E:/Downloads/food-101/images')


# # Get images for apple pies
# all_image_paths = list(data_root.glob("/apple_pie/*"))
# all_image_paths = [str(path) for path in all_image_paths]
#
#
# # Show image for apple pie - DEBUGGING
# image_path = all_image_paths[900]
# im = Image.open(image_path, 'r')
# image = plt.imread(image_path)
# plt.imshow(image)
# plt.show()


def get_class_labels():
    # Read labels
    with open("E:/Downloads/food-101/meta/classes.json", 'r') as file:
        labels_dict = json.load(file)
        labels = labels_dict['classes']

    # Print labels with indices
    labels = dict((name, index) for index, name in enumerate(labels))

    return labels


def get_train_labels():

    # Read labels
    with open("E:/Downloads/food-101/meta/test.json", 'r') as file:
        labels = json.load(file)

    return labels


def load_data():

    # Set up results
    x_train = []
    y_train = []

    # Get labels
    class_labels = get_class_labels()
    train_labels = get_train_labels()

    for (k, v) in train_labels.items():
        for i in range(0, len(v)):
            # Format image
            # TODO: process
            image = Image.open("E:/Downloads/food-101/images/" + v[i] + ".jpg")
            image = image.resize((50, 50), Image.ANTIALIAS)

            image.load()
            data = numpy.asarray(image, dtype="uint8")

            image.close()
            # print(len(data))
            # print(data)
            # Append image
            x_train.append(data)
            y_train.append(class_labels[k])

    # print(x_train)
    x_train = numpy.asarray(x_train, dtype  ='uint8')
    # write(x_train)
    return x_train, y_train;


# image = Image.open("E:/Downloads/food-101/images/apple_pie/134.jpg")
# image = image.resize((200, 200), Image.ANTIALIAS)
# image.load()
# data = numpy.asarray(image, dtype="int32" )
# # image.save('sompic.jpg')
# # image = plt.imread("E:/Downloads/food-101/images/apple_pie/134.jpg")
#
# plt.imshow(data)
# plt.show()
