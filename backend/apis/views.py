from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score

# Create your views here.

# we need a full control of our api, thats why we dont use generics.
class StockPredictionAPIView(APIView):

    # this method will be triggered by the Button component from Dashboard.jsx
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)

        if serializer.is_valid():

            ticker = serializer.validated_data['ticker']

            # fetch the data from yfinance
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)

            if df.empty:
                return Response({"error": "No data found for the given ticker.", "status": status.HTTP_404_NOT_FOUND})

            df = df.reset_index()

            # Generate basic plot
            plt.switch_backend('AGG') # Anti Grain Geometry, if we don´t put this we will get an error (we are switching the matplot backend)
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            # Save the plot to a file
            plot_image_path = f'{ticker}_plot.png'
            plot_image = save_plot(plot_image_path)

            # 100 Days moving average
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100, 'r', label='100 Days DMA')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            plot_image_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_image_path)

            # splitting data into Training and Testing datasets
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

            # scaling down the data between 0 and 1 
            scaler = MinMaxScaler(feature_range=(0,1))

            # Load ml model
            model_path = os.path.join(settings.BASE_DIR, 'ml', 'stock_prediction_model.keras')
            model = load_model(model_path)

            # preparing test data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i,0])
            
            x_test, y_test = np.array(x_test), np.array(y_test)

            # make predictions
            y_predicted = model.predict(x_test)

            # Revert the scales prices to original price
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            # plot the final prediction
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(y_test, 'b', label='Original Price')
            plt.plot(y_predicted, 'r', label='Predicted Price')
            plt.title(f'Final Prediction of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close Price')
            plt.legend()

            final_plot_image_path = f'{ticker}_100_dma.png'
            plot_final = save_plot(final_plot_image_path)

            # Model evaluation
            # Mean Squared Error
            mse = mean_squared_error(y_test, y_predicted)

            # Root Mean squared Error
            rmse = np.sqrt(mse)

            # R-squared
            r2 = r2_score(y_test, y_predicted)


            return Response({
                'status':'success', 'plot_img': plot_image, 'plot_100_dma': plot_100_dma, 'plot_prediction': plot_final,
                'mse': mse, 'rmse': rmse, 'r2': r2
            })