import numpy as np
import os
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile
import cv2

from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from PIL import Image
from utils import label_map_util
from utils import visualization_utils as vis_util

# Define the video stream
# cap = cv2.VideoCapture(0)  # Change only if you have more than one webcams

# What model to download.
# Models can bee found here: https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md
# MODEL_NAME = 'ssd_inception_v2_coco_2017_11_17'
# MODEL_NAME = 'pre-trained-model'
# MODEL_NAME = 'trained-inference-graphs/output_inference_graph_rcnn_resnetv5.pb'
MODEL_NAME = 'trained-inference-graphs/output_inference_graph_rcnnv14v4.pb'
# DOWNLOAD_BASE = 'http://download.tensorflow.org/models/object_detection/'

# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
# PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')
PATH_TO_LABELS = os.path.join('annotations', 'label_map.pbtxt')

# Number of classes to detect
NUM_CLASSES = 14

# # Download Model
# opener = urllib.request.URLopener()
# opener.retrieve(DOWNLOAD_BASE + MODEL_FILE, MODEL_FILE)
# tar_file = tarfile.open(MODEL_FILE)
# for file in tar_file.getmembers():
#     file_name = os.path.basename(file.name)
#     if 'frozen_inference_graph.pb' in file_name:
#         tar_file.extract(file, os.getcwd())


# Load a (frozen) Tensorflow model into memory.
detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.GraphDef()
    with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')


# Loading label map
# Label maps map indices to category names, so that when our convolution network predicts `5`, we know that this corresponds to `airplane`.  Here we use internal utility functions, but anything that returns a dictionary mapping integers to appropriate string labels would be fine
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(
    label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)


# Helper code
def load_image_into_numpy_array(image):
    (im_width, im_height) = image.size
    return np.array(image.getdata()).reshape(
        (im_height, im_width, 3)).astype(np.uint8)


# Detection
with detection_graph.as_default():
    with tf.Session(graph=detection_graph) as sess:
        # while True:
        # ImageFont.truetype('C:/Users/Henry/Desktop/SDD-ObjectDetection/workspace/training_demo/Arial.ttf', 60)
        # Read frame from camera
        # ret, image_np = cap.read()
        # dir = '../../../Diet_Diary/'
        dir = 'images/test/'
        for filename in os.listdir(dir):
            if filename.endswith('.jpg'):
                print(filename)
                image_np = cv2.imread(dir + filename)
                # image_np = cv2.imread('../../../Diet_Diary/testora (1)resized.jpg')
                # image_np = cv2.imread('images/test/McDonalds mcchicken (951).jpg')
                # image_np = cv2.imread('images/train/McDonalds mcchicken (300).jpg')
                height, width, channels = image_np.shape
                # scale = width / 600 if width > height else height / 600
                # width = int(width / scale)
                # height = int(height / scale)
                #
                # image_np = cv2.resize(image_np, (width, height))
                # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
                image_np_expanded = np.expand_dims(image_np, axis=0)
                # Extract image tensor
                image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
                # Extract detection boxes
                boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
                # Extract detection scores
                scores = detection_graph.get_tensor_by_name('detection_scores:0')
                # Extract detection classes
                classes = detection_graph.get_tensor_by_name('detection_classes:0')
                # Extract number of detectionsd
                num_detections = detection_graph.get_tensor_by_name(
                    'num_detections:0')
                # Actual detection.
                (boxes, scores, classes, num_detections) = sess.run(
                    [boxes, scores, classes, num_detections],
                    feed_dict={image_tensor: image_np_expanded})
                # Visualization of the results of a detection.
                vis_util.visualize_boxes_and_labels_on_image_array(
                    image_np,
                    np.squeeze(boxes),
                    np.squeeze(classes).astype(np.int32),
                    np.squeeze(scores),
                    category_index,
                    use_normalized_coordinates=True,
                    line_thickness=8)

                # print answer
                # Here output the category as string and score to terminal
                print([category_index.get(i) for i in classes[0]])
                print(scores)
                #y min, x min, y max, x max
                #left, right, top, bottom
                y_min = boxes[0][0][0] * height
                x_min = boxes[0][0][1] * width
                y_max = boxes[0][0][2] * height
                x_max = boxes[0][0][3] * width

                # Get bounding box in format (topleft x, topleft y, width, height)
                TL_x = int(x_min)
                TL_y = int(y_min)
                box_width = int(x_max - x_min)
                box_height = int(y_max - y_min)

                rect = (TL_x, TL_y, box_width, box_height)
                print("Image Size = " + str(width) + " x " + str(height))

                print(rect)
                # Display output
                cv2.imshow('object detection', cv2.resize(image_np, (600, 600)))
                cv2.waitKey(0)
        # if cv2.waitKey(25) & 0xFF == ord('q'):
        #     cv2.destroyAllWindows()
        #     break