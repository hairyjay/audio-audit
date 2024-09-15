import lz4.frame
import pickle

data = {}
with lz4.frame.open('../datasets/audioset_info_collated.lz4', mode='r') as fp:
    data = pickle.load(fp)

key_list = list(data.keys())
for i in range(15):
    print(data[key_list[i]])