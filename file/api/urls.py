from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from file.api.views import *

urlpatterns = [

    # Get all files in file system
    path('', AllFile.as_view()),

    # Get a single file by its ID
    path('<int:pk>', SingleFile.as_view()),

    # Get all files in a folder identified by its ID
    path('in_folder/<int:pk>', AllFileInFolder.as_view()),
    
    # Upload a file
    path('upload/', csrf_exempt(UploadFile.as_view())),
    
    # Delete a file by its ID
    path('delete/<int:pk>', DeleteFile.as_view()),
    
    # Copy the content of the first file in the second file.
    path('copy/<int:pk>/<int:dest>', CopyFile.as_view()),

    # TODO create a Rename API

    # TODO create a Move API
    
]