V_THRESH = 10;
def coordcmp(x,y):
    if abs(x[1] - y[1]) <= V_THRESH:
        return(x[0] - y[0])
    return x[1] - y[1]
def coordSort(coordList):
    return sorted(coordList, key=cmp_to_key(coordcmp))
