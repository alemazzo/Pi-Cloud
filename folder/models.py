from django.db import models
from django.conf import settings

import shutil

# Create your models here.
class Folder(models.Model):

    name = models.TextField()
    parent = models.ForeignKey("Folder", on_delete = models.CASCADE, blank = True, null = True)
    

    class Meta:
        verbose_name = "Folder"
        verbose_name_plural = "Folders"

    def __str__(self):
        return self.name
    
    def getPath(self):
        if self.parent is None:
            return self.name + '\\'
        else:
            f = Folder.objects.get(id = self.parent_id)
            return f.getPath() + self.name + '\\'
    
    def _delete(self):
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
        

