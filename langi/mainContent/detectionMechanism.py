import cv2 as cv
import imutils
import numpy as np
import math
from imutils.perspective import four_point_transform


# TEMPLATES
# Templates to detect all dashes
templatePaths = ['mainContent/static/mainContent/images/detectionTemplates/template1.jpg', 
                    'mainContent/static/mainContent/images/detectionTemplates/template2.jpg',
                    'mainContent/static/mainContent/images/detectionTemplates/template3.jpg',
                    'mainContent/static/mainContent/images/detectionTemplates/template4.jpg',
                    'mainContent/static/mainContent/images/detectionTemplates/template5.jpg',
                    'mainContent/static/mainContent/images/detectionTemplates/template6.jpg',
                    'mainContent/static/mainContent/images/detectionTemplates/template7.jpg']

# Variables
templates = []
# processedImage = None
# processedImageDash = None
# dashesCoordinates = None
# contours = None
# hierarchy = None


# load all templates to detect dashes on image
def load_templates():
    for templatePath in templatePaths:
        template = cv.imread(templatePath)
        template = cv.cvtColor(template, cv.COLOR_BGR2GRAY)
        templates.append(template)


# calculate average value of list's elements
def Average(lst):
    if len(lst) > 0:
        return sum(lst) / len(lst)
    return 0


# create line object from given points
def line(p1, p2):
    A = (p1[1] - p2[1])
    B = (p2[0] - p1[0])
    C = (p1[0]*p2[1] - p2[0]*p1[1])
    return A, B, -C


# get intersection point of two lines
def intersection(L1, L2):
    D = L1[0] * L2[1] - L1[1] * L2[0]
    Dx = L1[2] * L2[1] - L1[1] * L2[2]
    Dy = L1[0] * L2[2] - L1[2] * L2[0]
    if D != 0:
        x = Dx / D
        y = Dy / D
        return x, y
    else:
        return False


