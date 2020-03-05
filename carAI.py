import logging
from websocket_server import WebsocketServer

key="D"

def message_back(client, server, message):
    print("Client(%d) said: %s" % (client['id'], message))
    # server.send_message(client,"get")
    redX = int(message.split(',')[0])
    bluX = float(message.split(',')[1])
    bluY = int(message.split(',')[2])
    global key
    if redX <100 : 
        key="D"
    if redX >300 : 
        key="A"
    print(key)
    server.send_message(client,key)

server = WebsocketServer(4200, host='', loglevel=logging.INFO)
server.set_fn_message_received(message_back)
server.run_forever()