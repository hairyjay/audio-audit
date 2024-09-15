import psycopg2
from connection import *

# cur = conn.cursor()
# cur.execute("""
#             CREATE TABLE jamendo(
#             track_id CHAR(13) PRIMARY KEY,
#             artist_id CHAR(13),
#             album_id CHAR(12),
#             track_name text,
#             artist_name text,
#             album_name text,
#             releasedate date,
#             url text);
#             """)
# conn.commit()

import pandas as pd
import csv

df = pd.read_csv('../datasets/raw.meta.tsv',
                 sep='\t',
                 lineterminator='\n',
                 quoting=csv.QUOTE_NONE)
df.to_sql('jamendo', con=conn, if_exists='replace', 
         index=False)
conn = psycopg2.connect(conn_string) 
conn.autocommit = True
conn.close() 