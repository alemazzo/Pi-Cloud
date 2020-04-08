from django.urls import path, include
from file.views import *

urlpatterns = [
    path('upload/', UploadFile),
]