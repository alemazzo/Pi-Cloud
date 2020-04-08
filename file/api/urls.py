from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from file.api.views import *

urlpatterns = [
    path('', AllFile.as_view()),
    path('<int:pk>', SingleFile.as_view()),
    path('in_folder/<int:pk>', AllFileInFolder.as_view()),
    path('upload/', UploadFile.as_view()),
    path('delete/<int:pk>', DeleteFile.as_view()),
    path('copy/<int:pk>/<int:dest>', CopyFile.as_view()),
    
]