from flask import Flask, request
from osm import *
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route('/explore', methods=['GET'])
def explore():
    lat = request.args.get("lat", default=0, type=float)
    long = request.args.get("lon", default=0, type=float)

    return query_features(lat, long, dist=5.0)


@app.route('/ways', methods=['GET'])
def ways():
    node_id = request.args.get("node_id", default="0", type=str)
    return get_ways(node_id)


@app.route('/nodes', methods=['GET'])
def nodes():
    way_id = request.args.get("way_id", default="0", type=str)
    return get_nodes(way_id)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'






if __name__ == '__main__':
    app.run()