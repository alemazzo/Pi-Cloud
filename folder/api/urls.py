from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from folder.api.views import *

urlpatterns = [
    path('', AllFolder.as_view()),
    path('<int:pk>', SingleFolder.as_view()),
    path('in_folder/<int:pk>', AllFolderInFolder.as_view()),
    path('create/', CreateFolder.as_view()),
    path('delete/<int:pk>', DeleteFolder.as_view()),
    
    #path('delete/<int:pk>', DeleteFile.as_view()),
    #path('copy/<int:pk>/<int:dest>', CopyFile.as_view()),
]