import time

import requests

URL = "http://localhost:5000/order-api/"

# create 2 users
print("creating 2 users...")
data = {}
data["username"] = "ujjwalraizada"
data["name"] = "Ujjwal Raizada"
r = requests.post(URL + "users/add", json=data)


data["username"] = "prakhargoenka"
data["name"] = "Prakhar Goenka"
r = requests.post(URL + "users/add", json=data)


time.sleep(1)
# print created users
print("printing created users")

r = requests.get(URL + "users")
print(r.text)


time.sleep(1)
# print user profiles
r = requests.get(URL + "users/ujjwalraizada")
print(r.text)

r = requests.get(URL + "users/prakhargoenka")
print(r.text)


time.sleep(1)
# add two products
print("adding two products...")

data = {}
data["product"] = "prod1"
data["name"] = "MacBook Pro 13 inch"
r = requests.post(URL + "products/add", json=data)


data["product"] = "prod2"
data["name"] = "MacBook Pro 15 inch"
r = requests.post(URL + "products/add", json=data)


time.sleep(1)
# print added product
print("printing added products...")
r = requests.get(URL + "products")
print(r.text)


time.sleep(1)
# print products profiles
print("printing product profile...")

r = requests.get(URL + "products/prod1")
print(r.text)

r = requests.get(URL + "products/prod2")
print(r.text)


time.sleep(1)
# adding 2 orders
print("placing two orders...")

data = {}
data["username"] = "ujjwalraizada"
data["product"] = "prod1"
data["time"] = time.time()
r = requests.post(URL + "orders/add", json=data)

data["username"] = "prakhargoenka"
data["product"] = "prod2"
data["time"] = time.time()
r = requests.post(URL + "orders/add", json=data)


time.sleep(1)
# printing order
print("printing placed orders...")

r = requests.get(URL + "orders")
print(r.text)


time.sleep(1)
# print users orders
print("printing user orders")

r = requests.get(URL + "users/orders/ujjwalraizada")
print(r.text)

r = requests.get(URL + "users/orders/prakhargoenka")
print(r.text)


time.sleep(1)
# placing bulk orders
print("placing bulk orders")

data1 = {}
data1["username"] = "ujjwalraizada"
data1["product"] = "prod1"
data1["time"] = time.time()

data2 = {}
data2["username"] = "prakhargoenka"
data2["product"] = "prod2"
data2["time"] = time.time()

data = [data1, data2]
r = requests.post(URL + "orders/add/bulk", json=data)
print("bulk response:", r.text)


time.sleep(1)
# printing order
print("printing placed orders...")

r = requests.get(URL + "orders")
print(r.text)
