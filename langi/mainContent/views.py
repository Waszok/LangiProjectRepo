from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

import cv2 as cv
import numpy as np

from docx import Document
from .functions import is_doc, to_image, to_data_uri
from .detectionMechanism import process, preprocess_edges, preprocess_checkered_paper


@login_required(login_url='accounts:login')
def homePage(request):
    return render(request, 'mainContent/home.html')


@login_required(login_url='accounts:login')
def deckPage(request):
    return render(request, 'mainContent/decks.html')


@login_required(login_url='accounts:login')
def addCardPage(request):
    return render(request, 'mainContent/addCard.html')


@login_required(login_url='accounts:login')
def learnPage(request):
    return render(request, 'mainContent/learn.html')


@login_required(login_url='accounts:login')
def gamesPage(request):
    return render(request, 'mainContent/games.html')


@login_required(login_url='accounts:login')
def aboutPage(request):
    return render(request, 'mainContent/about.html')


def changeLanguage(request):
    if request.is_ajax and request.method == "POST":
        language_code = request.POST.get("language", None)
        user = request.user
        user.profile.language = language_code
        user.save()
        return JsonResponse({'message': 'OK'}, status=200)
    return JsonResponse({"error": "Error during setting a new language!"}, status=400)


def changeTheme(request):
    if request.is_ajax and request.method == "POST":
        darkMode = request.POST.get("darkMode", None)
        if darkMode == 'true':
            darkMode = True
        else:
            darkMode = False
        user = request.user
        user.profile.darkMode = darkMode
        user.save()
        return JsonResponse({'message': 'OK'}, status=200)
    return JsonResponse({"error": ""}, status=400)


def importTextFile(request):
    if request.method == "POST":
        separator = request.POST.get("separator", None)
        textFile = request.FILES["file"]

        # get bytes of file
        rawdata = textFile.read()
        # read content from text file
        fileContent = []
        if is_doc(rawdata):
            # docx file -----------------------------------------------------------------------
            try:
                document = Document(textFile)
                for para in document.paragraphs:
                    s = para.text
                    if len(s) != 0 and s.isspace() is False:
                        fileContent.append(s)
            except Exception as ex:
                print(ex)
        else:
            # plain text file ----------------------------------------------------------------
            encoding = 'utf-8'
            try:
                for line in textFile:
                    s = line.decode(encoding=encoding)
                    if len(s) != 0 and s.isspace() is False:
                        fileContent.append(s)
            except Exception as ex:
                print(ex)

        # split lines by separator
        lines = []
        result = []
        for i in fileContent:
            if len(separator) != 0 and len(separator) < 2 and separator.isspace() is False:
                lines.append(i.split(separator))
            else:
                lines.append([i, ''])

        # create json with words
        for line in lines:
            if len(line) < 2 or len(line) > 2:
                result.append({"front": line[0], "back": ''})
            else:
                result.append({"front": line[0], "back": line[1]})

        # jsonResult = json.dumps(result, indent=1, ensure_ascii=False)
        return JsonResponse(result, safe=False, status=200)
    return JsonResponse({"error": ""}, status=400)


def importImgFile(request):
    if request.method == "POST":
        edges = request.POST.get("edges", None)
        checkered = request.POST.get("checkered", None)

        result = []

        imgFile = request.FILES["file"]

        nparr = np.frombuffer(imgFile.read(), np.uint8)
        img = cv.imdecode(nparr, cv.IMREAD_COLOR)

        if edges == "true":
            img = preprocess_edges(img)
       
        if checkered == "true":
            img = preprocess_checkered_paper(img)
       
        imgList = process(img)
      
        for imgTuple in imgList:
            tup = []
            for img in imgTuple:
                pil_image = to_image(img)
                image_uri = to_data_uri(pil_image)
                tup.append(image_uri)
            result.append(tup)
        return JsonResponse(result, safe=False, status=200)
    return JsonResponse({"error": ""}, status=400)
