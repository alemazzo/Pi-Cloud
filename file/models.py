from django.db import models
from folder.models import Folder
from django.conf import settings

import os

class File(models.Model):

    # The name of the file.
    name = models.TextField()

    # The extension of the file - it can be null/blank
    extension = models.TextField(null=True)

    # The folder containing the file.
    folder = models.ForeignKey(Folder, on_delete = models.CASCADE)

    # If True the file is Trashed and it will be visibile only in Trash
    trashed = models.BooleanField()    


    # New Fields

    # The size of the file in Bytes
    size = models.IntegerField()


    class Meta:
        verbose_name = "File"
        verbose_name_plural = "Files"

    def __str__(self):
        return self.name + self.extension

    def _trash(self):
        """
        Sent the file to Trash
        """
        self.trashed = True
        self.save()

    def _delete(self):
        """
        Delete the file from the memory and from the File System. 
        """
        folder = Folder.objects.get(id = self.folder_id)
        path = settings.DATA_PATH + folder.getPath() +  self.name + '.' + self.extension
        if os.path.exists(path):
            os.remove(path)
        self.delete()

    



