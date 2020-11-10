from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from folder.api.views import *

urlpatterns = [

    # Get all folders in file system
    path('', AllFolder.as_view()),

    # Get a single folder by its ID
    path('<int:pk>', SingleFolder.as_view()),
    
    # Get all folders in a folder by its ID
    path('in_folder/<int:pk>', AllFolderInFolder.as_view()),
    
    # Create a folder
    path('create/', CreateFolder.as_view()),
    
    # Delete a folder
    path('delete/<int:pk>', DeleteFolder.as_view()),
    
    # TODO create a Rename API

    # TODO create a Move API

    # TODO create a Copy API


]