import requests

URL = "http://ujjwalraizada.pythonanywhere.com/api"
data = {}
data["username"] = "UjjwalRaizada"
data["password"] = "Ujjwal123"
data["subject"] = "universe"
data["text"] = "universe is large"

r = requests.post(URL, json=data)
print(r)
print(r.text)
