from matplotlib import pyplot as plt

from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np

import imutils
import cv2

#
# def midpoint(ptA, ptB):
# 	return (ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5


def extract_foreground(img, rect):
	# img = cv2.imread('test1.jpg')
	mask = np.zeros(img.shape[:2],np.uint8)

	# resize
	# divisor = 1
	# newX,newY = img.shape[1]/divisor, img.shape[0]/divisor
	# print(newX)
	# print(newY)
	# newimg = cv2.resize(img,(int(newX),int(newY)))

	bgdModel = np.zeros((1,65),np.float64)
	fgdModel = np.zeros((1,65),np.float64)

	# rectangle highlighting the foreground
	# rect = (272,913,249,239)

	# rect = (int(267/divisor),int(581/divisor),int(1055/divisor),int(1197/divisor))
	print(rect)

	cv2.grabCut(img,mask,rect,bgdModel,fgdModel,5,cv2.GC_INIT_WITH_RECT)
	mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
	img = img*mask2[:,:,np.newaxis]

	# plt.imshow(img)
	# plt.colorbar()
	# plt.show()
	return img
