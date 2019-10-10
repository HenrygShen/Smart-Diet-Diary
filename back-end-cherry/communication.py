import os
import base64
import random
import json
# from keras.models import load_model
# from keras import backend as K
from PIL import Image
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

    # resize and save
    final_size = 600;
    im = Image.open(filename)
    size = im.size
    ratio = float(final_size) / max(size)
    new_image_size = tuple([int(x * ratio) for x in size])
    im = im.resize(new_image_size, Image.ANTIALIAS)
    new_im = Image.new("RGB", (final_size, final_size))
    new_im.paste(im, ((final_size - new_image_size[0]) // 2, (final_size - new_image_size[1]) // 2))
    new_im.save(filename, 'JPEG', quality=90)

    answer = detection.detect_api(filename)

    food_volume_list = []
    answer_size = len(answer)

    # If coin not detected
    if answer_size > 0:
        coin_found = False
        for item in answer:
            if item['name'] == "Coin":
                coin_found = True
                break
        if not coin_found:
            out = {
                "code": -1
            }
            resp = json.dumps(out)
            return resp

    # If food not detected
    print(answer)
    print("nani")
    if answer_size > 0:
        food_found = False
        for item in answer:
            if not item['name'] == "Coin":
                food_found = True
                break
        if not food_found:
            out = {
                "code": -2
            }
            resp = json.dumps(out)
            return resp

    # When nothing detected
    if answer_size == 0:
        out = {
            "code": -3
        }
        resp = json.dumps(out)
        return resp

    connection = sqlite3.connect("food.db")
    cursor = connection.cursor()
    for i in range(0, answer_size-1):
        cursor.execute(" SELECT Shape FROM Food WHERE Name= ?", [answer[i]['name']])
        ans = cursor.fetchone()
        print(filename)
        print(answer[answer_size-1]['box'])
        print(answer[i]['box'])
        print(ans)
        print([answer[i]['name']])
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
        if item['volume'] == 0:
            mass = 0
            calories = ans[0]
        else:
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

    connection = sqlite3.connect("food.db")
    cursor = connection.cursor()
    cursor.execute("SELECT Name, Shape FROM Food")
    labels = []
    ans = cursor.fetchall()
    for item in ans:
        print(item)
        labels.append({
            'name': item[0],
            'shape': item[1]
        })

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
    final_list = []
    for item in list:
        if item['type'] == "list":
            cursor.execute("SELECT Shape, Calories FROM Food WHERE Name= ?", [item['name']])
            row = cursor.fetchone()
            shape = row[0]
            if shape == "Fixed":
                final_list.append({"name": item['name'], "calories": row[1] })
            else:
                calories = (row[1]/100) * int(item['mass'])
                final_list.append({ "name": item['name'], "calories": calories })
        else:
            final_list.append({ "name": item['name'], "calories": int(item['calories'])})

    cursor.close()
    connection.close()
    output = {
        "code": 0,
        "list": final_list
    }
    out = json.dumps(output)
    print(out)
    return out
