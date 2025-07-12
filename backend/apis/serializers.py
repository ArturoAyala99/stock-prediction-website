# in this case, we did not create a model to our stock prediction, so we will just create a simple custom serializer
from rest_framework import serializers

class StockPredictionSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=20)