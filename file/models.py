from django.db import models
from folder.models import Folder
from django.conf import settings

import os
# Create your models here.

class File(models.Model):

    name = models.TextField()
    folder = models.ForeignKey(Folder, on_delete = models.CASCADE)    
    extension = models.TextField(null=True)

    class Meta:
        verbose_name = "File"
        verbose_name_plural = "Files"

    def __str__(self):
        return self.name + self.extension

    def _delete(self):
        folder = Folder.objects.get(id = self.folder_id)
        path = settings.DATA_PATH + folder.getPath() +  self.name + '.' + self.extension
        if os.path.exists(path):
            os.remove(path)

    



