import json
import pickle

from flask import Flask, request

app = Flask(__name__)

users = {
    "UjjwalRaizada": "Ujjwal123",
    "PrakharGoenka": "Prakhar123"
}

posts = []
persistant_status = False


def persistant(function):
    def wrapper():
        global posts
        global persistant_status
        if (not persistant_status):
            with open("user_data", "rb+") as file:
                posts = pickle.load(file)
            persistant_status = True

        return_val = function()
        with open("user_data", "wb+") as file:
            pickle.dump(posts, file)
        return return_val
    return wrapper

        

@app.route('/', endpoint='index')
def index():
    text = """
Welcome to home page of test API. Sent POST requests to /api

endpoint accepts -
GET - displays the posts. goto <a href="/api">GET /api</a> to check.
POST - Send POST requests to create posts in JSON format.

    * example users
        1. UjjwalRaizada Ujjwal123
        2. PrakharGoenka Prakhar123

    <b>/api</b>
    * four parameters required in POST request.
        1. username
        2. password
        3. subject
        4. text

    <b>/api/bulk</b>
    * accepts a list of requests, where each request is one accepted by /api
    * structure:
        [
            request_1,
            request_2,
            ...
            request_n
        ]

     <b>/api/reset</b>
    *resets the posts database

    """
    return text.replace('\n', '<br>').replace("    ", "&emsp;")


@app.route('/api', methods=['GET', 'POST'], endpoint='api')
@persistant
def api():

    if request.method == 'POST':

        req_data = request.get_json()

        username = req_data['username']
        password = req_data['password']
        post_subject = req_data['subject']
        post_text = req_data['text']

        if ((username in users) and users[username] == password):
            print("user check passed...")
            posts.append((username, post_subject, post_text))

            return json.dumps({"status": "success"})
        else:
            print("user check failed...")
            return json.dumps({"status": "failed"})

    else:  # GET request
        output = "<h3>List of posts:</h3> <br>"
        for post in posts:
            output += "<h3> {} </h3> - {} <br><br> {} <br><br>".format(post[1], post[0], post[2])
        
        return output


@app.route('/api/bulk', methods=['POST'], endpoint='bulk-api')
@persistant
def bulk_api():
    req_data = request.get_json()

    for data in req_data:
        username = data['username']
        password = data['password']
        post_subject = data['subject']
        post_text = data['text']

        if ((username in users) and users[username] == password):
            print("user check passed...")
            posts.append((username, post_subject, post_text))
        else:
            print("user check failed...")
            return json.dumps({"status": "failed"})
    return json.dumps({"status": "success"})


@app.route('/api/reset', methods=['GET'], endpoint='reset')
@persistant
def reset_data():
    global posts
    posts = []
    return "data reset successful."

# this service is independent from blog service defined above

database = {}  # dict which will be used as database for orders api
database["users"] = []
database["products"] = []
database["orders"] = []
database["profile"] = {}
database["product-details"] = {}

def load_database():
    global database
    with open("database", "rb+") as file:
        database = pickle.load(file)

def dump_database():
    with open("database", "wb+") as file:
        pickle.dump(database, file)

@app.route('/order-api/')
def home():
    try:
        load_database()
    except Exception as _:
        dump_database()
    return "home-page"

# user end points
@app.route("/order-api/users")
def user_list():
    load_database()
    return json.dumps(database["users"])


@app.route("/order-api/users/add", methods=['POST'])
def create_user():
    load_database()
    req_data = request.get_json()
    username = req_data["username"]
    name = req_data["name"]

    if (username not in database["users"]):
        database["users"].append(username)
        database["profile"][username] = {"name": name, "orders": [], "kart": []}
        dump_database()

        return json.dumps({"status": "success"})
    else:
        return json.dumps({"status": "failure", "message": "already exists"})

@app.route("/order-api/users/<username>")
def user_profile(username):
    load_database()
    if (username in database["users"]):
        return json.dumps(database["profile"][username])
    else:
        return json.dumps({"status": "failure", "message": "already exists"})


