import psycopg2
from sqlalchemy import create_engine

conn_string = 'postgresql://default:############@######################.us-east-1.aws.neon.tech:####/verceldb?sslmode=require'
  
db = create_engine(conn_string) 
db_conn = db.connect() 
