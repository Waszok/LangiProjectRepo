import struct
from chardet import detect
from PIL import Image
import base64
from io import BytesIO


# Get encoding type from file
def get_encoding_type(file):
    with open(file, 'rb') as f:
        rawdata = f.read()
    return detect(rawdata)['encoding']


# Check whether the file is .docx format
def is_doc(buf):
    fingerprint = []
    if len(buf) > 8:
        for i in range(8):
            byte = struct.unpack_from("<B", buf, i)[0]
            fingerprint.append("{0:x}".format(byte)) 
    if ' '.join(fingerprint).upper() == "50 4B 3 4 14 0 6 0":
        return True
    return False


# Convert from numpy array to image
def to_image(numpy_img):
    img = Image.fromarray(numpy_img, 'L')
    return img


# Get base64 URI from image
def to_data_uri(pil_img):
    data = BytesIO()
    pil_img.save(data, "PNG")
    data64 = base64.b64encode(data.getvalue())
    return u'data:img/jpeg;base64,'+data64.decode('utf-8') 