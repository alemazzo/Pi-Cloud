from django.shortcuts import render

# Create your views here.
def UploadFile(request):
    return render(request, 'index.html')