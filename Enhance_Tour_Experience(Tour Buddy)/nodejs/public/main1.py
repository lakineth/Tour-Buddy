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
import random

df = pd.read_csv('Food.csv')

X = df[['Cuisine Type\t', 'Dietary Restrictions', 'Flavor Profiles', 'Allergies', 'Budget',
        'Time of Day', 'Occasion']]
y = df[['Food Name']]

label_encoder = LabelEncoder()
y['Food Name'] = label_encoder.fit_transform(y['Food Name'])

cat_features = ['Cuisine Type\t', 'Dietary Restrictions', 'Flavor Profiles', 'Allergies', 'Budget',
        'Time of Day', 'Occasion']
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

predicted_y = pd.DataFrame({'Food_Name': label_encoder.inverse_transform(np.round(y_pred).astype(int))})

app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
@app.route('/food', methods=['POST'])
def food():
    
        request_data = request.get_json()

        x1 = str(request_data['type'])
        x2 = str(request_data['restriction'])
        x3 = str(request_data['flavor'])
        x4 = str(request_data['allergies'])
        x5 = str(request_data['budget'])
        x6 = str(request_data['time'])
        x7 = str(request_data['occasion'])

        data=preprocessor.transform(pd.DataFrame([[x1,x2,x3,x4,x5,x6,x7]], columns=['Cuisine Type\t', 'Dietary Restrictions', 'Flavor Profiles', 'Allergies', 'Budget',
                'Time of Day', 'Occasion']))
        new_data=model.predict(data)
        results=label_encoder.inverse_transform(np.round(new_data).astype(int))

        asian = ['Sushi','Noodles','Pad Thai','Tom Yum','Pho','General Tsos Chicken','Dim Sum','Nasi Goreng','Kool','Hot and Sour Soup','Mango Sticky Rice','Borscht','Pelmeni','Mapo Tofu','Som Tam','Cabbage Rolls']

        lankan = ['Sri Lankan Curry','Sri Lankan Rice and Curry','Sri Lankan Hoppers','Pol Sambol','Kottu Roti','Fish Ambul Thiyal','String Hoppers','Tuna Sushi','Fish Tacos','Clam Chowder','Kiri Bath','Chicken Curry','Octopus Salad','Crab Cakes','Pittu','Gotu kola Salad','Chicken Curry']

        russian = ['Borscht','Beef Stroganoff','Blini','Olivier Salad','Vareniki','Pirozhki']

        Italian = ['Pasta','Pizza']

        indian = ['Samosa','Green Curry','Biryani','Masala Dosa','Butter Chicken','Paneer Tikka','Tandoori Chicken','Chicken Tikka','Red Curry','Chole Bhature','Rogan Josh','Pani Walalu','Palak Paneer','Malai Kofta','Gulab Jamun']

        if results=="Asian Cuisine":
              results=random.choice(asian)

        if results=="Asian Cuisine":
              results=random.choice(lankan)

        if results=="Asian Cuisine":
              results=random.choice(russian)

        if results=="Italian Cuisine":
              results=random.choice(Italian)

        if results=="Indian Cuisine":
              results=random.choice(indian)

        json_dump = json.dumps({"results":str(results),"success":"true"})

        return json_dump
        
    
if __name__ == '__main__':
	app.run(host="0.0.0.0", port=2222)