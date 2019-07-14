# import the necessary packages
from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
import argparse
import imutils
import cv2
import matplotlib.pyplot as plt

import Foreground_Extraction

# Supply an image that has a coin as the leftmost object
# To run the code:
# python object_size.py --image test1.jpg --width 2.65

def midpoint(ptA, ptB):
	return (ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5


# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
	help="path to the input image")
ap.add_argument("-w", "--width", type=float, required=True,
	help="width of the left-most object in the image (in inches)")
args = vars(ap.parse_args())

itest = cv2.imread('black-grapes.jpg')
plt.imshow(itest)
plt.show()

# load the image, convert it to grayscale, and blur it slightly
image = cv2.imread(args["image"])
height, width, depth = image.shape
print(height)
print(width)

scale = width/300 if width>height else height/300
new_width = int(width/scale)
new_height = int(height/scale)

print(new_width)
print(new_height)
image = cv2.resize(image, (new_width, new_height))
# rectangle around the object you want to find the size of (topleft x, topleft y, width, height)
# rect = (272,913,249,239)
# apple = (71, 107, 81, 79)

# x = 59
# y = 62
# food_width = 97
# food_height = 191
x = 71
y = 107
food_width = 81
food_height = 79
food = (x, y, food_width, food_height)



# coin = (9,152,30,34)
coin_x = 18
coin_y = 134
coin_width = 27
coin_height = 28
coin = (coin_x,coin_y,coin_width,coin_height)


image1 = Foreground_Extraction.extract_foreground(image, coin)
image2 = Foreground_Extraction.extract_foreground(image, food)

addedImages = cv2.add(image1, image2)

lastValidCol = 0
firstColPos = 0
totalPixels = 0

for i in range(y, food_height + y):
	firstColPos = -1
	for j in range(x, food_width + x):
		if image2[i][j][0] != 0 and firstColPos != -1:
			firstColPos = j
		if image2[i][j][0] != 0:
			lastValidCol = j
		if j == food_width + x - 1:
			totalPixels = totalPixels + (lastValidCol - firstColPos)

print(totalPixels)


lastValidCol = 0
firstColPos = 0
totalPixels = 0

for i in range(coin_y, coin_height + coin_y):
	firstColPos = -1
	for j in range(coin_x, coin_width + coin_x):
		if image1[i][j][0] != 0 and firstColPos != -1:
			firstColPos = j
		if image1[i][j][0] != 0:
			lastValidCol = j
		if j == coin_width + coin_x - 1:
			totalPixels = totalPixels + (lastValidCol - firstColPos)

print(totalPixels)
# rect = (10, 10, new_width - 20, new_height - 20)
# addedImages = Foreground_Extraction.extract_foreground(image, rect)
plt.imshow(addedImages)
plt.show()
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
gray = cv2.GaussianBlur(gray, (7, 7), 0)



# perform edge detection, then perform a dilation + erosion to
# close gaps in between object edges
edged = cv2.Canny(gray, 50, 100)
edged = cv2.dilate(edged, None, iterations=1)
edged = cv2.erode(edged, None, iterations=1)

# plt.imshow(edged)
# plt.show()
# exit()
# find contours in the edge map
cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
						cv2.CHAIN_APPROX_SIMPLE)
cnts = imutils.grab_contours(cnts)

# sort the contours from left-to-right and initialize the
# 'pixels per metric' calibration variable
(cnts, _) = contours.sort_contours(cnts)
pixelsPerMetric = None

# loop over the contours individually
for c in cnts:
	# if the contour is not sufficiently large, ignore it
	if cv2.contourArea(c) < 100:
		continue

	# compute the rotated bounding box of the contour
	orig = image.copy()
	box = cv2.minAreaRect(c)
	box = cv2.cv.BoxPoints(box) if imutils.is_cv2() else cv2.boxPoints(box)
	box = np.array(box, dtype="int")

	# order the points in the contour such that they appear
	# in top-left, top-right, bottom-right, and bottom-left
	# order, then draw the outline of the rotated bounding
	# box
	box = perspective.order_points(box)
	cv2.drawContours(orig, [box.astype("int")], -1, (0, 255, 0), 2)

	# loop over the original points and draw them
	for (x, y) in box:
		cv2.circle(orig, (int(x), int(y)), 5, (0, 0, 255), -1)

	# unpack the ordered bounding box, then compute the midpoint
	# between the top-left and top-right coordinates, followed by
	# the midpoint between bottom-left and bottom-right coordinates
	(tl, tr, br, bl) = box
	(tltrX, tltrY) = midpoint(tl, tr)
	(blbrX, blbrY) = midpoint(bl, br)

	# compute the midpoint between the top-left and top-right points,
	# followed by the midpoint between the top-righ and bottom-right
	(tlblX, tlblY) = midpoint(tl, bl)
	(trbrX, trbrY) = midpoint(tr, br)

	# draw the midpoints on the image
	cv2.circle(orig, (int(tltrX), int(tltrY)), 5, (255, 0, 0), -1)
	cv2.circle(orig, (int(blbrX), int(blbrY)), 5, (255, 0, 0), -1)
	cv2.circle(orig, (int(tlblX), int(tlblY)), 5, (255, 0, 0), -1)
	cv2.circle(orig, (int(trbrX), int(trbrY)), 5, (255, 0, 0), -1)

	# draw lines between the midpoints
	cv2.line(orig, (int(tltrX), int(tltrY)), (int(blbrX), int(blbrY)),
			 (255, 0, 255), 2)
	cv2.line(orig, (int(tlblX), int(tlblY)), (int(trbrX), int(trbrY)),
			 (255, 0, 255), 2)

	# compute the Euclidean distance between the midpoints
	dA = dist.euclidean((tltrX, tltrY), (blbrX, blbrY))
	dB = dist.euclidean((tlblX, tlblY), (trbrX, trbrY))

	# if the pixels per metric has not been initialized, then
	# compute it as the ratio of pixels to supplied metric
	# (in this case, inches)
	if pixelsPerMetric is None:
		pixelsPerMetric = dB / args["width"]

	# compute the size of the object
	dimA = dA / pixelsPerMetric
	dimB = dB / pixelsPerMetric

	# draw the object sizes on the image
	cv2.putText(orig, "{:.1f}cm".format(dimA),
				(int(tltrX - 15), int(tltrY - 10)), cv2.FONT_HERSHEY_SIMPLEX,
				0.65, (255, 255, 255), 2)
	cv2.putText(orig, "{:.1f}cm".format(dimB),
				(int(trbrX + 10), int(trbrY)), cv2.FONT_HERSHEY_SIMPLEX,
				0.65, (255, 255, 255), 2)

	# show the output image
	W = 500
	height, width, depth = orig.shape
	imgScale = W / width
	newX, newY = orig.shape[1] * imgScale, orig.shape[0] * imgScale
	imS = cv2.resize(orig, (int(newX), int(newY)))
	cv2.imshow("Image", imS)
	cv2.waitKey(0)