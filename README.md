# Smart-Diet-Diary

This repository contains all of the code required to use the entire application.    
**Note: All of the code in the \_legacy folder is not required to run the final application.**

## Folder structure

### App_SDD
This folder contains the code required to run the Smart Diet Diary mobile application. The application is developed on the React-Native framework. To set up this application on your own, you will need **Node v10.15.3** and **npm v6.4.1**.

### SDD-ObjectDetection
This folder contains all of code that we used to train and test our classifiers. This requires **Python 3.6.8**.

### back-end-cherry
This folder contains the code that is required to run the processing server that the mobile application will connect to. The server is developed on the lightweight server-side Python framework, CherryPy. Like the SDD-ObjectDetection module, this module also uses **Python 3.6.8**.

### \_legacy
This folder contains modules which were used in the early stages of development, but are not required to run the final application. The modules are described as below:
###### Diet_Diary
This module was used to test and debug our object classification and volume estimation algorithms. Requires **Python 3.6.8**.
###### dataset_prep
This module was used to automate the labelling process for our dataset in the very early stages of development. However, since we transitioned to a classifier which provides bounding box outputs, we needed to manually label each image, so this module became deprecated. Runs on **any Node version**.
