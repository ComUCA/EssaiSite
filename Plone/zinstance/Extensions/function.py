# -*- coding: utf-8 -*-
import datetime


def determinedDuration(debut, fin):
    dayDebut = debut[8] + debut[9]
    monthDebut = debut[5] + debut[6]
    yearDebut = debut[0] + debut[1] + debut[2] + debut[3]
    dayFin = fin[8] + fin[9]
    monthFin = fin[5] + fin[6]
    yearFin = fin[0] + fin[1] + fin[2] + fin[3]
    d1 = datetime.date(int(yearDebut), int(monthDebut), int(dayDebut))
    d2 = datetime.date(int(yearFin), int(monthFin), int(dayFin))
    d = d2 - d1
    output = []
    return {"lib": determinedPrice(d.days, output), "jour": d.days}


def determinedKey(duration):
    if duration >= 30:
        return "mois"
    if duration < 30 and duration >= 15:
        return "quinzaine"
    if duration < 15 and duration >= 7:
        return "semaine"
    if duration < 7:
        return "nuit"


def determinedPrice(duration, output):
    if duration > 0:
        libDuration = determinedKey(duration)
    if libDuration == "mois":
        output.append(libDuration)
        return output
    if libDuration == "quinzaine":
        output.append(libDuration)
        return determinedPrice(duration - 15, output)
    if libDuration == "semaine":
        output.append(libDuration)
        return determinedPrice(duration - 7, output)
    if libDuration == "nuit":
        output.append(libDuration)
        return determinedPrice(duration - 1, output)
    elif duration == 0:
        return output
    else:
        return None


if __name__ == "__main__":
    c = determinedDuration("2016/09/01", "2016/09/30")
    print c
