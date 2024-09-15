with open('../datasets/raw.meta.tsv', 'r') as temp_f:
    i = 0
    for l in temp_f.readlines():
        col_count = len(l.split("\t"))
        if col_count != 8:
            print(i, col_count, l)
        i+=1