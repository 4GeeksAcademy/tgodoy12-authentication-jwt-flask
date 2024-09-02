"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email = email).first()

    if user is None:
        return jsonify({"msg": "This email is not registered"})

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email, expires_delta=timedelta(hours=12), additional_claims={"token_type": "local"})
    return jsonify({"access_token":access_token, "user":user.serialize()})

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Missing required fields"}), 400

    user = User.query.filter_by(email = email).first()

    if user:
        return jsonify({"msg": "This email already exists"}), 409

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=email)
    return jsonify({"access_token":access_token, "user": new_user.serialize()}), 201


@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    
    # Validate the identity of the current user
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()

    if user is None:
        return jsonify(user=None), 409

    return jsonify(user.serialize()), 200

@api.route("/update", methods=["PUT"])
@jwt_required()
def update_user():
    current_user = get_jwt_identity()

    user = User.query.filter_by(email = current_user).first()

    if user is None:
        return jsonify({ "msg": "user not found"}), 404
    

    name = request.json.get("name", user.name)
    bio = request.json.get("bio", user.bio)
    password = request.json.get("password", user.password)

    # Actualiza los campos
    user.name = name
    user.bio = bio
    user.password = password

    print(user.serialize())
    
    db.session.add(user)
    db.session.commit()

    return jsonify({ "msg": "user updated successfully"}), 200