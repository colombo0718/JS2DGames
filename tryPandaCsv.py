import pandas as pd

actions=['A','S','D']
state="1,1,1"
df=pd.DataFrame(columns=actions)
# print(qTable)
# qTable.to_csv("data.csv")
df=df.append(pd.Series([1,0,0],index=df.columns,name=state))
df=df.append(pd.Series([2,0,0],index=df.columns,name=state))
df=df.append(pd.Series([3,0,0],index=df.columns,name=state))
print(df)
df.to_csv("data.csv")

df=pd.read_csv("data.csv",index_col='Unnamed: 0')
print(df)
df=df.append(pd.Series([4,0,0],index=df.columns,name=state))
df=df.append(pd.Series([5,0,0],index=df.columns,name=state))
df=df.append(pd.Series([6,0,0],index=df.columns,name=state))
print(df)
