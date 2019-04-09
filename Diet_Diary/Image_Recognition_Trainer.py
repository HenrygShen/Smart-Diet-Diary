from PIL import Image
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.optimizers import SGD
from keras.constraints import maxnorm
import food101

from keras.datasets import cifar10

(X_train, y_train)  = food101.load_data()


from keras.utils import np_utils

new_X_train = X_train.astype('float32')

new_X_train /= 255
print(X_train)

new_Y_train = np_utils.to_categorical(y_train)


#
# #
model = Sequential()
model.add(Conv2D(32, (3, 3), input_shape=(50, 50, 3), activation='relu', padding='same', kernel_constraint=maxnorm(3)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(1024, activation='relu', kernel_constraint=maxnorm(3)))
model.add(Dropout(0.5))
model.add(Dense(101, activation='softmax'))
#
model.compile(loss='categorical_crossentropy', optimizer=SGD(lr=0.01), metrics=['accuracy'])
model.fit(new_X_train, new_Y_train, epochs=100, batch_size=50)
#
#
import h5py
model.save('Trained_model.h5')