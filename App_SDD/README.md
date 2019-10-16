# Smart Diet Diary - Mobile application

This application was developed on the React-Native framework. 

## Using this application
**To set this application up on your computer you will need _Node v10.15.3_ and _npm v6.4.1_.**
Instructions:    
1. Clone the repository and navigate to the App_SDD directory.
2. Run the command ```npm install```.  
3. Connect your Android device to your computer and enable file transfer mode, **also make sure to enable USB debugging and enable trust settings in developer options on your device.**    
4. Run the command ```npm run android```. You may need to repeat this step multiple times if it doesn't work.    
5. The application is installed.   

## Notes about application (IMPORTANT)
This application currently only connects to a specific IP address on a local network. To change the address of the processing server, use the following steps:    
1. From the root of the repository, navigate to the App_SDD/src/store/constants.js folder.    
2. Edit this line of code ```export const ADDRESS = 'http://118.92.97.44:3001';```,  and replace ```http://118.92.97.44:3001``` to the new address of the processing server (you may have this set up on your machine or have it deployed to a service).    
3. Reinstall the application using the steps from the **Using this application section.**
