# SDD-ObjectDetection



This project consists of the machine learning training and evaluation code. To set up this module on your computer you will need **Python 3.6.8 and the Pycharm IDE.**
The following  will guide you through the setup and workflow of the project.

## Setting up:
**Note: If you want to use tensorflow-gpu, follow the instructions in https://www.youtube.com/watch?v=RplXYjxgZbw**    

Instructions:
1. Download the models folder [here](https://mega.nz/#F!VRkjDIZZ!wJilhfEkAafbm6qydoTKtA) (you only need models.zip) and place it in SDD-ObjectDetection.
2. Add the location of ```<PATH_TO_PROJECT>\SDD-ObjectDetection\models\research\object_detection``` to the PYTHONPATH system variable in your computer's environment variables.
3. Download the ```faster_rcnn_inception_v2_coco``` model [here](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md) and place it in the training_demo folder, renaming it to```rcnn```.
4. Open the project folder in Pycharm IDE.
5. Click File -> Settings.
6. In Settings navigate to Project: SDD-ObjectDetection -> Project Interpreter.
7. Click on the cog on the top right and add a new virtual environment using the **Python 3.6** base interpreter.
8. Open a terminal in pycharm and run the command ```pip install -r requirements.txt```. If you are not using tensorflow-gpu then you need to edit requirements.txt to use tensorflow.
9. If you do not have Visual C++ 2015 Build Tools, install from http://go.microsoft.com/fwlink/?LinkId=691126&fixForIE=.exe. The next step will not work without it.
10. Run the command ```pip install "git+https://github.com/philferriere/cocoapi.git#egg=pycocotools&subdirectory=PythonAPI"```
11. In the terminal change directory to ```SDD-ObjectDetection\models\research```.
12. Run the command ```python setup.py build```.
13. Run the command ```python setup.py install```.
14. In the terminal change directory to ```SDD-ObjectDetection\models\research\slim```.
15. Run the command ```pip install -e .```.
16. Restart PyCharm.


