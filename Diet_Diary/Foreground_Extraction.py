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

# gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# gray = cv2.GaussianBlur(gray, (7, 7), 0)
#
# # perform edge detection, then perform a dilation + erosion to
# # close gaps in between object edges
# edged = cv2.Canny(gray, 50, 100)
# edged = cv2.dilate(edged, None, iterations=1)
# edged = cv2.erode(edged, None, iterations=1)
#
# # plt.imshow(edged)
# # plt.show()
# # exit()
# # find contours in the edge map
# cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
# 						cv2.CHAIN_APPROX_SIMPLE)
# cnts = imutils.grab_contours(cnts)
#
# # sort the contours from left-to-right and initialize the
# # 'pixels per metric' calibration variable
# (cnts, _) = contours.sort_contours(cnts)
# pixelsPerMetric = None
#
# # loop over the contours individually
# for c in cnts:
# 	# if the contour is not sufficiently large, ignore it
# 	if cv2.contourArea(c) < 100:
# 		continue
#
# 	# compute the rotated bounding box of the contour
# 	orig = img.copy()
# 	box = cv2.minAreaRect(c)
# 	box = cv2.cv.BoxPoints(box) if imutils.is_cv2() else cv2.boxPoints(box)
# 	box = np.array(box, dtype="int")
#
# 	# order the points in the contour such that they appear
# 	# in top-left, top-right, bottom-right, and bottom-left
# 	# order, then draw the outline of the rotated bounding
# 	# box
# 	box = perspective.order_points(box)
# 	cv2.drawContours(orig, [box.astype("int")], -1, (0, 255, 0), 2)
#
# 	# loop over the original points and draw them
# 	for (x, y) in box:
# 		cv2.circle(orig, (int(x), int(y)), 5, (0, 0, 255), -1)
#
# 	# unpack the ordered bounding box, then compute the midpoint
# 	# between the top-left and top-right coordinates, followed by
# 	# the midpoint between bottom-left and bottom-right coordinates
# 	(tl, tr, br, bl) = box
# 	(tltrX, tltrY) = midpoint(tl, tr)
# 	(blbrX, blbrY) = midpoint(bl, br)
#
# 	# compute the midpoint between the top-left and top-right points,
# 	# followed by the midpoint between the top-righ and bottom-right
# 	(tlblX, tlblY) = midpoint(tl, bl)
# 	(trbrX, trbrY) = midpoint(tr, br)
#
# 	# draw the midpoints on the image
# 	cv2.circle(orig, (int(tltrX), int(tltrY)), 5, (255, 0, 0), -1)
# 	cv2.circle(orig, (int(blbrX), int(blbrY)), 5, (255, 0, 0), -1)
# 	cv2.circle(orig, (int(tlblX), int(tlblY)), 5, (255, 0, 0), -1)
# 	cv2.circle(orig, (int(trbrX), int(trbrY)), 5, (255, 0, 0), -1)
#
# 	# draw lines between the midpoints
# 	cv2.line(orig, (int(tltrX), int(tltrY)), (int(blbrX), int(blbrY)), (255, 0, 255), 2)
# 	cv2.line(orig, (int(tlblX), int(tlblY)), (int(trbrX), int(trbrY)), (255, 0, 255), 2)
#
# 	# compute the Euclidean distance between the midpoints
# 	dA = dist.euclidean((tltrX, tltrY), (blbrX, blbrY))
# 	dB = dist.euclidean((tlblX, tlblY), (trbrX, trbrY))
#
# 	# if the pixels per metric has not been initialized, then
# 	# compute it as the ratio of pixels to supplied metric
# 	# (in this case, inches)
# 	if pixelsPerMetric is None:
# 		pixelsPerMetric = dB / 26.5
#
# 	# compute the size of the object
# 	dimA = dA / pixelsPerMetric
# 	dimB = dB / pixelsPerMetric
#
# 	# draw the object sizes on the image
# 	cv2.putText(orig, "{:.1f}cm".format(dimA),
# 				(int(tltrX - 15), int(tltrY - 10)), cv2.FONT_HERSHEY_SIMPLEX,
# 				0.65, (255, 255, 255), 2)
# 	cv2.putText(orig, "{:.1f}cm".format(dimB),
# 				(int(trbrX + 10), int(trbrY)), cv2.FONT_HERSHEY_SIMPLEX,
# 				0.65, (255, 255, 255), 2)
#
# 	# show the output image
# 	W = 500
# 	height, width, depth = orig.shape
# 	imgScale = W / width
# 	newX, newY = orig.shape[1] * imgScale, orig.shape[0] * imgScale
# 	imS = cv2.resize(orig, (int(newX), int(newY)))
# 	cv2.imshow("Image", imS)
# 	cv2.waitKey(0)