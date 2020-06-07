import logging
from websocket_server import WebsocketServer
import numpy as np
import pandas as pd


actions=['A','S','D']
lr=0.01
gamma=0.9
epsilon=0.9
# qTable=pd.DataFrame(columns=actions)
qTable=pd.read_csv("qTable.csv",index_col='Unnamed: 0')
action='S'
state='0,0,0'
# qTable=qTable.append(pd.Series([0,0,0],index=qTable.columns,name=state))

print(qTable)

def message_back(client, server, message):
    global actions,lr,gamma,epsilon,qTable,action,state
    # get client data
    print("Client(%d) said: %s" % (client['id'], message))

    # game paused 
    if message=="endgame":
        print(qTable)
        qTable.to_csv('qTable.csv')
        # restart the game 
        server.send_message(client,'R')
        return 0

    # analysis 
    rewd = int(message.split(',')[0])
    redX = int(message.split(',')[1])
    bluX = float(message.split(',')[2])
    bluY = int(message.split(',')[3])

    # transform to simple state string
    stateNew=str(round(redX/50))+','+str(int(round(bluX/100)))+','+str(round(bluY/100))
    print(" s: "+state+" a: "+action+' r: '+str(rewd)+" s_: "+stateNew)
    # check state exist
    if stateNew not in qTable.index :
        qTable=qTable.append(pd.Series([0,0,0],index=qTable.columns,name=stateNew))
    print("state ="+stateNew)
    # learn this experience
    predict=qTable.loc[state, action]
    if abs(rewd)==100:  #end game
        target = rewd
    else :
        target = rewd+gamma*qTable.loc[stateNew,:].max()
    qTable.loc[state, action]+=lr*(target-predict)

    #  choose action
    if np.random.uniform() < epsilon:
        state_action = qTable.loc[stateNew, :]
        action = np.random.choice(state_action[state_action == np.max(state_action)].index)
    else:
        action = np.random.choice(actions)

    print("return "+action)
    print('-------------------------')
    # sent action signal to client 
    server.send_message(client,action)
    state=stateNew
    
server = WebsocketServer(4300, host='', loglevel=logging.INFO)
server.set_fn_message_received(message_back)
server.run_forever()