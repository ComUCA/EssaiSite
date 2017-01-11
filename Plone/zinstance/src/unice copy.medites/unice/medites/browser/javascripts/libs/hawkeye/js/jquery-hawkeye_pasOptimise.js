/* $HawkEye v1.2 || Crusader 12 || Exclusive to CodeCanyon */
String.prototype.removeWS = function() {
    return this.toString().replace(/\s/g, "")
};
String.prototype.pF = function() {
    return parseFloat(this)
};
Number.prototype.pF = function() {
    return parseFloat(this)
};
String.prototype.sP = function(e, t) {
    return this.toString().split(e)[t]
};
String.prototype.isB = function() {
    return this.toString() == "true" ? true : false
};
Boolean.prototype.isB = function() {
    return this == true ? true : false
};
(function(e) {
    var t = {
        defaults: {
            char_image: false,
            marker_image: false,
            char_up: false,
            char_down: false,
            char_right: false,
            char_left: false,
            pos: "0,0",
            opacity: "1,1",
            bg_color: "#FFFFFF,#FFFFFF",
            border_radius: "500,500",
            border_width: "0,0",
            border_color: "#FFFFFF,#FFFFFF",
            hidden: false,
            speed: "1050,0",
            effect: "linear,linear",
            marker_size: 1,
            travel: false,
            marker_speed: "500,500",
            marker_effect: "ease-in-out",
            tooltip_speed: "300,200",
            tooltip_offset: "0,0",
            panel_pos: "0,0",
            panel_speed: "500,300",
            panel_effect: "ease,ease",
            open_panel: true
        },
        init: function(n) {
            var r = t,
                i = e(this),
                s = i.find("div.HE_Marker"),
                u = s.length;
            o = e.extend({}, r.defaults, n);
            for (var a = 0; a < u; a++) {
                var f = e(s[a]),
                    r = f.data().hawkeye != undefined ? f.data().hawkeye : false;
                f.data(e.extend({}, o, !r ? {} : r));
                var l = f.data();
                f.css({
                    left: l.pos.split(",")[0].pF() + "%",
                    top: l.pos.split(",")[1].pF() + "%",
                    "background-color": l.bg_color !== false ? l.bg_color.split(",")[0] : "transparent",
                    "border-radius": l.border_radius.split(",")[0].pF() + "px",
                    "border-width": l.border_width.split(",")[0].pF() + "px",
                    "border-color": l.border_color.split(",")[0],
                    opacity: l.hidden ? 0 : l.opacity.split(",")[0].pF(),
                    cursor: l.hidden && l.hidden && !l.travel ? "default" : "pointer"
                });
                l.initiator = i;
                l.currentPos = 0;
                l.iniW = f.outerWidth(true);
                l.iniH = f.outerHeight(true);
                t.KeyFrames(f, l, a);
                f.on("click", function() {
                    var n = e(this),
                        r = e(this).parents("div.Marker_Container"),
                        i = r.find(".HE_Char"),
                        s = n.data(),
                        o = r.find("div.HE_Marker").index(n) + 1,
                        u = n.next("div").hasClass("HE_Tooltip") ? n.next("div") : false;
                    if (s.hidden && !s.travel || i.data().animating) return;
                    e("div.HE_Marker").PLY();
                    if (u) {
                        u.css("z-index", 99999);
                        i.data("currentTT", u)
                    }
                    t.closeTooltip(e(s.initiator).find(".HE_Tooltip"), s, n);
                    t.pathMover(i, s, o - 1)
                }).on("mouseenter", function() {
                    var n = e(this),
                        r = n.data(),
                        i = n.next("div").hasClass("HE_Tooltip") ? n.next("div.HE_Tooltip") : false;
                    if (i && !e(r.initiator).find(".HE_Char").data().popup) {
                        i.css("z-index", 999999);
                        t.openTooltip(n, r, i)
                    }
                }).on("mouseleave", function() {
                    var n = e(this),
                        r = n.data(),
                        i = n.next("div").hasClass("HE_Tooltip") ? n.next("div.HE_Tooltip") : false;
                    if (i) t.closeTooltip(i, r, n)
                });
                if (f.next("div").hasClass("HE_Tooltip")) {
                    var c = f.next("div");
                    if (c.next("div").hasClass("HE_Panel")) {
                        c.on("click", function() {
                            var n = e(this),
                                r = n.prev("div"),
                                i = r.data(),
                                s = n.next("div"),
                                o = e(i.initiator).find("div.HE_Marker").index(r),
                                u = e(i.initiator).find("div.HE_Char").data();
                            if (!e(i.initiator).find(".HE_Char").data().animating && u.currentIndex === o && !u.popup) t.openPanel(r, n, s, i)
                        });
                        c.next("div").on("click", function() {
                            var n = e(this),
                                r = n.prev("div"),
                                i = r.prev("div"),
                                s = i.data();
                            // t.closePanel(i, n, r, s)
                        })
                    }
                }
                if (a === 0) {
                    var h = l.marker_image !== false ? l.marker_image : l.char_image,
                        c = f.next("div").hasClass("HE_Tooltip") ? f.next("div") : false,
                        p = i.find(".HE_Char");
                    p.css({
                        left: l.pos.split(",")[0].pF() + "%",
                        top: l.pos.split(",")[1].pF() + "%",
                        "background-image": "url(" + h + ")"
                    }).data({
                        currentChar: l.char_image,
                        currentChar: h,
                        currentDir: false,
                        popup: false,
                        currentIndex: 0
                    });
                    if (c) {
                        p.data("currentTT", c);
                        t.openTooltip(f, l, c)
                    }
                }
            }
        },
        pathMover: function(n, r, i) {
            var s = n.data();
            currentStep = s.currentIndex;
            var o = e(r.initiator).find("div.HE_Marker"),
                u = o.eq(currentStep),
                a = u.data(),
                f = a.pos,
                l = a.speed;
            s.pathPoint = f.split(",");
            s.pathSpeed = l.split(",");
            if (o.length === 0 || i === currentStep) return;
            t.doAnimation(n, r, currentStep, s.pathSpeed, s.pathPoint, i)
        },
        doAnimation: function(n, r, i, s, o, u) {
            n.data("animating", true);
            r.currentPos = i;
            n.delay(s[1].pF()).animate({
                left: o[0] + "%",
                top: o[1] + "%"
            }, {
                duration: s[0].pF(),
                queue: true,
                specialEasing: {
                    left: r.effect.split(",")[0].removeWS(),
                    top: r.effect.split(",")[1].removeWS()
                },
                complete: function() {
                    var s = n.data(),
                        o = e(r.initiator).find(".HE_Marker");
                    s.currentIndex = i;
                    s.animating = false;
                    if (u !== false) {
                        if (u > i) {
                            i++
                        } else if (u < i) {
                            i--
                        } else {
                            if (r.marker_image) {
                                var a = new Image,
                                    f = r.marker_image.removeWS();
                                e(a).load(function() {
                                    n.css("background-image", "url(" + f + ")")
                                }).attr("src", f)
                            } else {
                                switch (s.currentDir) {
                                    case "up":
                                        if (r.char_up) var l = r.char_up;
                                        break;
                                    case "down":
                                        if (r.char_down) var l = r.char_down;
                                        break;
                                    case "right":
                                        if (r.char_right) var l = r.char_right;
                                        break;
                                    case "left":
                                        if (r.char_left) var l = r.char_left;
                                        break
                                }
                                if (l) {
                                    var c = l.split(",")[1].removeWS();
                                    n.css("background-image", "url(" + c + ")").data("currentChar", c)
                                }
                            }
                            var h = o.eq(i),
                                p = h.next("div").hasClass("HE_Tooltip") ? h.next("div") : false,
                                d = p && p.next("div").hasClass("HE_Panel") ? p.next("div") : false;
                            if (r.open_panel && d) t.openPanel(h, p, d, r);
                            return
                        }
                        var v = s.pathPoint[0],
                            m = s.pathPoint[1]
                    }
                    var h = o.eq(i),
                        g = h.data(),
                        y = g.pos,
                        b = g.speed;
                    s.pathPoint = y.split(",");
                    s.pathSpeed = b.split(",");
                    if (u !== false) {
                        var w = s.pathPoint[0],
                            E = s.pathPoint[1];
                        if (w !== v || E !== m) {
                            var S = Math.max(v, w) - Math.min(v, w),
                                x = Math.max(m, E) - Math.min(m, E),
                                T = Math.max(S, x),
                                N = new Image;
                            if (T === S) {
                                if (w > v && r.char_right) {
                                    var C = r.char_right.split(",")[0].removeWS(),
                                        k = "right"
                                } else if (w < v && r.char_left) {
                                    var C = r.char_left.split(",")[0].removeWS(),
                                        k = "left"
                                }
                            } else if (T === x) {
                                if (E > m && r.char_down) {
                                    var C = r.char_down.split(",")[0].removeWS(),
                                        k = "down"
                                } else if (E < m && r.char_up) {
                                    var C = r.char_up.split(",")[0].removeWS(),
                                        k = "up"
                                }
                            }
                            e(N).load(function() {
                                n.css("background-image", "url(" + C + ")").data({
                                    currentChar: C,
                                    currentDir: k
                                })
                            }).attr("src", C)
                        } else {
                            s.currentDir = false
                        }
                    }
                    t.doAnimation(n, r, i, s.pathSpeed, s.pathPoint, u)
                }
            })
        },
        openTooltip: function(t, n, r) {
            var i = n.pos.split(",")[0].pF(),
                s = n.pos.split(",")[1].pF(),
                o = i + n.tooltip_offset.split(",")[0].pF(),
                u = s + n.tooltip_offset.split(",")[1].pF();
            t.PSE();
            r.css({
                visibility: "visible",
                top: u + "%",
                left: o + "%"
            }).Ani({
                opacity: 1
            }, n.tooltip_speed.split(",")[0].pF(), "ease", function() {
                e(this).css("visibility", "visible")
            })
        },
        closeTooltip: function(t, n, r) {
            t.not(e(n.initiator).find(".HE_Char").data().currentTT).css("z-index", 9999).Ani({
                opacity: 0
            }, n.tooltip_speed.split(",")[1].pF(), "ease", function() {
                e(this).css("visibility", "hidden");
                r.PLY()
            })
        },
        openPanel: function(t, n, r, i) {
            e(i.initiator).find(".HE_Char").data("popup", true);
            e(i.initiator).find("div.HE_Marker").not(t).add(n).css("visibility", "hidden");
            r.css({
                visibility: "visible",
                left: i.panel_pos.split(",")[0].pF() + "%",
                top: i.panel_pos.split(",")[1].pF() + "%"
            }).Ani({
                opacity: 1
            }, i.panel_speed.split(",")[0].pF(), i.panel_effect.split(",")[0].removeWS(), null)
        },
        closePanel: function(t, n, r, i) {
            e(i.initiator).find("div.HE_Char").data("popup", false);
            e(i.initiator).find("div.HE_Marker").not(t).add(r).css("visibility", "visible");
            n.Ani({
                opacity: 0
            }, i.panel_speed.split(",")[1].pF(), i.panel_effect.split(",")[1].removeWS(), function() {
                n[0].style.visibility = "hidden"
            })
        },
        KeyFrames: function(t, n, r) {
            var i = false,
                s = n.initiator,
                o = n.marker_size.pF(),
                u = n.opacity.split(",")[0].pF(),
                a = n.opacity.split(",")[1].pF(),
                f = n.marker_speed.split(",")[0].pF() / 1e3,
                l = n.marker_speed.split(",")[1].pF() / 1e3,
                c = n.bg_color !== false ? n.bg_color.split(",")[0] : "transparent",
                h = n.bg_color !== false ? n.bg_color.split(",")[1] : "transparent",
                p = n.border_radius.split(",")[0].pF(),
                d = n.border_radius.split(",")[1].pF(),
                v = n.border_width.split(",")[0].pF(),
                m = n.border_width.split(",")[1].pF(),
                g = n.border_color.split(",")[0],
                y = n.border_color.split(",")[1],
                b = "",
                w = "",
                E = {},
                i = "KEY_" + s.attr("id") + "_" + r + " " + f + "s " + l + "s infinite alternate forwards " + n.marker_effect;
            if (!n.hidden && u !== a) {
                b += "opacity:" + u + ";";
                w += "opacity:" + a + ";"
            }
            if (n.iniW !== n.iniW * o) {
                b += "width:" + n.iniW + "px;";
                w += "width:" + n.iniW * n.marker_z + "px;"
            }
            if (n.iniH !== n.iniH * o) {
                b += "height:" + n.iniH + "px;";
                w += "height:" + n.iniH * n.marker_z + "px;"
            }
            if (p !== d) {
                b += "border-radius:" + p + "px;";
                w += "border-radius:" + d + "px;"
            }
            if (v !== m) {
                b += "border-width:" + v + "px;";
                w += "border-width:" + m + "px;"
            }
            if (g !== y) {
                b += "border-color:" + g + ";";
                w += "border-color:" + y + ";"
            }
            if (c !== h) {
                b += "background-color:" + c + ";";
                w += "background-color:" + h + ";"
            }
            if (!e("#HE_KEY_" + s.attr("id") + "_" + r).length) e("head").append('<style id="HE_KEY_' + s.attr("id") + "_" + r + '">@' + e.support.HE.PRE + "keyframes KEY_" + s.attr("id") + "_" + r + " {from {" + b + "}to{" + w + "}}</style>");
            if (i) {
                E[e.support.HE.PRE + "animation"] = i;
                t.css(E).PLY()
            }
        },
        H2R: function(e, n) {
            return {
                r: parseInt(t.tHx(e).substring(0, 2), 16),
                g: parseInt(t.tHx(e).substring(2, 4), 16),
                b: parseInt(t.tHx(e).substring(4, 6), 16),
                a: n
            }
        },
        tHx: function(e) {
            return e.charAt(0) == "#" ? e.substring(1, 7) : e
        }
    };
    e.fn.extend({
        Ani: function(t, n, r, i) {
            var s = e(this),
                o = "";
            if (e.support.HE.TRNS) {
                for (var u in t) {
                    if (t.hasOwnProperty(u)) o += "" + u + " " + n / 1e3 + "s " + r + " 0s,"
                }
                t.transition = o.replace(/,+$/, "");
                s.css(t).one(e.support.HE.TRANSEND, function(t) {
                    s.off(e.support.HE.TRANSEND);
                    if (typeof i === "function") i.apply(this, arguments);
                    t.stopPropagation()
                })
            } else {
                s.stop(true, false).animate(t, {
                    duration: n,
                    queue: false,
                    complete: function() {
                        if (typeof i === "function") i.apply(this, arguments)
                    }
                })
            }
            return s
        },
        PLY: function() {
            var t = e.support.HE.PRE + "animation-play-state";
            if (e.support.HE.ANI) return this.css(t, "running");
            return this
        },
        PSE: function() {
            var t = e.support.HE.PRE + "animation-play-state";
            if (e.support.HE.ANI) return this.css(t, "paused");
            return this
        }
    });
    e.fn.HawkEye = function(n, r) {
        if (t[n]) {
            return t[n].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof n === "object" || !n) {
            return t.init.apply(this, arguments)
        } else {
            e.error("Method " + n + " does not exist")
        }
    }
})(jQuery);
(function() {
    var e = document,
        t = e.body || e.documentElement,
        n = t.style,
        r = navigator.userAgent.toLowerCase(),
        i = false,
        s = undefined;
    $.support.HE = {
        ANI: n.animation !== s || n.WebkitAnimation !== s || n.MozAnimation !== s || n.msAnimation !== s || n.OAnimation !== s ? true : false,
        TRNS: n.transition !== s || n.WebkitTransition !== s || n.MozTransition !== s || n.msTransition !== s || n.OTransition !== s ? true : false,
        bgSize: n.backgroundSize !== s || n.WebkitBackgroundSize !== s || n.MozBackgroundSize !== s || n.msBackgroundSize !== s || n.OBackgroundSize !== s ? true : false,
        PRE: function() {
            if (/webkit/.test(r)) return "-webkit-";
            if (/mozilla/.test(r) && !/(compatible|webkit)/.test(r)) return "-moz-";
            if (/msie/.test(r) && !/opera/.test(r)) return "-ms-";
            if (/opera/.test(r)) return "-o-";
            return
        }(),
        isTablet: r.match(/iPad|Android|Kindle|NOOK|tablet/i) !== null,
        isMobile: function(e) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) i = true;
            return i
        }(r || navigator.vendor || window.opera)
    };
    $.support.HE.TRANSEND = function() {
        switch ($.support.HE.PRE) {
            case "-webkit-":
                return "webkitTransitionEnd";
                break;
            case "-o-":
                return "oTransitionEnd OTransitionEnd";
                break;
            case "-ms-":
                return "MSTransitionEnd transitionend";
                break;
            default:
                return "transitionend";
                break
        }
    }()
})()