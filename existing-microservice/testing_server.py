import requests
from copy import deepcopy
import random

URL1 = "http://ujjwalraizada.pythonanywhere.com/api"
URL2 = "http://localhost:5000/api"
data = {}
data["username"] = "UjjwalRaizada"
data["password"] = "Ujjwal123"
data["subject"] = "universe"
data["text"] = "universe is large"


def test_api():
    r = requests.post(URL2, json=data)
    print(r)
    print(r.text)


def test_bulk():
    req_data = []
    for i in range(random.randint(1, 11)):
        temp_data = deepcopy(data)
        temp_data["text"] += " - {}".format(i)
        req_data.append(temp_data)
    r = requests.post(URL2 + "/bulk", json=req_data)
    print(r)
    print(r.text)

test_bulk()
