from PIL import Image
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.optimizers import SGD
from keras.constraints import maxnorm
import food101
import tensorflow as tf
import keras
from keras.utils import np_utils

config = tf.ConfigProto(device_count={'GPU': 1, 'CPU': 3})
sess = tf.Session(config=config)
keras.backend.set_session(sess)

from keras.datasets import cifar10

# Dataset Settings
image_size = 50
categories = 5

(X_train, y_train) = food101.load_data()
new_X_train = X_train.astype('float32')

new_X_train /= 255
print(new_X_train)

new_Y_train = np_utils.to_categorical(y_train)


model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=(image_size, image_size, 3), activation='relu', padding='same', kernel_constraint=maxnorm(3)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(1024, activation='relu', kernel_constraint=maxnorm(3)))
model.add(Dropout(0.5))
model.add(Dense(categories, activation='softmax'))
#
model.compile(loss='categorical_crossentropy', optimizer=SGD(lr=0.01), metrics=['accuracy'])
model.fit(new_X_train, new_Y_train, epochs=50, batch_size=5)
#
#
import h5py
model.save('Trained_model.h5')