import os
import base64
import random
import json
# from keras.models import load_model
# from keras import backend as K
# from PIL import Image
import sqlite3
# import tensorflow as tf
import detection
import Object_Size

import sys
import numpy as np
np.set_printoptions(threshold=sys.maxsize)

def receive_and_process(data):

    # Attempt to get compulsory fields
    file_in = data['image']

    # Get working directory
    working_dir = os.path.dirname(__file__)

    name = str(random.randint(1,1000001)) + ".jpg"
    # Decode the file coming in and store it on the server
    filename = working_dir + "/" + name

    # Make sure incoming file is 5MB or less
    # size_bytes = (len(fileIn) * 3) / 4 - fileIn.count('=', -2)
    # if (size_bytes >= 30000000):
    #     #Error code : file size too large
    #     return '12'

    # If file size not capped, decode the base64 string
    decoded_file = base64.b64decode(file_in)
    with open (filename,'wb') as file:
        file.write(decoded_file)
        file.close()

    # image = Image.open(filename)
    # image = image.resize((50, 50), Image.ANTIALIAS)
    #
    # image.load()
    # data2 = np.asarray(image)
    # data2 = data2.astype("float32")
    # data2 /= 255
    # image.close()

    #Reshape data
    # data2 = data2.reshape(-1, 50, 50, 3)

    # Predict answer
    # model = load_model(filepath=working_dir+'/Trained_model.h5')
    # model._make_predict_function()
    # prediction = model.predict(x=data2)
    # max_index = np.argmax(prediction[0])
    answer = detection.detect_api(filename)

    food_volume_list = []
    answer_size = len(answer)

    connection = sqlite3.connect("food.db")
    cursor = connection.cursor()
    for i in range(0, answer_size-1):
        cursor.execute(" SELECT Shape FROM Food WHERE Name= ?", [answer[i]['name']])
        ans = cursor.fetchone()
        food_volume = Object_Size.get_object_size(answer[answer_size-1]['box'], answer[i]['box'], ans[0], filename)
        food_volume_list.append({
            "name": answer[i]['name'],
            "volume": food_volume
        })

    # Close session since method is called asynchronously - to prevent mem leak
    # K.clear_session()
    os.remove(filename)

    results = []
    for item in food_volume_list:
        print(item['name'])
        cursor.execute(" SELECT Calories,Density FROM Food WHERE Name= ?", [item['name']])
        ans = cursor.fetchone()
        mass = item['volume'] * ans[1]
        calories = int((ans[0] * mass)/100)
        results.append({
            'name': item['name'],
            'mass': mass,
            'calories': calories
        })


    cursor.close()
    connection.close()

    answers = {
        "code": 0,
        "result": results
    }
    out = json.dumps(answers)
    print(out)
    return out


def get_list():

    # Get working directory
    working_dir = os.path.dirname(__file__)

    # Read labels
    with open(working_dir+"/labels.json", 'r') as file:
        labels_dict = json.load(file)
        labels = labels_dict['labels']

    output = {
        "code": 0,
        "list": labels
    }
    out = json.dumps(output)
    print(out)
    return out


def calculate_calories(data):

    list = data['list']
    connection = sqlite3.connect("food.db")
    cursor = connection.cursor()
    finalList = []
    for item in list:
        if item['type'] == "list":
            cursor.execute("SELECT Calories FROM Food WHERE Name= ?", [item['name']])
            calories = cursor.fetchone()
            calories = (calories[0]/100) * item['mass']
            finalList.append({ "name": item['name'], "calories": calories })
        else:
            finalList.append({ "name": item['name'], "calories": item['calories']})

    cursor.close()
    connection.close()
    output = {
        "code": 0,
        "list": finalList
    }
    out = json.dumps(output)
    print(out)
    return out
