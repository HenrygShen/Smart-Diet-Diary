listen_ip = "0.0.0.0"
listen_port = 3001


import cherrypy
import json
import communication
import os

class MainApp(object):

    #CherryPy Configuration
    _cp_config = {'tools.encode.on': True, 
                  'tools.encode.encoding': 'utf-8',
                  'tools.sessions.on' : 'True',
    }

    @cherrypy.expose
    def index(self):
        output = {
            "output": "Smart Diet Diary server is up."
        }

        return json.dumps(output)

    @cherrypy.expose
    @cherrypy.tools.json_in()
    def processImage(self):

        data = cherrypy.request.json
        return communication.receive_and_process(data)

    @cherrypy.expose
    def getList(self):

        return communication.get_list()

    @cherrypy.expose
    @cherrypy.tools.json_in()
    def calculateCalories(self):
        data = cherrypy.request.json
        return communication.calculate_calories(data)

@cherrypy.expose
def runMainApp():
    # Create an instance of MainApp and tell Cherrypy to send all requests under / to it. (ie all of them)
    cherrypy.tree.mount(MainApp(), '/')

    
    # Tell Cherrypy to listen for connections on the configured address and port.
    # port = os.environ['PORT']
    # cherrypy.config.update({'server.socket_host': listen_ip,'server.socket_port': int(port),'engine.autoreload.on': True,})
    cherrypy.config.update({'server.socket_host': listen_ip,'server.socket_port': listen_port,'engine.autoreload.on': True,})

    print("=========================")
    print ("University of Auckland")
    print ("Smart Diet Diary - Part 4 Project")
    print ("========================================") 

    # Start the web server
    cherrypy.engine.start()
    # And stop doing anything else. Let the web server take over.
    cherrypy.engine.block()

#-------------------------------------------END---------------------------------------------------#

#Run the function to start everything
runMainApp()
