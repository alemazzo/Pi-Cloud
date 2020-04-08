#Rest framework imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

#Django imports
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponse
from django.shortcuts import get_object_or_404
from django.conf import settings

#Other imports
from file.models import File
from file.api.serializers import FileSerializer

from folder.models import Folder


from shutil import copyfile
import os, subprocess



class AllFile(APIView):

    def get(self, request, format=None):
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)

class SingleFile(APIView):

    def get(self, request, pk, format=None):
        files = get_object_or_404(File, pk = pk) #File.objects.get(pk = pk)
        serializer = FileSerializer(files, many=False)
        return Response(serializer.data)

class AllFileInFolder(APIView):

    def get(self, request, pk, format=None):
        files = File.objects.all().filter(folder_id = pk)
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)


class UploadFile(APIView):

    def getAvailablePath(self, file, folder):
        path = settings.DATA_PATH + folder.getPath() +  file.name + '.' + file.extension
        i = -1
        while os.path.exists(path):
            i += 1
            path = settings.DATA_PATH + folder.getPath() +  file.name + "("+str(i)+")" + '.' + file.extension
        file.name = file.name + "("+str(i)+")"
        return path
           
        

    def post(self, request, format=None):
        folder = get_object_or_404(Folder, pk = request.POST['folder']) #Folder.objects.get(pk = request.POST['folder'])
        
        file = File()
        file.extension = request.FILES['file'].name.split('.')[-1]
        file.name = request.FILES['file'].name.replace('.' + file.extension, '')
        file.folder = folder
        path = self.getAvailablePath(file, folder)        
        file.save()
        
        with open(path, 'wb+') as destination:
            for chunk in request.FILES['file'].chunks():
                destination.write(chunk)
        
        return HttpResponse("OK")
        

class DeleteFile(APIView):

    def get(self, request, pk, format=None):
        file = get_object_or_404(File, pk = pk) #File.objects.get(pk = pk)
        file._delete()
        file.delete()
        return HttpResponse("OK")

class CopyFile(APIView):

    def getAvailablePath(self, file, folder):
        path = settings.DATA_PATH + folder.getPath() + file.name + '.' + file.extension
        i = -1
        while os.path.exists(path):
            i += 1
            path = settings.DATA_PATH + folder.getPath() + file.name + "("+str(i)+")" + '.' + file.extension
        if i != -1:
            file.name = file.name + "("+str(i)+")"
        return path

    def get(self, request, pk, dest, format=None):
        file = get_object_or_404(File, pk = pk) #File.objects.get(pk = pk)
        folder = Folder.objects.get(pk = file.folder_id)
        path = settings.DATA_PATH + folder.getPath() +  file.name + '.' + file.extension
        dest = get_object_or_404(Folder, pk = dest) #Folder.objects.get(pk = dest)
        newfile = File()
        newfile.name = file.name
        newfile.extension = file.extension
        newfile.folder = dest
        destPath = self.getAvailablePath(newfile, dest)
        #destPath = settings.DATA_PATH + dest.getPath() + file.name + '.' + file.extension
        #subprocess.call(f'cp "{path}" "{destPath}"', shell=True)
        copyfile(path, destPath)
        newfile.save()
        return HttpResponse("OK")

