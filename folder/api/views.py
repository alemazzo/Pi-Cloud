#Rest framework imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

#Django imports
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponse, get_object_or_404

#Other imports
from folder.models import Folder
from folder.api.serializers import FolderSerializer

from django.conf import settings

from shutil import copyfile
import os, subprocess



class AllFolder(APIView):
    """
    Return all folders in file system.
    """

    def get(self, request, format=None):
        """
        Return all folders in file system.
        """
        folder = Folder.objects.all()
        serializer = FolderSerializer(folder, many=True)
        return Response(serializer.data)

class SingleFolder(APIView):
    """
    Return a single folder by its ID
    """

    def get(self, request, pk, format=None):
        """
        Return a single folder by its ID
        """
        folder = get_object_or_404(Folder, pk = pk) #Folder.objects.get(pk = pk)
        serializer = FolderSerializer(folder, many=False)
        return Response(serializer.data)

class AllFolderInFolder(APIView):
    """
    Return all folders in a folder by its ID
    """

    def get(self, request, pk, format=None):
        """
        Return all folders in a folder by its ID
        """
        folder = Folder.objects.all().filter(parent_id = pk)
        serializer = FolderSerializer(folder, many=True)
        return Response(serializer.data)



class CreateFolder(APIView):
    """
    Create a folder
    """

    def getAvailablePath(self, folder):
        name = folder.name
        path = settings.DATA_PATH + folder.getPath()
        i = -1
        while os.path.exists(path):
            i += 1
            folder.name = name + "("+str(i)+")"
            path = settings.DATA_PATH + folder.getPath()
        return path

    def post(self, request, format=None):
        parent = get_object_or_404(Folder, pk = request.data['parent'])
        folder = Folder(name = request.data['name'], parent = parent)
        path = self.getAvailablePath(folder)
        folder.save()
        os.mkdir(path)
        serializer = FolderSerializer(folder, many=False)
        return Response(serializer.data)

class DeleteFolder(APIView):
    """
    Delete a folder
    """

    def get(self, request, pk, format=None):
        folder = get_object_or_404(Folder, pk = pk)
        folder._delete()
        folder.delete()

        serializer = FolderSerializer(folder, many=False)
        return Response(serializer.data)