# product endpoints
@app.route("/order-api/products")
def product_list():
    load_database()
    return json.dumps(database["products"])


@app.route("/order-api/products/add", methods=['POST'])
def create_product():
    load_database()
    req_data = request.get_json()
    product = req_data["product"]
    name = req_data["name"]

    if (product not in database["products"]):
        database["products"].append(product)
        database["product-details"][product] = {"name": name, "orders": []}
        dump_database()

        return json.dumps({"status": "success"})
    else:
        return json.dumps({"status": "failure", "message": "already exists"})


@app.route("/order-api/products/<product>")
def product_profile(product):
    load_database()
    if (product in database["products"]):
        return json.dumps(database["product-details"][product])
    else:
        return json.dumps({"status": "failure", "message": "already exists"})


# order endpoints
@app.route("/order-api/orders")
def order_list():
    load_database()
    return json.dumps(database["orders"])


@app.route("/order-api/orders/add", methods=['POST'])
def add_order():
    load_database()
    req_data = request.get_json()
    username = req_data["username"]
    product = req_data["product"]
    order_time = req_data["time"]  # in epoch time, can be used to show mapping

    if (username not in database["users"]):
        return json.dumps({"status": "failure", "message": "user not exists"})
    
    if (product not in database["products"]):
        return json.dumps({"status": "failure", "message": "product not exists"})
    
    database["orders"].append((username, product, order_time))
    database["profile"][username]["orders"].append((product, order_time))
    database["product-details"][product]["orders"].append((username, order_time))
    dump_database()
    return json.dumps({"status": "success"})


@app.route("/order-api/users/orders/<username>")
def user_orders(username):
    load_database()
    if (username in database["users"]):
        return json.dumps(database["profile"][username]["orders"])
    else:
        return json.dumps({"status": "failure"})


@app.route("/order-api/products/orders/<product>")
def product_orders(product):
    load_database()
    if (product in database["products"]):
        return json.dumps(database["product-details"][product]["orders"])
    else:
        return json.dumps({"status": "failure"})


@app.route("/order-api/orders/add/bulk", methods=['POST'])
def add_bulk_order():
    load_database()
    req_data = request.get_json()
    res = []
    for order in req_data:
        username = order["username"]
        product = order["product"]
        order_time = order["time"]

        if (username not in database["users"]):
            res.append(json.dumps({"status": "failure", "message": "user not exists"}))
            continue
        
        if (product not in database["products"]):
            res.append(json.dumps({"status": "failure", "message": "product not exists"}))
            continue
        
        database["orders"].append((username, product, order_time))
        database["profile"][username]["orders"].append((product, order_time))
        database["product-details"][product]["orders"].append((username, order_time))
        res.append(json.dumps({"status": "success"}))
    dump_database()
    return json.dumps(res)


# kart endpoints
@app.route("/order-api/kart/add", methods=['POST'])
def add_to_kart():
    load_database()
    req_data = request.get_json()
    username = req_data["username"]
    product = req_data["product"]
    order_time = req_data["time"]  # in epoch time, can be used to show mapping

    if (username not in database["users"]):
        return json.dumps({"status": "failure", "message": "user not exists"})
    
    if (product not in database["products"]):
        return json.dumps({"status": "failure", "message": "product not exists"})
    
    database["profile"][username]["kart"].append((product, order_time))
    dump_database()
    return json.dumps({"status": "success"})


@app.route("/order-api/kart/checkout/<username>")
def checkout_kart(username):
    load_database()
    if (username not in database["users"]):
        return json.dumps({"status": "failure", "message": "user not exists"})
    
    for item in database["profile"][username]["kart"]:

        product = item[0]
        order_time = item[1]
        database["orders"].append((username, product, order_time))
        database["profile"][username]["orders"].append((product, order_time))
        database["product-details"][product]["orders"].append((username, order_time))
    database["profile"][username]["kart"] = []
    dump_database()
    return json.dumps({"status": "success"})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
