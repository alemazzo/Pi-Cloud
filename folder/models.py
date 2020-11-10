from django.db import models
from django.conf import settings

import shutil


# Create your models here.
class Folder(models.Model):

    
    # Name of the folder.
    name = models.TextField()

    # The parent directory - Null if the folder is the root.
    parent = models.ForeignKey("Folder", on_delete = models.CASCADE, blank = True, null = True)
    
    class Meta:
        verbose_name = "Folder"
        verbose_name_plural = "Folders"

    def __str__(self):
        return self.name
    
    
    def getPath(self):
        """
        Get the complete path of the folder. 
        """
        if self.parent is None:
            # If the folder is the root we only have to return its name.
            return self.name + '/'
        else:
            # Otherwise, we concat the path of the parent Folder with the name of the folder.
            f = Folder.objects.get(id = self.parent_id)
            return f.getPath() + self.name + '/'
    
    def getSize(self):
        """
        Get the total size of the folder.
        """
        # TODO 
        pass

    def _delete(self):
        """
        Delete the folder and all its subfolders recursively.
        """
        #Internal import because of -Circul Import Error-
        from file.models import File
        subfolders = Folder.objects.all().filter(parent_id = self.id)
        if(len(subfolders) > 0):
            for folder in subfolders:
                folder._delete()
                folder.delete()
                
        files = File.objects.all().filter(folder_id = self.id)
        if(len(files) > 0):
            for f in files:
                f._delete()
                f.delete()
        shutil.rmtree(settings.DATA_PATH + self.getPath())
        

