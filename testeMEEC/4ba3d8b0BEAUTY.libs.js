/*
     FILE ARCHIVED ON 3:37:35 Fev 9, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 3:33:35 Ago 25, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
! function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function(e) {
        var t = "disabled",
            n = this.$element,
            r = n.data(),
            i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function() {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function() {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("button"),
                s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e(function() {
        e("body").on("click.button.data-api", "[data-toggle^=button]", function(t) {
            var n = e(t.target);
            n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
        })
    })
}(window.jQuery), ! function(e) {
    "use strict";

    function r() {
        i(e(t)).removeClass("open")
    }

    function i(t) {
        var n = t.attr("data-target"),
            r;
        return n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = e(n), r.length || (r = t.parent()), r
    }
    var t = "[data-toggle=dropdown]",
        n = function(t) {
            var n = e(t).on("click.dropdown.data-api", this.toggle);
            e("html").on("click.dropdown.data-api", function() {
                n.parent().removeClass("open")
            })
        };
    n.prototype = {
        constructor: n,
        toggle: function(t) {
            var n = e(this),
                s, o;
            if (n.is(".disabled, :disabled")) return;
            return s = i(n), o = s.hasClass("open"), r(), o || (s.toggleClass("open"), n.focus()), !1
        },
        keydown: function(t) {
            var n, r, s, o, u, a;
            if (!/(38|40|27)/.test(t.keyCode)) return;
            n = e(this), t.preventDefault(), t.stopPropagation();
            if (n.is(".disabled, :disabled")) return;
            o = i(n), u = o.hasClass("open");
            if (!u || u && t.keyCode == 27) return n.click();
            r = e("[role=menu] li:not(.divider) a", o);
            if (!r.length) return;
            a = r.index(r.filter(":focus")), t.keyCode == 38 && a > 0 && a--, t.keyCode == 40 && a < r.length - 1 && a++, ~a || (a = 0), r.eq(a).focus()
        }
    }, e.fn.dropdown = function(t) {
        return this.each(function() {
            var r = e(this),
                i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e(function() {
        e("html").on("click.dropdown.data-api touchstart.dropdown.data-api", r), e("body").on("click.dropdown touchstart.dropdown.data-api", ".dropdown form", function(e) {
            e.stopPropagation()
        }).on("click.dropdown.data-api touchstart.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var t = this,
                n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented()) return;
            e("body").addClass("modal-open"), this.isShown = !0, this.escape(), this.backdrop(function() {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1).focus(), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
                    t.$element.trigger("shown")
                }) : t.$element.trigger("shown")
            })
        },
        hide: function(t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented()) return;
            this.isShown = !1, e("body").removeClass("modal-open"), this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        },
        enforceFocus: function() {
            var t = this;
            e(document).on("focusin.modal", function(e) {
                t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
            })
        },
        escape: function() {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var t = this,
                n = setTimeout(function() {
                    t.$element.off(e.support.transition.end), t.hideModal()
                }, 500);
            this.$element.one(e.support.transition.end, function() {
                clearTimeout(n), t.hideModal()
            })
        },
        hideModal: function(e) {
            this.$element.hide().trigger("hidden"), this.backdrop()
        },
        removeBackdrop: function() {
            this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(t) {
            var n = this,
                r = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(this.removeBackdrop, this)) : this.removeBackdrop()) : t && t()
        }
    }, e.fn.modal = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("modal"),
                s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e(function() {
        e("body").on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
            var n = e(this),
                r = n.attr("href"),
                i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
                s = i.data("modal") ? "toggle" : e.extend({
                    remote: !/#/.test(r) && r
                }, i.data(), n.data());
            t.preventDefault(), i.modal(s).one("hide", function() {
                n.focus()
            })
        })
    })
}(window.jQuery), ! function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function() {
            var t = this.element,
                n = t.closest("ul:not(.dropdown-menu)"),
                r = t.attr("data-target"),
                i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active")) return;
            i = n.find(".active a").last()[0], o = e.Event("show", {
                relatedTarget: i
            }), t.trigger(o);
            if (o.isDefaultPrevented()) return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
                t.trigger({
                    type: "shown",
                    relatedTarget: i
                })
            })
        },
        activate: function(t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }
            var i = n.find("> .active"),
                s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    }, e.fn.tab = function(n) {
        return this.each(function() {
            var r = e(this),
                i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(function() {
        e("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
            t.preventDefault(), e(this).tab("show")
        })
    })
}(window.jQuery), ! function(e) {
    e(function() {
        "use strict";
        e.support.transition = function() {
            var e = function() {
                var e = document.createElement("bootstrap"),
                    t = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    },
                    n;
                for (n in t)
                    if (e.style[n] !== undefined) return t[n]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery),
function(e, t) {
    function i(t, n) {
        var r, i, o, u = t.nodeName.toLowerCase();
        return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !!o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
    }

    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return e.css(this, "visibility") === "hidden"
        }).length
    }
    var n = 0,
        r = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        focus: function(t) {
            return function(n, r) {
                return typeof n == "number" ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(), r && r.call(t)
                    }, n)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        scrollParent: function() {
            var t;
            return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : t = this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(n) {
            if (n !== t) return this.css("zIndex", n);
            if (this.length) {
                var r = e(this[0]),
                    i, s;
                while (r.length && r[0] !== document) {
                    i = r.css("position");
                    if (i === "absolute" || i === "relative" || i === "fixed") {
                        s = parseInt(r.css("zIndex"), 10);
                        if (!isNaN(s) && s !== 0) return s
                    }
                    r = r.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++n)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                r.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(n) {
                return !!e.data(n, t)
            }
        }) : function(t, n, r) {
            return !!e.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var n = e.attr(t, "tabindex"),
                r = isNaN(n);
            return (r || n >= 0) && i(t, !r)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
        function u(t, n, r, s) {
            return e.each(i, function() {
                n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), n
        }
        var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            s = r.toLowerCase(),
            o = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn["inner" + r] = function(n) {
            return n === t ? o["inner" + r].call(this) : this.each(function() {
                e(this).css(s, u(this, n) + "px")
            })
        }, e.fn["outer" + r] = function(t, n) {
            return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
                e(this).css(s, u(this, t, !0, n) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(n) {
            return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function(t, n, r) {
                var i, s = e.ui[t].prototype;
                for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
            },
            call: function(e, t, n) {
                var r, i = e.plugins[t];
                if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
                for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
            }
        },
        hasScroll: function(t, n) {
            if (e(t).css("overflow") === "hidden") return !1;
            var r = n && n === "left" ? "scrollLeft" : "scrollTop",
                i = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
        }
    })
}(jQuery),
function(e, t) {
    var n = 0,
        r = Array.prototype.slice,
        i = e.cleanData;
    e.cleanData = function(t) {
        for (var n = 0, r;
            (r = t[n]) != null; n++) try {
            e(r).triggerHandler("remove")
        } catch (s) {}
        i(t)
    }, e.widget = function(t, n, r) {
        var i, s, o, u, a = {},
            f = t.split(".")[0];
        t = t.split(".")[1], i = f + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
            return !!e.data(t, i)
        }, e[f] = e[f] || {}, s = e[f][t], o = e[f][t] = function(e, t) {
            if (!this._createWidget) return new o(e, t);
            arguments.length && this._createWidget(e, t)
        }, e.extend(o, s, {
            version: r.version,
            _proto: e.extend({}, r),
            _childConstructors: []
        }), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function(t, r) {
            if (!e.isFunction(r)) {
                a[t] = r;
                return
            }
            a[t] = function() {
                var e = function() {
                        return n.prototype[t].apply(this, arguments)
                    },
                    i = function(e) {
                        return n.prototype[t].apply(this, e)
                    };
                return function() {
                    var t = this._super,
                        n = this._superApply,
                        s;
                    return this._super = e, this._superApply = i, s = r.apply(this, arguments), this._super = t, this._superApply = n, s
                }
            }()
        }), o.prototype = e.widget.extend(u, {
            widgetEventPrefix: s ? u.widgetEventPrefix : t
        }, a, {
            constructor: o,
            namespace: f,
            widgetName: t,
            widgetFullName: i
        }), s ? (e.each(s._childConstructors, function(t, n) {
            var r = n.prototype;
            e.widget(r.namespace + "." + r.widgetName, o, n._proto)
        }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
    }, e.widget.extend = function(n) {
        var i = r.call(arguments, 1),
            s = 0,
            o = i.length,
            u, a;
        for (; s < o; s++)
            for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
        return n
    }, e.widget.bridge = function(n, i) {
        var s = i.prototype.widgetFullName || n;
        e.fn[n] = function(o) {
            var u = typeof o == "string",
                a = r.call(arguments, 1),
                f = this;
            return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function() {
                var r, i = e.data(this, s);
                if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
                if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
                r = i[o].apply(i, a);
                if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
            }) : this.each(function() {
                var t = e.data(this, s);
                t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
            }), f
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, r) {
            r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === r && this.destroy()
                }
            }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(n, r) {
            var i = n,
                s, o, u;
            if (arguments.length === 0) return e.widget.extend({}, this.options);
            if (typeof n == "string") {
                i = {}, s = n.split("."), n = s.shift();
                if (s.length) {
                    o = i[n] = e.widget.extend({}, this.options[n]);
                    for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
                    n = s.pop();
                    if (r === t) return o[n] === t ? null : o[n];
                    o[n] = r
                } else {
                    if (r === t) return this.options[n] === t ? null : this.options[n];
                    i[n] = r
                }
            }
            return this._setOptions(i), this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(t, n, r) {
            var i, s = this;
            typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, o) {
                function u() {
                    if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
                    return (typeof o == "string" ? s[o] : o).apply(s, arguments)
                }
                typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                var a = r.match(/^(\w+)\s*(.*)$/),
                    f = a[1] + s.eventNamespace,
                    l = a[2];
                l ? i.delegate(l, f, u) : n.bind(f, u)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function n() {
                return (typeof e == "string" ? r[e] : e).apply(r, arguments)
            }
            var r = this;
            return setTimeout(n, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, n, r) {
            var i, s, o = this.options[t];
            r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
            if (s)
                for (i in s) i in n || (n[i] = s[i]);
            return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, n) {
        e.Widget.prototype["_" + t] = function(r, i, s) {
            typeof i == "string" && (i = {
                effect: i
            });
            var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
            i = i || {}, typeof i == "number" && (i = {
                duration: i
            }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && e.effects.effect[u] ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                e(this)[t](), s && s.call(r[0]), n()
            })
        }
    })
}(jQuery),
function(e, t) {
    var n = !1;
    e(document).mouseup(function() {
        n = !1
    }), e.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(n) {
                if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (n) return;
            this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
            var r = this,
                i = t.which === 1,
                s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
            if (!i || s || !this._mouseCapture(t)) return !0;
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                r.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                this._mouseStarted = this._mouseStart(t) !== !1;
                if (!this._mouseStarted) return t.preventDefault(), !0
            }
            return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                return r._mouseMove(e)
            }, this._mouseUpDelegate = function(e) {
                return r._mouseUp(e)
            }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
        },
        _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        },
        _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}(jQuery),
function(e, t) {
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            this.options.helper === "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var n = this.options;
            return this.helper || n.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
                e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(t) {
            var n = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, this.offset.scroll = !1, e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        },
        _mouseDrag: function(t, n) {
            this.offsetParentCssPosition === "fixed" && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
            if (!n) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                this.position = r.position
            }
            if (!this.options.axis || this.options.axis !== "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis !== "x") this.helper[0].style.top = this.position.top + "px";
            return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function(t) {
            var n = this,
                r = !1;
            return e.ui.ddmanager && !this.options.dropBehaviour && (r = e.ui.ddmanager.drop(this, t)), this.dropped && (r = this.dropped, this.dropped = !1), this.options.helper === "original" && !e.contains(this.element[0].ownerDocument, this.element[0]) ? !1 : (this.options.revert === "invalid" && !r || this.options.revert === "valid" && r || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, r) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                n._trigger("stop", t) !== !1 && n._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(), !1)
        },
        _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(t) {
            return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _createHelper: function(t) {
            var n = this.options,
                r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;
            return r.parents("body").length || r.appendTo(n.appendTo === "parent" ? this.element[0].parentNode : n.appendTo), r[0] !== this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
        },
        _adjustOffsetFromHelper: function(t) {
            typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset();
            this.cssPosition === "absolute" && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && e.ui.ie) t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, n, r, i = this.options;
            if (!i.containment) {
                this.containment = null;
                return
            }
            if (i.containment === "window") {
                this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (i.containment === "document") {
                this.containment = [0, 0, e(document).width() - this.helperProportions.width - this.margins.left, (e(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (i.containment.constructor === Array) {
                this.containment = i.containment;
                return
            }
            i.containment === "parent" && (i.containment = this.helper[0].parentNode), n = e(i.containment), r = n[0];
            if (!r) return;
            t = n.css("overflow") !== "hidden", this.containment = [(parseInt(n.css("borderLeftWidth"), 10) || 0) + (parseInt(n.css("paddingLeft"), 10) || 0), (parseInt(n.css("borderTopWidth"), 10) || 0) + (parseInt(n.css("paddingTop"), 10) || 0), (t ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(n.css("borderRightWidth"), 10) || 0) - (parseInt(n.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(n.css("borderBottomWidth"), 10) || 0) - (parseInt(n.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
        },
        _convertPositionTo: function(t, n) {
            n || (n = this.position);
            var r = t === "absolute" ? 1 : -1,
                i = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: i.scrollTop(),
                left: i.scrollLeft()
            }), {
                top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * r,
                left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * r
            }
        },
        _generatePosition: function(t) {
            var n, r, i, s, o = this.options,
                u = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                a = t.pageX,
                f = t.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: u.scrollTop(),
                left: u.scrollLeft()
            }), this.originalPosition && (this.containment && (this.relative_container ? (r = this.relative_container.offset(), n = [this.containment[0] + r.left, this.containment[1] + r.top, this.containment[2] + r.left, this.containment[3] + r.top]) : n = this.containment, t.pageX - this.offset.click.left < n[0] && (a = n[0] + this.offset.click.left), t.pageY - this.offset.click.top < n[1] && (f = n[1] + this.offset.click.top), t.pageX - this.offset.click.left > n[2] && (a = n[2] + this.offset.click.left), t.pageY - this.offset.click.top > n[3] && (f = n[3] + this.offset.click.top)), o.grid && (i = o.grid[1] ? this.originalPageY + Math.round((f - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, f = n ? i - this.offset.click.top >= n[1] || i - this.offset.click.top > n[3] ? i : i - this.offset.click.top >= n[1] ? i - o.grid[1] : i + o.grid[1] : i, s = o.grid[0] ? this.originalPageX + Math.round((a - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, a = n ? s - this.offset.click.left >= n[0] || s - this.offset.click.left > n[2] ? s : s - this.offset.click.left >= n[0] ? s - o.grid[0] : s + o.grid[0] : s)), {
                top: f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] !== this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(t, n, r) {
            return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t === "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), e.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, n) {
            var r = e(this).data("ui-draggable"),
                i = r.options,
                s = e.extend({}, n, {
                    item: r.element
                });
            r.sortables = [], e(i.connectToSortable).each(function() {
                var n = e.data(this, "ui-sortable");
                n && !n.options.disabled && (r.sortables.push({
                    instance: n,
                    shouldRevert: n.options.revert
                }), n.refreshPositions(), n._trigger("activate", t, s))
            })
        },
        stop: function(t, n) {
            var r = e(this).data("ui-draggable"),
                i = e.extend({}, n, {
                    item: r.element
                });
            e.each(r.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper === "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
            })
        },
        drag: function(t, n) {
            var r = e(this).data("ui-draggable"),
                i = this;
            e.each(r.sortables, function() {
                var s = !1,
                    o = this;
                this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (s = !0, e.each(r.sortables, function() {
                    return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (s = !1), s
                })), s ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return n.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
            })
        }
    }), e.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = e("body"),
                n = e(this).data("ui-draggable").options;
            t.css("cursor") && (n._cursor = t.css("cursor")), t.css("cursor", n.cursor)
        },
        stop: function() {
            var t = e(this).data("ui-draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }
    }), e.ui.plugin.add("draggable", "opacity", {
        start: function(t, n) {
            var r = e(n.helper),
                i = e(this).data("ui-draggable").options;
            r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
        },
        stop: function(t, n) {
            var r = e(this).data("ui-draggable").options;
            r._opacity && e(n.helper).css("opacity", r._opacity)
        }
    }), e.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var t = e(this).data("ui-draggable");
            t.scrollParent[0] !== document && t.scrollParent[0].tagName !== "HTML" && (t.overflowOffset = t.scrollParent.offset())
        },
        drag: function(t) {
            var n = e(this).data("ui-draggable"),
                r = n.options,
                i = !1;
            if (n.scrollParent[0] !== document && n.scrollParent[0].tagName !== "HTML") {
                if (!r.axis || r.axis !== "x") n.overflowOffset.top + n.scrollParent[0].offsetHeight - t.pageY < r.scrollSensitivity ? n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop + r.scrollSpeed : t.pageY - n.overflowOffset.top < r.scrollSensitivity && (n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop - r.scrollSpeed);
                if (!r.axis || r.axis !== "y") n.overflowOffset.left + n.scrollParent[0].offsetWidth - t.pageX < r.scrollSensitivity ? n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft + r.scrollSpeed : t.pageX - n.overflowOffset.left < r.scrollSensitivity && (n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft - r.scrollSpeed)
            } else {
                if (!r.axis || r.axis !== "x") t.pageY - e(document).scrollTop() < r.scrollSensitivity ? i = e(document).scrollTop(e(document).scrollTop() - r.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < r.scrollSensitivity && (i = e(document).scrollTop(e(document).scrollTop() + r.scrollSpeed));
                if (!r.axis || r.axis !== "y") t.pageX - e(document).scrollLeft() < r.scrollSensitivity ? i = e(document).scrollLeft(e(document).scrollLeft() - r.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < r.scrollSensitivity && (i = e(document).scrollLeft(e(document).scrollLeft() + r.scrollSpeed))
            }
            i !== !1 && e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t)
        }
    }), e.ui.plugin.add("draggable", "snap", {
        start: function() {
            var t = e(this).data("ui-draggable"),
                n = t.options;
            t.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
                var n = e(this),
                    r = n.offset();
                this !== t.element[0] && t.snapElements.push({
                    item: this,
                    width: n.outerWidth(),
                    height: n.outerHeight(),
                    top: r.top,
                    left: r.left
                })
            })
        },
        drag: function(t, n) {
            var r, i, s, o, u, a, f, l, c, h, p = e(this).data("ui-draggable"),
                d = p.options,
                v = d.snapTolerance,
                m = n.offset.left,
                g = m + p.helperProportions.width,
                y = n.offset.top,
                b = y + p.helperProportions.height;
            for (c = p.snapElements.length - 1; c >= 0; c--) {
                u = p.snapElements[c].left, a = u + p.snapElements[c].width, f = p.snapElements[c].top, l = f + p.snapElements[c].height;
                if (g < u - v || m > a + v || b < f - v || y > l + v || !e.contains(p.snapElements[c].item.ownerDocument, p.snapElements[c].item)) {
                    p.snapElements[c].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {
                        snapItem: p.snapElements[c].item
                    })), p.snapElements[c].snapping = !1;
                    continue
                }
                d.snapMode !== "inner" && (r = Math.abs(f - b) <= v, i = Math.abs(l - y) <= v, s = Math.abs(u - g) <= v, o = Math.abs(a - m) <= v, r && (n.position.top = p._convertPositionTo("relative", {
                    top: f - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), i && (n.position.top = p._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top - p.margins.top), s && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: u - p.helperProportions.width
                }).left - p.margins.left), o && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left - p.margins.left)), h = r || i || s || o, d.snapMode !== "outer" && (r = Math.abs(f - y) <= v, i = Math.abs(l - b) <= v, s = Math.abs(u - m) <= v, o = Math.abs(a - g) <= v, r && (n.position.top = p._convertPositionTo("relative", {
                    top: f,
                    left: 0
                }).top - p.margins.top), i && (n.position.top = p._convertPositionTo("relative", {
                    top: l - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), s && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: u
                }).left - p.margins.left), o && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a - p.helperProportions.width
                }).left - p.margins.left)), !p.snapElements[c].snapping && (r || i || s || o || h) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[c].item
                })), p.snapElements[c].snapping = r || i || s || o || h
            }
        }
    }), e.ui.plugin.add("draggable", "stack", {
        start: function() {
            var t, n = this.data("ui-draggable").options,
                r = e.makeArray(e(n.stack)).sort(function(t, n) {
                    return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
                });
            if (!r.length) return;
            t = parseInt(e(r[0]).css("zIndex"), 10) || 0, e(r).each(function(n) {
                e(this).css("zIndex", t + n)
            }), this.css("zIndex", t + r.length)
        }
    }), e.ui.plugin.add("draggable", "zIndex", {
        start: function(t, n) {
            var r = e(n.helper),
                i = e(this).data("ui-draggable").options;
            r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
        },
        stop: function(t, n) {
            var r = e(this).data("ui-draggable").options;
            r._zIndex && e(n.helper).css("zIndex", r._zIndex)
        }
    })
}(jQuery),
function(e, t) {
    function n(e, t, n) {
        return e > t && e < t + n
    }
    e.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t = this.options,
                n = t.accept;
            this.isover = !1, this.isout = !0, this.accept = e.isFunction(n) ? n : function(e) {
                return e.is(n)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            var t = 0,
                n = e.ui.ddmanager.droppables[this.options.scope];
            for (; t < n.length; t++) n[t] === this && n.splice(t, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(t, n) {
            t === "accept" && (this.accept = e.isFunction(n) ? n : function(e) {
                return e.is(n)
            }), e.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(t) {
            var n = e.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), n && this._trigger("activate", t, this.ui(n))
        },
        _deactivate: function(t) {
            var n = e.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), n && this._trigger("deactivate", t, this.ui(n))
        },
        _over: function(t) {
            var n = e.ui.ddmanager.current;
            if (!n || (n.currentItem || n.element)[0] === this.element[0]) return;
            this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(n)))
        },
        _out: function(t) {
            var n = e.ui.ddmanager.current;
            if (!n || (n.currentItem || n.element)[0] === this.element[0]) return;
            this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(n)))
        },
        _drop: function(t, n) {
            var r = n || e.ui.ddmanager.current,
                i = !1;
            return !r || (r.currentItem || r.element)[0] === this.element[0] ? !1 : (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var t = e.data(this, "ui-droppable");
                if (t.options.greedy && !t.options.disabled && t.options.scope === r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && e.ui.intersect(r, e.extend(t, {
                    offset: t.element.offset()
                }), t.options.tolerance)) return i = !0, !1
            }), i ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1)
        },
        ui: function(e) {
            return {
                draggable: e.currentItem || e.element,
                helper: e.helper,
                position: e.position,
                offset: e.positionAbs
            }
        }
    }), e.ui.intersect = function(e, t, r) {
        if (!t.offset) return !1;
        var i, s, o = (e.positionAbs || e.position.absolute).left,
            u = o + e.helperProportions.width,
            a = (e.positionAbs || e.position.absolute).top,
            f = a + e.helperProportions.height,
            l = t.offset.left,
            c = l + t.proportions.width,
            h = t.offset.top,
            p = h + t.proportions.height;
        switch (r) {
            case "fit":
                return l <= o && u <= c && h <= a && f <= p;
            case "intersect":
                return l < o + e.helperProportions.width / 2 && u - e.helperProportions.width / 2 < c && h < a + e.helperProportions.height / 2 && f - e.helperProportions.height / 2 < p;
            case "pointer":
                return i = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left, s = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top, n(s, h, t.proportions.height) && n(i, l, t.proportions.width);
            case "touch":
                return (a >= h && a <= p || f >= h && f <= p || a < h && f > p) && (o >= l && o <= c || u >= l && u <= c || o < l && u > c);
            default:
                return !1
        }
    }, e.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(t, n) {
            var r, i, s = e.ui.ddmanager.droppables[t.options.scope] || [],
                o = n ? n.type : null,
                u = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            e: for (r = 0; r < s.length; r++) {
                if (s[r].options.disabled || t && !s[r].accept.call(s[r].element[0], t.currentItem || t.element)) continue;
                for (i = 0; i < u.length; i++)
                    if (u[i] === s[r].element[0]) {
                        s[r].proportions.height = 0;
                        continue e
                    }
                s[r].visible = s[r].element.css("display") !== "none";
                if (!s[r].visible) continue;
                o === "mousedown" && s[r]._activate.call(s[r], n), s[r].offset = s[r].element.offset(), s[r].proportions = {
                    width: s[r].element[0].offsetWidth,
                    height: s[r].element[0].offsetHeight
                }
            }
        },
        drop: function(t, n) {
            var r = !1;
            return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                if (!this.options) return;
                !this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, n) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, n))
            }), r
        },
        dragStart: function(t, n) {
            t.element.parentsUntil("body").bind("scroll.droppable", function() {
                t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
            })
        },
        drag: function(t, n) {
            t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, n), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (this.options.disabled || this.greedyChild || !this.visible) return;
                var r, i, s, o = e.ui.intersect(t, this, this.options.tolerance),
                    u = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                if (!u) return;
                this.options.greedy && (i = this.options.scope, s = this.element.parents(":data(ui-droppable)").filter(function() {
                    return e.data(this, "ui-droppable").options.scope === i
                }), s.length && (r = e.data(s[0], "ui-droppable"), r.greedyChild = u === "isover")), r && u === "isover" && (r.isover = !1, r.isout = !0, r._out.call(r, n)), this[u] = !0, this[u === "isout" ? "isover" : "isout"] = !1, this[u === "isover" ? "_over" : "_out"].call(this, n), r && u === "isout" && (r.isout = !1, r.isover = !0, r._over.call(r, n))
            })
        },
        dragStop: function(t, n) {
            t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
        }
    }
}(jQuery),
function(e, t) {
    function n(e, t, n) {
        return e > t && e < t + n
    }

    function r(e) {
        return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"))
    }
    e.widget("ui.sortable", e.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var e = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? e.axis === "x" || r(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(t, n) {
            t === "disabled" ? (this.options[t] = n, this.widget().toggleClass("ui-sortable-disabled", !!n)) : e.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(t, n) {
            var r = null,
                i = !1,
                s = this;
            if (this.reverting) return !1;
            if (this.options.disabled || this.options.type === "static") return !1;
            this._refreshItems(t), e(t.target).parents().each(function() {
                if (e.data(this, s.widgetName + "-item") === s) return r = e(this), !1
            }), e.data(t.target, s.widgetName + "-item") === s && (r = e(t.target));
            if (!r) return !1;
            if (this.options.handle && !n) {
                e(this.options.handle, r).find("*").addBack().each(function() {
                    this === t.target && (i = !0)
                });
                if (!i) return !1
            }
            return this.currentItem = r, this._removeCurrentsFromItems(), !0
        },
        _mouseStart: function(t, n, r) {
            var i, s, o = this.options;
            this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && o.cursor !== "auto" && (s = this.document.find("body"), this.storedCursor = s.css("cursor"), s.css("cursor", o.cursor), this.storedStylesheet = e("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(s)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
            if (!r)
                for (i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", t, this._uiHash(this));
            return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
        },
        _mouseDrag: function(t) {
            var n, r, i, s, o = this.options,
                u = !1;
            this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = u = this.scrollParent[0].scrollTop + o.scrollSpeed : t.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = u = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = u = this.scrollParent[0].scrollLeft + o.scrollSpeed : t.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = u = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (t.pageY - e(document).scrollTop() < o.scrollSensitivity ? u = e(document).scrollTop(e(document).scrollTop() - o.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < o.scrollSensitivity && (u = e(document).scrollTop(e(document).scrollTop() + o.scrollSpeed)), t.pageX - e(document).scrollLeft() < o.scrollSensitivity ? u = e(document).scrollLeft(e(document).scrollLeft() - o.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < o.scrollSensitivity && (u = e(document).scrollLeft(e(document).scrollLeft() + o.scrollSpeed))), u !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis !== "x") this.helper[0].style.top = this.position.top + "px";
            for (n = this.items.length - 1; n >= 0; n--) {
                r = this.items[n], i = r.item[0], s = this._intersectsWithPointer(r);
                if (!s) continue;
                if (r.instance !== this.currentContainer) continue;
                if (i !== this.currentItem[0] && this.placeholder[s === 1 ? "next" : "prev"]()[0] !== i && !e.contains(this.placeholder[0], i) && (this.options.type === "semi-dynamic" ? !e.contains(this.element[0], i) : !0)) {
                    this.direction = s === 1 ? "down" : "up";
                    if (this.options.tolerance !== "pointer" && !this._intersectsWithSides(r)) break;
                    this._rearrange(t, r), this._trigger("change", t, this._uiHash());
                    break
                }
            }
            return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(t, n) {
            if (!t) return;
            e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t);
            if (this.options.revert) {
                var r = this,
                    i = this.placeholder.offset(),
                    s = this.options.axis,
                    o = {};
                if (!s || s === "x") o.left = i.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft);
                if (!s || s === "y") o.top = i.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);
                this.reverting = !0, e(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                    r._clear(t)
                })
            } else this._clear(t, n);
            return !1
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), this.options.helper === "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper !== "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(t) {
            var n = this._getItemsAsjQuery(t && t.connected),
                r = [];
            return t = t || {}, e(n).each(function() {
                var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                n && r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
            }), !r.length && t.key && r.push(t.key + "="), r.join("&")
        },
        toArray: function(t) {
            var n = this._getItemsAsjQuery(t && t.connected),
                r = [];
            return t = t || {}, n.each(function() {
                r.push(e(t.item || this).attr(t.attribute || "id") || "")
            }), r
        },
        _intersectsWith: function(e) {
            var t = this.positionAbs.left,
                n = t + this.helperProportions.width,
                r = this.positionAbs.top,
                i = r + this.helperProportions.height,
                s = e.left,
                o = s + e.width,
                u = e.top,
                a = u + e.height,
                f = this.offset.click.top,
                l = this.offset.click.left,
                c = this.options.axis === "x" || r + f > u && r + f < a,
                h = this.options.axis === "y" || t + l > s && t + l < o,
                p = c && h;
            return this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? p : s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
        },
        _intersectsWithPointer: function(e) {
            var t = this.options.axis === "x" || n(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                r = this.options.axis === "y" || n(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                i = t && r,
                s = this._getDragVerticalDirection(),
                o = this._getDragHorizontalDirection();
            return i ? this.floating ? o && o === "right" || s === "down" ? 2 : 1 : s && (s === "down" ? 2 : 1) : !1
        },
        _intersectsWithSides: function(e) {
            var t = n(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                r = n(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                i = this._getDragVerticalDirection(),
                s = this._getDragHorizontalDirection();
            return this.floating && s ? s === "right" && r || s === "left" && !r : i && (i === "down" && t || i === "up" && !t)
        },
        _getDragVerticalDirection: function() {
            var e = this.positionAbs.top - this.lastPositionAbs.top;
            return e !== 0 && (e > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var e = this.positionAbs.left - this.lastPositionAbs.left;
            return e !== 0 && (e > 0 ? "right" : "left")
        },
        refresh: function(e) {
            return this._refreshItems(e), this.refreshPositions(), this
        },
        _connectWith: function() {
            var e = this.options;
            return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith
        },
        _getItemsAsjQuery: function(t) {
            var n, r, i, s, o = [],
                u = [],
                a = this._connectWith();
            if (a && t)
                for (n = a.length - 1; n >= 0; n--) {
                    i = e(a[n]);
                    for (r = i.length - 1; r >= 0; r--) s = e.data(i[r], this.widgetFullName), s && s !== this && !s.options.disabled && u.push([e.isFunction(s.options.items) ? s.options.items.call(s.element) : e(s.options.items, s.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), s])
                }
            u.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (n = u.length - 1; n >= 0; n--) u[n][0].each(function() {
                o.push(this)
            });
            return e(o)
        },
        _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = e.grep(this.items, function(e) {
                for (var n = 0; n < t.length; n++)
                    if (t[n] === e.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(t) {
            this.items = [], this.containers = [this];
            var n, r, i, s, o, u, a, f, l = this.items,
                c = [
                    [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                        item: this.currentItem
                    }) : e(this.options.items, this.element), this]
                ],
                h = this._connectWith();
            if (h && this.ready)
                for (n = h.length - 1; n >= 0; n--) {
                    i = e(h[n]);
                    for (r = i.length - 1; r >= 0; r--) s = e.data(i[r], this.widgetFullName), s && s !== this && !s.options.disabled && (c.push([e.isFunction(s.options.items) ? s.options.items.call(s.element[0], t, {
                        item: this.currentItem
                    }) : e(s.options.items, s.element), s]), this.containers.push(s))
                }
            for (n = c.length - 1; n >= 0; n--) {
                o = c[n][1], u = c[n][0];
                for (r = 0, f = u.length; r < f; r++) a = e(u[r]), a.data(this.widgetName + "-item", o), l.push({
                    item: a,
                    instance: o,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
            }
        },
        refreshPositions: function(t) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var n, r, i, s;
            for (n = this.items.length - 1; n >= 0; n--) {
                r = this.items[n];
                if (r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0]) continue;
                i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item, t || (r.width = i.outerWidth(), r.height = i.outerHeight()), s = i.offset(), r.left = s.left, r.top = s.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (n = this.containers.length - 1; n >= 0; n--) s = this.containers[n].element.offset(), this.containers[n].containerCache.left = s.left, this.containers[n].containerCache.top = s.top, this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), this.containers[n].containerCache.height = this.containers[n].element.outerHeight();
            return this
        },
        _createPlaceholder: function(t) {
            t = t || this;
            var n, r = t.options;
            if (!r.placeholder || r.placeholder.constructor === String) n = r.placeholder, r.placeholder = {
                element: function() {
                    var r = t.currentItem[0].nodeName.toLowerCase(),
                        i = e("<" + r + ">", t.document[0]).addClass(n || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return r === "tr" ? t.currentItem.children().each(function() {
                        e("<td>&#160;</td>", t.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(i)
                    }) : r === "img" && i.attr("src", t.currentItem.attr("src")), n || i.css("visibility", "hidden"), i
                },
                update: function(e, i) {
                    if (n && !r.forcePlaceholderSize) return;
                    i.height() || i.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), i.width() || i.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10))
                }
            };
            t.placeholder = e(r.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), r.placeholder.update(t, t.placeholder)
        },
        _contactContainers: function(t) {
            var i, s, o, u, a, f, l, c, h, p, d = null,
                v = null;
            for (i = this.containers.length - 1; i >= 0; i--) {
                if (e.contains(this.currentItem[0], this.containers[i].element[0])) continue;
                if (this._intersectsWith(this.containers[i].containerCache)) {
                    if (d && e.contains(this.containers[i].element[0], d.element[0])) continue;
                    d = this.containers[i], v = i
                } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0)
            }
            if (!d) return;
            if (this.containers.length === 1) this.containers[v].containerCache.over || (this.containers[v]._trigger("over", t, this._uiHash(this)), this.containers[v].containerCache.over = 1);
            else {
                o = 1e4, u = null, p = d.floating || r(this.currentItem), a = p ? "left" : "top", f = p ? "width" : "height", l = this.positionAbs[a] + this.offset.click[a];
                for (s = this.items.length - 1; s >= 0; s--) {
                    if (!e.contains(this.containers[v].element[0], this.items[s].item[0])) continue;
                    if (this.items[s].item[0] === this.currentItem[0]) continue;
                    if (p && !n(this.positionAbs.top + this.offset.click.top, this.items[s].top, this.items[s].height)) continue;
                    c = this.items[s].item.offset()[a], h = !1, Math.abs(c - l) > Math.abs(c + this.items[s][f] - l) && (h = !0, c += this.items[s][f]), Math.abs(c - l) < o && (o = Math.abs(c - l), u = this.items[s], this.direction = h ? "up" : "down")
                }
                if (!u && !this.options.dropOnEmpty) return;
                if (this.currentContainer === this.containers[v]) return;
                u ? this._rearrange(t, u, null, !0) : this._rearrange(t, null, this.containers[v].element, !0), this._trigger("change", t, this._uiHash()), this.containers[v]._trigger("change", t, this._uiHash(this)), this.currentContainer = this.containers[v], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[v]._trigger("over", t, this._uiHash(this)), this.containers[v].containerCache.over = 1
            }
        },
        _createHelper: function(t) {
            var n = this.options,
                r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper === "clone" ? this.currentItem.clone() : this.currentItem;
            return r.parents("body").length || e(n.appendTo !== "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(r[0]), r[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!r[0].style.width || n.forceHelperSize) && r.width(this.currentItem.width()), (!r[0].style.height || n.forceHelperSize) && r.height(this.currentItem.height()), r
        },
        _adjustOffsetFromHelper: function(t) {
            typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            this.cssPosition === "absolute" && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && e.ui.ie) t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var e = this.currentItem.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, n, r, i = this.options;
            i.containment === "parent" && (i.containment = this.helper[0].parentNode);
            if (i.containment === "document" || i.containment === "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(i.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(i.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            /^(document|window|parent)$/.test(i.containment) || (t = e(i.containment)[0], n = e(i.containment).offset(), r = e(t).css("overflow") !== "hidden", this.containment = [n.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, n.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, n.left + (r ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, n.top + (r ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(t, n) {
            n || (n = this.position);
            var r = t === "absolute" ? 1 : -1,
                i = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                s = /(html|body)/i.test(i[0].tagName);
            return {
                top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : i.scrollTop()) * r,
                left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : i.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var n, r, i = this.options,
                s = t.pageX,
                o = t.pageY,
                u = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                a = /(html|body)/i.test(u[0].tagName);
            return this.cssPosition === "relative" && (this.scrollParent[0] === document || this.scrollParent[0] === this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), i.grid && (n = this.originalPageY + Math.round((o - this.originalPageY) / i.grid[1]) * i.grid[1], o = this.containment ? n - this.offset.click.top >= this.containment[1] && n - this.offset.click.top <= this.containment[3] ? n : n - this.offset.click.top >= this.containment[1] ? n - i.grid[1] : n + i.grid[1] : n, r = this.originalPageX + Math.round((s - this.originalPageX) / i.grid[0]) * i.grid[0], s = this.containment ? r - this.offset.click.left >= this.containment[0] && r - this.offset.click.left <= this.containment[2] ? r : r - this.offset.click.left >= this.containment[0] ? r - i.grid[0] : r + i.grid[0] : r)), {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : a ? 0 : u.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : a ? 0 : u.scrollLeft())
            }
        },
        _rearrange: function(e, t, n, r) {
            n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var i = this.counter;
            this._delay(function() {
                i === this.counter && this.refreshPositions(!r)
            })
        },
        _clear: function(e, t) {
            this.reverting = !1;
            var n, r = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (n in this._storedCSS)
                    if (this._storedCSS[n] === "auto" || this._storedCSS[n] === "static") this._storedCSS[n] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !t && r.push(function(e) {
                this._trigger("receive", e, this._uiHash(this.fromOutside))
            }), (this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !t && r.push(function(e) {
                this._trigger("update", e, this._uiHash())
            }), this !== this.currentContainer && (t || (r.push(function(e) {
                this._trigger("remove", e, this._uiHash())
            }), r.push(function(e) {
                return function(t) {
                    e._trigger("receive", t, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), r.push(function(e) {
                return function(t) {
                    e._trigger("update", t, this._uiHash(this))
                }
            }.call(this, this.currentContainer))));
            for (n = this.containers.length - 1; n >= 0; n--) t || r.push(function(e) {
                return function(t) {
                    e._trigger("deactivate", t, this._uiHash(this))
                }
            }.call(this, this.containers[n])), this.containers[n].containerCache.over && (r.push(function(e) {
                return function(t) {
                    e._trigger("out", t, this._uiHash(this))
                }
            }.call(this, this.containers[n])), this.containers[n].containerCache.over = 0);
            this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex), this.dragging = !1;
            if (this.cancelHelperRemoval) {
                if (!t) {
                    this._trigger("beforeStop", e, this._uiHash());
                    for (n = 0; n < r.length; n++) r[n].call(this, e);
                    this._trigger("stop", e, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null;
            if (!t) {
                for (n = 0; n < r.length; n++) r[n].call(this, e);
                this._trigger("stop", e, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function() {
            e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(t) {
            var n = t || this;
            return {
                helper: n.helper,
                placeholder: n.placeholder || e([]),
                position: n.position,
                originalPosition: n.originalPosition,
                offset: n.positionAbs,
                item: n.currentItem,
                sender: t ? t.element : null
            }
        }
    })
}(jQuery),
function(e) {
    "use strict";
    typeof define == "function" && define.amd ? define(["jquery"], e) : jQuery && !jQuery.fn.qtip && e(jQuery)
}(function(e) {
    "use strict";

    function _() {
        _.history = _.history || [], _.history.push(arguments);
        if ("object" == typeof console) {
            var e = console[console.warn ? "warn" : "log"],
                t = Array.prototype.slice.call(arguments),
                n;
            typeof arguments[0] == "string" && (t[0] = "qTip2: " + t[0]), n = e.apply ? e.apply(console, t) : e(t)
        }
    }

    function D(t) {
        var i = function(e) {
                return e === r || "object" != typeof e
            },
            s = function(t) {
                return !e.isFunction(t) && (!t && !t.attr || t.length < 1 || "object" == typeof t && !t.jquery)
            };
        if (!t || "object" != typeof t) return n;
        i(t.metadata) && (t.metadata = {
            type: t.metadata
        });
        if ("content" in t) {
            if (i(t.content) || t.content.jquery) t.content = {
                text: t.content
            };
            s(t.content.text || n) && (t.content.text = n), "title" in t.content && (i(t.content.title) && (t.content.title = {
                text: t.content.title
            }), s(t.content.title.text || n) && (t.content.title.text = n))
        }
        return "position" in t && i(t.position) && (t.position = {
            my: t.position,
            at: t.position
        }), "show" in t && i(t.show) && (t.show = t.show.jquery ? {
            target: t.show
        } : {
            event: t.show
        }), "hide" in t && i(t.hide) && (t.hide = t.hide.jquery ? {
            target: t.hide
        } : {
            event: t.hide
        }), "style" in t && i(t.style) && (t.style = {
            classes: t.style
        }), e.each(g, function() {
            this.sanitize && this.sanitize(t)
        }), t
    }

    function P(i, s, p, d) {
        function I(e) {
            var t = 0,
                n, r = s,
                i = e.split(".");
            while (r = r[i[t++]]) t < i.length && (n = r);
            return [n || s, i.pop()]
        }

        function q() {
            var e = s.style.widget;
            H.toggleClass(E, e).toggleClass(T, s.style.def && !e), j.content.toggleClass(E + "-content", e), j.titlebar && j.titlebar.toggleClass(E + "-header", e), j.button && j.button.toggleClass(w + "-icon", !e)
        }

        function R(e) {
            j.title && (j.titlebar.remove(), j.titlebar = j.title = j.button = r, e !== n && v.reposition())
        }

        function U() {
            var t = s.content.title.button,
                r = typeof t == "string",
                i = r ? t : "Close tooltip";
            j.button && j.button.remove(), t.jquery ? j.button = t : j.button = e("<a />", {
                "class": "ui-state-default ui-tooltip-close " + (s.style.widget ? "" : w + "-icon"),
                title: i,
                "aria-label": i
            }).prepend(e("<span />", {
                "class": "ui-icon ui-icon-close",
                html: "&times;"
            })), j.button.appendTo(j.titlebar).attr("role", "button").click(function(e) {
                return H.hasClass(S) || v.hide(e), n
            }), v.redraw()
        }

        function z() {
            var n = A + "-title";
            j.titlebar && R(), j.titlebar = e("<div />", {
                "class": w + "-titlebar " + (s.style.widget ? "ui-widget-header" : "")
            }).append(j.title = e("<div />", {
                id: n,
                "class": w + "-title",
                "aria-atomic": t
            })).insertBefore(j.content).delegate(".ui-tooltip-close", "mousedown keydown mouseup keyup mouseout", function(t) {
                e(this).toggleClass("ui-state-active ui-state-focus", t.type.substr(-4) === "down")
            }).delegate(".ui-tooltip-close", "mouseover mouseout", function(t) {
                e(this).toggleClass("ui-state-hover", t.type === "mouseover")
            }), s.content.title.button ? U() : v.rendered && v.redraw()
        }

        function W(e) {
            var t = j.button,
                r = j.title;
            if (!v.rendered) return n;
            e ? (r || z(), U()) : t.remove()
        }

        function X(t, r) {
            var s = j.title;
            if (!v.rendered || !t) return n;
            e.isFunction(t) && (t = t.call(i, F.event, v));
            if (t === n || !t && t !== "") return R(n);
            t.jquery && t.length > 0 ? s.empty().append(t.css({
                display: "block"
            })) : s.html(t), v.redraw(), r !== n && v.rendered && H[0].offsetWidth > 0 && v.reposition(F.event)
        }

        function V(t, r) {
            function o(t) {
                function u(i) {
                    i && (delete o[i.src], clearTimeout(v.timers.img[i.src]), e(i).unbind(B)), e.isEmptyObject(o) && (v.redraw(), r !== n && v.reposition(F.event), t())
                }
                var i, o = {};
                if ((i = s.find("img[src]:not([height]):not([width])")).length === 0) return u();
                i.each(function(t, n) {
                    if (o[n.src] !== undefined) return;
                    var r = 0,
                        i = 3;
                    (function s() {
                        if (n.height || n.width || r > i) return u(n);
                        r += 1, v.timers.img[n.src] = setTimeout(s, 700)
                    })(), e(n).bind("error" + B + " load" + B, function() {
                        u(this)
                    }), o[n.src] = n
                })
            }
            var s = j.content;
            return !v.rendered || !t ? n : (e.isFunction(t) && (t = t.call(i, F.event, v) || ""), t.jquery && t.length > 0 ? s.empty().append(t.css({
                display: "block"
            })) : s.html(t), v.rendered < 0 ? H.queue("fx", o) : (P = 0, o(e.noop)), v)
        }

        function J() {
            function f(e) {
                if (H.hasClass(S)) return n;
                clearTimeout(v.timers.show), clearTimeout(v.timers.hide);
                var r = function() {
                    v.toggle(t, e)
                };
                s.show.delay > 0 ? v.timers.show = setTimeout(r, s.show.delay) : r()
            }

            function l(t) {
                if (H.hasClass(S) || _ || P) return n;
                var i = e(t.relatedTarget || t.target),
                    u = i.closest(x)[0] === H[0],
                    a = i[0] === o.show[0];
                clearTimeout(v.timers.show), clearTimeout(v.timers.hide);
                if (r.target === "mouse" && u || s.hide.fixed && /mouse(out|leave|move)/.test(t.type) && (u || a)) {
                    try {
                        t.preventDefault(), t.stopImmediatePropagation()
                    } catch (f) {}
                    return
                }
                s.hide.delay > 0 ? v.timers.hide = setTimeout(function() {
                    v.hide(t)
                }, s.hide.delay) : v.hide(t)
            }

            function c(e) {
                if (H.hasClass(S)) return n;
                clearTimeout(v.timers.inactive), v.timers.inactive = setTimeout(function() {
                    v.hide(e)
                }, s.hide.inactive)
            }

            function h(e) {
                v.rendered && H[0].offsetWidth > 0 && v.reposition(e)
            }
            var r = s.position,
                o = {
                    show: s.show.target,
                    hide: s.hide.target,
                    viewport: e(r.viewport),
                    document: e(document),
                    body: e(document.body),
                    window: e(window)
                },
                u = {
                    show: e.trim("" + s.show.event).split(" "),
                    hide: e.trim("" + s.hide.event).split(" ")
                },
                a = e.browser.msie && parseInt(e.browser.version, 10) === 6;
            H.bind("mouseenter" + B + " mouseleave" + B, function(e) {
                var t = e.type === "mouseenter";
                t && v.focus(e), H.toggleClass(C, t)
            }), /mouse(out|leave)/i.test(s.hide.event) && s.hide.leave === "window" && o.window.bind("mouseout" + B + " blur" + B, function(e) {
                !/select|option/.test(e.target.nodeName) && !e.relatedTarget && v.hide(e)
            }), s.hide.fixed ? (o.hide = o.hide.add(H), H.bind("mouseover" + B, function() {
                H.hasClass(S) || clearTimeout(v.timers.hide)
            })) : /mouse(over|enter)/i.test(s.show.event) && o.hide.bind("mouseleave" + B, function(e) {
                clearTimeout(v.timers.show)
            }), ("" + s.hide.event).indexOf("unfocus") > -1 && r.container.closest("html").bind("mousedown" + B, function(t) {
                var n = e(t.target),
                    r = v.rendered && !H.hasClass(S) && H[0].offsetWidth > 0,
                    s = n.parents(x).filter(H[0]).length > 0;
                n[0] !== i[0] && n[0] !== H[0] && !s && !i.has(n[0]).length && !n.attr("disabled") && v.hide(t)
            }), "number" == typeof s.hide.inactive && (o.show.bind("qtip-" + p + "-inactive", c), e.each(m.inactiveEvents, function(e, t) {
                o.hide.add(j.tooltip).bind(t + B + "-inactive", c)
            })), e.each(u.hide, function(t, n) {
                var r = e.inArray(n, u.show),
                    i = e(o.hide);
                r > -1 && i.add(o.show).length === i.length || n === "unfocus" ? (o.show.bind(n + B, function(e) {
                    H[0].offsetWidth > 0 ? l(e) : f(e)
                }), delete u.show[r]) : o.hide.bind(n + B, l)
            }), e.each(u.show, function(e, t) {
                o.show.bind(t + B, f)
            }), "number" == typeof s.hide.distance && o.show.add(H).bind("mousemove" + B, function(e) {
                var t = F.origin || {},
                    n = s.hide.distance,
                    r = Math.abs;
                (r(e.pageX - t.pageX) >= n || r(e.pageY - t.pageY) >= n) && v.hide(e)
            }), r.target === "mouse" && (o.show.bind("mousemove" + B, function(e) {
                y = {
                    pageX: e.pageX,
                    pageY: e.pageY,
                    type: "mousemove"
                }
            }), r.adjust.mouse && (s.hide.event && (H.bind("mouseleave" + B, function(e) {
                (e.relatedTarget || e.target) !== o.show[0] && v.hide(e)
            }), j.target.bind("mouseenter" + B + " mouseleave" + B, function(e) {
                F.onTarget = e.type === "mouseenter"
            })), o.document.bind("mousemove" + B, function(e) {
                v.rendered && F.onTarget && !H.hasClass(S) && H[0].offsetWidth > 0 && v.reposition(e || y)
            }))), (r.adjust.resize || o.viewport.length) && (e.event.special.resize ? o.viewport : o.window).bind("resize" + B, h), (o.viewport.length || a && H.css("position") === "fixed") && o.viewport.bind("scroll" + B, h)
        }

        function K() {
            var t = [s.show.target[0], s.hide.target[0], v.rendered && j.tooltip[0], s.position.container[0], s.position.viewport[0], window, document];
            v.rendered ? e([]).pushStack(e.grep(t, function(e) {
                return typeof e == "object"
            })).unbind(B) : s.show.target.unbind(B + "-create")
        }
        var v = this,
            L = document.body,
            A = w + "-" + p,
            _ = 0,
            P = 0,
            H = e(),
            B = ".qtip-" + p,
            j, F;
        v.id = p, v.rendered = n, v.destroyed = n, v.elements = j = {
            target: i
        }, v.timers = {
            img: {}
        }, v.options = s, v.checks = {}, v.plugins = {}, v.cache = F = {
            event: {},
            target: e(),
            disabled: n,
            attr: d,
            onTarget: n,
            lastClass: ""
        }, v.checks.builtin = {
            "^id$": function(r, i, s) {
                var o = s === t ? m.nextid : s,
                    u = w + "-" + o;
                o !== n && o.length > 0 && !e("#" + u).length && (H[0].id = u, j.content[0].id = u + "-content", j.title[0].id = u + "-title")
            },
            "^content.text$": function(e, t, n) {
                V(n)
            },
            "^content.title.text$": function(e, t, n) {
                if (!n) return R();
                !j.title && n && z(), X(n)
            },
            "^content.title.button$": function(e, t, n) {
                W(n)
            },
            "^position.(my|at)$": function(e, t, n) {
                "string" == typeof n && (e[t] = new g.Corner(n))
            },
            "^position.container$": function(e, t, n) {
                v.rendered && H.appendTo(n)
            },
            "^show.ready$": function() {
                v.rendered ? v.toggle(t) : v.render(1)
            },
            "^style.classes$": function(e, t, n) {
                H.attr("class", w + " qtip ui-helper-reset " + n)
            },
            "^style.widget|content.title": q,
            "^events.(render|show|move|hide|focus|blur)$": function(t, n, r) {
                H[(e.isFunction(r) ? "" : "un") + "bind"]("tooltip" + n, r)
            },
            "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                var e = s.position;
                H.attr("tracking", e.target === "mouse" && e.adjust.mouse), K(), J()
            }
        }, e.extend(v, {
            render: function(r) {
                if (v.rendered) return v;
                var o = s.content.text,
                    u = s.content.title.text,
                    a = s.position,
                    f = e.Event("tooltiprender");
                return e.attr(i[0], "aria-describedby", A), H = j.tooltip = e("<div/>", {
                    id: A,
                    "class": w + " qtip ui-helper-reset " + T + " " + s.style.classes + " " + w + "-pos-" + s.position.my.abbrev(),
                    width: s.style.width || "",
                    height: s.style.height || "",
                    tracking: a.target === "mouse" && a.adjust.mouse,
                    role: "alert",
                    "aria-live": "polite",
                    "aria-atomic": n,
                    "aria-describedby": A + "-content",
                    "aria-hidden": t
                }).toggleClass(S, F.disabled).data("qtip", v).appendTo(s.position.container).append(j.content = e("<div />", {
                    "class": w + "-content",
                    id: A + "-content",
                    "aria-atomic": t
                })), v.rendered = -1, P = 1, _ = 1, u && (z(), e.isFunction(u) || X(u, n)), e.isFunction(o) || V(o, n), v.rendered = t, q(), e.each(s.events, function(t, n) {
                    e.isFunction(n) && H.bind(t === "toggle" ? "tooltipshow tooltiphide" : "tooltip" + t, n)
                }), e.each(g, function() {
                    this.initialize === "render" && this(v)
                }), J(), H.queue("fx", function(e) {
                    f.originalEvent = F.event, H.trigger(f, [v]), P = 0, _ = 0, v.redraw(), (s.show.ready || r) && v.toggle(t, F.event, n), e()
                }), v
            },
            get: function(e) {
                var t, n;
                switch (e.toLowerCase()) {
                    case "dimensions":
                        t = {
                            height: H.outerHeight(),
                            width: H.outerWidth()
                        };
                        break;
                    case "offset":
                        t = g.offset(H, s.position.container);
                        break;
                    default:
                        n = I(e.toLowerCase()), t = n[0][n[1]], t = t.precedance ? t.string() : t
                }
                return t
            },
            set: function(i, o) {
                function p(e, t) {
                    var n, r, i;
                    for (n in c)
                        for (r in c[n])
                            if (i = (new RegExp(r, "i")).exec(e)) t.push(i), c[n][r].apply(v, t)
                }
                var u = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,
                    a = /^content\.(title|attr)|style/i,
                    f = n,
                    l = n,
                    c = v.checks,
                    h;
                return "string" == typeof i ? (h = i, i = {}, i[h] = o) : i = e.extend(t, {}, i), e.each(i, function(t, n) {
                    var r = I(t.toLowerCase()),
                        s;
                    s = r[0][r[1]], r[0][r[1]] = "object" == typeof n && n.nodeType ? e(n) : n, i[t] = [r[0], r[1], n, s], f = u.test(t) || f, l = a.test(t) || l
                }), D(s), _ = P = 1, e.each(i, p), _ = P = 0, v.rendered && H[0].offsetWidth > 0 && (f && v.reposition(s.position.target === "mouse" ? r : F.event), l && v.redraw()), v
            },
            toggle: function(i, o) {
                function w() {
                    i ? (e.browser.msie && H[0].style.removeAttribute("filter"), H.css("overflow", ""), "string" == typeof a.autofocus && e(a.autofocus, H).focus(), a.target.trigger("qtip-" + p + "-inactive")) : H.css({
                        display: "",
                        visibility: "",
                        opacity: "",
                        left: "",
                        top: ""
                    }), b = e.Event("tooltip" + (i ? "visible" : "hidden")), b.originalEvent = o ? F.event : r, H.trigger(b, [v])
                }
                if (!v.rendered) return i ? v.render(1) : v;
                var u = i ? "show" : "hide",
                    a = s[u],
                    f = s[i ? "hide" : "show"],
                    l = s.position,
                    c = s.content,
                    h = H[0].offsetWidth > 0,
                    d = i || a.target.length === 1,
                    m = !o || a.target.length < 2 || F.target[0] === o.target,
                    g, b;
                (typeof i).search("boolean|number") && (i = !h);
                if (!H.is(":animated") && h === i && m) return v;
                if (o) {
                    if (/over|enter/.test(o.type) && /out|leave/.test(F.event.type) && s.show.target.add(o.target).length === s.show.target.length && H.has(o.relatedTarget).length) return v;
                    F.event = e.extend({}, o)
                }
                return b = e.Event("tooltip" + u), b.originalEvent = o ? F.event : r, H.trigger(b, [v, 90]), b.isDefaultPrevented() ? v : (e.attr(H[0], "aria-hidden", !i), i ? (F.origin = e.extend({}, y), v.focus(o), e.isFunction(c.text) && V(c.text, n), e.isFunction(c.title.text) && X(c.title.text, n), !M && l.target === "mouse" && l.adjust.mouse && (e(document).bind("mousemove.qtip", function(e) {
                    y = {
                        pageX: e.pageX,
                        pageY: e.pageY,
                        type: "mousemove"
                    }
                }), M = t), v.reposition(o, arguments[2]), (b.solo = !!a.solo) && e(x, a.solo).not(H).qtip("hide", b)) : (clearTimeout(v.timers.show), delete F.origin, M && !e(x + '[tracking="true"]:visible', a.solo).not(H).length && (e(document).unbind("mousemove.qtip"), M = n), v.blur(o)), a.effect === n || d === n ? (H[u](), w.call(H)) : e.isFunction(a.effect) ? (H.stop(1, 1), a.effect.call(H, v), H.queue("fx", function(e) {
                    w(), e()
                })) : H.fadeTo(90, i ? 1 : 0, w), i && a.target.trigger("qtip-" + p + "-inactive"), v)
            },
            show: function(e) {
                return v.toggle(t, e)
            },
            hide: function(e) {
                return v.toggle(n, e)
            },
            focus: function(t) {
                if (!v.rendered) return v;
                var n = e(x),
                    r = parseInt(H[0].style.zIndex, 10),
                    i = m.zindex + n.length,
                    s = e.extend({}, t),
                    o, u;
                return H.hasClass(N) || (u = e.Event("tooltipfocus"), u.originalEvent = s, H.trigger(u, [v, i]), u.isDefaultPrevented() || (r !== i && (n.each(function() {
                    this.style.zIndex > r && (this.style.zIndex = this.style.zIndex - 1)
                }), n.filter("." + N).qtip("blur", s)), H.addClass(N)[0].style.zIndex = i)), v
            },
            blur: function(t) {
                var n = e.extend({}, t),
                    r;
                return H.removeClass(N), r = e.Event("tooltipblur"), r.originalEvent = n, H.trigger(r, [v]), v
            },
            reposition: function(t, r) {
                if (!v.rendered || _) return v;
                _ = 1;
                var i = s.position.target,
                    o = s.position,
                    u = o.my,
                    p = o.at,
                    d = o.adjust,
                    m = d.method.split(" "),
                    b = H.outerWidth(),
                    w = H.outerHeight(),
                    E = 0,
                    S = 0,
                    x = e.Event("tooltipmove"),
                    T = H.css("position") === "fixed",
                    N = o.viewport,
                    C = {
                        left: 0,
                        top: 0
                    },
                    k = o.container,
                    L = H[0].offsetWidth > 0,
                    A, O, M;
                if (e.isArray(i) && i.length === 2) p = {
                    x: f,
                    y: a
                }, C = {
                    left: i[0],
                    top: i[1]
                };
                else if (i === "mouse" && (t && t.pageX || F.event.pageX)) p = {
                    x: f,
                    y: a
                }, t = (!t || t.type !== "resize" && t.type !== "scroll" ? t && t.pageX && t.type === "mousemove" ? t : y && y.pageX && (d.mouse || !t || !t.pageX) ? {
                    pageX: y.pageX,
                    pageY: y.pageY
                } : !d.mouse && F.origin && F.origin.pageX && s.show.distance ? F.origin : t : F.event) || t || F.event || y || {}, C = {
                    top: t.pageY,
                    left: t.pageX
                };
                else {
                    i === "event" && t && t.target && t.type !== "scroll" && t.type !== "resize" ? F.target = e(t.target) : i !== "event" && (F.target = e(i.jquery ? i : j.target)), i = F.target, i = e(i).eq(0);
                    if (i.length === 0) return v;
                    i[0] === document || i[0] === window ? (E = g.iOS ? window.innerWidth : i.width(), S = g.iOS ? window.innerHeight : i.height(), i[0] === window && (C = {
                        top: (N || i).scrollTop(),
                        left: (N || i).scrollLeft()
                    })) : g.imagemap && i.is("area") ? A = g.imagemap(v, i, p, g.viewport ? m : n) : g.svg && typeof i[0].xmlbase == "string" ? A = g.svg(v, i, p, g.viewport ? m : n) : (E = i.outerWidth(), S = i.outerHeight(), C = g.offset(i, k)), A && (E = A.width, S = A.height, O = A.offset, C = A.position);
                    if (g.iOS > 3.1 && g.iOS < 4.1 || g.iOS >= 4.3 && g.iOS < 4.33 || !g.iOS && T) M = e(window), C.left -= M.scrollLeft(), C.top -= M.scrollTop();
                    C.left += p.x === c ? E : p.x === h ? E / 2 : 0, C.top += p.y === l ? S : p.y === h ? S / 2 : 0
                }
                return C.left += d.x + (u.x === c ? -b : u.x === h ? -b / 2 : 0), C.top += d.y + (u.y === l ? -w : u.y === h ? -w / 2 : 0), g.viewport ? (C.adjusted = g.viewport(v, C, o, E, S, b, w), O && C.adjusted.left && (C.left += O.left), O && C.adjusted.top && (C.top += O.top)) : C.adjusted = {
                    left: 0,
                    top: 0
                }, x.originalEvent = e.extend({}, t), H.trigger(x, [v, C, N.elem || N]), x.isDefaultPrevented() ? v : (delete C.adjusted, r === n || !L || isNaN(C.left) || isNaN(C.top) || i === "mouse" || !e.isFunction(o.effect) ? H.css(C) : e.isFunction(o.effect) && (o.effect.call(H, v, e.extend({}, C)), H.queue(function(t) {
                    e(this).css({
                        opacity: "",
                        height: ""
                    }), e.browser.msie && this.style.removeAttribute("filter"), t()
                })), _ = 0, v)
            },
            redraw: function() {
                if (v.rendered < 1 || P) return v;
                var e = s.position.container,
                    t, n, r, i;
                return P = 1, s.style.height && H.css(u, s.style.height), s.style.width ? H.css(o, s.style.width) : (H.css(o, "").addClass(k), n = H.width() + 1, r = H.css("max-width") || "", i = H.css("min-width") || "", t = (r + i).indexOf("%") > -1 ? e.width() / 100 : 0, r = (r.indexOf("%") > -1 ? t : 1) * parseInt(r, 10) || n, i = (i.indexOf("%") > -1 ? t : 1) * parseInt(i, 10) || 0, n = r + i ? Math.min(Math.max(n, i), r) : n, H.css(o, Math.round(n)).removeClass(k)), P = 0, v
            },
            disable: function(t) {
                return "boolean" != typeof t && (t = !H.hasClass(S) && !F.disabled), v.rendered ? (H.toggleClass(S, t), e.attr(H[0], "aria-disabled", t)) : F.disabled = !!t, v
            },
            enable: function() {
                return v.disable(n)
            },
            destroy: function() {
                var n = i[0],
                    r = e.attr(n, O),
                    o = i.data("qtip");
                v.destroyed = t, v.rendered && (H.stop(1, 0).remove(), e.each(v.plugins, function() {
                    this.destroy && this.destroy()
                })), clearTimeout(v.timers.show), clearTimeout(v.timers.hide), K();
                if (!o || v === o) e.removeData(n, "qtip"), s.suppress && r && (e.attr(n, "title", r), i.removeAttr(O)), i.removeAttr("aria-describedby");
                return i.unbind(".qtip-" + p), delete b[v.id], i
            }
        })
    }

    function H(i, s) {
        var o, u, a, f, l, c = e(this),
            h = e(document.body),
            p = this === document ? h : c,
            d = c.metadata ? c.metadata(s.metadata) : r,
            v = s.metadata.type === "html5" && d ? d[s.metadata.name] : r,
            y = c.data(s.metadata.name || "qtipopts");
        try {
            y = typeof y == "string" ? e.parseJSON(y) : y
        } catch (b) {
            _("Unable to parse HTML5 attribute data: " + y)
        }
        f = e.extend(t, {}, m.defaults, s, typeof y == "object" ? D(y) : r, D(v || d)), u = f.position, f.id = i;
        if ("boolean" == typeof f.content.text) {
            a = c.attr(f.content.attr);
            if (f.content.attr === n || !a) return _("Unable to locate content for tooltip! Aborting render of tooltip on element: ", c), n;
            f.content.text = a
        }
        u.container.length || (u.container = h), u.target === n && (u.target = p), f.show.target === n && (f.show.target = p), f.show.solo === t && (f.show.solo = u.container.closest("body")), f.hide.target === n && (f.hide.target = p), f.position.viewport === t && (f.position.viewport = u.container), u.container = u.container.eq(0), u.at = new g.Corner(u.at), u.my = new g.Corner(u.my);
        if (e.data(this, "qtip"))
            if (f.overwrite) c.qtip("destroy");
            else if (f.overwrite === n) return n;
        return f.suppress && (l = e.attr(this, "title")) && e(this).removeAttr("title").attr(O, l).attr("title", ""), o = new P(c, f, i, !!a), e.data(this, "qtip", o), c.bind("remove.qtip-" + i + " removeqtip.qtip-" + i, function() {
            o.destroy()
        }), o
    }

    function B(e, t, n) {
        var r = Math.ceil(t / 2),
            i = Math.ceil(n / 2),
            s = {
                bottomright: [
                    [0, 0],
                    [t, n],
                    [t, 0]
                ],
                bottomleft: [
                    [0, 0],
                    [t, 0],
                    [0, n]
                ],
                topright: [
                    [0, n],
                    [t, 0],
                    [t, n]
                ],
                topleft: [
                    [0, 0],
                    [0, n],
                    [t, n]
                ],
                topcenter: [
                    [0, n],
                    [r, 0],
                    [t, n]
                ],
                bottomcenter: [
                    [0, 0],
                    [t, 0],
                    [r, n]
                ],
                rightcenter: [
                    [0, 0],
                    [t, i],
                    [0, n]
                ],
                leftcenter: [
                    [t, 0],
                    [t, n],
                    [0, i]
                ]
            };
        return s.lefttop = s.bottomright, s.righttop = s.bottomleft, s.leftbottom = s.topright, s.rightbottom = s.topleft, s[e.string()]
    }

    function j(p, d) {
        function L() {
            S.width = y.height, S.height = y.width
        }

        function A() {
            S.width = y.width, S.height = y.height
        }

        function O(e, r, o, u) {
            if (!b.tip) return;
            var d = m.corner.clone(),
                g = o.adjusted,
                w = p.options.position.adjust.method.split(" "),
                S = w[0],
                x = w[1] || w[0],
                T = {
                    left: n,
                    top: n,
                    x: 0,
                    y: 0
                },
                N, C = {},
                k;
            m.corner.fixed !== t && (S === v && d.precedance === i && g.left && d.y !== h ? d.precedance = d.precedance === i ? s : i : S !== v && g.left && (d.x = d.x === h ? g.left > 0 ? f : c : d.x === f ? c : f), x === v && d.precedance === s && g.top && d.x !== h ? d.precedance = d.precedance === s ? i : s : x !== v && g.top && (d.y = d.y === h ? g.top > 0 ? a : l : d.y === a ? l : a), d.string() !== E.corner.string() && (E.top !== g.top || E.left !== g.left) && m.update(d, n)), N = m.position(d, g), N[d.x] += M(d, d.x, t), N[d.y] += M(d, d.y, t), N.right !== undefined && (N.left = -N.right), N.bottom !== undefined && (N.top = -N.bottom), N.user = Math.max(0, y.offset);
            if (T.left = S === v && !!g.left) d.x === h ? C["margin-left"] = T.x = N["margin-left"] - g.left : (k = N.right !== undefined ? [g.left, -N.left] : [-g.left, N.left], (T.x = Math.max(k[0], k[1])) > k[0] && (o.left -= g.left, T.left = n), C[N.right !== undefined ? c : f] = T.x);
            if (T.top = x === v && !!g.top) d.y === h ? C["margin-top"] = T.y = N["margin-top"] - g.top : (k = N.bottom !== undefined ? [g.top, -N.top] : [-g.top, N.top], (T.y = Math.max(k[0], k[1])) > k[0] && (o.top -= g.top, T.top = n), C[N.bottom !== undefined ? l : a] = T.y);
            b.tip.css(C).toggle(!(T.x && T.y || d.x === h && T.y || d.y === h && T.x)), o.left -= N.left.charAt ? N.user : S !== v || T.top || !T.left && !T.top ? N.left : 0, o.top -= N.top.charAt ? N.user : x !== v || T.left || !T.left && !T.top ? N.top : 0, E.left = g.left, E.top = g.top, E.corner = d.clone()
        }

        function M(e, t, n) {
            t = t ? t : e[e.precedance];
            var r = w.hasClass(k),
                i = b.titlebar && e.y === a,
                s = i ? b.titlebar : b.tooltip,
                o = "border-" + t + "-width",
                u;
            return w.addClass(k), u = parseInt(s.css(o), 10), u = (n ? u || parseInt(w.css(o), 10) : u) || 0, w.toggleClass(k, r), u
        }

        function _(t) {
            function f(e) {
                return parseInt(r.css(e), 10) || parseInt(w.css(e), 10)
            }
            var n = b.titlebar && t.y === a,
                r = n ? b.titlebar : b.content,
                i = e.browser.mozilla,
                s = i ? "-moz-" : e.browser.webkit ? "-webkit-" : "",
                o = "border-radius-" + t.y + t.x,
                u = "border-" + t.y + "-" + t.x + "-radius";
            return f(u) || f(s + u) || f(s + o) || f(o) || 0
        }

        function D(e) {
            var t = e.precedance === s,
                n = S[t ? o : u],
                r = S[t ? u : o],
                i = e.string().indexOf(h) > -1,
                a = n * (i ? .5 : 1),
                f = Math.pow,
                l = Math.round,
                c, p, d, v = Math.sqrt(f(a, 2) + f(r, 2)),
                m = [T / a * v, T / r * v];
            return m[2] = Math.sqrt(f(m[0], 2) - f(T, 2)), m[3] = Math.sqrt(f(m[1], 2) - f(T, 2)), c = v + m[2] + m[3] + (i ? 0 : m[0]), p = c / v, d = [l(p * r), l(p * n)], {
                height: d[t ? 0 : 1],
                width: d[t ? 1 : 0]
            }
        }
        var m = this,
            y = p.options.style.tip,
            b = p.elements,
            w = b.tooltip,
            E = {
                top: 0,
                left: 0
            },
            S = {
                width: y.width,
                height: y.height
            },
            x = {},
            T = y.border || 0,
            N = ".qtip-tip",
            C = !!(e("<canvas />")[0] || {}).getContext;
        m.corner = r, m.mimic = r, m.border = T, m.offset = y.offset, m.size = S, p.checks.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function() {
                m.init() || m.destroy(), p.reposition()
            },
            "^style.tip.(height|width)$": function() {
                S = {
                    width: y.width,
                    height: y.height
                }, m.create(), m.update(), p.reposition()
            },
            "^content.title.text|style.(classes|widget)$": function() {
                b.tip && b.tip.length && m.update()
            }
        }, e.extend(m, {
            init: function() {
                var t = m.detectCorner() && (C || e.browser.msie);
                return t && (m.create(), m.update(), w.unbind(N).bind("tooltipmove" + N, O)), t
            },
            detectCorner: function() {
                var e = y.corner,
                    r = p.options.position,
                    i = r.at,
                    s = r.my.string ? r.my.string() : r.my;
                return e === n || s === n && i === n ? n : (e === t ? m.corner = new g.Corner(s) : e.string || (m.corner = new g.Corner(e), m.corner.fixed = t), E.corner = new g.Corner(m.corner.string()), m.corner.string() !== "centercenter")
            },
            detectColours: function(t) {
                var n, r, i, s = b.tip.css("cssText", ""),
                    o = t || m.corner,
                    u = o[o.precedance],
                    f = "border-" + u + "-color",
                    l = "border" + u.charAt(0) + u.substr(1) + "Color",
                    c = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
                    p = "background-color",
                    d = "transparent",
                    v = " !important",
                    g = b.titlebar && (o.y === a || o.y === h && s.position().top + S.height / 2 + y.offset < b.titlebar.outerHeight(1)),
                    E = g ? b.titlebar : b.tooltip;
                w.addClass(k), x.fill = r = s.css(p), x.border = i = s[0].style[l] || s.css(f) || w.css(f);
                if (!r || c.test(r)) x.fill = E.css(p) || d, c.test(x.fill) && (x.fill = w.css(p) || r);
                if (!i || c.test(i) || i === e(document.body).css("color")) {
                    x.border = E.css(f) || d;
                    if (c.test(x.border) || x.border === E.css("color")) x.border = w.css(f) || w.css(l) || i
                }
                e("*", s).add(s).css("cssText", p + ":" + d + v + ";border:0" + v + ";"), w.removeClass(k)
            },
            create: function() {
                var t = S.width,
                    n = S.height,
                    r;
                b.tip && b.tip.remove(), b.tip = e("<div />", {
                    "class": "ui-tooltip-tip"
                }).css({
                    width: t,
                    height: n
                }).prependTo(w), C ? e("<canvas />").appendTo(b.tip)[0].getContext("2d").save() : (r = '<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>', b.tip.html(r + r), e("*", b.tip).bind("click mousedown", function(e) {
                    e.stopPropagation()
                }))
            },
            update: function(o, u) {
                var p = b.tip,
                    d = p.children(),
                    v = S.width,
                    N = S.height,
                    k = "px solid ",
                    O = "px dashed transparent",
                    _ = y.mimic,
                    P = Math.round,
                    H, j, F, I, q;
                o || (o = E.corner || m.corner), _ === n ? _ = o : (_ = new g.Corner(_), _.precedance = o.precedance, _.x === "inherit" ? _.x = o.x : _.y === "inherit" ? _.y = o.y : _.x === _.y && (_[o.precedance] = o[o.precedance])), H = _.precedance, o.precedance === i ? L() : A(), b.tip.css({
                    width: v = S.width,
                    height: N = S.height
                }), m.detectColours(o), x.border !== "transparent" ? (T = M(o, r, t), y.border === 0 && T > 0 && (x.fill = x.border), m.border = T = y.border !== t ? y.border : T) : m.border = T = 0, F = B(_, v, N), m.size = q = D(o), p.css(q), o.precedance === s ? I = [P(_.x === f ? T : _.x === c ? q.width - v - T : (q.width - v) / 2), P(_.y === a ? q.height - N : 0)] : I = [P(_.x === f ? q.width - v : 0), P(_.y === a ? T : _.y === l ? q.height - N - T : (q.height - N) / 2)], C ? (d.attr(q), j = d[0].getContext("2d"), j.restore(), j.save(), j.clearRect(0, 0, 3e3, 3e3), j.fillStyle = x.fill, j.strokeStyle = x.border, j.lineWidth = T * 2, j.lineJoin = "miter", j.miterLimit = 100, j.translate(I[0], I[1]), j.beginPath(), j.moveTo(F[0][0], F[0][1]), j.lineTo(F[1][0], F[1][1]), j.lineTo(F[2][0], F[2][1]), j.closePath(), T && (w.css("background-clip") === "border-box" && (j.strokeStyle = x.fill, j.stroke()), j.strokeStyle = x.border, j.stroke()), j.fill()) : (F = "m" + F[0][0] + "," + F[0][1] + " l" + F[1][0] + "," + F[1][1] + " " + F[2][0] + "," + F[2][1] + " xe", I[2] = T && /^(r|b)/i.test(o.string()) ? parseFloat(e.browser.version, 10) === 8 ? 2 : 1 : 0, d.css({
                    antialias: "" + (_.string().indexOf(h) > -1),
                    left: I[0] - I[2] * Number(H === i),
                    top: I[1] - I[2] * Number(H === s),
                    width: v + T,
                    height: N + T
                }).each(function(t) {
                    var n = e(this);
                    n[n.prop ? "prop" : "attr"]({
                        coordsize: v + T + " " + (N + T),
                        path: F,
                        fillcolor: x.fill,
                        filled: !!t,
                        stroked: !t
                    }).css({
                        display: T || t ? "block" : "none"
                    }), !t && n.html() === "" && n.html('<vml:stroke weight="' + T * 2 + 'px" color="' + x.border + '" miterlimit="1000" joinstyle="miter" ' + ' style="behavior:url(#default#VML); display:inline-block;" />')
                })), u !== n && m.position(o)
            },
            position: function(t) {
                var r = b.tip,
                    l = {},
                    c = Math.max(0, y.offset),
                    p, d, v;
                return y.corner === n || !r ? n : (t = t || m.corner, p = t.precedance, d = D(t), v = [t.x, t.y], p === i && v.reverse(), e.each(v, function(e, n) {
                    var r, i;
                    n === h ? (r = p === s ? f : a, l[r] = "50%", l["margin-" + r] = -Math.round(d[p === s ? o : u] / 2) + c) : (r = M(t, n), i = _(t), l[n] = e ? 0 : c + (i > r ? i : -r))
                }), l[t[p]] -= d[p === i ? o : u], r.css({
                    top: "",
                    bottom: "",
                    left: "",
                    right: "",
                    margin: ""
                }).css(l), l)
            },
            destroy: function() {
                b.tip && b.tip.remove(), b.tip = !1, w.unbind(N)
            }
        }), m.init()
    }
    var t = !0,
        n = !1,
        r = null,
        i = "x",
        s = "y",
        o = "width",
        u = "height",
        a = "top",
        f = "left",
        l = "bottom",
        c = "right",
        h = "center",
        p = "flip",
        d = "flipinvert",
        v = "shift",
        m, g, y, b = {},
        w = "ui-tooltip",
        E = "ui-widget",
        S = "ui-state-disabled",
        x = "div.qtip." + w,
        T = w + "-default",
        N = w + "-focus",
        C = w + "-hover",
        k = w + "-fluid",
        L = "-31000px",
        A = "_replacedByqTip",
        O = "oldtitle",
        M;
    m = e.fn.qtip = function(i, s, o) {
        var u = ("" + i).toLowerCase(),
            a = r,
            f = e.makeArray(arguments).slice(1),
            l = f[f.length - 1],
            c = this[0] ? e.data(this[0], "qtip") : r;
        if (!arguments.length && c || u === "api") return c;
        if ("string" == typeof i) return this.each(function() {
            var r = e.data(this, "qtip");
            if (!r) return t;
            l && l.timeStamp && (r.cache.event = l);
            if (u !== "option" && u !== "options" || !s) r[u] && r[u].apply(r[u], f);
            else {
                if (!e.isPlainObject(s) && o === undefined) return a = r.get(s), n;
                r.set(s, o)
            }
        }), a !== r ? a : this;
        if ("object" == typeof i || !arguments.length) return c = D(e.extend(t, {}, i)), m.bind.call(this, c, l)
    }, m.bind = function(r, i) {
        return this.each(function(s) {
            function h(t) {
                function r() {
                    l.render(typeof t == "object" || o.show.ready), u.show.add(u.hide).unbind(f)
                }
                if (l.cache.disabled) return n;
                l.cache.event = e.extend({}, t), l.cache.target = t ? e(t.target) : [undefined], o.show.delay > 0 ? (clearTimeout(l.timers.show), l.timers.show = setTimeout(r, o.show.delay), a.show !== a.hide && u.hide.bind(a.hide, function() {
                    clearTimeout(l.timers.show)
                })) : r()
            }
            var o, u, a, f, l, c;
            c = e.isArray(r.id) ? r.id[s] : r.id, c = !c || c === n || c.length < 1 || b[c] ? m.nextid++ : b[c] = c, f = ".qtip-" + c + "-create", l = H.call(this, c, r);
            if (l === n) return t;
            o = l.options, e.each(g, function() {
                this.initialize === "initialize" && this(l)
            }), u = {
                show: o.show.target,
                hide: o.hide.target
            }, a = {
                show: e.trim("" + o.show.event).replace(/ /g, f + " ") + f,
                hide: e.trim("" + o.hide.event).replace(/ /g, f + " ") + f
            }, /mouse(over|enter)/i.test(a.show) && !/mouse(out|leave)/i.test(a.hide) && (a.hide += " mouseleave" + f), u.show.bind("mousemove" + f, function(e) {
                y = {
                    pageX: e.pageX,
                    pageY: e.pageY,
                    type: "mousemove"
                }, l.cache.onTarget = t
            }), u.show.bind(a.show, h), (o.show.ready || o.prerender) && h(i)
        })
    }, g = m.plugins = {
        Corner: function(e) {
            e = ("" + e).replace(/([A-Z])/, " $1").replace(/middle/gi, h).toLowerCase(), this.x = (e.match(/left|right/i) || e.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (e.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase();
            var t = e.charAt(0);
            this.precedance = t === "t" || t === "b" ? s : i, this.string = function() {
                return this.precedance === s ? this.y + this.x : this.x + this.y
            }, this.abbrev = function() {
                var e = this.x.substr(0, 1),
                    t = this.y.substr(0, 1);
                return e === t ? e : this.precedance === s ? t + e : e + t
            }, this.invertx = function(e) {
                this.x = this.x === f ? c : this.x === c ? f : e || this.x
            }, this.inverty = function(e) {
                this.y = this.y === a ? l : this.y === l ? a : e || this.y
            }, this.clone = function() {
                return {
                    x: this.x,
                    y: this.y,
                    precedance: this.precedance,
                    string: this.string,
                    abbrev: this.abbrev,
                    clone: this.clone,
                    invertx: this.invertx,
                    inverty: this.inverty
                }
            }
        },
        offset: function(t, n) {
            function f(e, t) {
                r.left += t * e.scrollLeft(), r.top += t * e.scrollTop()
            }
            var r = t.offset(),
                i = t.closest("body")[0],
                s = n,
                o, u, a;
            if (s) {
                do s.css("position") !== "static" && (u = s.position(), r.left -= u.left + (parseInt(s.css("borderLeftWidth"), 10) || 0) + (parseInt(s.css("marginLeft"), 10) || 0), r.top -= u.top + (parseInt(s.css("borderTopWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0), !o && (a = s.css("overflow")) !== "hidden" && a !== "visible" && (o = s)); while ((s = e(s[0].offsetParent)).length);
                o && o[0] !== i && f(o, 1)
            }
            return r
        },
        iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || n,
        fn: {
            attr: function(t, n) {
                if (this.length) {
                    var r = this[0],
                        i = "title",
                        s = e.data(r, "qtip");
                    if (t === i && s && "object" == typeof s && s.options.suppress) return arguments.length < 2 ? e.attr(r, O) : (s && s.options.content.attr === i && s.cache.attr && s.set("content.text", n), this.attr(O, n))
                }
                return e.fn["attr" + A].apply(this, arguments)
            },
            clone: function(t) {
                var n = e([]),
                    r = "title",
                    i = e.fn["clone" + A].apply(this, arguments);
                return t || i.filter("[" + O + "]").attr("title", function() {
                    return e.attr(this, O)
                }).removeAttr(O), i
            }
        }
    }, e.each(g.fn, function(n, r) {
        if (!r || e.fn[n + A]) return t;
        var i = e.fn[n + A] = e.fn[n];
        e.fn[n] = function() {
            return r.apply(this, arguments) || i.apply(this, arguments)
        }
    }), e.ui || (e["cleanData" + A] = e.cleanData, e.cleanData = function(t) {
        for (var n = 0, r;
            (r = t[n]) !== undefined; n++) try {
            e(r).triggerHandler("removeqtip")
        } catch (i) {}
        e["cleanData" + A](t)
    }), m.version = "@VERSION", m.nextid = 0, m.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), m.zindex = 15e3, m.defaults = {
        prerender: n,
        id: n,
        overwrite: t,
        suppress: t,
        content: {
            text: t,
            attr: "title",
            title: {
                text: n,
                button: n
            }
        },
        position: {
            my: "top left",
            at: "bottom right",
            target: n,
            container: n,
            viewport: n,
            adjust: {
                x: 0,
                y: 0,
                mouse: t,
                resize: t,
                method: "flip flip"
            },
            effect: function(t, r, i) {
                e(this).animate(r, {
                    duration: 200,
                    queue: n
                })
            }
        },
        show: {
            target: n,
            event: "mouseenter",
            effect: t,
            delay: 90,
            solo: n,
            ready: n,
            autofocus: n
        },
        hide: {
            target: n,
            event: "mouseleave",
            effect: t,
            delay: 0,
            fixed: n,
            inactive: n,
            leave: "window",
            distance: n
        },
        style: {
            classes: "",
            widget: n,
            width: n,
            height: n,
            def: t
        },
        events: {
            render: r,
            move: r,
            show: r,
            hide: r,
            toggle: r,
            visible: r,
            hidden: r,
            focus: r,
            blur: r
        }
    }, g.tip = function(e) {
        var t = e.plugins.tip;
        return "object" == typeof t ? t : e.plugins.tip = new j(e)
    }, g.tip.initialize = "render", g.tip.sanitize = function(e) {
        var n = e.style,
            r;
        n && "tip" in n && (r = e.style.tip, typeof r != "object" && (e.style.tip = {
            corner: r
        }), /string|boolean/i.test(typeof r.corner) || (r.corner = t), typeof r.width != "number" && delete r.width, typeof r.height != "number" && delete r.height, typeof r.border != "number" && r.border !== t && delete r.border, typeof r.offset != "number" && delete r.offset)
    }, e.extend(t, m.defaults, {
        style: {
            tip: {
                corner: t,
                mimic: n,
                width: 6,
                height: 6,
                border: t,
                offset: 0
            }
        }
    }), g.viewport = function(e, t, n, r, p, m, g) {
        function H(e, n, r, i, s, o, u, a, f) {
            var l = t[s],
                c = E[e],
                p = S[e],
                m = r === v,
                g = -L.offset[s] + k.offset[s] + k["scroll" + s],
                y = c === s ? f : c === o ? -f : -f / 2,
                b = p === s ? a : p === o ? -a : -a / 2,
                w = O && O.size ? O.size[u] || 0 : 0,
                x = O && O.corner && O.corner.precedance === e && !m ? w : 0,
                T = g - l + x,
                N = l + f - k[u] - g + x,
                C = y - (E.precedance === e || c === E[n] ? b : 0) - (p === h ? a / 2 : 0);
            return m ? (x = O && O.corner && O.corner.precedance === n ? w : 0, C = (c === s ? 1 : -1) * y - x, t[s] += T > 0 ? T : N > 0 ? -N : 0, t[s] = Math.max(-L.offset[s] + k.offset[s] + (x && O.corner[e] === h ? O.offset : 0), l - C, Math.min(Math.max(-L.offset[s] + k.offset[s] + k[u], l + C), t[s]))) : (i *= r === d ? 2 : 0, T > 0 && (c !== s || N > 0) ? (t[s] -= C + i, D["invert" + e](s)) : N > 0 && (c !== o || T > 0) && (t[s] -= (c === h ? -C : C) + i, D["invert" + e](o)), t[s] < g && -t[s] > N && (t[s] = l, D = undefined)), t[s] - l
        }
        var y = n.target,
            b = e.elements.tooltip,
            E = n.my,
            S = n.at,
            x = n.adjust,
            T = x.method.split(" "),
            N = T[0],
            C = T[1] || T[0],
            k = n.viewport,
            L = n.container,
            A = e.cache,
            O = e.plugins.tip,
            M = {
                left: 0,
                top: 0
            },
            _, D, P;
        if (!k.jquery || y[0] === window || y[0] === document.body || x.method === "none") return M;
        _ = b.css("position") === "fixed", k = {
            elem: k,
            height: k[(k[0] === window ? "h" : "outerH") + "eight"](),
            width: k[(k[0] === window ? "w" : "outerW") + "idth"](),
            scrollleft: _ ? 0 : k.scrollLeft(),
            scrolltop: _ ? 0 : k.scrollTop(),
            offset: k.offset() || {
                left: 0,
                top: 0
            }
        }, L = {
            elem: L,
            scrollLeft: L.scrollLeft(),
            scrollTop: L.scrollTop(),
            offset: L.offset() || {
                left: 0,
                top: 0
            }
        };
        if (N !== "shift" || C !== "shift") D = E.clone();
        return M = {
            left: N !== "none" ? H(i, s, N, x.x, f, c, o, r, m) : 0,
            top: C !== "none" ? H(s, i, C, x.y, a, l, u, p, g) : 0
        }, D && A.lastClass !== (P = w + "-pos-" + D.abbrev()) && b.removeClass(e.cache.lastClass).addClass(e.cache.lastClass = P), M
    }
});
var ZeroClipboard = {
    version: "1.0.8",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function(e) {
        return typeof e == "string" && (e = document.getElementById(e)), e.addClass || (e.hide = function() {
            this.style.display = "none"
        }, e.show = function() {
            this.style.display = ""
        }, e.addClass = function(e) {
            this.removeClass(e), this.className += " " + e
        }, e.removeClass = function(e) {
            var t = this.className.split(/\s+/),
                n = -1;
            for (var r = 0; r < t.length; r++) t[r] == e && (n = r, r = t.length);
            return n > -1 && (t.splice(n, 1), this.className = t.join(" ")), this
        }, e.hasClass = function(e) {
            return !!this.className.match(new RegExp("\\s*" + e + "\\s*"))
        }), e
    },
    setMoviePath: function(e) {
        this.moviePath = e
    },
    newClient: function() {
        return new ZeroClipboard.Client
    },
    dispatch: function(e, t, n) {
        var r = this.clients[e];
        r && r.receiveEvent(t, n)
    },
    register: function(e, t) {
        this.clients[e] = t
    },
    getDOMObjectPosition: function(e, t) {
        var n = {
            left: 0,
            top: 0,
            width: e.width ? e.width : e.offsetWidth,
            height: e.height ? e.height : e.offsetHeight
        };
        while (e && e != t) n.left += e.offsetLeft, n.top += e.offsetTop, e = e.offsetParent;
        return n
    },
    Client: function(e) {
        this.handlers = {}, this.id = ZeroClipboard.nextId++, this.movieId = "ZeroClipboardMovie_" + this.id, ZeroClipboard.register(this.id, this), e && this.glue(e)
    }
};
ZeroClipboard.Client.prototype = {
        id: 0,
        ready: !1,
        movie: null,
        clipText: "",
        handCursorEnabled: !0,
        cssEffects: !0,
        handlers: null,
        zIndex: 99,
        glue: function(e, t, n) {
            this.domElement = ZeroClipboard.$(e), this.domElement.style.zIndex && (this.zIndex = parseInt(this.domElement.style.zIndex, 10) + 1), typeof t == "string" ? t = ZeroClipboard.$(t) : typeof t == "undefined" && (t = document.getElementsByTagName("body")[0]);
            var r = ZeroClipboard.getDOMObjectPosition(this.domElement, t);
            this.div = document.createElement("div");
            var i = this.div.style;
            i.position = "absolute", i.left = "" + r.left + "px", i.top = "" + r.top + "px", i.width = "" + r.width + "px", i.height = "" + r.height + "px", i.zIndex = this.zIndex;
            if (typeof n == "object")
                for (var s in n) i[s] = n[s];
            t.appendChild(this.div), this.div.innerHTML = this.getHTML(r.width, r.height)
        },
        getHTML: function(e, t) {
            var n = "",
                r = "id=" + this.id + "&width=" + e + "&height=" + t;
            if (navigator.userAgent.match(/MSIE/)) {
                var i = location.href.match(/^https/i) ? "https://" : "http://";
                n += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + i + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + e + '" height="' + t + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + r + '"/><param name="wmode" value="transparent"/></object>'
            } else n += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + e + '" height="' + t + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="/web/20140209033735/http://www.macromedia.com/go/getflashplayer" flashvars="' + r + '" wmode="transparent" />';
            return n
        },
        hide: function() {
            this.div && (this.div.style.left = "-2000px")
        },
        show: function() {
            this.reposition()
        },
        destroy: function() {
            if (this.domElement && this.div) {
                this.hide(), this.div.innerHTML = "";
                var e = document.getElementsByTagName("body")[0];
                try {
                    e.removeChild(this.div)
                } catch (t) {}
                this.domElement = null, this.div = null
            }
        },
        reposition: function(e) {
            e && (this.domElement = ZeroClipboard.$(e), this.domElement || this.hide());
            if (this.domElement && this.div) {
                var t = ZeroClipboard.getDOMObjectPosition(this.domElement),
                    n = this.div.style;
                n.left = "" + t.left + "px", n.top = "" + t.top + "px"
            }
        },
        setText: function(e) {
            this.clipText = e, this.ready && this.movie.setText(e)
        },
        addEventListener: function(e, t) {
            e = e.toString().toLowerCase().replace(/^on/, ""), this.handlers[e] || (this.handlers[e] = []), this.handlers[e].push(t)
        },
        setHandCursor: function(e) {
            this.handCursorEnabled = e, this.ready && this.movie.setHandCursor(e)
        },
        setCSSEffects: function(e) {
            this.cssEffects = !!e
        },
        receiveEvent: function(e, t) {
            e = e.toString().toLowerCase().replace(/^on/, "");
            switch (e) {
                case "load":
                    this.movie = document.getElementById(this.movieId);
                    if (!this.movie) {
                        var n = this;
                        setTimeout(function() {
                            n.receiveEvent("load", null)
                        }, 1);
                        return
                    }
                    if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                        var n = this;
                        setTimeout(function() {
                            n.receiveEvent("load", null)
                        }, 100), this.ready = !0;
                        return
                    }
                    this.ready = !0, this.movie.setText(this.clipText), this.movie.setHandCursor(this.handCursorEnabled);
                    break;
                case "mouseover":
                    this.domElement && this.cssEffects && (this.domElement.addClass("hover"), this.recoverActive && this.domElement.addClass("active"));
                    break;
                case "mouseout":
                    this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0), this.domElement.removeClass("hover"));
                    break;
                case "mousedown":
                    this.domElement && this.cssEffects && this.domElement.addClass("active");
                    break;
                case "mouseup":
                    this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
            }
            if (this.handlers[e])
                for (var r = 0, i = this.handlers[e].length; r < i; r++) {
                    var s = this.handlers[e][r];
                    typeof s == "function" ? s(this, t) : typeof s == "object" && s.length == 2 ? s[0][s[1]](this, t) : typeof s == "string" && window[s](this, t)
                }
        }
    }, typeof module != "undefined" && (module.exports = ZeroClipboard),
    function() {
        Downloadify = window.Downloadify = {
            queue: {},
            uid: (new Date).getTime(),
            getTextForSave: function(e) {
                var t = Downloadify.queue[e];
                return t ? t.getData() : ""
            },
            getFileNameForSave: function(e) {
                var t = Downloadify.queue[e];
                return t ? t.getFilename() : ""
            },
            getDataTypeForSave: function(e) {
                var t = Downloadify.queue[e];
                return t ? t.getDataType() : ""
            },
            saveComplete: function(e) {
                var t = Downloadify.queue[e];
                return t && t.complete(), !0
            },
            saveCancel: function(e) {
                var t = Downloadify.queue[e];
                return t && t.cancel(), !0
            },
            saveError: function(e) {
                var t = Downloadify.queue[e];
                return t && t.error(), !0
            },
            addToQueue: function(e) {
                Downloadify.queue[e.queue_name] = e
            },
            getUID: function(e) {
                return e.id == "" && (e.id = "downloadify_" + Downloadify.uid++), e.id
            }
        }, Downloadify.create = function(e, t) {
            var n = typeof e == "string" ? document.getElementById(e) : e;
            return new Downloadify.Container(n, t)
        }, Downloadify.Container = function(e, t) {
            var n = this;
            n.el = e, n.enabled = !0, n.dataCallback = null, n.filenameCallback = null, n.data = null, n.filename = null;
            var r = function() {
                n.options = t, n.options.append || (n.el.innerHTML = ""), n.flashContainer = document.createElement("span"), n.el.appendChild(n.flashContainer), n.queue_name = Downloadify.getUID(n.flashContainer), typeof n.options.filename == "function" ? n.filenameCallback = n.options.filename : n.options.filename && (n.filename = n.options.filename), typeof n.options.data == "function" ? n.dataCallback = n.options.data : n.options.data && (n.data = n.options.data);
                var e = {
                        queue_name: n.queue_name,
                        width: n.options.width,
                        height: n.options.height
                    },
                    r = {
                        allowScriptAccess: "always"
                    },
                    i = {
                        id: n.flashContainer.id,
                        name: n.flashContainer.id
                    };
                n.options.enabled === !1 && (n.enabled = !1), n.options.transparent === !0 && (r.wmode = "transparent"), n.options.downloadImage && (e.downloadImage = n.options.downloadImage), swfobject.embedSWF(n.options.swf, n.flashContainer.id, n.options.width, n.options.height, "10", null, e, r, i), Downloadify.addToQueue(n)
            };
            n.enable = function() {
                var e = document.getElementById(n.flashContainer.id);
                e.setEnabled(!0), n.enabled = !0
            }, n.disable = function() {
                var e = document.getElementById(n.flashContainer.id);
                e.setEnabled(!1), n.enabled = !1
            }, n.getData = function() {
                return n.enabled ? n.dataCallback ? n.dataCallback() : n.data ? n.data : "" : ""
            }, n.getFilename = function() {
                return n.filenameCallback ? n.filenameCallback() : n.filename ? n.filename : ""
            }, n.getDataType = function() {
                return n.options.dataType ? n.options.dataType : "string"
            }, n.complete = function() {
                typeof n.options.onComplete == "function" && n.options.onComplete()
            }, n.cancel = function() {
                typeof n.options.onCancel == "function" && n.options.onCancel()
            }, n.error = function() {
                typeof n.options.onError == "function" && n.options.onError()
            }, r()
        }, Downloadify.defaultOptions = {
            swf: "media/downloadify.swf",
            downloadImage: "images/download.png",
            width: 100,
            height: 30,
            transparent: !0,
            append: !1,
            dataType: "string"
        }
    }(), typeof jQuery != "undefined" && function(e) {
        e.fn.downloadify = function(t) {
            return this.each(function() {
                t = e.extend({}, Downloadify.defaultOptions, t);
                var n = Downloadify.create(this, t);
                e(this).data("Downloadify", n)
            })
        }
    }(jQuery), typeof MooTools != "undefined" && Element.implement({
        downloadify: function(e) {
            return e = $merge(Downloadify.defaultOptions, e), this.store("Downloadify", Downloadify.create(this, e))
        }
    }),
    function(e) {
        function i(e, t) {
            if (e.originalEvent.touches.length > 1) return;
            e.preventDefault();
            var n = e.originalEvent.changedTouches[0],
                r = document.createEvent("MouseEvents");
            r.initMouseEvent(t, !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), e.target.dispatchEvent(r)
        }
        e.support.touch = "ontouchend" in document;
        if (!e.support.touch) return;
        var t = e.ui.mouse.prototype,
            n = t._mouseInit,
            r;
        t._touchStart = function(e) {
            var t = this;
            if (r || !t._mouseCapture(e.originalEvent.changedTouches[0])) return;
            r = !0, t._touchMoved = !1, i(e, "mouseover"), i(e, "mousemove"), i(e, "mousedown")
        }, t._touchMove = function(e) {
            if (!r) return;
            this._touchMoved = !0, i(e, "mousemove")
        }, t._touchEnd = function(e) {
            if (!r) return;
            i(e, "mouseup"), i(e, "mouseout"), this._touchMoved || i(e, "click"), r = !1
        }, t._mouseInit = function() {
            var t = this;
            t.element.bind("touchstart", e.proxy(t, "_touchStart")).bind("touchmove", e.proxy(t, "_touchMove")).bind("touchend", e.proxy(t, "_touchEnd")), n.call(t)
        }
    }(jQuery),
    function(e) {
        typeof e.fn.each2 == "undefined" && e.fn.extend({
            each2: function(t) {
                var n = e([0]),
                    r = -1,
                    i = this.length;
                while (++r < i && (n.context = n[0] = this[r]) && t.call(n[0], r, n) !== !1);
                return this
            }
        })
    }(jQuery),
    function(e, t) {
        "use strict";

        function h(e, t) {
            var n = 0,
                r = t.length;
            for (; n < r; n += 1)
                if (d(e, t[n])) return n;
            return -1
        }

        function p() {
            var t = e(c);
            t.appendTo("body");
            var n = {
                width: t.width() - t[0].clientWidth,
                height: t.height() - t[0].clientHeight
            };
            return t.remove(), n
        }

        function d(e, n) {
            return e === n ? !0 : e === t || n === t ? !1 : e === null || n === null ? !1 : e.constructor === String ? e + "" == n + "" : n.constructor === String ? n + "" == e + "" : !1
        }

        function v(t, n) {
            var r, i, s;
            if (t === null || t.length < 1) return [];
            r = t.split(n);
            for (i = 0, s = r.length; i < s; i += 1) r[i] = e.trim(r[i]);
            return r
        }

        function m(e) {
            return e.outerWidth(!1) - e.width()
        }

        function g(n) {
            var r = "keyup-change-value";
            n.on("keydown", function() {
                e.data(n, r) === t && e.data(n, r, n.val())
            }), n.on("keyup", function() {
                var i = e.data(n, r);
                i !== t && n.val() !== i && (e.removeData(n, r), n.trigger("keyup-change"))
            })
        }

        function y(n) {
            n.on("mousemove", function(n) {
                var r = a;
                (r === t || r.x !== n.pageX || r.y !== n.pageY) && e(n.target).trigger("mousemove-filtered", n)
            })
        }

        function b(e, n, r) {
            r = r || t;
            var i;
            return function() {
                var t = arguments;
                window.clearTimeout(i), i = window.setTimeout(function() {
                    n.apply(r, t)
                }, e)
            }
        }

        function w(e) {
            var t = !1,
                n;
            return function() {
                return t === !1 && (n = e(), t = !0), n
            }
        }

        function E(e, t) {
            var n = b(e, function(e) {
                t.trigger("scroll-debounced", e)
            });
            t.on("scroll", function(e) {
                h(e.target, t.get()) >= 0 && n(e)
            })
        }

        function S(e) {
            if (e[0] === document.activeElement) return;
            window.setTimeout(function() {
                var t = e[0],
                    n = e.val().length,
                    r;
                e.focus(), e.is(":visible") && t === document.activeElement && (t.setSelectionRange ? t.setSelectionRange(n, n) : t.createTextRange && (r = t.createTextRange(), r.collapse(!1), r.select()))
            }, 0)
        }

        function x(t) {
            t = e(t)[0];
            var n = 0,
                r = 0;
            if ("selectionStart" in t) n = t.selectionStart, r = t.selectionEnd - n;
            else if ("selection" in document) {
                t.focus();
                var i = document.selection.createRange();
                r = document.selection.createRange().text.length, i.moveStart("character", -t.value.length), n = i.text.length - r
            }
            return {
                offset: n,
                length: r
            }
        }

        function T(e) {
            e.preventDefault(), e.stopPropagation()
        }

        function N(e) {
            e.preventDefault(), e.stopImmediatePropagation()
        }

        function C(t) {
            if (!u) {
                var n = t[0].currentStyle || window.getComputedStyle(t[0], null);
                u = e(document.createElement("div")).css({
                    position: "absolute",
                    left: "-10000px",
                    top: "-10000px",
                    display: "none",
                    fontSize: n.fontSize,
                    fontFamily: n.fontFamily,
                    fontStyle: n.fontStyle,
                    fontWeight: n.fontWeight,
                    letterSpacing: n.letterSpacing,
                    textTransform: n.textTransform,
                    whiteSpace: "nowrap"
                }), u.attr("class", "select2-sizer"), e("body").append(u)
            }
            return u.text(t.val()), u.width()
        }

        function k(t, n, r) {
            var i, s = [],
                o;
            i = t.attr("class"), i && (i = "" + i, e(i.split(" ")).each2(function() {
                this.indexOf("select2-") === 0 && s.push(this)
            })), i = n.attr("class"), i && (i = "" + i, e(i.split(" ")).each2(function() {
                this.indexOf("select2-") !== 0 && (o = r(this), o && s.push(this))
            })), t.attr("class", s.join(" "))
        }

        function L(e, t, n, r) {
            var i = e.toUpperCase().indexOf(t.toUpperCase()),
                s = t.length;
            if (i < 0) {
                n.push(r(e));
                return
            }
            n.push(r(e.substring(0, i))), n.push("<span class='select2-match'>"), n.push(r(e.substring(i, i + s))), n.push("</span>"), n.push(r(e.substring(i + s, e.length)))
        }

        function A(e) {
            var t = {
                "\\": "&#92;",
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#47;"
            };
            return String(e).replace(/[&<>"'\/\\]/g, function(e) {
                return t[e]
            })
        }

        function O(n) {
            var r, i = 0,
                s = null,
                o = n.quietMillis || 100,
                u = n.url,
                a = this;
            return function(f) {
                window.clearTimeout(r), r = window.setTimeout(function() {
                    i += 1;
                    var r = i,
                        o = n.data,
                        l = u,
                        c = n.transport || e.fn.select2.ajaxDefaults.transport,
                        h = {
                            type: n.type || "GET",
                            cache: n.cache || !1,
                            jsonpCallback: n.jsonpCallback || t,
                            dataType: n.dataType || "json"
                        },
                        p = e.extend({}, e.fn.select2.ajaxDefaults.params, h);
                    o = o ? o.call(a, f.term, f.page, f.context) : null, l = typeof l == "function" ? l.call(a, f.term, f.page, f.context) : l, s && s.abort(), n.params && (e.isFunction(n.params) ? e.extend(p, n.params.call(a)) : e.extend(p, n.params)), e.extend(p, {
                        url: l,
                        dataType: n.dataType,
                        data: o,
                        success: function(e) {
                            if (r < i) return;
                            var t = n.results(e, f.page);
                            f.callback(t)
                        }
                    }), s = c.call(a, p)
                }, o)
            }
        }

        function M(t) {
            var n = t,
                r, i, s = function(e) {
                    return "" + e.text
                };
            e.isArray(n) && (i = n, n = {
                results: i
            }), e.isFunction(n) === !1 && (i = n, n = function() {
                return i
            });
            var o = n();
            return o.text && (s = o.text, e.isFunction(s) || (r = o.text, s = function(e) {
                    return e[r]
                })),
                function(t) {
                    var r = t.term,
                        i = {
                            results: []
                        },
                        o;
                    if (r === "") {
                        t.callback(n());
                        return
                    }
                    o = function(n, i) {
                        var u, a;
                        n = n[0];
                        if (n.children) {
                            u = {};
                            for (a in n) n.hasOwnProperty(a) && (u[a] = n[a]);
                            u.children = [], e(n.children).each2(function(e, t) {
                                o(t, u.children)
                            }), (u.children.length || t.matcher(r, s(u), n)) && i.push(u)
                        } else t.matcher(r, s(n), n) && i.push(n)
                    }, e(n().results).each2(function(e, t) {
                        o(t, i.results)
                    }), t.callback(i)
                }
        }

        function _(n) {
            var r = e.isFunction(n);
            return function(i) {
                var s = i.term,
                    o = {
                        results: []
                    };
                e(r ? n() : n).each(function() {
                    var e = this.text !== t,
                        n = e ? this.text : this;
                    (s === "" || i.matcher(s, n)) && o.results.push(e ? this : {
                        id: this,
                        text: this
                    })
                }), i.callback(o)
            }
        }

        function D(t, n) {
            if (e.isFunction(t)) return !0;
            if (!t) return !1;
            throw new Error(n + " must be a function or a falsy value")
        }

        function P(t) {
            return e.isFunction(t) ? t() : t
        }

        function H(t) {
            var n = 0;
            return e.each(t, function(e, t) {
                t.children ? n += H(t.children) : n++
            }), n
        }

        function B(e, n, r, i) {
            var s = e,
                o = !1,
                u, a, f, l, c;
            if (!i.createSearchChoice || !i.tokenSeparators || i.tokenSeparators.length < 1) return t;
            for (;;) {
                a = -1;
                for (f = 0, l = i.tokenSeparators.length; f < l; f++) {
                    c = i.tokenSeparators[f], a = e.indexOf(c);
                    if (a >= 0) break
                }
                if (a < 0) break;
                u = e.substring(0, a), e = e.substring(a + c.length);
                if (u.length > 0) {
                    u = i.createSearchChoice.call(this, u, n);
                    if (u !== t && u !== null && i.id(u) !== t && i.id(u) !== null) {
                        o = !1;
                        for (f = 0, l = n.length; f < l; f++)
                            if (d(i.id(u), i.id(n[f]))) {
                                o = !0;
                                break
                            }
                        o || r(u)
                    }
                }
            }
            if (s !== e) return e
        }

        function j(t, n) {
            var r = function() {};
            return r.prototype = new t, r.prototype.constructor = r, r.prototype.parent = t.prototype, r.prototype = e.extend(r.prototype, n), r
        }
        if (window.Select2 !== t) return;
        var n, r, i, s, o, u, a = {
                x: 0,
                y: 0
            },
            f, l, n = {
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                SPACE: 32,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                HOME: 36,
                END: 35,
                BACKSPACE: 8,
                DELETE: 46,
                isArrow: function(e) {
                    e = e.which ? e.which : e;
                    switch (e) {
                        case n.LEFT:
                        case n.RIGHT:
                        case n.UP:
                        case n.DOWN:
                            return !0
                    }
                    return !1
                },
                isControl: function(e) {
                    var t = e.which;
                    switch (t) {
                        case n.SHIFT:
                        case n.CTRL:
                        case n.ALT:
                            return !0
                    }
                    return e.metaKey ? !0 : !1
                },
                isFunctionKey: function(e) {
                    return e = e.which ? e.which : e, e >= 112 && e <= 123
                }
            },
            c = "<div class='select2-measure-scrollbar'></div>";
        f = e(document), o = function() {
            var e = 1;
            return function() {
                return e++
            }
        }(), f.on("mousemove", function(e) {
            a.x = e.pageX, a.y = e.pageY
        }), r = j(Object, {
            bind: function(e) {
                var t = this;
                return function() {
                    e.apply(t, arguments)
                }
            },
            init: function(n) {
                var r, i, s = ".select2-results",
                    u, a;
                this.opts = n = this.prepareOpts(n), this.id = n.id, n.element.data("select2") !== t && n.element.data("select2") !== null && n.element.data("select2").destroy(), this.container = this.createContainer(), this.containerId = "s2id_" + (n.element.attr("id") || "autogen" + o()), this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.body = w(function() {
                    return n.element.closest("body")
                }), k(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.css(P(n.containerCss)), this.container.addClass(P(n.containerCssClass)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), this.dropdown.addClass(P(n.dropdownCssClass)), this.dropdown.data("select2", this), this.results = r = this.container.find(s), this.search = i = this.container.find("input.select2-input"), this.resultsPage = 0, this.context = null, this.initContainer(), y(this.results), this.dropdown.on("mousemove-filtered touchstart touchmove touchend", s, this.bind(this.highlightUnderEvent)), E(80, this.results), this.dropdown.on("scroll-debounced", s, this.bind(this.loadMoreIfNeeded)), e(this.container).on("change", ".select2-input", function(e) {
                    e.stopPropagation()
                }), e(this.dropdown).on("change", ".select2-input", function(e) {
                    e.stopPropagation()
                }), e.fn.mousewheel && r.mousewheel(function(e, t, n, i) {
                    var s = r.scrollTop(),
                        o;
                    i > 0 && s - i <= 0 ? (r.scrollTop(0), T(e)) : i < 0 && r.get(0).scrollHeight - r.scrollTop() + i <= r.height() && (r.scrollTop(r.get(0).scrollHeight - r.height()), T(e))
                }), g(i), i.on("keyup-change input paste", this.bind(this.updateResults)), i.on("focus", function() {
                    i.addClass("select2-focused")
                }), i.on("blur", function() {
                    i.removeClass("select2-focused")
                }), this.dropdown.on("mouseup", s, this.bind(function(t) {
                    e(t.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(t), this.selectHighlighted(t))
                })), this.dropdown.on("click mouseup mousedown", function(e) {
                    e.stopPropagation()
                }), e.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), n.maximumInputLength !== null && this.search.attr("maxlength", n.maximumInputLength);
                var u = n.element.prop("disabled");
                u === t && (u = !1), this.enable(!u);
                var a = n.element.prop("readonly");
                a === t && (a = !1), this.readonly(a), l = l || p(), this.autofocus = n.element.prop("autofocus"), n.element.prop("autofocus", !1), this.autofocus && this.focus()
            },
            destroy: function() {
                var e = this.opts.element,
                    n = e.data("select2");
                this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), n !== t && (n.container.remove(), n.dropdown.remove(), e.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), this.elementTabIndex ? e.attr({
                    tabindex: this.elementTabIndex
                }) : e.removeAttr("tabindex"), e.show())
            },
            optionToData: function(e) {
                if (e.is("option")) return {
                    id: e.prop("value"),
                    text: e.text(),
                    element: e.get(),
                    css: e.attr("class"),
                    disabled: e.prop("disabled"),
                    locked: d(e.attr("locked"), "locked") || d(e.data("locked"), !0)
                };
                if (e.is("optgroup")) return {
                    text: e.attr("label"),
                    children: [],
                    element: e.get(),
                    css: e.attr("class")
                }
            },
            prepareOpts: function(n) {
                var r, i, s, o, u = this;
                r = n.element, r.get(0).tagName.toLowerCase() === "select" && (this.select = i = n.element), i && e.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function() {
                    if (this in n) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                }), n = e.extend({}, {
                    populateResults: function(r, i, s) {
                        var o, a, f, l, c = this.opts.id;
                        o = function(r, i, a) {
                            var f, l, h, p, d, v, m, g, y, b;
                            r = n.sortResults(r, i, s);
                            for (f = 0, l = r.length; f < l; f += 1) h = r[f], d = h.disabled === !0, p = !d && c(h) !== t, v = h.children && h.children.length > 0, m = e("<li></li>"), m.addClass("select2-results-dept-" + a), m.addClass("select2-result"), m.addClass(p ? "select2-result-selectable" : "select2-result-unselectable"), d && m.addClass("select2-disabled"), v && m.addClass("select2-result-with-children"), m.addClass(u.opts.formatResultCssClass(h)), g = e(document.createElement("div")), g.addClass("select2-result-label"), b = n.formatResult(h, g, s, u.opts.escapeMarkup), b !== t && g.html(b), m.append(g), v && (y = e("<ul></ul>"), y.addClass("select2-result-sub"), o(h.children, y, a + 1), m.append(y)), m.data("select2-data", h), i.append(m)
                        }, o(i, r, 0)
                    }
                }, e.fn.select2.defaults, n), typeof n.id != "function" && (s = n.id, n.id = function(e) {
                    return e[s]
                });
                if (e.isArray(n.element.data("select2Tags"))) {
                    if ("tags" in n) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + n.element.attr("id");
                    n.tags = n.element.data("select2Tags")
                }
                i ? (n.query = this.bind(function(e) {
                    var n = {
                            results: [],
                            more: !1
                        },
                        i = e.term,
                        s, o, a;
                    a = function(t, n) {
                        var r;
                        t.is("option") ? e.matcher(i, t.text(), t) && n.push(u.optionToData(t)) : t.is("optgroup") && (r = u.optionToData(t), t.children().each2(function(e, t) {
                            a(t, r.children)
                        }), r.children.length > 0 && n.push(r))
                    }, s = r.children(), this.getPlaceholder() !== t && s.length > 0 && (o = this.getPlaceholderOption(), o && (s = s.not(o))), s.each2(function(e, t) {
                        a(t, n.results)
                    }), e.callback(n)
                }), n.id = function(e) {
                    return e.id
                }, n.formatResultCssClass = function(e) {
                    return e.css
                }) : "query" in n || ("ajax" in n ? (o = n.element.data("ajax-url"), o && o.length > 0 && (n.ajax.url = o), n.query = O.call(n.element, n.ajax)) : "data" in n ? n.query = M(n.data) : "tags" in n && (n.query = _(n.tags), n.createSearchChoice === t && (n.createSearchChoice = function(e) {
                    return {
                        id: e,
                        text: e
                    }
                }), n.initSelection === t && (n.initSelection = function(t, r) {
                    var i = [];
                    e(v(t.val(), n.separator)).each(function() {
                        var t = this,
                            r = this,
                            s = n.tags;
                        e.isFunction(s) && (s = s()), e(s).each(function() {
                            if (d(this.id, t)) return r = this.text, !1
                        }), i.push({
                            id: t,
                            text: r
                        })
                    }), r(i)
                })));
                if (typeof n.query != "function") throw "query function not defined for Select2 " + n.element.attr("id");
                return n
            },
            monitorSource: function() {
                var e = this.opts.element,
                    n;
                e.on("change.select2", this.bind(function(e) {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                })), n = this.bind(function() {
                    var n, r, i = this,
                        s = e.prop("disabled");
                    s === t && (s = !1), this.enable(!s);
                    var r = e.prop("readonly");
                    r === t && (r = !1), this.readonly(r), k(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(P(this.opts.containerCssClass)), k(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(P(this.opts.dropdownCssClass))
                }), e.on("propertychange.select2 DOMAttrModified.select2", n), this.mutationCallback === t && (this.mutationCallback = function(e) {
                    e.forEach(n)
                }), typeof WebKitMutationObserver != "undefined" && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new WebKitMutationObserver(this.mutationCallback), this.propertyObserver.observe(e.get(0), {
                    attributes: !0,
                    subtree: !1
                }))
            },
            triggerSelect: function(t) {
                var n = e.Event("select2-selecting", {
                    val: this.id(t),
                    object: t
                });
                return this.opts.element.trigger(n), !n.isDefaultPrevented()
            },
            triggerChange: function(t) {
                t = t || {}, t = e.extend({}, t, {
                    type: "change",
                    val: this.val()
                }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(t), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
            },
            isInterfaceEnabled: function() {
                return this.enabledInterface === !0
            },
            enableInterface: function() {
                var e = this._enabled && !this._readonly,
                    t = !e;
                return e === this.enabledInterface ? !1 : (this.container.toggleClass("select2-container-disabled", t), this.close(), this.enabledInterface = e, !0)
            },
            enable: function(e) {
                return e === t && (e = !0), this._enabled === e ? !1 : (this._enabled = e, this.opts.element.prop("disabled", !e), this.enableInterface(), !0)
            },
            readonly: function(e) {
                return e === t && (e = !1), this._readonly === e ? !1 : (this._readonly = e, this.opts.element.prop("readonly", e), this.enableInterface(), !0)
            },
            opened: function() {
                return this.container.hasClass("select2-dropdown-open")
            },
            positionDropdown: function() {
                var t = this.dropdown,
                    n = this.container.offset(),
                    r = this.container.outerHeight(!1),
                    i = this.container.outerWidth(!1),
                    s = t.outerHeight(!1),
                    o = e(window).scrollLeft() + e(window).width(),
                    u = e(window).scrollTop() + e(window).height(),
                    a = n.top + r,
                    f = n.left,
                    c = a + s <= u,
                    h = n.top - s >= this.body().scrollTop(),
                    p = t.outerWidth(!1),
                    d = f + p <= o,
                    v = t.hasClass("select2-drop-above"),
                    m, g, y, b;
                this.opts.dropdownAutoWidth ? (b = e(".select2-results", t)[0], t.addClass("select2-drop-auto-width"), t.css("width", ""), p = t.outerWidth(!1) + (b.scrollHeight === b.clientHeight ? 0 : l.width), p > i ? i = p : p = i, d = f + p <= o) : this.container.removeClass("select2-drop-auto-width"), this.body().css("position") !== "static" && (m = this.body().offset(), a -= m.top, f -= m.left), v ? (g = !0, !h && c && (g = !1)) : (g = !1, !c && h && (g = !0)), d || (f = n.left + i - p), g ? (a = n.top - s, this.container.addClass("select2-drop-above"), t.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), t.removeClass("select2-drop-above")), y = e.extend({
                    top: a,
                    left: f,
                    width: i
                }, P(this.opts.dropdownCss)), t.css(y)
            },
            shouldOpen: function() {
                var t;
                return this.opened() ? !1 : this._enabled === !1 || this._readonly === !0 ? !1 : (t = e.Event("select2-opening"), this.opts.element.trigger(t), !t.isDefaultPrevented())
            },
            clearDropdownAlignmentPreference: function() {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
            },
            open: function() {
                return this.shouldOpen() ? (this.opening(), !0) : !1
            },
            opening: function() {
                function a() {
                    return {
                        width: Math.max(document.documentElement.scrollWidth, e(window).width()),
                        height: Math.max(document.documentElement.scrollHeight, e(window).height())
                    }
                }
                var t = this.containerId,
                    n = "scroll." + t,
                    r = "resize." + t,
                    i = "orientationchange." + t,
                    s, o;
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), s = e("#select2-drop-mask"), s.length == 0 && (s = e(document.createElement("div")), s.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), s.hide(), s.appendTo(this.body()), s.on("mousedown touchstart click", function(t) {
                    var n = e("#select2-drop"),
                        r;
                    n.length > 0 && (r = n.data("select2"), r.opts.selectOnBlur && r.selectHighlighted({
                        noFocus: !0
                    }), r.close(), t.preventDefault(), t.stopPropagation())
                })), this.dropdown.prev()[0] !== s[0] && this.dropdown.before(s), e("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), o = a(), s.css(o).show(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
                var u = this;
                this.container.parents().add(window).each(function() {
                    e(this).on(r + " " + n + " " + i, function(t) {
                        var n = a();
                        e("#select2-drop-mask").css(n), u.positionDropdown()
                    })
                })
            },
            close: function() {
                if (!this.opened()) return;
                var t = this.containerId,
                    n = "scroll." + t,
                    r = "resize." + t,
                    i = "orientationchange." + t;
                this.container.parents().add(window).each(function() {
                    e(this).off(n).off(r).off(i)
                }), this.clearDropdownAlignmentPreference(), e("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open"), this.results.empty(), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger(e.Event("select2-close"))
            },
            externalSearch: function(e) {
                this.open(), this.search.val(e), this.updateResults(!1)
            },
            clearSearch: function() {},
            getMaximumSelectionSize: function() {
                return P(this.opts.maximumSelectionSize)
            },
            ensureHighlightVisible: function() {
                var t = this.results,
                    n, r, i, s, o, u, a;
                r = this.highlight();
                if (r < 0) return;
                if (r == 0) {
                    t.scrollTop(0);
                    return
                }
                n = this.findHighlightableChoices().find(".select2-result-label"), i = e(n[r]), s = i.offset().top + i.outerHeight(!0), r === n.length - 1 && (a = t.find("li.select2-more-results"), a.length > 0 && (s = a.offset().top + a.outerHeight(!0))), o = t.offset().top + t.outerHeight(!0), s > o && t.scrollTop(t.scrollTop() + (s - o)), u = i.offset().top - t.offset().top, u < 0 && i.css("display") != "none" && t.scrollTop(t.scrollTop() + u)
            },
            findHighlightableChoices: function() {
                return this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)")
            },
            moveHighlight: function(t) {
                var n = this.findHighlightableChoices(),
                    r = this.highlight();
                while (r > -1 && r < n.length) {
                    r += t;
                    var i = e(n[r]);
                    if (i.hasClass("select2-result-selectable") && !i.hasClass("select2-disabled") && !i.hasClass("select2-selected")) {
                        this.highlight(r);
                        break
                    }
                }
            },
            highlight: function(t) {
                var n = this.findHighlightableChoices(),
                    r, i;
                if (arguments.length === 0) return h(n.filter(".select2-highlighted")[0], n.get());
                t >= n.length && (t = n.length - 1), t < 0 && (t = 0), this.results.find(".select2-highlighted").removeClass("select2-highlighted"), r = e(n[t]), r.addClass("select2-highlighted"), this.ensureHighlightVisible(), i = r.data("select2-data"), i && this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(i),
                    choice: i
                })
            },
            countSelectableResults: function() {
                return this.findHighlightableChoices().length
            },
            highlightUnderEvent: function(t) {
                var n = e(t.target).closest(".select2-result-selectable");
                if (n.length > 0 && !n.is(".select2-highlighted")) {
                    var r = this.findHighlightableChoices();
                    this.highlight(r.index(n))
                } else n.length == 0 && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            },
            loadMoreIfNeeded: function() {
                var e = this.results,
                    t = e.find("li.select2-more-results"),
                    n, r = -1,
                    i = this.resultsPage + 1,
                    s = this,
                    o = this.search.val(),
                    u = this.context;
                if (t.length === 0) return;
                n = t.offset().top - e.offset().top - e.height(), n <= this.opts.loadMorePadding && (t.addClass("select2-active"), this.opts.query({
                    element: this.opts.element,
                    term: o,
                    page: i,
                    context: u,
                    matcher: this.opts.matcher,
                    callback: this.bind(function(n) {
                        if (!s.opened()) return;
                        s.opts.populateResults.call(this, e, n.results, {
                            term: o,
                            page: i,
                            context: u
                        }), s.postprocessResults(n, !1, !1), n.more === !0 ? (t.detach().appendTo(e).text(s.opts.formatLoadMore(i + 1)), window.setTimeout(function() {
                            s.loadMoreIfNeeded()
                        }, 10)) : t.remove(), s.positionDropdown(), s.resultsPage = i, s.context = n.context
                    })
                }))
            },
            tokenize: function() {},
            updateResults: function(n) {
                function c() {
                    r.removeClass("select2-active"), u.positionDropdown()
                }

                function h(e) {
                    i.html(e), c()
                }
                var r = this.search,
                    i = this.results,
                    s = this.opts,
                    o, u = this,
                    a, f = r.val(),
                    l = e.data(this.container, "select2-last-term");
                if (n !== !0 && l && d(f, l)) return;
                e.data(this.container, "select2-last-term", f);
                if (n !== !0 && (this.showSearchInput === !1 || !this.opened())) return;
                var p = this.getMaximumSelectionSize();
                if (p >= 1) {
                    o = this.data();
                    if (e.isArray(o) && o.length >= p && D(s.formatSelectionTooBig, "formatSelectionTooBig")) {
                        h("<li class='select2-selection-limit'>" + s.formatSelectionTooBig(p) + "</li>");
                        return
                    }
                }
                if (r.val().length < s.minimumInputLength) {
                    D(s.formatInputTooShort, "formatInputTooShort") ? h("<li class='select2-no-results'>" + s.formatInputTooShort(r.val(), s.minimumInputLength) + "</li>") : h(""), n && this.showSearch && this.showSearch(!0);
                    return
                }
                if (s.maximumInputLength && r.val().length > s.maximumInputLength) {
                    D(s.formatInputTooLong, "formatInputTooLong") ? h("<li class='select2-no-results'>" + s.formatInputTooLong(r.val(), s.maximumInputLength) + "</li>") : h("");
                    return
                }
                s.formatSearching && this.findHighlightableChoices().length === 0 && h("<li class='select2-searching'>" + s.formatSearching() + "</li>"), r.addClass("select2-active"), a = this.tokenize(), a != t && a != null && r.val(a), this.resultsPage = 1, s.query({
                    element: s.element,
                    term: r.val(),
                    page: this.resultsPage,
                    context: null,
                    matcher: s.matcher,
                    callback: this.bind(function(o) {
                        var a;
                        if (!this.opened()) {
                            this.search.removeClass("select2-active");
                            return
                        }
                        this.context = o.context === t ? null : o.context, this.opts.createSearchChoice && r.val() !== "" && (a = this.opts.createSearchChoice.call(u, r.val(), o.results), a !== t && a !== null && u.id(a) !== t && u.id(a) !== null && e(o.results).filter(function() {
                            return d(u.id(this), u.id(a))
                        }).length === 0 && o.results.unshift(a));
                        if (o.results.length === 0 && D(s.formatNoMatches, "formatNoMatches")) {
                            h("<li class='select2-no-results'>" + s.formatNoMatches(r.val()) + "</li>");
                            return
                        }
                        i.empty(), u.opts.populateResults.call(this, i, o.results, {
                            term: r.val(),
                            page: this.resultsPage,
                            context: null
                        }), o.more === !0 && D(s.formatLoadMore, "formatLoadMore") && (i.append("<li class='select2-more-results'>" + u.opts.escapeMarkup(s.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function() {
                            u.loadMoreIfNeeded()
                        }, 10)), this.postprocessResults(o, n), c(), this.opts.element.trigger({
                            type: "select2-loaded",
                            items: o
                        })
                    })
                })
            },
            cancel: function() {
                this.close()
            },
            blur: function() {
                this.opts.selectOnBlur && this.selectHighlighted({
                    noFocus: !0
                }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            },
            focusSearch: function() {
                S(this.search)
            },
            selectHighlighted: function(e) {
                var t = this.highlight(),
                    n = this.results.find(".select2-highlighted"),
                    r = n.closest(".select2-result").data("select2-data");
                r ? (this.highlight(t), this.onSelect(r, e)) : e && e.noFocus && this.close()
            },
            getPlaceholder: function() {
                var e;
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((e = this.getPlaceholderOption()) !== t ? e.text() : t)
            },
            getPlaceholderOption: function() {
                if (this.select) {
                    var e = this.select.children().first();
                    if (this.opts.placeholderOption !== t) return this.opts.placeholderOption === "first" && e || typeof this.opts.placeholderOption == "function" && this.opts.placeholderOption(this.select);
                    if (e.text() === "" && e.val() === "") return e
                }
            },
            initContainerWidth: function() {
                function n() {
                    var n, r, i, s, o;
                    if (this.opts.width === "off") return null;
                    if (this.opts.width === "element") return this.opts.element.outerWidth(!1) === 0 ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if (this.opts.width === "copy" || this.opts.width === "resolve") {
                        n = this.opts.element.attr("style");
                        if (n !== t) {
                            r = n.split(";");
                            for (s = 0, o = r.length; s < o; s += 1) {
                                i = r[s].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);
                                if (i !== null && i.length >= 1) return i[1]
                            }
                        }
                        return this.opts.width === "resolve" ? (n = this.opts.element.css("width"), n.indexOf("%") > 0 ? n : this.opts.element.outerWidth(!1) === 0 ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return e.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var r = n.call(this);
                r !== null && this.container.css("width", r)
            }
        }), i = j(r, {
            createContainer: function() {
                var t = e(document.createElement("div")).attr({
                    "class": "select2-container"
                }).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow'><b></b></span>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            enableInterface: function() {
                this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
            },
            opening: function() {
                var t, n, r;
                this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.search.focus(), t = this.search.get(0), t.createTextRange ? (n = t.createTextRange(), n.collapse(!1), n.select()) : t.setSelectionRange && (r = this.search.val().length, t.setSelectionRange(r, r)), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger(e.Event("select2-open"))
            },
            close: function() {
                if (!this.opened()) return;
                this.parent.close.apply(this, arguments), this.focusser.removeAttr("disabled"), this.focusser.focus()
            },
            focus: function() {
                this.opened() ? this.close() : (this.focusser.removeAttr("disabled"), this.focusser.focus())
            },
            isFocused: function() {
                return this.container.hasClass("select2-container-active")
            },
            cancel: function() {
                this.parent.cancel.apply(this, arguments), this.focusser.removeAttr("disabled"), this.focusser.focus()
            },
            initContainer: function() {
                var t, r = this.container,
                    i = this.dropdown;
                this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) : this.showSearch(!0), this.selection = t = r.find(".select2-choice"), this.focusser = r.find(".select2-focusser"), this.focusser.attr("id", "s2id_autogen" + o()), e("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")), this.focusser.attr("tabindex", this.elementTabIndex), this.search.on("keydown", this.bind(function(e) {
                    if (!this.isInterfaceEnabled()) return;
                    if (e.which === n.PAGE_UP || e.which === n.PAGE_DOWN) {
                        T(e);
                        return
                    }
                    switch (e.which) {
                        case n.UP:
                        case n.DOWN:
                            this.moveHighlight(e.which === n.UP ? -1 : 1), T(e);
                            return;
                        case n.ENTER:
                            this.selectHighlighted(), T(e);
                            return;
                        case n.TAB:
                            this.selectHighlighted({
                                noFocus: !0
                            });
                            return;
                        case n.ESC:
                            this.cancel(e), T(e);
                            return
                    }
                })), this.search.on("blur", this.bind(function(e) {
                    document.activeElement === this.body().get(0) && window.setTimeout(this.bind(function() {
                        this.search.focus()
                    }), 0)
                })), this.focusser.on("keydown", this.bind(function(e) {
                    if (!this.isInterfaceEnabled()) return;
                    if (e.which === n.TAB || n.isControl(e) || n.isFunctionKey(e) || e.which === n.ESC) return;
                    if (this.opts.openOnEnter === !1 && e.which === n.ENTER) {
                        T(e);
                        return
                    }
                    if (e.which == n.DOWN || e.which == n.UP || e.which == n.ENTER && this.opts.openOnEnter) {
                        if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
                        this.open(), T(e);
                        return
                    }
                    if (e.which == n.DELETE || e.which == n.BACKSPACE) {
                        this.opts.allowClear && this.clear(), T(e);
                        return
                    }
                })), g(this.focusser), this.focusser.on("keyup-change input", this.bind(function(e) {
                    if (this.opts.minimumResultsForSearch >= 0) {
                        e.stopPropagation();
                        if (this.opened()) return;
                        this.open()
                    }
                })), t.on("mousedown", "abbr", this.bind(function(e) {
                    if (!this.isInterfaceEnabled()) return;
                    this.clear(), N(e), this.close(), this.selection.focus()
                })), t.on("mousedown", this.bind(function(t) {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), T(t)
                })), i.on("mousedown", this.bind(function() {
                    this.search.focus()
                })), t.on("focus", this.bind(function(e) {
                    T(e)
                })), this.focusser.on("focus", this.bind(function() {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.container.addClass("select2-container-active")
                })).on("blur", this.bind(function() {
                    this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(e.Event("select2-blur")))
                })), this.search.on("focus", this.bind(function() {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.container.addClass("select2-container-active")
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.setPlaceholder()
            },
            clear: function(e) {
                var t = this.selection.data("select2-data");
                if (t) {
                    var n = this.getPlaceholderOption();
                    this.opts.element.val(n ? n.val() : ""), this.selection.find(".select2-chosen").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), e !== !1 && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(t),
                        choice: t
                    }), this.triggerChange({
                        removed: t
                    }))
                }
            },
            initSelection: function() {
                var e;
                if (this.isPlaceholderOptionSelected()) this.updateSelection([]), this.close(), this.setPlaceholder();
                else {
                    var n = this;
                    this.opts.initSelection.call(null, this.opts.element, function(e) {
                        e !== t && e !== null && (n.updateSelection(e), n.close(), n.setPlaceholder())
                    })
                }
            },
            isPlaceholderOptionSelected: function() {
                var e;
                return (e = this.getPlaceholderOption()) !== t && e.is(":selected") || this.opts.element.val() === "" || this.opts.element.val() === t || this.opts.element.val() === null
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments),
                    n = this;
                return t.element.get(0).tagName.toLowerCase() === "select" ? t.initSelection = function(e, t) {
                    var r = e.find(":selected");
                    t(n.optionToData(r))
                } : "data" in t && (t.initSelection = t.initSelection || function(n, r) {
                    var i = n.val(),
                        s = null;
                    t.query({
                        matcher: function(e, n, r) {
                            var o = d(i, t.id(r));
                            return o && (s = r), o
                        },
                        callback: e.isFunction(r) ? function() {
                            r(s)
                        } : e.noop
                    })
                }), t
            },
            getPlaceholder: function() {
                return this.select && this.getPlaceholderOption() === t ? t : this.parent.getPlaceholder.apply(this, arguments)
            },
            setPlaceholder: function() {
                var e = this.getPlaceholder();
                if (this.isPlaceholderOptionSelected() && e !== t) {
                    if (this.select && this.getPlaceholderOption() === t) return;
                    this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(e)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear")
                }
            },
            postprocessResults: function(e, t, n) {
                var r = 0,
                    i = this,
                    s = !0;
                this.findHighlightableChoices().each2(function(e, t) {
                    if (d(i.id(t.data("select2-data")), i.opts.element.val())) return r = e, !1
                }), n !== !1 && (t === !0 && r >= 0 ? this.highlight(r) : this.highlight(0));
                if (t === !0) {
                    var o = this.opts.minimumResultsForSearch;
                    o >= 0 && this.showSearch(H(e.results) >= o)
                }
            },
            showSearch: function(t) {
                if (this.showSearchInput === t) return;
                this.showSearchInput = t, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !t), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !t), e(this.dropdown, this.container).toggleClass("select2-with-searchbox", t)
            },
            onSelect: function(e, t) {
                if (!this.triggerSelect(e)) return;
                var n = this.opts.element.val(),
                    r = this.data();
                this.opts.element.val(this.id(e)), this.updateSelection(e), this.opts.element.trigger({
                    type: "select2-selected",
                    val: this.id(e),
                    choice: e
                }), this.close(), (!t || !t.noFocus) && this.selection.focus(), d(n, this.id(e)) || this.triggerChange({
                    added: e,
                    removed: r
                })
            },
            updateSelection: function(e) {
                var n = this.selection.find(".select2-chosen"),
                    r, i;
                this.selection.data("select2-data", e), n.empty(), r = this.opts.formatSelection(e, n, this.opts.escapeMarkup), r !== t && n.append(r), i = this.opts.formatSelectionCssClass(e, n), i !== t && n.addClass(i), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== t && this.container.addClass("select2-allowclear")
            },
            val: function() {
                var e, n = !1,
                    r = null,
                    i = this,
                    s = this.data();
                if (arguments.length === 0) return this.opts.element.val();
                e = arguments[0], arguments.length > 1 && (n = arguments[1]);
                if (this.select) this.select.val(e).find(":selected").each2(function(e, t) {
                    return r = i.optionToData(t), !1
                }), this.updateSelection(r), this.setPlaceholder(), n && this.triggerChange({
                    added: r,
                    removed: s
                });
                else {
                    if (!e && e !== 0) {
                        this.clear(n);
                        return
                    }
                    if (this.opts.initSelection === t) throw new Error("cannot call val() if initSelection() is not defined");
                    this.opts.element.val(e), this.opts.initSelection(this.opts.element, function(e) {
                        i.opts.element.val(e ? i.id(e) : ""), i.updateSelection(e), i.setPlaceholder(), n && i.triggerChange({
                            added: e,
                            removed: s
                        })
                    })
                }
            },
            clearSearch: function() {
                this.search.val(""), this.focusser.val("")
            },
            data: function(e, n) {
                var r;
                if (arguments.length === 0) return r = this.selection.data("select2-data"), r == t && (r = null), r;
                !e || e === "" ? this.clear(n) : (r = this.data(), this.opts.element.val(e ? this.id(e) : ""), this.updateSelection(e), n && this.triggerChange({
                    added: e,
                    removed: r
                }))
            }
        }), s = j(r, {
            createContainer: function() {
                var t = e(document.createElement("div")).attr({
                    "class": "select2-container select2-container-multi"
                }).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitilize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments),
                    n = this;
                return t.element.get(0).tagName.toLowerCase() === "select" ? t.initSelection = function(e, t) {
                    var r = [];
                    e.find(":selected").each2(function(e, t) {
                        r.push(n.optionToData(t))
                    }), t(r)
                } : "data" in t && (t.initSelection = t.initSelection || function(n, r) {
                    var i = v(n.val(), t.separator),
                        s = [];
                    t.query({
                        matcher: function(n, r, o) {
                            var u = e.grep(i, function(e) {
                                return d(e, t.id(o))
                            }).length;
                            return u && s.push(o), u
                        },
                        callback: e.isFunction(r) ? function() {
                            var e = [];
                            for (var n = 0; n < i.length; n++) {
                                var o = i[n];
                                for (var u = 0; u < s.length; u++) {
                                    var a = s[u];
                                    if (d(o, t.id(a))) {
                                        e.push(a), s.splice(u, 1);
                                        break
                                    }
                                }
                            }
                            r(e)
                        } : e.noop
                    })
                }), t
            },
            selectChoice: function(e) {
                var t = this.container.find(".select2-search-choice-focus");
                if (!t.length || !e || e[0] != t[0]) t.length && this.opts.element.trigger("choice-deselected", t), t.removeClass("select2-search-choice-focus"), e && e.length && (this.close(), e.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", e))
            },
            initContainer: function() {
                var t = ".select2-choices",
                    r;
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = r = this.container.find(t);
                var i = this;
                this.selection.on("mousedown", ".select2-search-choice", function(t) {
                    i.search[0].focus(), i.selectChoice(e(this))
                }), this.search.attr("id", "s2id_autogen" + o()), e("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.search.attr("id")), this.search.on("input paste", this.bind(function() {
                    if (!this.isInterfaceEnabled()) return;
                    this.opened() || this.open()
                })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function(e) {
                    if (!this.isInterfaceEnabled()) return;
                    ++this.keydowns;
                    var t = r.find(".select2-search-choice-focus"),
                        i = t.prev(".select2-search-choice:not(.select2-locked)"),
                        s = t.next(".select2-search-choice:not(.select2-locked)"),
                        o = x(this.search);
                    if (!(!t.length || e.which != n.LEFT && e.which != n.RIGHT && e.which != n.BACKSPACE && e.which != n.DELETE && e.which != n.ENTER)) {
                        var u = t;
                        e.which == n.LEFT && i.length ? u = i : e.which == n.RIGHT ? u = s.length ? s : null : e.which === n.BACKSPACE ? (this.unselect(t.first()), this.search.width(10), u = i.length ? i : s) : e.which == n.DELETE ? (this.unselect(t.first()), this.search.width(10), u = s.length ? s : null) : e.which == n.ENTER && (u = null), this.selectChoice(u), T(e), (!u || !u.length) && this.open();
                        return
                    }
                    if (e.which == n.LEFT && o.offset == 0 && !o.length) {
                        this.selectChoice(r.find(".select2-search-choice:not(.select2-locked)").last()), T(e);
                        return
                    }
                    this.selectChoice(null);
                    if (this.opened()) switch (e.which) {
                        case n.UP:
                        case n.DOWN:
                            this.moveHighlight(e.which === n.UP ? -1 : 1), T(e);
                            return;
                        case n.ENTER:
                            this.selectHighlighted(), T(e);
                            return;
                        case n.TAB:
                            this.selectHighlighted({
                                noFocus: !0
                            }), this.close();
                            return;
                        case n.ESC:
                            this.cancel(e), T(e);
                            return
                    }
                    if (e.which === n.TAB || n.isControl(e) || n.isFunctionKey(e) || e.which === n.BACKSPACE || e.which === n.ESC) return;
                    if (e.which === n.ENTER) {
                        if (this.opts.openOnEnter === !1) return;
                        if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return
                    }
                    this.open(), (e.which === n.PAGE_UP || e.which === n.PAGE_DOWN) && T(e), e.which === n.ENTER && T(e)
                })), this.search.on("keyup", this.bind(function(e) {
                    this.keydowns = 0, this.resizeSearch()
                })), this.search.on("blur", this.bind(function(t) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), t.stopImmediatePropagation(), this.opts.element.trigger(e.Event("select2-blur"))
                })), this.container.on("click", t, this.bind(function(t) {
                    if (!this.isInterfaceEnabled()) return;
                    if (e(t.target).closest(".select2-search-choice").length > 0) return;
                    this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.open(), this.focusSearch(), t.preventDefault()
                })), this.container.on("focus", t, this.bind(function() {
                    if (!this.isInterfaceEnabled()) return;
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(e.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder()
                })), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), this.clearSearch()
            },
            enableInterface: function() {
                this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
            },
            initSelection: function() {
                var e;
                this.opts.element.val() === "" && this.opts.element.text() === "" && (this.updateSelection([]), this.close(), this.clearSearch());
                if (this.select || this.opts.element.val() !== "") {
                    var n = this;
                    this.opts.initSelection.call(null, this.opts.element, function(e) {
                        e !== t && e !== null && (n.updateSelection(e), n.close(), n.clearSearch())
                    })
                }
            },
            clearSearch: function() {
                var e = this.getPlaceholder(),
                    n = this.getMaxSearchWidth();
                e !== t && this.getVal().length === 0 && this.search.hasClass("select2-focused") === !1 ? (this.search.val(e).addClass("select2-default"), this.search.width(n > 0 ? n : this.container.css("width"))) : this.search.val("").width(10)
            },
            clearPlaceholder: function() {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
            },
            opening: function() {
                this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), this.updateResults(!0), this.search.focus(), this.opts.element.trigger(e.Event("select2-open"))
            },
            close: function() {
                if (!this.opened()) return;
                this.parent.close.apply(this, arguments)
            },
            focus: function() {
                this.close(), this.search.focus()
            },
            isFocused: function() {
                return this.search.hasClass("select2-focused")
            },
            updateSelection: function(t) {
                var n = [],
                    r = [],
                    i = this;
                e(t).each(function() {
                    h(i.id(this), n) < 0 && (n.push(i.id(this)), r.push(this))
                }), t = r, this.selection.find(".select2-search-choice").remove(), e(t).each(function() {
                    i.addSelectedChoice(this)
                }), i.postprocessResults()
            },
            tokenize: function() {
                var e = this.search.val();
                e = this.opts.tokenizer.call(this, e, this.data(), this.bind(this.onSelect), this.opts), e != null && e != t && (this.search.val(e), e.length > 0 && this.open())
            },
            onSelect: function(e, t) {
                if (!this.triggerSelect(e)) return;
                this.addSelectedChoice(e), this.opts.element.trigger({
                    type: "selected",
                    val: this.id(e),
                    choice: e
                }), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() && this.updateResults(!0), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({
                    added: e
                }), (!t || !t.noFocus) && this.focusSearch()
            },
            cancel: function() {
                this.close(), this.focusSearch()
            },
            addSelectedChoice: function(n) {
                var r = !n.locked,
                    i = e("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                    s = e("<li class='select2-search-choice select2-locked'><div></div></li>"),
                    o = r ? i : s,
                    u = this.id(n),
                    a = this.getVal(),
                    f, l;
                f = this.opts.formatSelection(n, o.find("div"), this.opts.escapeMarkup), f != t && o.find("div").replaceWith("<div>" + f + "</div>"), l = this.opts.formatSelectionCssClass(n, o.find("div")), l != t && o.addClass(l), r && o.find(".select2-search-choice-close").on("mousedown", T).on("click dblclick", this.bind(function(t) {
                    if (!this.isInterfaceEnabled()) return;
                    e(t.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function() {
                        this.unselect(e(t.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.close(), this.focusSearch()
                    })).dequeue(), T(t)
                })).on("focus", this.bind(function() {
                    if (!this.isInterfaceEnabled()) return;
                    this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active")
                })), o.data("select2-data", n), o.insertBefore(this.searchContainer), a.push(u), this.setVal(a)
            },
            unselect: function(e) {
                var t = this.getVal(),
                    n, r;
                e = e.closest(".select2-search-choice");
                if (e.length === 0) throw "Invalid argument: " + e + ". Must be .select2-search-choice";
                n = e.data("select2-data");
                if (!n) return;
                r = h(this.id(n), t), r >= 0 && (t.splice(r, 1), this.setVal(t), this.select && this.postprocessResults()), e.remove(), this.opts.element.trigger({
                    type: "removed",
                    val: this.id(n),
                    choice: n
                }), this.triggerChange({
                    removed: n
                })
            },
            postprocessResults: function(e, t, n) {
                var r = this.getVal(),
                    i = this.results.find(".select2-result"),
                    s = this.results.find(".select2-result-with-children"),
                    o = this;
                i.each2(function(e, t) {
                    var n = o.id(t.data("select2-data"));
                    h(n, r) >= 0 && (t.addClass("select2-selected"), t.find(".select2-result-selectable").addClass("select2-selected"))
                }), s.each2(function(e, t) {
                    !t.is(".select2-result-selectable") && t.find(".select2-result-selectable:not(.select2-selected)").length === 0 && t.addClass("select2-selected")
                }), this.highlight() == -1 && n !== !1 && o.highlight(0), !this.opts.createSearchChoice && !i.filter(".select2-result:not(.select2-selected)").length > 0 && (!e || e && !e.more && this.results.find(".select2-no-results").length === 0) && D(o.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + o.opts.formatNoMatches(o.search.val()) + "</li>")
            },
            getMaxSearchWidth: function() {
                return this.selection.width() - m(this.search)
            },
            resizeSearch: function() {
                var e, t, n, r, i, s = m(this.search);
                e = C(this.search) + 10, t = this.search.offset().left, n = this.selection.width(), r = this.selection.offset().left, i = n - (t - r) - s, i < e && (i = n - s), i < 40 && (i = n - s), i <= 0 && (i = e), this.search.width(i)
            },
            getVal: function() {
                var e;
                return this.select ? (e = this.select.val(), e === null ? [] : e) : (e = this.opts.element.val(), v(e, this.opts.separator))
            },
            setVal: function(t) {
                var n;
                this.select ? this.select.val(t) : (n = [], e(t).each(function() {
                    h(this, n) < 0 && n.push(this)
                }), this.opts.element.val(n.length === 0 ? "" : n.join(this.opts.separator)))
            },
            buildChangeDetails: function(e, t) {
                var t = t.slice(0),
                    e = e.slice(0);
                for (var n = 0; n < t.length; n++)
                    for (var r = 0; r < e.length; r++) d(this.opts.id(t[n]), this.opts.id(e[r])) && (t.splice(n, 1), n--, e.splice(r, 1), r--);
                return {
                    added: t,
                    removed: e
                }
            },
            val: function(n, r) {
                var i, s = this,
                    o;
                if (arguments.length === 0) return this.getVal();
                i = this.data(), i.length || (i = []);
                if (!n && n !== 0) {
                    this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), r && this.triggerChange({
                        added: this.data(),
                        removed: i
                    });
                    return
                }
                this.setVal(n);
                if (this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), r && this.triggerChange(this.buildChangeDetails(i, this.data()));
                else {
                    if (this.opts.initSelection === t) throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function(t) {
                        var n = e.map(t, s.id);
                        s.setVal(n), s.updateSelection(t), s.clearSearch(), r && s.triggerChange(this.buildChangeDetails(i, this.data()))
                    })
                }
                this.clearSearch()
            },
            onSortStart: function() {
                if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0)
            },
            onSortEnd: function() {
                var t = [],
                    n = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function() {
                    t.push(n.opts.id(e(this).data("select2-data")))
                }), this.setVal(t), this.triggerChange()
            },
            data: function(t, n) {
                var r = this,
                    i, s;
                if (arguments.length === 0) return this.selection.find(".select2-search-choice").map(function() {
                    return e(this).data("select2-data")
                }).get();
                s = this.data(), t || (t = []), i = e.map(t, function(e) {
                    return r.opts.id(e)
                }), this.setVal(i), this.updateSelection(t), this.clearSearch(), n && this.triggerChange(this.buildChangeDetails(s, this.data()))
            }
        }), e.fn.select2 = function() {
            var n = Array.prototype.slice.call(arguments, 0),
                r, o, u, a, f, l = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "readonly", "positionDropdown", "data", "search"],
                c = ["val", "opened", "isFocused", "container", "data"],
                p = {
                    search: "externalSearch"
                };
            return this.each(function() {
                if (n.length === 0 || typeof n[0] == "object") r = n.length === 0 ? {} : e.extend({}, n[0]), r.element = e(this), r.element.get(0).tagName.toLowerCase() === "select" ? f = r.element.prop("multiple") : (f = r.multiple || !1, "tags" in r && (r.multiple = f = !0)), o = f ? new s : new i, o.init(r);
                else {
                    if (typeof n[0] != "string") throw "Invalid arguments to select2 plugin: " + n;
                    if (h(n[0], l) < 0) throw "Unknown method: " + n[0];
                    a = t, o = e(this).data("select2");
                    if (o === t) return;
                    u = n[0], u === "container" ? a = o.container : u === "dropdown" ? a = o.dropdown : (p[u] && (u = p[u]), a = o[u].apply(o, n.slice(1)));
                    if (h(n[0], c) >= 0) return !1
                }
            }), a === t ? this : a
        }, e.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function(e, t, n, r) {
                var i = [];
                return L(e.text, n.term, i, r), i.join("")
            },
            formatSelection: function(e, n, r) {
                return e ? r(e.text) : t
            },
            sortResults: function(e, t, n) {
                return e
            },
            formatResultCssClass: function(e) {
                return t
            },
            formatSelectionCssClass: function(e, n) {
                return t
            },
            formatNoMatches: function() {
                return "No matches found"
            },
            formatInputTooShort: function(e, t) {
                var n = t - e.length;
                return "Please enter " + n + " more character" + (n == 1 ? "" : "s")
            },
            formatInputTooLong: function(e, t) {
                var n = e.length - t;
                return "Please delete " + n + " character" + (n == 1 ? "" : "s")
            },
            formatSelectionTooBig: function(e) {
                return "You can only select " + e + " item" + (e == 1 ? "" : "s")
            },
            formatLoadMore: function(e) {
                return "Loading more results..."
            },
            formatSearching: function() {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function(e) {
                return e.id
            },
            matcher: function(e, t) {
                return ("" + t).toUpperCase().indexOf(("" + e).toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: B,
            escapeMarkup: A,
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function(e) {
                return e
            },
            adaptDropdownCssClass: function(e) {
                return null
            }
        }, e.fn.select2.ajaxDefaults = {
            transport: e.ajax,
            params: {
                type: "GET",
                cache: !1,
                dataType: "json"
            }
        }, window.Select2 = {
            query: {
                ajax: O,
                local: M,
                tags: _
            },
            util: {
                debounce: b,
                markMatch: L,
                escapeMarkup: A
            },
            "class": {
                "abstract": r,
                single: i,
                multi: s
            }
        }
    }(jQuery);