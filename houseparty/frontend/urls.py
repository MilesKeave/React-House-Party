
from django.urls import path, include
from .views import index

app_name ="frontend"

urlpatterns = [
   
    path("", index, name=""),
    path('', index),
    path("join", index),
    path("create", index),
    path("room/<str:roomCode>", index),
    path("info", index)

]
