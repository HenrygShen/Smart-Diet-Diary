import os
import base64
import random
import json
from keras.models import load_model
from keras import backend as K
from PIL import Image
import sqlite3
import tensorflow as tf


import sys
import numpy as np
np.set_printoptions(threshold=sys.maxsize)

def receive_and_process(data):

    #Attempt to get compulsory fields
    fileIn = data['image']

    #Get working directory
    working_dir = os.path.dirname(__file__)

    name = str(random.randint(1,1000001)) + ".jpg"
    #Decode the file coming in and store it on the server
    filename = working_dir + "/pictures/" + name
    #Make sure incoming file is 5MB or less
    # size_bytes = (len(fileIn) * 3) / 4 - fileIn.count('=', -2)
    # if (size_bytes >= 30000000):
    #     #Error code : file size too large
    #     return '12'

    #If file size not capped, decode the base64 string
    decoded_file = base64.b64decode(fileIn)
    with open (filename,'wb') as file:
        file.write(decoded_file)
        file.close()

    model = load_model(filepath=working_dir+'/Trained_model.h5')
    model._make_predict_function()
    # Read labels
    with open(working_dir+"/labels.json", 'r') as file:
        labels_dict = json.load(file)
        labels = labels_dict['labels']

    # Print labels with indices
    labels = dict((name, index) for index, name in enumerate(labels))

    image = Image.open(filename)
    image = image.resize((50, 50), Image.ANTIALIAS)

    image.load()
    data2 = np.asarray(image)
    data2 = data2.astype("float32")
    data2 /= 255
    image.close()

    os.remove(filename)

    data2 = data2.reshape(-1, 50, 50, 3)

    #Predict answer
    prediction = model.predict(x=data2)
    max_index = np.argmax(prediction[0])

    #Close session since method is called asynchronously - to prevent mem leak
    K.clear_session()



    answer = ''
    for key, value in labels.items():
        if value == max_index:
            answer = key



    # Open database and get calories
    connection = sqlite3.connect("fruit.db")

    cursor = connection.cursor()
    cursor.execute(" SELECT Calories FROM Fruit WHERE Name=? ", [answer])
    calories = cursor.fetchone()
    cursor.close()
    connection.close()

    answers = {
        "code" : 0,
        "result": {
            "name": answer,
            "calories": calories
        }
    }
    out = json.dumps(answers)
    print(out)
    return out

