# import the necessary packages
import numpy as np
import cv2
import math


def midpoint(ptA, ptB):
	return (ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5


def extract_foreground(img, rect):
	mask = np.zeros(img.shape[:2],np.uint8)

	bgdModel = np.zeros((1,65),np.float64)
	fgdModel = np.zeros((1,65),np.float64)

	cv2.grabCut(img,mask,rect,bgdModel,fgdModel,5,cv2.GC_INIT_WITH_RECT)
	mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
	img = img*mask2[:,:,np.newaxis]

	return img


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


def get_object_size(coin_box, food_box, shape, fname):
	# inputs
	# rectangle around the object you want to find the size of (topleft x, topleft y, width, height)
	# coin_box = (18, 134, 27, 28)
	# food_box = (71, 107, 81, 79)
	ref_width = 2.65  # size of coin
	image = cv2.imread(fname)
	height, width, depth = image.shape

	coin_image = extract_foreground(image, coin_box)
	food_image = extract_foreground(image, food_box)

	added_images = cv2.add(coin_image, food_image)

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
	temp_width = food_measure_col_major[1]/coin_measure_col_major[1] * ref_width
	temp_height = food_measure_row_major[1]/coin_measure_col_major[1] * ref_width

	# Assume smaller measurement is width
	if temp_width > temp_height:
		food_width = temp_height
		food_height = temp_width
	else:
		food_width = temp_width
		food_height = temp_height
	print("coin_area: {} cm2".format(coin_area))
	print("food_area: {} cm2".format(food_area))
	print("food_width: {} cm".format(food_width))
	print("food_height: {} cm".format(food_height))

	print("food_shape: {}".format(shape))
	if shape == 'Sphere':
		food_volume = (4 * math.pi * (food_width/2)**3)/3
	elif shape == 'Cylinder':
		food_volume = (food_height * math.pi * (food_width/2)**2)
	elif shape == 'Fixed':
		food_volume = 0

	print("food_volume: {} cm3".format(food_volume))
	return food_volume
