import logging
from websocket_server import WebsocketServer
import numpy as np
import pandas as pd

key="D"
actions=['A','S','D']
qTable=pd.DataFrame(columns=actions)
print(qTable,qTable.columns)
# state="0,0,0"
# print(state in qTable.columns)
# qTable=qTable.append(pd.Series([0,0,0],index=qTable.columns,name=state))
# print(qTable)

def message_back(client, server, message):
    global qTable
    print("Client(%d) said: %s" % (client['id'], message))
    if message=="endgame":
        print(qTable)
        return 0

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

    if state not in qTable.index :
        qTable=qTable.append(pd.Series([0,0,0],index=qTable.columns,name=state))

server = WebsocketServer(4300, host='', loglevel=logging.INFO)
server.set_fn_message_received(message_back)
server.run_forever()