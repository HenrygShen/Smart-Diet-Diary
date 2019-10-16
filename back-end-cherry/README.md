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
7. Download the models folder from https://github.com/tensorflow/models and place it in back-end-cherry.
8. In the terminal change directory to ```back-end-cherry\models\research```.
9. Run the command ```python setup.py build```.
10. Run the command ```python setup.py install```.
11. In the terminal change directory to ```back-end-cherry\models\research\slim```.
12. Run the command ```pip install -e .```.
13. Restart Pycharm.
14. Use the keyboard shortcut ```Shift + F10``` to run the server.
