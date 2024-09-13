import psycopg2
from connection import *

# cur = conn.cursor()
# cur.execute("""
#             CREATE TABLE fma(
#             artist_id int PRIMARY KEY,
#             artist_active_year_begin int,
#             artist_active_year_end int,
#             artist_associated_labels text,
#             artist_bio text,
#             artist_comments int,
#             artist_contact text,
#             artist_date_created timestamp,
#             artist_donation_url text,
#             artist_favorites int,
#             artist_flattr_name text,
#             artist_handle text,
#             artist_image_file text,
#             artist_images json,
#             artist_latitude real,
#             artist_location text,
#             artist_longitude real,
#             artist_members text,
#             artist_name text,
#             artist_paypal_name text,
#             artist_related_projects text,
#             artist_url text,
#             artist_website text,
#             artist_wikipedia_page text,
#             tags text array);
#             """)
# conn.commit()

import pandas as pd

df = pd.read_csv('../datasets/raw_artists.csv')
df.to_sql('fma', con=conn, if_exists='replace', 
          index=False)
conn = psycopg2.connect(conn_string 
                        ) 
conn.autocommit = True
cursor = conn.cursor() 

# with open('../datasets/raw_artists.csv', 'r') as f:
#     next(f)
#     cur.copy_from(f, 'fma', sep=',')
conn.close() 