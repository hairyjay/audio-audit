import lz4.frame
import pickle

data = {}
with lz4.frame.open('../datasets/audioset_info_collated.lz4', mode='r') as fp:
    data = pickle.load(fp)

key_list = list(data.keys())
# for i in range(15):
#     print(data[key_list[i]])

reconfigured_data = {"name": [], "title": [], "url": []}
for k in key_list: 
    reconfigured_data["name"].append(data[k][0])
    reconfigured_data["title"].append(data[k][1])
    reconfigured_data["url"].append(data[k][2])
print(len(reconfigured_data["name"]),len(reconfigured_data["title"]),len(reconfigured_data["url"]))

import pandas as pd
df = pd.DataFrame.from_dict(reconfigured_data)

import psycopg2
from connection import *

conn = psycopg2.connect(conn_string) 
cur = conn.cursor()
cur.execute("""
            CREATE TABLE audioset(
            id SERIAL PRIMARY KEY,
            name text,
            title text,
            url text);
            """)
conn.commit()
conn.autocommit = True

df.to_sql('audioset', con=db_conn, if_exists='replace', 
         index=False)
conn.close() 