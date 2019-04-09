from keras.datasets import cifar10
import matplotlib.pyplot as plt

(train_images, train_labels), (test_images, test_labels) = cifar10.load_data()

first_image = train_images[0]

print(first_image)
plt.imshow(first_image)

