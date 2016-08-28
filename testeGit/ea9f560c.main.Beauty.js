/*
     FILE ARCHIVED ON 3:26:09 Fev 9, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:51:09 Ago 25, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
(function() {
    var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L = [].indexOf || function(e) {
        for (var t = 0, n = this.length; t < n; t++)
            if (t in this && this[t] === e) return t;
        return -1
    };
    r = function(e, t) {
            for (t = e = ""; e++ < 36; t += e * 51 & 52 ? (e ^ 15 ? 8 ^ Math.random() * (e ^ 20 ? 16 : 4) : 4).toString(16) : "-");
            return t
        }, (k = Date.prototype).toISOString || (k.toISOString = function(e) {
            return e = this, (1e3 - ~e.getUTCMonth() * 10 + e.toUTCString() + 1e3 + e / 1).replace(/1(..).*?(\d\d)\D+(\d+).(\S+).*(...)/, "$3-$1-$2T$4.$5Z")
        }), u = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], a = ["mon", "tue", "wed", "thu", "fri", "sat"], m = ["Design Lecture", "Laboratory", "Lecture", "Packaged Lecture", "Packaged Tutorial", "Recitation", "Sectional Teaching", "Seminar-Style Module Class", "Tutorial", "Tutorial Type 2", "Tutorial Type 3", "Workshop"], C = ["LEC", "LAB", "LEC", "LEC", "TUT", "REC", "SEC", "SEM", "TUT", "TUT2", "TUT3", "WKSP"], y = {}, p = function(e) {
            return y[e.split(" ")[0]]
        }, b = modInfoTT.code.length, c = [],
        function() {
            var e, t, n, r, i, s, o, u, a;
            a = modInfoTT.code;
            for (s = o = 0, u = a.length; o < u; s = ++o) t = a[s], y[t.split(" ")[0]] = s;
            return c = function() {
                var t, s, o, u;
                o = modInfoTT.exam, u = [];
                for (t = 0, s = o.length; t < s; t++) r = o[t], r ? (n = new Date(r + 288e5), i = n.getUTCHours(), i < 12 ? e = "AM" : (e = "PM", i -= 12), i || (i = 12), u.push(("0" + n.getUTCDate()).slice(-2) + "-" + ("0" + (n.getUTCMonth() + 1)).slice(-2) + ("-" + n.getUTCFullYear() + " " + i + ":") + ("0" + n.getUTCMinutes()).slice(-2) + (" " + e))) : u.push(void 0);
                return u
            }()
        }(), T = function(e) {
            var t, n;
            return localStorage.setItem("select2_2013/2014_sem2_v1", e.join(",")), localStorage.setItem("hash_2013/2014_sem2_v1", location.hash = n = E()), s ? $("#clash").show() : $("#clash").hide(), (t = e.length) ? (t === 1 ? $("#select2-header").text("Selected 1 Module ") : $("#select2-header").text("Selected " + t + " Modules "), $("#clear-all").show()) : ($("#select2-header").text("Select Modules for Timetable "), $("#clear-all").hide()), $("#short-url").val("").blur()
        }, $.ajaxSetup({
            cache: !0
        }), $.fn.qtip.defaults.position.my = "bottom center", $.fn.qtip.defaults.position.at = "top center", $.fn.qtip.defaults.position.viewport = !0, $.fn.qtip.defaults.show.solo = !0, $.fn.qtip.defaults.style.classes = "ui-tooltip-bootstrap", w = x = void 0, $(function() {
            var r, s, o, u, a, f, l, c, d, m, y, E, C, k, L, A, O, M, _, D, P, H;
            d = !1, $('a[href="#module-finder"]').on("show", function() {
                return d || ($("#overlay").show(), $("#loading").show(), $.getScript(modInfoMFPath.slice(13, -11)).done(function() {
                    return $.getScript(e3Path.slice(13, -11)).done(function() {
                        return d = !0
                    })
                })), $("#selected-mods").prependTo("#module-finder .span3")
            }), $('a[href="#timetable-builder"]').on("show", function() {
                return $("#selected-mods").appendTo("#show-hide-selected-mods-container")
            }), $(".container-fluid").show(), a = function() {
                var e, t, n, r;
                n = $("#mon > tr:last-child > td"), r = [];
                for (L = e = 0, t = n.length; e < t; L = ++e) m = n[L], L % 2 || r.push($(m).offset().left);
                return r
            }(), t.TR = $("#mon > tr:last-child").clone(), k = location.href.split("#")[1] || localStorage.getItem("hash_2013/2014_sem2_v1"), o = 50, (x = $("#select2")).select2({
                width: "100%",
                placeholder: "Type code/title to add mods",
                multiple: !0,
                initSelection: function(e, t) {
                    var n, r;
                    return n = modInfoTT.title, t(function() {
                        var t, i, s, o;
                        s = e.val().split(","), o = [];
                        for (t = 0, i = s.length; t < i; t++) r = s[t], (L = p(r)) != null && o.push({
                            id: r,
                            text: "" + r + " " + n[L]
                        });
                        return o
                    }()), T(e.select2("val"))
                },
                query: function(e) {
                    var t, n, r, i, s, u, a, f, l;
                    t = modInfoTT.code, a = modInfoTT.title;
                    if (e.term.length === 0) return u = (f = e.context) != null ? f : 0, n = u + o, i = {
                        context: n,
                        more: n < b ? !0 : void 0,
                        results: function() {
                            var e, r;
                            r = [];
                            for (L = e = u; u <= n ? e < n : e > n; L = u <= n ? ++e : --e) r.push({
                                id: t[L],
                                text: "" + t[L] + " " + a[L]
                            });
                            return r
                        }()
                    }, e.callback(i);
                    i = {
                        results: [],
                        more: !0
                    }, s = i.results, r = new RegExp(e.term, "i"), L = (l = e.context) != null ? l : 0;
                    while (L < b) {
                        if (t[L].search(r) !== -1 && s.push({
                            id: t[L],
                            text: "" + t[L] + " " + a[L]
                        }) === o) {
                            i.context = ++L, e.callback(i);
                            return
                        }
                        L++
                    }
                    L -= b;
                    while (L < b) {
                        if (a[L].search(r) !== -1 && s.push({
                            id: t[L],
                            text: "" + t[L] + " " + a[L]
                        }) === o) {
                            i.context = ++L + b, e.callback(i);
                            return
                        }
                        L++
                    }
                    i.more = !1, e.callback(i)
                }
            }).on("change", function(e) {
                return e.added ? i(e.added.id) : e.removed && S(e.removed.id), T(x.select2("val"))
            }), x.select2("container").find("ul.select2-choices").sortable({
                containment: "parent",
                start: function() {
                    return x.select2("onSortStart")
                },
                update: function() {
                    return x.select2("onSortEnd")
                }
            }), $("#clear-all").click(function() {
                var e;
                if (confirm("Are you sure you want to clear all selected modules?")) {
                    for (e in N) S(e);
                    x.select2("val", ""), T([])
                }
                return !1
            });
            if (k && k.indexOf("=") !== -1) g(k);
            else if (O = localStorage.getItem("select2_2013/2014_sem2_v1")) {
                H = s = O.split(",");
                for (D = 0, P = H.length; D < P; D++) r = H[D], i(r);
                x.select2("val", s)
            }
            $("#overlay").fadeOut(), $("#loading").fadeOut(), $(window).on("hashchange", function() {
                if (!w) return;
                k = location.href.split("#")[1];
                if (k.indexOf("=") === -1) return location.hash = w;
                if (k !== w) return g(w = k)
            }), A = void 0, $("#timetable").mousemove(function(e) {
                var t, n, r, i;
                for (L = r = 0, i = a.length; r < i; L = ++r) {
                    n = a[L];
                    if (e.pageX < n) break
                }
                t = $("colgroup:nth-child(" + (L + 1) + ")");
                if (t.is(A)) return;
                return A != null && A.removeAttr("class"), t.addClass("hover"), A = t
            }), $("#timetable").mouseleave(function() {
                if (A) return A.removeAttr("class"), A = void 0
            }), (f = $("#copy-to-clipboard")).qtip({
                content: "Copy to Clipboard",
                events: {
                    hidden: function() {
                        return f.qtip("option", "content.text", "Copy to Clipboard")
                    }
                }
            }), u = new ZeroClipboard.Client, u.glue("copy-to-clipboard", "share-container"), u.addEventListener("onMouseOver", function() {
                return C(function(e) {
                    return u.setText(e)
                }), f.qtip("show")
            }), u.addEventListener("onMouseOut", function() {
                return f.qtip("hide")
            }), u.addEventListener("onComplete", function() {
                return f.qtip("option", "content.text", "Copied!")
            }), M = $("#short-url"), C = function(e) {
                var t;
                return (t = M.val()) ? typeof e == "function" ? e(t) : void 0 : $.getJSON("/web/20140209032609/http://origin.nusmods.com/short_url.php?callback=?", {
                    url: location.href
                }, function(n) {
                    if (t = n.shorturl) return M.val(t), typeof e == "function" ? e(t) : void 0
                })
            }, M.focus(function() {
                return C()
            }), $("#share-email").qtip({
                content: "Share via Email"
            }), $("#share-facebook").qtip({
                content: "Share via Facebook"
            }), $("#share-twitter").qtip({
                content: "Share via Twitter"
            }), $("#share-email").click(function() {
                return C(function(e) {
                    return window.location.href = "mailto:?subject=My%20NUSMods.com%20Timetable&" + ("body=" + encodeURIComponent(e))
                })
            }), $("#share-facebook").click(function() {
                return C(function(e) {
                    return window.open("/web/20140209032609/http://www.facebook.com/sharer.php?u=" + encodeURIComponent(e, "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=640,height=350"))
                })
            }), $("#share-twitter").click(function() {
                return C(function(e) {
                    return window.open("/web/20140209032609/http://twitter.com/intent/tweet?url=" + encodeURIComponent(e, "", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420"))
                })
            }), $("#show-hide button:last-child").qtip({
                content: "Only shown if Odd / Even / Irregular",
                position: {
                    my: "bottom right"
                }
            }), $("#show-hide").on("click", ".btn", function() {
                return $("#timetable-wrapper").toggleClass("hide-" + $(this).text().toLowerCase())
            }), _ = function() {
                return h.length ? $("#export-modal").modal("show") : (alert("No modules to export!"), !1)
            }, l = "download" in document.createElement("a"), y = location.protocol === "file:", E = swfobject.hasFlashPlayerVersion("10"), $("#export-modal").on("show", function() {
                var t;
                t = encodeURIComponent(e()), $("#jpg-html").val(t), $("#pdf-html").val(t);
                if (l || y || !E) return $("#dl-html").attr("href", "data:text/html," + t), $("#dl-ical").attr("href", "data:text/calendar," + encodeURIComponent(v())), $("#dl-xls").attr("href", "data:application/vnd.ms-excel," + encodeURIComponent(n()))
            }), $("#export-timetable-action").click(_), $("#jpg-file").click(function() {
                return h.length ? ($("#jpg-html").val(encodeURIComponent(e())), document.forms["jpg-form"].submit()) : (alert("No modules to export!"), !1)
            }), $("#pdf-file").click(function() {
                return h.length ? ($("#pdf-html").val(encodeURIComponent(e())), document.forms["pdf-form"].submit()) : (alert("No modules to export!"), !1)
            }), l ? ($("#html-file").click(function() {
                return h.length ? $(this).attr("href", "data:text/html," + encodeURIComponent(e())) : (alert("No modules to export!"), !1)
            }), $("#ical-file").click(function() {
                return h.length ? $(this).attr("href", "data:text/calendar," + encodeURIComponent(v())) : (alert("No modules to export!"), !1)
            }), $("#xls-file").click(function() {
                return h.length ? $(this).attr("href", "data:application/vnd.ms-excel," + encodeURIComponent(n())) : (alert("No modules to export!"), !1)
            })) : ($("#html-file").click(_), $("#ical-file").click(_), $("#xls-file").click(_));
            if (!(l || y || !E)) return c = {
                downloadImage: "images/988945bc.download.png",
                height: 30,
                width: 111
            }, $("#dl-html-container").downloadify($.extend({}, c, {
                data: e,
                filename: "My NUSMods.com Timetable.html"
            })), $("#dl-ical-container").downloadify($.extend({}, c, {
                data: v,
                filename: "My NUSMods.com Timetable.ics"
            })), $("#dl-xls-container").downloadify($.extend({}, c, {
                data: n,
                filename: "My NUSMods.com Timetable.xls"
            }));
            if (!l) return y || $("#afp-or").show(), $("#save-link-as-instructions").show()
        }), e = function() {
            return '<!DOCTYPE html><title>My NUSMods.com Timetable</title><style>#timetable-wrapper{font-size:11px;font-weight:700;line-height:13px;width:1245px}#timetable{margin:0 0 15px -20px;max-width:none;table-layout:fixed;width:1235px}#timetable th{background-color:#fff}#times div{margin-right:-13px;text-align:right}.day{border-bottom:1px solid  color: #FFF;border-top:1px solid  color: #FFF}.day th{border-bottom:1px solid #fff;border-top:1px solid #fff}.day th div{line-height:15px;margin-right:-20px}.day td{height:34px;padding:1px 0 0}.m00{border-left:1px solid  color: #FFF}.m30{border-right:1px solid  color: #FFF}.lesson{border:2px solid;overflow:hidden;padding:1px 3px 3px}.color0{background-color:#f7977a;border-color:#9c2b09;color:#6c1e06}.color1{background-color:#f9ad81;border-color:#a64208;color:#752f06}.color2{background-color:#fdc68a;border-color:#b86103;color:#864702}.color3{background-color:#fff79a;border-color:#cdbd00;color:#9a8e00}.color4{background-color:#c4df9b;border-color:#60842a;color:#445d1e}.color5{background-color:#a2d39c;border-color:#397132;color:#274e22}.color6{background-color:#82ca9d;border-color:#265a3a;color:#173623}.color7{background-color:#7bcdc8;border-color:#225a57;color:#143533}.color8{background-color:#6ecff6;border-color:#09698f;color:#06465f}.color9{background-color:#7ea7d8;border-color:#20426a;color:#142943}.color10{background-color:#8493ca;border-color:#27325b;color:#181f37}.color11{background-color:#8882be;border-color:#2b284c;color:#18162b}.color12{background-color:#a187be;border-color:#3c2b4e;color:#22192d}.color13{background-color:#bc8dbf;border-color:#502e52;color:#301c31}.color14{background-color:#f49ac2;border-color:#af1358;color:#810e41}.color15{background-color:#f6989d;border-color:#b21018;color:#840b12}.hide-code .code,.hide-group .group,.hide-room .room,.hide-title .title,.hide-week .week{display:none}table{border-collapse:collapse;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}</style><div class="' + $("#timetable-wrapper").attr("class") + '" id="timetable-wrapper">' + $("#timetable-wrapper").html() + "</div>"
        }, f = function(e) {
            return e < 7 ? e - 1 : e
        }, d = function(e) {
            var t;
            return t = new Date(e.getTime()), t.setUTCHours(t.getUTCHours()), t.toISOString().slice(0, 19).replace(/\W/g, "") + "Z"
        }, v = function() {
            var e, t, n, i, s, o, u, a, l, c, p, v, m, g, y, b, w, E, S, x, T, N, C, k, A;
            v = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:NUSMods.com"];
            for (b = 0, x = h.length; b < x; b++) i = h[b], i.unixTime && (v = v.concat(["BEGIN:VEVENT", "UID:" + r() + "@nusmods.com", "DTSTAMP:" + d(new Date), "SUMMARY:" + i.code.split(" ")[0] + " Exam", "DESCRIPTION:" + i.title, "DTSTART:" + d(new Date(i.unixTime)), "DURATION:PT2H", "URL:/web/20140209032609/http://www.nus.edu.sg/registrar/event/examschedule-sem2.html", "END:VEVENT"]));
            C = $("td > .lesson");
            for (w = 0, T = C.length; w < T; w++) {
                e = C[w], o = $(e).data("lesson"), v = v.concat(["BEGIN:VEVENT", "UID:" + r() + "@nusmods.com", "DTSTAMP:" + d(new Date), "SUMMARY:" + o.shortCode + " " + o.typeName, "DESCRIPTION:" + o.title + "\\n" + o.typeName + " Group " + o.group, "LOCATION:" + o.room, "URL:/web/20140209032609/https://aces01.nus.edu.sg/cors/jsp/report/ModuleDetailedInfo.jsp" + ("?acad_y=2013/2014&sem_c=2&mod_c=" + o.shortCode)]), l = new Date(Date.UTC(2014, 0, 13, +o.start.slice(0, 2) - 8, o.start.slice(2))), l.setUTCDate(l.getUTCDate() + o.day), a = new Date(l.getTime()), a.setUTCDate(a.getUTCDate() + 42);
                if (typeof(m = o.week) == "number") {
                    v.push("RRULE:FREQ=WEEKLY;COUNT=14"), (o.isTut || m === 2) && v.push("EXDATE:" + d(l)), o.isTut && m !== 1 && (n = new Date(l.getTime()), n.setUTCDate(n.getUTCDate() + 7), v.push("EXDATE:" + d(n)));
                    if (m)
                        for (s = E = k = m + 1; E <= 13; s = E += 2) n = new Date(l.getTime()), n.setUTCDate(n.getUTCDate() + f(s) * 7), v.push("EXDATE:" + d(n))
                } else {
                    g = m.split(/[-,]/), c = g[0], l.setUTCDate(l.getUTCDate() + f(g[0]) * 7);
                    switch (g.length) {
                        case 1:
                            v.push("RRULE:FREQ=WEEKLY;COUNT=1");
                            break;
                        case 2:
                            m.indexOf(",") !== -1 ? v.push("RRULE:FREQ=WEEKLY;COUNT=2;INTERVAL=" + (f(g[1]) - f(g[0]))) : v.push("RRULE:FREQ=WEEKLY;COUNT=" + (g[1] - g[0] + 1));
                            break;
                        default:
                            v.push("RRULE:FREQ=WEEKLY;COUNT=" + (g[g.length - 1] - g[0] + 1)), A = m.split("-");
                            for (S = 0, N = A.length; S < N; S++) {
                                y = A[S], g = function() {
                                    var e, t, n, r;
                                    n = y.split(","), r = [];
                                    for (t = 0, e = n.length; t < e; t++) p = n[t], r.push(+p);
                                    return r
                                }();
                                if (g.length > 1) {
                                    s = g[0] + 1;
                                    while (s < g[g.length - 1]) L.call(g, s) < 0 && (n = new Date(l.getTime()), n.setUTCDate(n.getUTCDate() + (f(s) - f(c)) * 7), v.push("EXDATE:" + d(n))), s++
                                }
                            }
                    }
                }
                t = new Date(l.getTime()), t.setUTCHours(t.getUTCHours() + o.duration / 2), v = v.concat(["DTSTART:" + d(l), "DTEND:" + d(t), "EXDATE:" + d(a), "END:VEVENT"])
            }
            v.push("END:VCALENDAR"), s = 0;
            while (s < v.length) u = v[s], u.length > 75 && (v[s] = u.slice(0, 76), v.splice(s + 1, 0, " " + u.slice(76))), s++;
            return v.join("\r\n")
        }, n = function() {
            var e, t, n, r, i, s, o, f, l, c, h, p, d, v, m, g, y;
            f = '<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Default"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/></Style><Style ss:ID="b"><Font ss:FontName="Calibri" ss:Size="12" ss:Bold="1"/><NumberFormat ss:Format="0000"/></Style></Styles><Worksheet ss:Name="My NUSMods.com Timetable"><Table ss:DefaultColumnWidth="35"><Column ss:Width="65"/><Row><Cell ss:Index="2" ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">800</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">900</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1000</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1100</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1200</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1300</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1400</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1500</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1600</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1700</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1800</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">1900</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">2000</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">2100</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">2200</Data></Cell><Cell ss:MergeAcross="1" ss:StyleID="b"><Data ss:Type="Number">2300</Data></Cell></Row>';
            for (n = l = 0, d = a.length; l < d; n = ++l) {
                e = a[n], o = $("#" + e + " > tr");
                for (r = c = g = o.length - 1; c >= 1; r = c += -1) s = o[r], $(s).find(".lesson").length || o.splice(r, 1);
                for (r = h = 0, v = o.length; h < v; r = ++h) {
                    s = o[r], f += '<Row ss:Height="60">', r || (f += "<Cell ", o.length > 1 && (f += 'ss:MergeDown="' + (o.length - 1) + '" '), f += 'ss:StyleID="b"><Data ss:Type="String">' + u[n] + "</Data></Cell>"), y = $(s).find(".lesson");
                    for (p = 0, m = y.length; p < m; p++) t = y[p], i = $(t).data("lesson"), f += '<Cell ss:Index="' + (Math.round(i.start / 50) - 14), i.duration > 1 && (f += '" ss:MergeAcross="' + (i.duration - 1)), f += '"><Data ss:Type="String">' + i.shortCode + "&#13;" + C[i.type] + " " + i.group + "&#13;" + i.room, i.week && (f += "&#13;" + i.weekStr), f += "</Data></Cell>";
                    f += "</Row>"
                }
            }
            return f + "</Table></Worksheet></Workbook>"
        }, l = function(e) {
            var t;
            if (!e || e === "No Exam") return;
            return t = +e[11], t = t > 8 ? 0 : t < 5 ? 1 : 2, e.slice(3, 5) + e.slice(0, 2) + t
        }, o = [], N = {}, h = [], s = 0, i = function(e, n) {
            var r, i, u, a, f, d, v, m, g, y, b, w, E, S, x, T, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q;
            n == null && (n = !0);
            if (e in N || (x = p(e)) == null) return;
            S = N[e] = {}, o.length || (o = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]), i = o.splice(Math.floor(Math.random() * o.length), 1)[0], A = modInfoTT.title[x], L = c[x] || "No Exam", _ = modInfoTT.exam[x], k = $("#exam-timetable > tbody"), g = l(L) || e;
            for (d = D = 0, B = h.length; D < B; d = ++D) {
                u = h[d];
                if (g <= u.key) {
                    if (g === u.key) {
                        r = d;
                        if (e > u.code) continue
                    }
                    break
                }
            }
            // CHANGES CHANGES 
            var href =  '<a href="URL">NAME</a>';
            href = href.replace("URL", "https://fenix.tecnico.ulisboa.pt/disciplinas/"+e+"/2016-2017/1-semestre");
            href = href.replace("NAME", e);
            
            O = $("<tr class='color" + i + "'><td>" + href + "<td>" + A + "<td>" + L + "</tr>"), r != null && (O.addClass("clash"), k.children().eq(r).addClass("clash"), s++), d === h.length ? k.append(O) : k.children().eq(d).before(O), h.splice(d, 0, {
                code: e,
                title: A,
                time: L,
                key: g,
                tr: O,
                unixTime: _
            }), I = ["lectures", "tutorials"];
            for (P = 0, j = I.length; P < j; P++) {
                y = I[P];
                if (!(E = modInfoTT[y][x])) continue;
                m = y === "tutorials";
                for (M in E) {
                    C = S[M] = {}, f = 0, v = !1, d = 0;
                    for (a in E[M])
                        if (d++) {
                            v = !0;
                            break
                        }
                    for (a in E[M]) {
                        T = C[a] = [], q = E[M][a];
                        for (H = 0, F = q.length; H < F; H++) w = q[H], b = new t(w, {
                            code: e,
                            color: i,
                            group: a,
                            isDraggable: v,
                            isTut: m,
                            modIndex: x,
                            sameGroup: T,
                            sameType: C,
                            title: A,
                            type: M
                        }), T.push(b), n && !f && b.attach();
                        f++
                    }
                }
            }
            return S
        }, S = function(e) {
            var t, n, r, i, o, u, a, f, d, v, m, g, y, b, w, E, S;
            if (!(v = N[e])) return;
            a = l(c[p(e)]), n = function() {
                var e, t, n;
                n = [];
                for (e = 0, t = h.length; e < t; e++) r = h[e], r.key === a && n.push(r);
                return n
            }();
            if (n.length > 1) {
                if (n.length === 2)
                    for (g = 0, w = n.length; g < w; g++) t = n[g], t.tr.removeClass("clash");
                s--
            }
            for (u = y = 0, E = h.length; y < E; u = ++y) {
                r = h[u];
                if (e === r.code) {
                    r.tr.remove(), h.splice(u, 1);
                    break
                }
            }
            for (m in v) {
                o = v[m];
                for (i in o) {
                    d = o[i];
                    for (b = 0, S = d.length; b < S; b++) f = d[b], f.detach(!0)
                }
            }
            return delete N[e]
        }, t = function() {
            function t(t, n) {
                var r = this;
                this.week = t[0], this.day = t[1], this.start = t[2], this.end = t[3], this.room = t[4], $.extend(this, n), this.duration = Math.round(((this.end === "0000" || this.end === "2359" ? "2400" : this.end) - this.start) / 50), this.room = modInfoTT.rooms[this.room], this.typeName = m[this.type], this.weekStr = typeof this.week == "number" ? e[this.week] : "Weeks " + this.week, this.shortCode = this.code.split(" ")[0], this.queryString = "" + this.shortCode + "=" + (+this.type).toString(16).toUpperCase() + this.group, this.dayAbbrev = a[this.day], this.el = $("<div>", {
                    "class": "lesson color" + this.color,
                    html: "<div><span class='code'>" + this.shortCode + "</span> " + ("<span class='title'>" + this.title + "</span></div>") + ("" + C[this.type] + " <span class='group'>[" + this.group + "]</span>") + ("<div class='room'>" + this.room + "</div>") + ("<div class='week'>" + (this.week ? this.weekStr : "") + "</div>")
                }).data("lesson", this).qtip({
                    content: "<strong>" + this.code + "</strong><br>" + ("" + this.title + "<br>") + ("" + this.typeName + " Group " + this.group + "<br>") + ("" + u[this.day] + " " + this.start + " - " + this.end + "<br>") + ("" + this.weekStr + " @ " + this.room),
                    position: {
                        my: "left center",
                        at: "right center"
                    },
                    show: {
                        effect: function() {
                            return $(this).fadeTo(200, .85)
                        }
                    }
                }), this.isDraggable && (this.el.draggable({
                    appendTo: "#timetable-wrapper",
                    cursor: "move",
                    helper: function() {
                        return r.el.clone(!1).width(r.el.width()).height(r.el.height())
                    },
                    opacity: .4,
                    revert: function(e) {
                        var t, n, i, s, o, u, a, f, l, c, h, p, d;
                        e || (n = r.group), h = r.sameType;
                        for (t in h) {
                            s = h[t];
                            for (o = 0, f = s.length; o < f; o++) i = s[o], t !== n && i.detach(), i.el.droppable("disable")
                        }
                        $("body").css("cursor", "auto");
                        if (e) {
                            p = r.sameGroup;
                            for (u = 0, l = p.length; u < l; u++) i = p[u], i.cascade();
                            d = r.sameType[e.data("lesson").group];
                            for (a = 0, c = d.length; a < c; a++) i = d[a], i.detach().attach();
                            return localStorage.setItem("hash_2013/2014_sem2_v1", location.hash = w = E()), $("#short-url").val("").blur(), !1
                        }
                        return !0
                    },
                    start: function() {
                        var e, t, n, i, s, o;
                        o = r.sameType;
                        for (e in o) {
                            n = o[e];
                            for (i = 0, s = n.length; i < s; i++) {
                                t = n[i];
                                if (e === r.group) continue;
                                t.el.droppable("enable"), t.attach()
                            }
                        }
                    },
                    zIndex: 3
                }), this.el.droppable({
                    hoverClass: "hover",
                    activeClass: "active",
                    addClasses: !1,
                    disabled: !0,
                    over: function() {
                        var e, t, n, i;
                        r.el.qtip("show"), i = r.sameGroup;
                        for (t = 0, n = i.length; t < n; t++) e = i[t], e.el.addClass("hover")
                    },
                    out: function() {
                        var e, t, n, i;
                        r.el.qtip("hide"), i = r.sameGroup;
                        for (t = 0, n = i.length; t < n; t++) e = i[t], e.el.removeClass("hover")
                    },
                    drop: function() {
                        var e, t, n, i;
                        r.el.qtip("hide"), i = r.sameGroup;
                        for (t = 0, n = i.length; t < n; t++) e = i[t], e.el.removeClass("hover")
                    }
                }))
            }
            var e;
            return e = ["Every Week", "Odd Weeks", "Even Weeks"], t.prototype.attach = function() {
                var e, n, r, i, s, o;
                this.day === 5 && $("#sat").show(), n = $("#" + this.dayAbbrev + " > tr");
                for (e = s = 0, o = n.length; 0 <= o ? s <= o : s >= o; e = 0 <= o ? ++s : --s) {
                    e === n.length ? (i = t.TR.clone().appendTo("#" + this.dayAbbrev), $(n[0]).children().first().attr("rowspan", e + 1)) : i = n[e];
                    if (!(r = $(i).children(".h" + this.start.slice(0, 2) + ".m" + this.start.slice(2) + ":empty"))) continue;
                    this.detached = r.nextUntil(".h" + this.end.slice(0, 2) + ".m" + this.end.slice(2), "td:empty");
                    if (this.detached.length === this.duration - 1) {
                        this.trPos = e + 1;
                        break
                    }
                }
                return r.attr("colspan", this.duration).html(this.el), this.detached.detach(), this
            }, t.prototype.detach = function(e) {
                var t;
                return t = this.el.parent().removeAttr("colspan").after(this.detached).parent(), e ? this.el.remove() : this.el.detach(), !t.find(".lesson").length && t.index() > 1 && t.remove(), this
            }, t.prototype.cascade = function() {
                var e, t, n, r;
                r = $("#" + this.dayAbbrev + " > tr:nth-child(" + this.trPos + ") ~ tr .lesson");
                for (t = 0, n = r.length; t < n; t++) e = r[t], $(e).data("lesson").detach().attach()
            }, t
        }(), E = function() {
            var e, t, n;
            return function() {
                var t;
                t = [];
                for (e in N) n = N[e], $.isEmptyObject(n) && t.push(e.split(" ")[0]);
                return t
            }().concat(function() {
                var e, n, r, i;
                r = $("td > .lesson"), i = [];
                for (e = 0, n = r.length; e < n; e++) t = r[e], i.push($(t).data("lesson").queryString);
                return i
            }()).join("&")
        }, g = function(e) {
            var t, n, r, s, o, u, a, f, l, c, h, d, v, g, y, b, w, E, T, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q;
            D = $(".lesson");
            for (T = 0, A = D.length; T < A; T++) n = D[T], $(n).data("lesson").detach();
            f = {}, P = e.split("&");
            for (u = C = 0, O = P.length; C < O; u = ++C) {
                d = P[u], H = d.split("="), v = H[0], b = H[1], t = modInfoTT.code[p(v)];
                if (!t) {
                    alert("" + v + " no longer exists.");
                    continue
                }
                f[t] || (f[t] = {});
                if (!b) {
                    i(t);
                    continue
                }
                N[t] || i(t, !1), g = parseInt(b[0], 16).toString();
                if (!N[t][g]) {
                    alert("" + t + " " + m[g] + " no longer exists.");
                    continue
                }(w = f[t])[g] || (w[g] = {}), s = b.slice(1), (B = (E = f[t][g])[s]) == null && (E[s] = 0), (j = N[t][g][s]) != null && (F = j[f[t][g][s] ++]) != null && F.attach()
            }
            for (t in N) {
                y = N[t];
                if (!f[t]) {
                    S(t);
                    continue
                }
                for (g in y) {
                    o = y[g];
                    if (!(c = f[t][g])) {
                        for (r in o) {
                            I = o[r];
                            for (k = 0, M = I.length; k < M; k++) a = I[k], a.attach();
                            break
                        }
                        continue
                    }
                    for (l in c) {
                        h = c[l];
                        if (!o[l]) {
                            for (r in o) {
                                alert("" + t + " " + m[g] + " Group " + l + " no " + ("longer exists. Adding Group " + r + " instead.")), q = o[r];
                                for (L = 0, _ = q.length; L < _; L++) a = q[L], a.attach();
                                break
                            }
                            break
                        }
                        while (h < o[l].length) o[l][h++].attach()
                    }
                }
            }
            return x.select2("val", function() {
                var e;
                e = [];
                for (t in f) e.push(t);
                return e
            }())
        }, $(document).one("scriptsLoaded.exhibit", function() {
            var e, t, n, r, s, o, a, f, l, h, p, d, v, m, g, y, w, E, S, T, N, C, k, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z, W;
            a = {
                types: {
                    Module: {
                        pluralLabel: "Modules"
                    }
                },
                properties: {
                    mc: {
                        valueType: "number"
                    }
                },
                items: []
            }, n = [], q = modInfoMF.departments;
            for (f in q) {
                s = q[f];
                for (C = 0, M = s.length; C < M; C++) r = s[C], n.push(r), r !== f && a.items.push({
                    label: r,
                    faculty: f
                })
            }
            T = [];
            for (k = 0, _ = u.length; k < _; k++) {
                t = u[k], T.push(t), R = ["Morning", "Afternoon", "Evening"];
                for (A = 0, D = R.length; A < D; A++) S = R[A], d = "" + t + " " + S, a.items.push({
                    label: d,
                    day: t
                }), T.push(d);
                U = $(".lessons > div");
                for (O = 0, P = U.length; O < P; O++) o = U[O], $(o).attr("data-ex-fixed-order", T.join(";"))
            }
            for (h = j = 0; 0 <= b ? j < b : j > b; h = 0 <= b ? ++j : --j) {
                g = {
                    lectures: {},
                    tutorials: {}
                }, z = ["lectures", "tutorials"];
                for (F = 0, H = z.length; F < H; F++) {
                    v = z[F];
                    if (!(y = modInfoTT[v][h])) continue;
                    for (N in y)
                        for (l in y[N]) {
                            W = y[N][l];
                            for (I = 0, B = W.length; I < B; I++) m = W[I], m[2] < "1200" ? E = "Morning" : m[2] < "1800" ? E = "Afternoon" : E = "Evening", g[v][u[m[1]] + " " + E] = !0
                        }
                }
                e = modInfoTT.code[h], a.items.push({
                    type: "Module",
                    label: e,
                    code: e.split(" ")[0],
                    level: +e.match(/\d/)[0] * 1e3,
                    title: modInfoTT.title[h],
                    description: modInfoMF.description[h],
                    exam: c[h],
                    mc: modInfoMF.mcs[h],
                    prereq: modInfoMF.prerequisite[h],
                    preclusion: modInfoMF.preclusion[h],
                    workload: modInfoMF.workload[h],
                    department: n[modInfoMF.department[h]],
                    lectures: function() {
                        var e;
                        e = [];
                        for (p in g.lectures) e.push(p);
                        return e
                    }(),
                    tutorials: function() {
                        var e;
                        e = [];
                        for (p in g.tutorials) e.push(p);
                        return e
                    }(),
                    types: modInfoMF.modTypes[modInfoMF.types[h]],
                    lecturers: modInfoMF.lecturers[h]
                })
            }
            return window.tableStyler = function(e, t) {
                return e.className = "modules table table-striped table-bordered"
            }, window.database = Exhibit.Database.create(), window.database.loadData(a), window.exhibit = Exhibit.create(), window.exhibit.configureFromDOM(), $("#overlay").fadeOut(), $("#loading").fadeOut(), $(".exhibit-collectionView-header").on("click", ".add", function(e) {
                var t, n, r;
                return r = x.select2("val"), t = $(this).data("code"), L.call(r, t) >= 0 ? n = "Already added!" : (n = "Added!", r.push(t), x.select2("val", r), i(t)), $(this).qtip({
                    content: n,
                    show: {
                        event: !1,
                        ready: !0
                    },
                    hide: {
                        event: !1,
                        inactive: 1e3
                    }
                })
            }), w = !0, $("#sidebar-toggle").qtip({
                content: "Hide Sidebar",
                position: {
                    my: "left center",
                    at: "top right"
                }
            }).click(function() {
                var e;
                return $("#sidebar-toggle i").toggleClass("icon-chevron-left icon-chevron-right"), $("#sidebar").animate({
                    width: "toggle"
                }, 100), $("#content").toggleClass("span12 span9"), $("#content").toggleClass("no-sidebar"), w = !w, e = w ? "Hide Sidebar" : "Show Sidebar", $(this).qtip("option", "content.text", e), !1
            })
        })
}).call(this);