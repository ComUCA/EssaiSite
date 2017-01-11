# -*- coding: utf-8 -*-

from collective.contentleadimage.config import IMAGE_FIELD_NAME


def setcontentleadimage(obj, image):
    if obj and image:
        field = obj.getField(IMAGE_FIELD_NAME)
        print '-------------------------------'
        print obj
        print field
        print getattr(image, 'content_type')
        # field.set(obj, image.__dict__['data'], mimetype=image.__dict__['content_type'])
        field.set(obj, getattr(image, 'data'), mimetype=getattr(image, 'content_type'))


def setimage(obj, image, key):
    if obj and image:
        setattr(obj, 'background_image', 'bleu_vert')
        # field = obj.getField(key)
        # print '-------------------------------'
        # print obj
        # print key
        # print field
        # print getattr(obj, key)
        # print obj.contentleadimage
        # field.set(obj, getattr(image, 'data'), mimetype=getattr(image, 'content_type'))
