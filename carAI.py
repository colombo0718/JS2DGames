import logging
from websocket_server import WebsocketServer

key="D"

def message_back(client, server, message):
    print("Client(%d) said: %s" % (client['id'], message))
    # 
    rewd = int(message.split(',')[0])
    redX = int(message.split(',')[1])
    bluX = float(message.split(',')[2])
    bluY = int(message.split(',')[3])
    # 
    state=str(round(redX/10))+','+str(int(round(bluX/10)))+','+str(round(bluY/10))
    print("state ="+state)
    global key
    if redX <100 : 
        key="D"
    if redX >300 : 
        key="A"
    print("return "+key)
    server.send_message(client,key)

server = WebsocketServer(4300, host='', loglevel=logging.INFO)
server.set_fn_message_received(message_back)
server.run_forever()