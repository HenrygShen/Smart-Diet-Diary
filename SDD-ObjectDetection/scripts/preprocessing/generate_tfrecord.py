"""
Usage:

# Create train data:
python generate_tfrecord.py --label=<LABEL> --csv_input=<PATH_TO_ANNOTATIONS_FOLDER>/train_labels.csv  --output_path=<PATH_TO_ANNOTATIONS_FOLDER>/train.record --img_path=<PATH_TO_IMAGES>\train
python generate_tfrecord.py --label=apple --csv_input=../../workspace/training_demo/annotations/train_labels.csv  --output_path=../../workspace/training_demo/annotations/train.record --img_path=../../workspace/training_demo/images/train
python generate_tfrecord.py --label0=apple --label1=coin --label2=banana --csv_input=../../workspace/training_demo/annotations/train_labels.csv  --output_path=../../workspace/training_demo/annotations/train.record --img_path=../../workspace/training_demo/images/train
python generate_tfrecord.py --csv_input=../../workspace/training_demo/annotations/train_labels.csv  --output_path=../../workspace/training_demo/annotations/train.record --img_path=../../workspace/training_demo/images/train


# Create test data:
python generate_tfrecord.py --label=<LABEL> --csv_input=<PATH_TO_ANNOTATIONS_FOLDER>/test_labels.csv  --output_path=<PATH_TO_ANNOTATIONS_FOLDER>/test.record --img_path=<PATH_TO_IMAGES>\test
python generate_tfrecord.py --label=apple --csv_input=../../workspace/training_demo/annotations/test_labels.csv  --output_path=../../workspace/training_demo/annotations/test.record --img_path=../../workspace/training_demo/images/test
python generate_tfrecord.py --label0=apple --label1=coin --label2=banana --csv_input=../../workspace/training_demo/annotations/test_labels.csv  --output_path=../../workspace/training_demo/annotations/test.record --img_path=../../workspace/training_demo/images/test
python generate_tfrecord.py --csv_input=../../workspace/training_demo/annotations/test_labels.csv  --output_path=../../workspace/training_demo/annotations/test.record --img_path=../../workspace/training_demo/images/test


"""

from __future__ import division
from __future__ import print_function
from __future__ import absolute_import

import os
import io
import pandas as pd
import tensorflow as tf
import sys
sys.path.append("../../models/research")

from PIL import Image
from object_detection.utils import dataset_util
from collections import namedtuple, OrderedDict

flags = tf.app.flags
flags.DEFINE_string('csv_input', '', 'Path to the CSV input')
flags.DEFINE_string('output_path', '', 'Path to output TFRecord')
# flags.DEFINE_string('label', '', 'Name of class label')
# if your image has more labels input them as
# flags.DEFINE_string('label0', '', 'Name of class[0] label')
# flags.DEFINE_string('label1', '', 'Name of class[1] label')
# flags.DEFINE_string('label2', '', 'Name of class[2] label')
# and so on.
flags.DEFINE_string('img_path', '', 'Path to images')
FLAGS = flags.FLAGS


# TO-DO replace this with label map
# for multiple labels add more else if statements
def class_text_to_int(row_label):
    # if row_label == FLAGS.label:  # 'ship':
    #     return 1
    # comment upper if statement and uncomment these statements for multiple labelling
    if row_label == 'apple':
        return 0
    elif row_label == 'coin':
        return 1
    elif row_label == 'chicken curry':
        return 1
    # elif row_label == 'banana':
    #   return 1
    elif row_label == 'coca cola can':
        return 1
    elif row_label == 'fanta can':
        return 1
    # elif row_label == 'doritos bbq':
    #   return 1
    # elif row_label == 'kiwifruit':
    #   return 1
    elif row_label == 'orange':
        return 1
    elif row_label == 'ETA sour cream':
        return 1
    elif row_label == 'ETA chicken':
        return 1
    elif row_label == 'bluebird sour cream':
        return 1
    elif row_label == 'McDonalds fries':
        return 1
    elif row_label == 'McDonalds big-mac':
        return 1
    elif row_label == 'McDonalds mcchicken':
        return 1
    elif row_label == 'McDonalds filet-o-fish':
        return 1
    elif row_label == 'PizzaHut pizza':
        return 1
    # elif row_label == 'pear':
    #   return 1
    # elif row_label == 'strawberry':
    #   return 1
    else:
        None


def split(df, group):
    data = namedtuple('data', ['filename', 'object'])
    gb = df.groupby(group)
    return [data(filename, gb.get_group(x)) for filename, x in zip(gb.groups.keys(), gb.groups)]


def create_tf_example(group, path):
    with tf.gfile.GFile(os.path.join(path, '{}'.format(group.filename)), 'rb') as fid:
        encoded_jpg = fid.read()
    encoded_jpg_io = io.BytesIO(encoded_jpg)
    image = Image.open(encoded_jpg_io)
    width, height = image.size

    filename = group.filename.encode('utf8')
    image_format = b'jpg'
    # check if the image format is matching with your images.
    xmins = []
    xmaxs = []
    ymins = []
    ymaxs = []
    classes_text = []
    classes = []

    for index, row in group.object.iterrows():
        xmins.append(row['xmin'] / width)
        xmaxs.append(row['xmax'] / width)
        ymins.append(row['ymin'] / height)
        ymaxs.append(row['ymax'] / height)
        classes_text.append(row['class'].encode('utf8'))

        # print(row['class'])
        classes.append(class_text_to_int(row['class']))

    tf_example = tf.train.Example(features=tf.train.Features(feature={
        'image/height': dataset_util.int64_feature(height),
        'image/width': dataset_util.int64_feature(width),
        'image/filename': dataset_util.bytes_feature(filename),
        'image/source_id': dataset_util.bytes_feature(filename),
        'image/encoded': dataset_util.bytes_feature(encoded_jpg),
        'image/format': dataset_util.bytes_feature(image_format),
        'image/object/bbox/xmin': dataset_util.float_list_feature(xmins),
        'image/object/bbox/xmax': dataset_util.float_list_feature(xmaxs),
        'image/object/bbox/ymin': dataset_util.float_list_feature(ymins),
        'image/object/bbox/ymax': dataset_util.float_list_feature(ymaxs),
        'image/object/class/text': dataset_util.bytes_list_feature(classes_text),
        'image/object/class/label': dataset_util.int64_list_feature(classes),
    }))
    return tf_example


def main(_):
    writer = tf.python_io.TFRecordWriter(FLAGS.output_path)
    path = os.path.join(os.getcwd(), FLAGS.img_path)
    examples = pd.read_csv(FLAGS.csv_input)
    grouped = split(examples, 'filename')
    for group in grouped:
        tf_example = create_tf_example(group, path)
        writer.write(tf_example.SerializeToString())

    writer.close()
    output_path = os.path.join(os.getcwd(), FLAGS.output_path)
    print('Successfully created the TFRecords: {}'.format(output_path))


if __name__ == '__main__':
    tf.app.run()