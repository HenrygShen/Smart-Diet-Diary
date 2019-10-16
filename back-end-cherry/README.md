# Smart Diet Diary - Back-end server

This module contains the code required to run the processing server for the mobile application. That is, it performs object detection and volume estimation to calculate the calories of a food item.
It runs on the port 3001, if you plan to use your computer as the main server, make sure to set up port forwarding.

## Setting up
To set up this server on your own computer, make sure you have **Python 3.6.8.** and the **PyCharm IDE.**
Instructions:    
1. Clone the repository and navigate to the back-end-cherry directory.    
2. Open the project folder in PyCharm IDE.
3. Click File -> Settings.
4. In Settings navigate to Project: back-end-cherry -> Project Interpreter.
5. Click on the cog on the top right and add a new virtual environment using the **Python 3.6** base interpreter.
6. In the terminal tab of the IDE, Run the command ```pip install -r requirements.txt```.
7. Download the models folder [here](https://mega.nz/#F!VRkjDIZZ!wJilhfEkAafbm6qydoTKtA) (you only need models.zip) and place it in back-end-cherry.
8. Add the location of ```<PATH_TO_PROJECT>\back-end-cherry\models\research\object_detection``` to the PYTHONPATH system variable in your computer's environment variables.
9. In the terminal change directory to ```back-end-cherry\models\research```.
10. Run the command ```python setup.py build```.
11. Run the command ```python setup.py install```.
12. In the terminal change directory to ```back-end-cherry\models\research\slim```.
13. Run the command ```pip install -e .```.
14. Restart Pycharm.
15. Use the keyboard shortcut ```Shift + F10``` to run the server.

## Importing trained classifier
1. Download the trained classifier [here](https://mega.nz/#F!VRkjDIZZ!wJilhfEkAafbm6qydoTKtA) (you only need output_inference_graph_rcnnv14.pb.zip).
2. Go to the root of the repository and then access the ```SDD-ObjectDetection/workspace/training_demo/``` directory.
3. Here create a new folder called **trained-inference-graphs**
4. Extract the downloaded folder and put it in **trained-inference-graphs**.