# Detect dashes on the image
def detect_dashes(img, templates):
    method = cv.TM_CCOEFF_NORMED
    threshold = 0.70
    dashesCoordinates = []
    for template in templates:
        h, w = template.shape[:2]
        res = cv.matchTemplate(img, template, method)
        # fake out max_val for first run through loop
        max_val = 1
        while max_val > threshold:
            min_val, max_val, min_loc, max_loc = cv.minMaxLoc(res)

            if max_val > threshold:
                res[max_loc[1] - h // 2:max_loc[1] + h // 2 + 1, max_loc[0] - w // 2:max_loc[0] + w // 2 + 1] = 0
                # cv.rectangle(img, (max_loc[0], max_loc[1]), (max_loc[0] + w + 1, max_loc[1] + h + 1), (0, 255, 0))
                center = (int(max_loc[0]+w/2), int(max_loc[1]+h/2))
                dashesCoordinates.append(center)
    return dashesCoordinates


# get average value of min area rect boxes height
def calculate_average_box_height(contoursFiltered):
    distances = []
    for contour in contoursFiltered:
        rect = cv.minAreaRect(contour)
        box = cv.boxPoints(rect)
        box = np.int0(box)
        distance = abs(box[0][1] - box[2][1])
        distances.append(distance)
    average_distance = Average(distances)
    return average_distance


# split too big boxes into smaller parts, the rest contours remain the same
def split_biggest_contours(contoursFiltered, average_distance):
    proper_contours = []
    for contour in contoursFiltered:
        # sort founded boxes by y coordinate
        rect = cv.minAreaRect(contour)
        box = cv.boxPoints(rect)
        box = np.int0(box)
        box_sorted = sorted(box, key=lambda x: x[1])

        # find distance between the farest box's corner points
        distance = abs(box[0][1] - box[2][1])
        first_line = []
        second_line = []
        middle_line = []
        if distance > 2 * average_distance:
            if calculate_distance(box_sorted[0][0], box_sorted[0][1], box_sorted[2][0], box_sorted[2][1]) < calculate_distance(box_sorted[0][0], box_sorted[0][1], box_sorted[3][0], box_sorted[3][1]):
                first_line.append((box_sorted[0][0], box_sorted[0][1]))
                first_line.append((box_sorted[2][0], box_sorted[2][1]))
            else:
                first_line.append((box_sorted[0][0], box_sorted[0][1]))
                first_line.append((box_sorted[3][0], box_sorted[3][1]))

            if calculate_distance(box_sorted[1][0], box_sorted[1][1], box_sorted[2][0], box_sorted[2][1]) < calculate_distance(box_sorted[1][0], box_sorted[1][1], box_sorted[3][0], box_sorted[3][1]):
                second_line.append((box_sorted[1][0], box_sorted[1][1]))
                second_line.append((box_sorted[2][0], box_sorted[2][1]))
            else:
                second_line.append((box_sorted[1][0], box_sorted[1][1]))
                second_line.append((box_sorted[3][0], box_sorted[3][1]))

            if box[0][1] > box[2][1]:
                center = (int(rect[0][0]), int(rect[0][1]))
                if center[0] < box[0][0]:
                    middle_line.append((center[0] - 500, center[1]))
                    middle_line.append((box[0][0] + 500, box[0][1] - int(distance/2)))
                else:
                    middle_line.append((center[0] + 500, center[1]))
                    middle_line.append((box[0][0] - 500, box[0][1] - int(distance / 2)))
            else:
                if center[0] < box[2][0]:
                    middle_line.append((center[0] - 500, center[1]))
                    middle_line.append((box[2][0] + 500, box[2][1] - int(distance/2)))
                else:
                    middle_line.append((center[0] + 500, center[1]))
                    middle_line.append((box[2][0] - 500, box[2][1] - int(distance / 2)))
            L1 = line(first_line[0], first_line[1])
            L2 = line(second_line[0], second_line[1])
            L3 = line(middle_line[0], middle_line[1])

            R1 = intersection(L1, L3)
            R2 = intersection(L2, L3)

            # find contour 1
            p1 = [box_sorted[0][0], box_sorted[0][1]]
            p2 = [box_sorted[1][0], box_sorted[1][1]]
            p3 = [R1[0], R1[1]]
            p4 = [R2[0], R2[1]]
            contour1 = np.array([p1, p2, p4, p3], dtype=np.int32)
            # find contour 2
            p1 = [box_sorted[2][0], box_sorted[2][1]]
            p2 = [box_sorted[3][0], box_sorted[3][1]]
            p3 = [R1[0], R1[1]]
            p4 = [R2[0], R2[1]]
            contour2 = np.array([p1, p2, p4, p3], dtype=np.int32)

            proper_contours.append(contour1)
            proper_contours.append(contour2)
        else:
            proper_contours.append(contour)
    return proper_contours


# choose only a proper contours (with a proper hierarchy)
def filter_boxes_by_hierarchy(contours, hierarchy):
    contoursFiltered = []
    for i in range(len(contours)):
        if hierarchy[0, i, 3] == -1:
            minRect = cv.minAreaRect(contours[i])
            if (minRect[1][0] > 10 or minRect[1][1] > 10) and (minRect[1][0] < 350 and minRect[1][1] < 350):
                contoursFiltered.append(contours[i])
    return contoursFiltered


# sort all founded boxes by their center points
def sort_by_box_center(contours):
    boxCenters = []
    for contour in contours:
        rect = cv.minAreaRect(contour)
        center = (int(rect[0][0]), int(rect[0][1]))
        boxCenters.append(center[1])
    contoursSorted = [x for (y, x) in sorted(zip(boxCenters, contours), key=lambda pair: pair[0])]
    return contoursSorted


# find average distnace between box's centers
def get_average_center_distance(contours):
    center_distances = []
    for i in range(len(contours)):
        # Find min box
        rect = cv.minAreaRect(contours[i])
        center = (int(rect[0][0]), int(rect[0][1]))

        if i < len(contours) - 1:
            rect = cv.minAreaRect(contours[i + 1])
            center2 = (int(rect[0][0]), int(rect[0][1]))
            center_distances.append(abs(center2[1] - center[1]))
    average = Average(center_distances)
    return average


# get angle between two vectors
def get_angle(p0, p1=np.array([0, 0]), p2=None):
    """ Points in the form [x, y]. Points p0, p1, p2.
    Compute angle (in degrees) for p0p1p2 corner
    """
    if p2 is None:
        p2 = p1 + np.array([1, 0])
    v0 = np.array(p0) - np.array(p1)
    v1 = np.array(p2) - np.array(p1)

    angle = np.math.atan2(np.linalg.det([v0, v1]), np.dot(v0, v1))
    return np.degrees(angle)


# Get all bounding, rotated boxes around the words
def get_all_bounding_boxes(contoursSorted, average):
    resultRows = []
    line = 0
    line_previous = -1
    for i in range(len(contoursSorted)):
        # Find min box
        rect = cv.minAreaRect(contoursSorted[i])
        box = cv.boxPoints(rect)
        box = np.int0(box)

        center = (int(rect[0][0]), int(rect[0][1]))

        if line > line_previous:
            line_previous = line
            row = []
            resultRows.append(row)
            resultRows[line].append((rect, line))
        else:
            resultRows[line].append((rect, line))

        if i < len(contoursSorted) - 1:
            rect = cv.minAreaRect(contoursSorted[i + 1])
            box = cv.boxPoints(rect)
            box = np.int0(box)

            center2 = (int(rect[0][0]), int(rect[0][1]))

            ang = get_angle((0, center[1]), (center[0], center[1]), (center2[0], center2[1]))

            if ((10 < ang < 170 or -170 < ang < -10) and center2[1] > center[1] and abs(center2[0] - center[0]) < 200) \
                    or ((5 < ang < 175 or -175 < ang < -5) and center2[1] > center[1] and abs(center2[0] - center[0]) >= 200) \
                    or abs(center2[1] - center[1]) > 2 * average:
                line = line + 1
            elif ((10 < ang < 170 or -170 < ang < -10) and center2[1] <= center[1] and abs(center2[0] - center[0]) < 200) \
                    or ((5 < ang < 175 or -175 < ang < -5) and center2[1] <= center[1] and abs(center2[0] - center[0]) >= 200) \
                    or abs(center2[1] - center[1]) > 2 * average:
                if line > 0:
                    line = line - 1
                else:
                    line = 0
            elif (-10 <= ang <= 10 or -180 <= ang <= -170 or 170 <= ang <= 180 and abs(center2[0] - center[0]) < 200) \
                    or (-5 <= ang <= 5 or -180 <= ang <= -175 or 175 <= ang <= 180 and abs(center2[0] - center[0]) >= 200):
                pass
    return resultRows


# Calculate distance between two points
def calculate_distance(x1, y1, x2, y2):
    dist = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    return dist


# find coordinates where cut the line (onto two side of flashcard)
def get_cut_places(lines, dashesCoordinates):
    founded = False
    cutPlaces = []
    for line in lines:
        for box in line:
            for dash in dashesCoordinates:
                if calculate_distance(dash[0], dash[1], box[0][0][0], box[0][0][1]) < 5:
                    # cv.circle(processedImageDash, (int(box[0][0][0]), int(box[0][0][1])), 5, (0, 0, 255), -1)
                    cutPlaces.append((dash[0], line[0][1]))
                    founded = True
                    break
        if founded:
            founded = False
        else:
            cutPlaces.append((-1, line[0][1]))
    return cutPlaces


# crop rotated box from image
def crop_min_area_rect(img, rect):
    mult = 1.0
    box = cv.boxPoints(rect)
    box = np.int0(box)

    W = rect[1][0]
    H = rect[1][1]

    Xs = [i[0] for i in box]
    Ys = [i[1] for i in box]
    x1 = min(Xs)
    x2 = max(Xs)
    y1 = min(Ys)
    y2 = max(Ys)

    rotated = False
    angle = rect[2]

    if angle < -45:
        angle += 90
        rotated = True

    center = (int((x1 + x2) / 2), int((y1 + y2) / 2))
    size = (int(mult * (x2 - x1)), int(mult * (y2 - y1)))

    M = cv.getRotationMatrix2D((size[0] / 2, size[1] / 2), 0, 1.0)  # before used angle

    cropped = cv.getRectSubPix(img, size, center)
    cropped = cv.warpAffine(cropped, M, size)

    croppedW = W if not rotated else H
    croppedH = H if not rotated else W

    croppedRotated = cv.getRectSubPix(cropped, (int(croppedW * mult), int(croppedH * mult)), (size[0] / 2, size[1] / 2))
    return croppedRotated


# -------------------------------------------------------------------------------------------------------------------
# Prepare image and find contours
def threshold_image(im):
    image = imutils.resize(im, height=1000)
    # Gray scale of image
    grayImage = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    # Adaptive Threshold, blockSize = 21, C = 10
    processedImage = cv.adaptiveThreshold(grayImage, 255, cv.ADAPTIVE_THRESH_MEAN_C, cv.THRESH_BINARY, 21, 10)
    return processedImage


def find_contours(processedImage):
    # Canny algorithm (detect contours)
    processedImage = cv.Canny(processedImage, 5, 80)
    # apply some dilation and erosion to join the gaps - change iteration to detect more or less area's
    thresh = cv.dilate(processedImage, None, iterations=3)
    # Find the contours
    contours, hierarchy = cv.findContours(thresh, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    return contours, hierarchy


def process(im):
    image = imutils.resize(im, height=1000)
    load_templates()
    processedImage = threshold_image(im)
    processedImageDash = processedImage
    # find dashes
    dashesCoordinates = detect_dashes(processedImageDash, templates)
    # find contours
    contours, hierarchy = find_contours(processedImage)
    # before searching all bounding boxes is needed to filer and sort contours
    contoursFiltered = filter_boxes_by_hierarchy(contours, hierarchy)
    # find average boxes height
    averageHeight = calculate_average_box_height(contoursFiltered)
    # get final contours (with splitted boxes)
    properContours = split_biggest_contours(contoursFiltered, averageHeight)
    contoursSorted = sort_by_box_center(properContours)
    # get average distance between boxes centeres
    averageCenterDistance = get_average_center_distance(contoursSorted)
    # get bounding boxes
    boundingBoxes = get_all_bounding_boxes(contoursSorted, averageCenterDistance)
    # get coordinates where cut the line
    cut_places = get_cut_places(boundingBoxes, dashesCoordinates)

    flashcardsImg = []
    for i in range(len(boundingBoxes)):
        blank_image_front = np.zeros((100, image.shape[1]), np.uint8)
        blank_image_front.fill(255)
        blank_image_back = np.zeros((100, image.shape[1]), np.uint8)
        blank_image_back.fill(255)
        w = 0
        h = 0
        offset = 10
        # imgtocut = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
        for box in boundingBoxes[i]:
            img = crop_min_area_rect(processedImageDash, box[0])
            w = img.shape[1]
            h = img.shape[0]
            if h <= 90:
                # img = imutils.resize(img, height=100)
                if box[0][0][0] < cut_places[i][0]:
                    try:
                        blank_image_front[offset:img.shape[0] + offset,
                        int(box[0][0][0] - w/2):img.shape[1] + int(box[0][0][0] - w/2)] = img
                    except Exception as ex:
                        print(ex)
                elif box[0][0][0] > cut_places[i][0]:
                    try:
                        blank_image_back[offset:img.shape[0] + offset,
                        int(box[0][0][0] - w/2):img.shape[1] + int(box[0][0][0] - w/2)] = img
                    except Exception as ex:
                        print(ex)
        flashcardsImg.append((blank_image_front, blank_image_back))
    return flashcardsImg


# Prepare image when the edges of given image are visible
def preprocess_edges(im):
    ratio = im.shape[0] / 1000.0
    orig = im.copy()
    image = imutils.resize(im, height=1000)

    # Gray and Canny Algorithm
    grayImage = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    grayImage = cv.GaussianBlur(grayImage, (5, 5), 0)
    edgedImage = cv.Canny(grayImage, 5, 80)

    # Contours staff
    cnts = cv.findContours(edgedImage.copy(), cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    cnts = sorted(cnts, key=cv.contourArea, reverse=True)[:5]

    for c in cnts:
        peri = cv.arcLength(c, True)
        approx = cv.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) == 4:
            screenCnt = approx
            break
    warped = four_point_transform(orig, screenCnt.reshape(4, 2) * ratio)
    return warped


# Prepare image when there any noise of checker exists
def preprocess_checkered_paper(im):
    image = imutils.resize(im, height=1000)
    # Gray scale
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    # Contrast
    alpha = 1.5
    # Brightness
    beta = 100
    # Remove noise (work with brightness and contrast)
    gray = cv.convertScaleAbs(gray, alpha=alpha, beta=beta)
    thresh = cv.threshold(gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)[1]
    # Invert and apply slight Gaussian blur
    result = 255 - thresh
    result = cv.GaussianBlur(result, (1, 1), 0)
    result = cv.cvtColor(result, cv.COLOR_GRAY2RGB)
    return result
