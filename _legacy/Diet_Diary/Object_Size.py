# import the necessary packages
from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
import argparse
import imutils
import cv2
import math
import matplotlib.pyplot as plt

import Foreground_Extraction

# Supply an image that has a coin as the leftmost object
# To run the code:
# python object_size.py --image test1.jpg --width 2.65

def midpoint(ptA, ptB):
	return (ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5


# def col_major_count_pixel(bounding_box, image_data):
# 	last_valid_col = 0
# 	total_pixels = 0
# 	max_row = 0
# 	row_count = 0
# 	for i in range(bounding_box[1], bounding_box[3] + bounding_box[1]):
# 		first_col_pos = -1
# 		for j in range(bounding_box[0], bounding_box[2] + bounding_box[0]):
# 			row_count += 1
# 			if image_data[i][j][0] != 0 and first_col_pos != -1:
# 				first_col_pos = j
# 			if image_data[i][j][0] != 0:
# 				last_valid_col = j
# 			if j == bounding_box[2] + bounding_box[0] - 1:
# 				total_pixels = total_pixels + (last_valid_col - first_col_pos)
# 		if row_count > max_row:
# 			max_row = row_count
# 		row_count = 0
# 	out = (total_pixels, max_row)
# 	return out

def col_major_count_pixel(bounding_box, image_data):
	total_pixels = 0
	max_row = 0
	row_count = 0
	for i in range(bounding_box[1], bounding_box[3] + bounding_box[1]):
		for j in range(bounding_box[0], bounding_box[2] + bounding_box[0]):
			if np.all(image_data[i][j] != [0, 0, 0]):
				row_count += 1
		total_pixels += row_count
		if row_count > max_row:
			max_row = row_count
		row_count = 0
	out = (total_pixels, max_row)
	return out


def row_major_count_pixel(bounding_box, image_data):
	total_pixels = 0
	max_col = 0
	col_count = 0
	for i in range(bounding_box[0], bounding_box[2] + bounding_box[0]):
		for j in range(bounding_box[1], bounding_box[3] + bounding_box[1]):
			if np.all(image_data[j][i] != [0, 0, 0]):
				col_count += 1
		total_pixels += col_count
		if col_count > max_col:
			max_col = col_count
		col_count = 0
	out = (total_pixels, max_col)
	return out


# inputs
# rectangle around the object you want to find the size of (topleft x, topleft y, width, height)
# rect = (272,913,249,239)
# testap1 = (71, 107, 81, 79)
coin_box = (18, 134, 27, 28)
food_box = (71, 107, 81, 79)
ref_width = 2.65 # size of coin
image = cv2.imread('testap1.jpg')

# load the image, convert it to grayscale, and blur it slightly
height, width, depth = image.shape
print("orig height: " + str(height))
print("orig width: " + str(width))

scale = width/300 if width>height else height/300
new_width = int(width/scale)
new_height = int(height/scale)

print("new height: " + str(new_height))
print("new width: " + str(new_width))

image = cv2.resize(image, (new_width, new_height))

coin_image = Foreground_Extraction.extract_foreground(image, coin_box)
food_image = Foreground_Extraction.extract_foreground(image, food_box)

added_images = cv2.add(coin_image, food_image)

##########
food_measure_col_major = col_major_count_pixel(food_box, food_image)
coin_measure_col_major = col_major_count_pixel(coin_box, coin_image)

print("food_pixel: {} -------------- food width: {}".format(food_measure_col_major[0], food_measure_col_major[1]))
print("coin_pixel: {} -------------- coin width: {}".format(coin_measure_col_major[0], coin_measure_col_major[1]))

food_measure_row_major = row_major_count_pixel(food_box, food_image)
coin_measure_row_major = row_major_count_pixel(coin_box, coin_image)

print("food_pixel: {} -------------- food height: {}".format(food_measure_row_major[0], food_measure_row_major[1]))
print("coin_pixel: {} -------------- coin height: {}".format(coin_measure_row_major[0], coin_measure_row_major[1]))

coin_area = (ref_width/2)**2 * math.pi
food_area = food_measure_row_major[0]/coin_measure_row_major[0] * coin_area
food_width = food_measure_col_major[1]/coin_measure_col_major[1] * ref_width

print("coin_area: {} cm2".format(coin_area))
print("food_area: {} cm2".format(food_area))
print("food_width: {} cm".format(food_width))

food_volume = (4 * math.pi * (food_width/2)**3)/3

print("food_volume: {} cm3".format(food_volume))

# plt.imshow(added_images)
# plt.show()

# rect = (10, 10, new_width - 20, new_height - 20)
# addedImages = Foreground_Extraction.extract_foreground(image, rect)
# gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# gray = cv2.GaussianBlur(gray, (7, 7), 0)
#
#
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
# 	orig = image.copy()
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
# 	cv2.line(orig, (int(tltrX), int(tltrY)), (int(blbrX), int(blbrY)),
# 			 (255, 0, 255), 2)
# 	cv2.line(orig, (int(tlblX), int(tlblY)), (int(trbrX), int(trbrY)),
# 			 (255, 0, 255), 2)
#
# 	# compute the Euclidean distance between the midpoints
# 	dA = dist.euclidean((tltrX, tltrY), (blbrX, blbrY))
# 	dB = dist.euclidean((tlblX, tlblY), (trbrX, trbrY))
#
# 	# if the pixels per metric has not been initialized, then
# 	# compute it as the ratio of pixels to supplied metric
# 	# (in this case, inches)
# 	if pixelsPerMetric is None:
# 		pixelsPerMetric = dB / refWidth
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