# -*- coding: utf-8 -*-

import csv
import StringIO


def csv_read(data):
    reader = csv.DictReader(StringIO.StringIO(data.strip('\n')), delimiter=';')
    lines = []
    for row in reader:
        lines.append(row)
    return lines


def csv_write(data):
    output = StringIO.StringIO()
    writer = csv.writer(output, quoting=csv.QUOTE_NONNUMERIC)
    for d in data:
        writer.writerow(d)
    return output.getvalue()

def findRowinSavedData(saver, key, value, delimiter):
    savedData = saver.getSavedFormInputForEdit()
    for row in savedData.split('\r\n'):
        cols = dict(zip(saver.getColumnNames(), row.split(delimiter)))
        if key in cols and cols[key] == value:
            return cols

    return None