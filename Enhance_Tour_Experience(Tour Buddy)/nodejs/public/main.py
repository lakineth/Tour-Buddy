import json , time
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import requests
import shutil
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img , img_to_array
from keras.models import load_model
from tensorflow.keras.preprocessing import image
import tensorflow_hub as hub
import os
import pickle
from tensorflow.keras.utils import custom_object_scope
import math
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import datetime
import numpy as np


df = pd.read_excel('Transportation_Recommandation_SampleDataset (Himasha).xlsx')

X = df[['Current Location', 'Destination', 'Comfort Level', 'Number of Passengers', 
        'Vehicle Condition', 'Time Duration (hours)']]
y = df[['Transportation Mode', 'Fare (LKR)', 'Distance (km)','Number of Seats Available']]
label_encoder = LabelEncoder()
y['Transportation Mode'] = label_encoder.fit_transform(y['Transportation Mode'])
cat_features = ['Current Location', 'Vehicle Condition', 'Comfort Level', 'Destination']

preprocessor = ColumnTransformer(
    transformers=[('encoder', OneHotEncoder(handle_unknown='ignore'), cat_features)],
    remainder='passthrough')

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

X_train_encoded = preprocessor.fit_transform(X_train)
X_test_encoded = preprocessor.transform(X_test)

X_train = preprocessor.fit_transform(X_train)
X_test = preprocessor.transform(X_test)

model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test_encoded)

predicted_y = pd.DataFrame({'Transportation_Mode': label_encoder.inverse_transform(np.round(y_pred[:, 0]).astype(int)),
                            'Fare': y_pred[:, 1],
                            'Distance': y_pred[:, 2],
                            'Number_of_Seats_Available': np.round(y_pred[:, 3]).astype(int)})


label_encoder.inverse_transform(np.round(y_pred[:, 0]).astype(int))

app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
@app.route('/transport', methods=['POST'])
def transport():
    
    try:
        request_data = request.get_json()

        x1 = str(request_data['current'])
        x2 = str(request_data['destination'])
        x3 = str(request_data['level'])
        x4 = str(request_data['passengers'])
        x5 = str(request_data['condition'])
        x6 = str(request_data['time'])

        data=preprocessor.transform(pd.DataFrame([[x1,x2,x3,x4,x5,x6]], columns=['Current Location','Destination','Comfort Level','Number of Passengers','Vehicle Condition','Time Duration (hours)']))
        new_data=model.predict(data)
        results=label_encoder.inverse_transform(np.round(new_data[:, 0]).astype(int))[0]

        json_dump = json.dumps({"results":str(results),"success":"true"})

        return json_dump
        
    except:
        json_dump = json.dumps({"success":"false"})

        return json_dump
    

if __name__ == '__main__':
	app.run(host="0.0.0.0", port=1111)