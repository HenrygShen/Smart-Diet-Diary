from keras.datasets import cifar10
import keras.utils as utils
from keras.models import load_model
from PIL import Image
import numpy as np
import food101
import matplotlib.pyplot as plt

# labels = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
#
(_, _), (x_test, y_test) = cifar10.load_data()

x_test = x_test.astype('float32')/255.0

y_test = utils.to_categorical(y_test)

# From here

labels = food101.get_class_labels()

model = load_model(filepath='models/fruit.h5')
#
# results = model.evaluate(x=x_test,y=y_test)
#
# print("Test loss", results[0])
#
# print("Test acc",results[1])

data = np.asarray(x_test[1])
# "C:/Users/Henry/Desktop/image.jpg"
# E:/Downloads/fruit/images/apple/11.jpg
image = Image.open("C:/Users/Henry/Desktop/apple2.jpg")
image = image.resize((50, 50), Image.ANTIALIAS)

image.load()
data2 = np.asarray(image)
data2 = data2.astype("float32")
data2 /= 255
image.close()
# data2.reshape([-1,200, 200,1])
# np.resize(data2, (-1, 200, 200))
data2 = data2.reshape(-1, 50, 50, 3)
# plt.imshow(data)
# plt.show()
prediction = (model.predict(x=data2))

print(prediction)
max_index = np.argmax(prediction[0])
print("prediction label index = " + str(max_index))
print(labels)