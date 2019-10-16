# SDD-ObjectDetection

Using Python 3.6.8 and Pycharm IDE.

This project consists of the machine learning training and evaluation code.
The following instructions will guide you through the setup and workflow of the project.

Setup:

*If you want to use tensorflow-gpu, follow the instructions in https://www.youtube.com/watch?v=RplXYjxgZbw

1. Download the models folder from https://github.com/tensorflow/models and place it in SDD-ObjectDetection.
2. Open the project folder in Pycharm IDE.
3. Click File -> Settings.
4. In Settings navigate to Project: SDD-ObjectDetection -> Project Interpreter.
5. Click on the cog on the top right and add a new virtual environment using the python 3.6 base interpreter.
6. Open a terminal in pycharm and run the command "pip install -r requirements.txt". If you are not using tensorflow-gpu then you need to edit requirements.txt to use tensorflow.
7. If you do not have Visual C++ 2015 Build Tools, install from http://go.microsoft.com/fwlink/?LinkId=691126&fixForIE=.exe. The next step will not work without it.
8. Run the command "pip install "git+https://github.com/philferriere/cocoapi.git#egg=pycocotools&subdirectory=PythonAPI""
9. In the terminal change directory to "SDD-ObjectDetection\models\research".
10. Run the command "python setup.py build".
11. Run the command "python setup.py install".
12. In the terminal change directory to "SDD-ObjectDetection\models\research\slim".
13. Run the command "pip install -e .".
14. Restart pycharm.


