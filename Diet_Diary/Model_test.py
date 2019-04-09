from keras.datasets import cifar10
import keras.utils as utils
from keras.models import load_model

import numpy as np

labels = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

(_, _), (x_test, y_test) = cifar10.load_data()

x_test = x_test.astype('float32')/255.0

y_test = utils.to_categorical(y_test)


model = load_model(filepath='Image_Classifier.h5')
#
results = model.evaluate(x=x_test,y=y_test)

print("Test loss", results[0])

print("Test acc",results[1])

test_image = np.asarray([x_test[1]])




prediction = (model.predict(x=test_image))
print("Answer is ", y_test[1])

max_index = np.argmax(prediction[0])

print("prediction:", labels[max_index])