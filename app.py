from flask import Flask, Blueprint, render_template, abort, request, send_from_directory, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from cryptography.fernet import Fernet
from bson.json_util import dumps
import json
from jinja2 import TemplateNotFound
import cv2
import os

client = MongoClient('DB URL')
db = client.Flask
user = db.user
logs = db.logs

UPLOAD_FOLDER = 'static/images'
# UPLOAD_FOLDER1 = 'static/uploads'

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['UPLOAD_FOLDER1'] = UPLOAD_FOLDER1

@app.route("/static/<path:path>")
def static_dir(path):
    return send_from_directory("static", path)

@app.route('/')
def server():
    return 'Welcome to Server'

@app.route('/user', methods=['GET', 'POST','UPDATE'])
def upload_file():
    if request.method == 'POST':
        if 'Image' not in request.files:
            return 'there is no Image in form!'
        _id = (int)(request.values['_id'])
        _id1 = (int)(request.values['_id1'])
        Image = request.files['Image']
        Name = request.values['Name']
        path = os.path.join(app.config['UPLOAD_FOLDER'], Name+'.jpg')
        # path1 = os.path.join(app.config['UPLOAD_FOLDER1'], Name+'.jpg')
        Image.save(path)

        with open('filekey.key', 'rb') as filekey:
            key = filekey.read()
        fernet = Fernet(key)
        with open(path, 'rb') as file:
            original = file.read()
        encrypted = fernet.encrypt(original)
        with open(path, 'wb') as encrypted_file:
            encrypted_file.write(encrypted)

        url = 'https://localhost:5000/'
        # return path
        img = {
            "_id": _id,
            "Image": url + path.replace("\\","/"),
            "Name": Name
        }
        user.insert_one(img)

        log = {
            "_id": _id1,
            "Log": 'User ' + Name + ' has been added'
        }
        logs.insert_one(log)

        return 'Your data has been submitted'
        
    users = user.find()
    usr = []
    # for i in users:
    #     i["Image"] = i["Image"].replace("uploads","images")
    #     usr.append(i)

    with open('filekey.key', 'rb') as filekey:
        key = filekey.read()
    fernet = Fernet(key)
    for i in users:
        path1 = os.path.join(app.config['UPLOAD_FOLDER'], i["Name"]+'.jpg')

        with open(path1, 'rb') as file:
            original = file.read()
        decrypted = fernet.decrypt(original)
        i["Image"] = decrypted
        usr.append(i)

    return dumps(usr)

@app.route('/user/<int:id>', methods=['GET', 'DELETE'])
def user_data(id):
    if request.method=='DELETE':
        users = user.delete_one({"_id": id})
        return 'User has been deleted'

    users = user.find_one({"_id": id})
    return dumps(users)

@app.route('/user/update/<int:id>', methods=['GET', 'POST'])
def update_file(id):
    if request.method == 'POST':
        Image = request.files['Image']
        Name = request.values['Name']
        path = os.path.join(app.config['UPLOAD_FOLDER'], Name+'.jpg')
        # path1 = os.path.join(app.config['UPLOAD_FOLDER1'], Name+'.jpg')
        Image.save(path)

        with open('filekey.key', 'rb') as filekey:
            key = filekey.read()
        fernet = Fernet(key)
        with open(path, 'rb') as file:
            original = file.read()
        encrypted = fernet.encrypt(original)
        with open(path, 'wb') as encrypted_file:
            encrypted_file.write(encrypted)

        url = 'https://localhost:5000/'
        # return path
        img = {
            "Image": url + path.replace("\\","/"),
            "Name": Name
        }
        user.replace_one({"_id": id,}, img)

        log = {
            "_id": (int)(request.values['_id']),
            "Log": 'User ' + Name + ' has been updated'
        }
        logs.insert_one(log)

        return 'Your data has been updated'
    users = user.find_one({"_id": id})
    return dumps(users)


@app.route('/logs', methods=['GET','POST'])
def get_logs():
    if request.method=='POST':
        _id = (int)(request.values['_id'])
        Name = request.values['Name']
        log = {
            "_id": _id,
            "Log": 'User ' + Name + ' has been deleted'
        }
        logs.insert_one(log)
        return 'New Log Added'

    logss = logs.find()
    return dumps(logss)
    # return jsonify([log for log in logss])





if __name__ == '__main__':
    app.run(ssl_context=('cert.pem','key.pem'))

# import os
# from flask import Flask, request
# from pymongo import MongoClient

# client = MongoClient('mongodb://127.0.0.1:27017')
# db = client.Flask
# user = db.user

# UPLOAD_FOLDER = 'upload'

# app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# @app.route('/', methods=['GET', 'POST'])
# def upload_file():
#     if request.method == 'POST':
#         if 'file1' not in request.files:
#             return 'there is no file1 in form!'
#         file1 = request.files['file1']
#         path = os.path.join(app.config['UPLOAD_FOLDER'], file1.filename)
#         file1.save(path)
#         # return path
#         image = {
#             "path": path
#         }
#         user.insert_one(image)

#         return 'Your image has been submitted'
#     return '''
#     <h1>Upload new File</h1>
#     <form method="post" enctype="multipart/form-data">
#       <input type="file" name="file1">
#       <input type="submit">
#     </form>
#     '''

# if __name__ == '__main__':
#     app.run()