from keras.datasets import cifar10
import keras.utils as utils
from keras.models import load_model
from PIL import Image
import numpy as np
import food101

# labels = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
#
# (_, _), (x_test, y_test) = cifar10.load_data()
#
# x_test = x_test.astype('float32')/255.0
#
# y_test = utils.to_categorical(y_test)

labels = food101.get_class_labels()

model = load_model(filepath='Trained_model.h5')
#
# results = model.evaluate(x=x_test,y=y_test)
#
# print("Test loss", results[0])
#
# print("Test acc",results[1])

image = Image.open("E:/Downloads/food-101/images/apple_pie/1074856.jpg")
image = image.resize((200, 200), Image.ANTIALIAS)

image.load()
data = np.asarray(image)

image.close()

prediction = (model.predict(x=data))

max_index = np.argmax(prediction[0])
print(max_index)
print("prediction:", labels[max_index])