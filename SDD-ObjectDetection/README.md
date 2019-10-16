# SDD-ObjectDetection



This project consists of the machine learning training and evaluation code. To set up this module on your computer you will need **Python 3.6.8 and the Pycharm IDE.**
The following  will guide you through the setup and workflow of the project.

## Setting up:
**Note: If you want to use tensorflow-gpu, follow the instructions in https://www.youtube.com/watch?v=RplXYjxgZbw**
Instructions:    
1. Download the models folder from https://github.com/tensorflow/models and place it in SDD-ObjectDetection.
2. Add the location of ```<PATH_TO_PROJECT>\SDD-ObjectDetection\models\research\object_detection``` to the PYTHONPATH system variable in your computer's environment variables.
3. Open the project folder in Pycharm IDE.
4. Click File -> Settings.
5. In Settings navigate to Project: SDD-ObjectDetection -> Project Interpreter.
6. Click on the cog on the top right and add a new virtual environment using the **Python 3.6** base interpreter.
7. Open a terminal in pycharm and run the command ```pip install -r requirements.txt```. If you are not using tensorflow-gpu then you need to edit requirements.txt to use tensorflow.
8. If you do not have Visual C++ 2015 Build Tools, install from http://go.microsoft.com/fwlink/?LinkId=691126&fixForIE=.exe. The next step will not work without it.
9. Run the command ```pip install "git+https://github.com/philferriere/cocoapi.git#egg=pycocotools&subdirectory=PythonAPI"```
10. In the terminal change directory to ```SDD-ObjectDetection\models\research```.
11. Run the command ```python setup.py build```.
12. Run the command ```python setup.py install```.
13. In the terminal change directory to ```SDD-ObjectDetection\models\research\slim```.
14. Run the command ```pip install -e .```.
15. Restart PyCharm.


