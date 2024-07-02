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
import math
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import datetime
from xgboost import XGBRegressor
import numpy as np

dataset = pd.read_excel('Destination Dataset.xlsx')

X = dataset[[ 'Destination City',  'Indoor/Outdoor',
       'Wildlife', 'Beaches', 'Cultural Sites', 'Heritage Sites',
       'Sports & Adventure', 'Natural Sceneries', 'Botanical Gardens',
       'Weather Conditions']]
Y= dataset['Specific Destination']

label_encoder = LabelEncoder()
Y = label_encoder.fit_transform(Y)

cat_features = ['Destination City',  'Indoor/Outdoor',
       'Wildlife', 'Beaches', 'Cultural Sites', 'Heritage Sites',
       'Sports & Adventure', 'Natural Sceneries', 'Botanical Gardens',
       'Weather Conditions']

full_pipeline  = ColumnTransformer(
    transformers=[('encoder', OneHotEncoder(handle_unknown='ignore'), cat_features)],
    remainder='passthrough')

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

encoder = full_pipeline.fit(X_train)

X_train = encoder.transform(X_train)
X_test = encoder.transform(X_test)

model = XGBRegressor(n_estimators=10, max_depth=20, verbosity=2)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
predictions = [round(value) for value in y_pred]

app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
@app.route('/destination', methods=['POST'])
def destination():
    
        request_data = request.get_json()

        x1 = str(request_data['city'])
        x2 = str(request_data['type'])
        x3 = str(request_data['wildlife'])
        x4 = str(request_data['beaches'])
        x5 = str(request_data['cultural'])
        x6 = str(request_data['heritage'])
        x7 = str(request_data['sport'])
        x8 = str(request_data['natural'])
        x9 = str(request_data['botanical'])
        x10 = str(request_data['weather'])

        print(x1)
        print(x2)
        print(x3)
        print(x4)
        print(x5)
        print(x6)
        print(x7)
        print(x8)
        print(x9)
        print(x10)

        data=model.predict(encoder.transform(pd.DataFrame([[x1,x2,x3,x4,x5,x6,x7,x8,x9,x10]], columns=['Destination City',  'Indoor/Outdoor',
       'Wildlife', 'Beaches', 'Cultural Sites', 'Heritage Sites',
       'Sports & Adventure', 'Natural Sceneries', 'Botanical Gardens',
       'Weather Conditions'])))
       
        results=label_encoder.inverse_transform(np.round(data).astype(int))[0]

        resultsDes=""

        if results=="Hummanaya":
              resultsDes="description"

        
        if results=="Hummanaya":
              resultsDes="description"

        json_dump = json.dumps({"results":str(results),"resultsDes":str(resultsDes),"success":"true"})

        return json_dump
        
    
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=3333)