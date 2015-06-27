
(function(e) {
    function i(e) {
        if (n) {
            e = e.replace("Ctrl", "Cmd")
        } else {
            e = e.replace("Cmd", "Ctrl")
        }
        return e
    }

    function s(e, t) {
        t = t || {};
        var s = document.createElement("a");
        var o = t.shortcut || r[e];
        if (o) {
            o = i(o);
            s.title = o;
            s.title = s.title.replace("Cmd", /u2318/);
            if (n) {
                s.title = s.title.replace("Alt", "⌥")
            }
        }
        s.className = t.className || "icon-" + e;
        return s
    }

    function o() {
        el = document.createElement("i");
        el.className = "separator";
        el.innerHTML = "|";
        return el
    }

    function u(e, t) {
        t = t || e.getCursor("start");
        var n = e.getTokenAt(t);
        if (!n.type) return {};
        var r = n.type.split(" ");
        var i = {}, s, o;
        for (var u = 0; u < r.length; u++) {
            s = r[u];
            if (s === "strong") {
                i.bold = true
            } else if (s === "variable-2") {
                o = e.getLine(t.line);
                if (/^\s*\d+\.\s/.test(o)) {
                    i["ordered-list"] = true
                } else {
                    i["unordered-list"] = true
                }
            } else if (s === "atom") {
                i.quote = true
            } else if (s === "em") {
                i.italic = true
            }
        }
        return i
    }

    function a(e) {
        var t = e.codemirror.getWrapperElement();
        var n = document;
        var r = n.fullScreen || n.mozFullScreen || n.webkitFullScreen;
        var i = function() {
            if (t.requestFullScreen) {
                t.requestFullScreen()
            } else if (t.mozRequestFullScreen) {
                t.mozRequestFullScreen()
            } else if (t.webkitRequestFullScreen) {
                t.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
            }
        };
        var s = function() {
            if (n.cancelFullScreen) {
                n.cancelFullScreen()
            } else if (n.mozCancelFullScreen) {
                n.mozCancelFullScreen()
            } else if (n.webkitCancelFullScreen) {
                n.webkitCancelFullScreen()
            }
        };
        if (!r) {
            i()
        } else if (s) {
            s()
        }
    }

    function f(e) {
        var t = e.codemirror;
        var n = u(t);
        var r;
        var i = "**";
        var s = "**";
        var o = t.getCursor("start");
        var a = t.getCursor("end");
        if (n.bold) {
            r = t.getLine(o.line);
            i = r.slice(0, o.ch);
            s = r.slice(o.ch);
            i = i.replace(/^(.*)?(\*|\_){2}(\S+.*)?$/, "$1$3");
            s = s.replace(/^(.*\S+)?(\*|\_){2}(\s+.*)?$/, "$1$3");
            o.ch -= 2;
            a.ch -= 2;
            t.setLine(o.line, i + s)
        } else {
            r = t.getSelection();
            t.replaceSelection(i + r + s);
            o.ch += 2;
            a.ch += 2
        }
        t.setSelection(o, a);
        t.focus()
    }

    function l(e) {
        var t = e.codemirror;
        var n = u(t);
        var r;
        var i = "*";
        var s = "*";
        var o = t.getCursor("start");
        var a = t.getCursor("end");
        if (n.italic) {
            r = t.getLine(o.line);
            i = r.slice(0, o.ch);
            s = r.slice(o.ch);
            i = i.replace(/^(.*)?(\*|\_)(\S+.*)?$/, "$1$3");
            s = s.replace(/^(.*\S+)?(\*|\_)(\s+.*)?$/, "$1$3");
            o.ch -= 1;
            a.ch -= 1;
            t.setLine(o.line, i + s)
        } else {
            r = t.getSelection();
            t.replaceSelection(i + r + s);
            o.ch += 1;
            a.ch += 1
        }
        t.setSelection(o, a);
        t.focus()
    }

    function c(e) {
        var t = e.codemirror;
        w(t, "quote")
    }

    function h(e) {
        var t = e.codemirror;
        w(t, "unordered-list")
    }

    function p(e) {
        var t = e.codemirror;
        w(t, "ordered-list")
    }

    function d(e) {
        var t = e.codemirror;
        var n = u(t);
        b(t, n.link, "[", "](http://)")
    }

    function v(e) {
        var t = e.codemirror;
        var n = u(t);
        b(t, n.image, "![", "](http://)")
    }

    function m(e) {
        var t = e.codemirror;
        t.undo();
        t.focus()
    }

    function g(e) {
        var t = e.codemirror;
        t.redo();
        t.focus()
    }

    function y(e) {
        var t = e.toolbar.preview;
        var n = e.constructor.markdown;
        var r = e.codemirror;
        var i = r.getWrapperElement();
        var s = i.lastChild;
        if (!/editor-preview/.test(s.className)) {
            s = document.createElement("div");
            s.className = "editor-preview";
            i.appendChild(s)
        }
        if (/editor-preview-active/.test(s.className)) {
            s.className = s.className.replace(/\s*editor-preview-active\s*/g, "");
            t.className = t.className.replace(/\s*active\s*/g, "")
        } else {
            setTimeout(function() {
                s.className += " editor-preview-active"
            }, 1);
            t.className += " active"
        }
        var o = r.getValue();
        s.innerHTML = n(o)
    }

    function b(e, t, n, r) {
        var i;
        var s = e.getCursor("start");
        var o = e.getCursor("end");
        if (t) {
            i = e.getLine(s.line);
            n = i.slice(0, s.ch);
            r = i.slice(s.ch);
            e.setLine(s.line, n + r)
        } else {
            i = e.getSelection();
            e.replaceSelection(n + i + r);
            s.ch += n.length;
            o.ch += n.length
        }
        e.setSelection(s, o);
        e.focus()
    }

    function w(e, t) {
        var n = u(e);
        var r = e.getCursor("start");
        var i = e.getCursor("end");
        var s = {
            quote: /^(\s*)\>\s+/,
            "unordered-list": /^(\s*)(\*|\-|\+)\s+/,
            "ordered-list": /^(\s*)\d+\.\s+/
        };
        var o = {
            quote: "> ",
            "unordered-list": "* ",
            "ordered-list": "1. "
        };
        for (var a = r.line; a <= i.line; a++) {
            (function(r) {
                var i = e.getLine(r);
                if (n[t]) {
                    i = i.replace(s[t], "$1")
                } else {
                    i = o[t] + i
                }
                e.setLine(r, i)
            })(a)
        }
        e.focus()
    }

    function E(e) {
        var t = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
        var n = e.match(t);
        var r = 0;
        if (n === null) return r;
        for (var i = 0; i < n.length; i++) {
            if (n[i].charCodeAt(0) >= 19968) {
                r += n[i].length
            } else {
                r += 1
            }
        }
        return r
    }

    function x(e) {
        e = e || {};
        if (e.element) {
            this.element = e.element
        }
        e.toolbar = e.toolbar || x.toolbar;
        if (!e.hasOwnProperty("status")) {
            e.status = ["lines", "words", "cursor"]
        }
        this.options = e;
        if (this.element) {
            this.render()
        }
    }
    var t = function() {
        "use strict";

        function S(e, n) {
            if (!(this instanceof S)) return new S(e, n);
            this.options = n = n || {};
            for (var r in Qn)
                if (!n.hasOwnProperty(r) && Qn.hasOwnProperty(r)) n[r] = Qn[r];
            P(n);
            var i = typeof n.value == "string" ? 0 : n.value.first;
            var s = this.display = x(e, i);
            s.wrapper.CodeMirror = this;
            M(this);
            if (n.autofocus && !d) jt(this);
            this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: false,
                focused: false,
                suppressEdits: false,
                pasteIncoming: false,
                draggingText: false,
                highlight: new Vi
            };
            A(this);
            if (n.lineWrapping) this.display.wrapper.className += " CodeMirror-wrap";
            var o = n.value;
            if (typeof o == "string") o = new ri(n.value, n.mode);
            At(this, ui)(this, o);
            if (t) setTimeout(ns(Bt, this, true), 20);
            It(this);
            var u;
            try {
                u = document.activeElement == s.input
            } catch (a) {}
            if (u || n.autofocus && !d) setTimeout(ns(fn, this), 20);
            else ln(this);
            At(this, function() {
                for (var e in Kn)
                    if (Kn.propertyIsEnumerable(e)) Kn[e](this, n[e], Yn);
                for (var t = 0; t < nr.length; ++t) nr[t](this)
            })()
        }

        function x(e, t) {
            var r = {};
            var s = r.input = us("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");
            if (i) s.style.width = "1000px";
            else s.setAttribute("wrap", "off"); if (p) s.style.border = "1px solid black";
            s.setAttribute("autocorrect", "off");
            s.setAttribute("autocapitalize", "off");
            s.setAttribute("spellcheck", "false");
            r.inputDiv = us("div", [s], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
            r.scrollbarH = us("div", [us("div", null, null, "height: 1px")], "CodeMirror-hscrollbar");
            r.scrollbarV = us("div", [us("div", null, null, "width: 1px")], "CodeMirror-vscrollbar");
            r.scrollbarFiller = us("div", null, "CodeMirror-scrollbar-filler");
            r.gutterFiller = us("div", null, "CodeMirror-gutter-filler");
            r.lineDiv = us("div", null, "CodeMirror-code");
            r.selectionDiv = us("div", null, null, "position: relative; z-index: 1");
            r.cursor = us("div", " ", "CodeMirror-cursor");
            r.otherCursor = us("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor");
            r.measure = us("div", null, "CodeMirror-measure");
            r.lineSpace = us("div", [r.measure, r.selectionDiv, r.lineDiv, r.cursor, r.otherCursor], null, "position: relative; outline: none");
            r.mover = us("div", [us("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative");
            r.sizer = us("div", [r.mover], "CodeMirror-sizer");
            r.heightForcer = us("div", null, null, "position: absolute; height: " + Wi + "px; width: 1px;");
            r.gutters = us("div", null, "CodeMirror-gutters");
            r.lineGutter = null;
            r.scroller = us("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll");
            r.scroller.setAttribute("tabIndex", "-1");
            r.wrapper = us("div", [r.inputDiv, r.scrollbarH, r.scrollbarV, r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror");
            if (n) {
                r.gutters.style.zIndex = -1;
                r.scroller.style.paddingRight = 0
            }
            if (e.appendChild) e.appendChild(r.wrapper);
            else e(r.wrapper); if (p) s.style.width = "0px";
            if (!i) r.scroller.draggable = true;
            if (f) {
                r.inputDiv.style.height = "1px";
                r.inputDiv.style.position = "absolute"
            } else if (n) r.scrollbarH.style.minWidth = r.scrollbarV.style.minWidth = "18px";
            r.viewOffset = r.lastSizeC = 0;
            r.showingFrom = r.showingTo = t;
            r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null;
            r.prevInput = "";
            r.alignWidgets = false;
            r.pollingFast = false;
            r.poll = new Vi;
            r.cachedCharWidth = r.cachedTextHeight = null;
            r.measureLineCache = [];
            r.measureLineCachePos = 0;
            r.inaccurateSelection = false;
            r.maxLine = null;
            r.maxLineLength = 0;
            r.maxLineChanged = false;
            r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null;
            return r
        }

        function T(e) {
            e.doc.mode = S.getMode(e.options, e.doc.modeOption);
            e.doc.iter(function(e) {
                if (e.stateAfter) e.stateAfter = null;
                if (e.styles) e.styles = null
            });
            e.doc.frontier = e.doc.first;
            et(e, 100);
            e.state.modeGen++;
            if (e.curOp) _t(e)
        }

        function N(e) {
            if (e.options.lineWrapping) {
                e.display.wrapper.className += " CodeMirror-wrap";
                e.display.sizer.style.minWidth = ""
            } else {
                e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-wrap", "");
                D(e)
            }
            k(e);
            _t(e);
            pt(e);
            setTimeout(function() {
                H(e)
            }, 100)
        }

        function C(e) {
            var t = Tt(e.display),
                n = e.options.lineWrapping;
            var r = n && Math.max(5, e.display.scroller.clientWidth / Nt(e.display) - 3);
            return function(i) {
                if (Ar(e.doc, i)) return 0;
                else if (n) return (Math.ceil(i.text.length / r) || 1) * t;
                else return t
            }
        }

        function k(e) {
            var t = e.doc,
                n = C(e);
            t.iter(function(e) {
                var t = n(e);
                if (t != e.height) ci(e, t)
            })
        }

        function L(e) {
            var t = ur[e.options.keyMap],
                n = t.style;
            e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (n ? " cm-keymap-" + n : "");
            e.state.disableInput = t.disableInput
        }

        function A(e) {
            e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
            pt(e)
        }

        function O(e) {
            M(e);
            _t(e);
            setTimeout(function() {
                j(e)
            }, 20)
        }

        function M(e) {
            var t = e.display.gutters,
                n = e.options.gutters;
            as(t);
            for (var r = 0; r < n.length; ++r) {
                var i = n[r];
                var s = t.appendChild(us("div", null, "CodeMirror-gutter " + i));
                if (i == "CodeMirror-linenumbers") {
                    e.display.lineGutter = s;
                    s.style.width = (e.display.lineNumWidth || 1) + "px"
                }
            }
            t.style.display = r ? "" : "none"
        }

        function _(e, t) {
            if (t.height == 0) return 0;
            var n = t.text.length,
                r, i = t;
            while (r = Cr(i)) {
                var s = r.find();
                i = ai(e, s.from.line);
                n += s.from.ch - s.to.ch
            }
            i = t;
            while (r = kr(i)) {
                var s = r.find();
                n -= i.text.length - s.from.ch;
                i = ai(e, s.to.line);
                n += i.text.length - s.to.ch
            }
            return n
        }

        function D(e) {
            var t = e.display,
                n = e.doc;
            t.maxLine = ai(n, n.first);
            t.maxLineLength = _(n, t.maxLine);
            t.maxLineChanged = true;
            n.iter(function(e) {
                var r = _(n, e);
                if (r > t.maxLineLength) {
                    t.maxLineLength = r;
                    t.maxLine = e
                }
            })
        }

        function P(e) {
            var t = false;
            for (var n = 0; n < e.gutters.length; ++n) {
                if (e.gutters[n] == "CodeMirror-linenumbers") {
                    if (e.lineNumbers) t = true;
                    else e.gutters.splice(n--, 1)
                }
            }
            if (!t && e.lineNumbers) e.gutters.push("CodeMirror-linenumbers")
        }

        function H(e) {
            var t = e.display,
                n = e.doc.height;
            var r = n + st(t);
            t.sizer.style.minHeight = t.heightForcer.style.top = r + "px";
            t.gutters.style.height = Math.max(r, t.scroller.clientHeight - Wi) + "px";
            var i = Math.max(r, t.scroller.scrollHeight);
            var s = t.scroller.scrollWidth > t.scroller.clientWidth + 1;
            var o = i > t.scroller.clientHeight + 1;
            if (o) {
                t.scrollbarV.style.display = "block";
                t.scrollbarV.style.bottom = s ? vs(t.measure) + "px" : "0";
                t.scrollbarV.firstChild.style.height = i - t.scroller.clientHeight + t.scrollbarV.clientHeight + "px"
            } else t.scrollbarV.style.display = ""; if (s) {
                t.scrollbarH.style.display = "block";
                t.scrollbarH.style.right = o ? vs(t.measure) + "px" : "0";
                t.scrollbarH.firstChild.style.width = t.scroller.scrollWidth - t.scroller.clientWidth + t.scrollbarH.clientWidth + "px"
            } else t.scrollbarH.style.display = ""; if (s && o) {
                t.scrollbarFiller.style.display = "block";
                t.scrollbarFiller.style.height = t.scrollbarFiller.style.width = vs(t.measure) + "px"
            } else t.scrollbarFiller.style.display = ""; if (s && e.options.coverGutterNextToScrollbar && e.options.fixedGutter) {
                t.gutterFiller.style.display = "block";
                t.gutterFiller.style.height = vs(t.measure) + "px";
                t.gutterFiller.style.width = t.gutters.offsetWidth + "px"
            } else t.gutterFiller.style.display = ""; if (l && vs(t.measure) === 0) t.scrollbarV.style.minWidth = t.scrollbarH.style.minHeight = c ? "18px" : "12px"
        }

        function B(e, t, n) {
            var r = e.scroller.scrollTop,
                i = e.wrapper.clientHeight;
            if (typeof n == "number") r = n;
            else if (n) {
                r = n.top;
                i = n.bottom - n.top
            }
            r = Math.floor(r - it(e));
            var s = Math.ceil(r + i);
            return {
                from: pi(t, r),
                to: pi(t, s)
            }
        }

        function j(e) {
            var t = e.display;
            if (!t.alignWidgets && (!t.gutters.firstChild || !e.options.fixedGutter)) return;
            var n = q(t) - t.scroller.scrollLeft + e.doc.scrollLeft;
            var r = t.gutters.offsetWidth,
                i = n + "px";
            for (var s = t.lineDiv.firstChild; s; s = s.nextSibling)
                if (s.alignable) {
                    for (var o = 0, u = s.alignable; o < u.length; ++o) u[o].style.left = i
                }
            if (e.options.fixedGutter) t.gutters.style.left = n + r + "px"
        }

        function F(e) {
            if (!e.options.lineNumbers) return false;
            var t = e.doc,
                n = I(e.options, t.first + t.size - 1),
                r = e.display;
            if (n.length != r.lineNumChars) {
                var i = r.measure.appendChild(us("div", [us("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
                var s = i.firstChild.offsetWidth,
                    o = i.offsetWidth - s;
                r.lineGutter.style.width = "";
                r.lineNumInnerWidth = Math.max(s, r.lineGutter.offsetWidth - o);
                r.lineNumWidth = r.lineNumInnerWidth + o;
                r.lineNumChars = r.lineNumInnerWidth ? n.length : -1;
                r.lineGutter.style.width = r.lineNumWidth + "px";
                return true
            }
            return false
        }

        function I(e, t) {
            return String(e.lineNumberFormatter(t + e.firstLineNumber))
        }

        function q(e) {
            return cs(e.scroller).left - cs(e.sizer).left
        }

        function R(e, t, n, r) {
            var i = e.display.showingFrom,
                s = e.display.showingTo,
                o;
            var u = B(e.display, e.doc, n);
            for (;;) {
                if (!U(e, t, u, r)) break;
                r = false;
                o = true;
                Q(e);
                H(e);
                if (n) n = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, typeof n == "number" ? n : n.top);
                u = B(e.display, e.doc, n);
                if (u.from >= e.display.showingFrom && u.to <= e.display.showingTo) break;
                t = []
            }
            if (o) {
                Ii(e, "update", e);
                if (e.display.showingFrom != i || e.display.showingTo != s) Ii(e, "viewportChange", e, e.display.showingFrom, e.display.showingTo)
            }
            return o
        }

        function U(e, t, n, r) {
            var i = e.display,
                s = e.doc;
            if (!i.wrapper.clientWidth) {
                i.showingFrom = i.showingTo = s.first;
                i.viewOffset = 0;
                return
            }
            if (!r && t.length == 0 && n.from > i.showingFrom && n.to < i.showingTo) return;
            if (F(e)) t = [{
                from: s.first,
                to: s.first + s.size
            }];
            var o = i.sizer.style.marginLeft = i.gutters.offsetWidth + "px";
            i.scrollbarH.style.left = e.options.fixedGutter ? o : "0";
            var u = Infinity;
            if (e.options.lineNumbers)
                for (var a = 0; a < t.length; ++a)
                    if (t[a].diff) {
                        u = t[a].from;
                        break
                    }
            var f = s.first + s.size;
            var l = Math.max(n.from - e.options.viewportMargin, s.first);
            var c = Math.min(f, n.to + e.options.viewportMargin);
            if (i.showingFrom < l && l - i.showingFrom < 20) l = Math.max(s.first, i.showingFrom);
            if (i.showingTo > c && i.showingTo - c < 20) c = Math.min(f, i.showingTo);
            if (E) {
                l = hi(Lr(s, ai(s, l)));
                while (c < f && Ar(s, ai(s, c)))++c
            }
            var h = [{
                from: Math.max(i.showingFrom, s.first),
                to: Math.min(i.showingTo, f)
            }];
            if (h[0].from >= h[0].to) h = [];
            else h = X(h, t); if (E)
                for (var a = 0; a < h.length; ++a) {
                    var p = h[a],
                        d;
                    while (d = kr(ai(s, p.to - 1))) {
                        var v = d.find().from.line;
                        if (v > p.from) p.to = v;
                        else {
                            h.splice(a--, 1);
                            break
                        }
                    }
                }
            var m = 0;
            for (var a = 0; a < h.length; ++a) {
                var p = h[a];
                if (p.from < l) p.from = l;
                if (p.to > c) p.to = c;
                if (p.from >= p.to) h.splice(a--, 1);
                else m += p.to - p.from
            }
            if (!r && m == c - l && l == i.showingFrom && c == i.showingTo) {
                W(e);
                return
            }
            h.sort(function(e, t) {
                return e.from - t.from
            });
            try {
                var g = document.activeElement
            } catch (y) {}
            if (m < (c - l) * .7) i.lineDiv.style.display = "none";
            $(e, l, c, h, u);
            i.lineDiv.style.display = "";
            if (g && document.activeElement != g && g.offsetHeight) g.focus();
            var b = l != i.showingFrom || c != i.showingTo || i.lastSizeC != i.wrapper.clientHeight;
            if (b) {
                i.lastSizeC = i.wrapper.clientHeight;
                et(e, 400)
            }
            i.showingFrom = l;
            i.showingTo = c;
            z(e);
            W(e);
            return true
        }

        function z(e) {
            var t = e.display;
            var r = t.lineDiv.offsetTop;
            for (var i = t.lineDiv.firstChild, s; i; i = i.nextSibling)
                if (i.lineObj) {
                    if (n) {
                        var o = i.offsetTop + i.offsetHeight;
                        s = o - r;
                        r = o
                    } else {
                        var u = cs(i);
                        s = u.bottom - u.top
                    }
                    var a = i.lineObj.height - s;
                    if (s < 2) s = Tt(t);
                    if (a > .001 || a < -.001) {
                        ci(i.lineObj, s);
                        var f = i.lineObj.widgets;
                        if (f)
                            for (var l = 0; l < f.length; ++l) f[l].height = f[l].node.offsetHeight
                    }
                }
        }

        function W(e) {
            var t = e.display.viewOffset = di(e, ai(e.doc, e.display.showingFrom));
            e.display.mover.style.top = t + "px"
        }

        function X(e, t) {
            for (var n = 0, r = t.length || 0; n < r; ++n) {
                var i = t[n],
                    s = [],
                    o = i.diff || 0;
                for (var u = 0, a = e.length; u < a; ++u) {
                    var f = e[u];
                    if (i.to <= f.from && i.diff) {
                        s.push({
                            from: f.from + o,
                            to: f.to + o
                        })
                    } else if (i.to <= f.from || i.from >= f.to) {
                        s.push(f)
                    } else {
                        if (i.from > f.from) s.push({
                            from: f.from,
                            to: i.from
                        });
                        if (i.to < f.to) s.push({
                            from: i.to + o,
                            to: f.to + o
                        })
                    }
                }
                e = s
            }
            return e
        }

        function V(e) {
            var t = e.display,
                n = {}, r = {};
            for (var i = t.gutters.firstChild, s = 0; i; i = i.nextSibling, ++s) {
                n[e.options.gutters[s]] = i.offsetLeft;
                r[e.options.gutters[s]] = i.offsetWidth
            }
            return {
                fixedPos: q(t),
                gutterTotalWidth: t.gutters.offsetWidth,
                gutterLeft: n,
                gutterWidth: r,
                wrapperWidth: t.wrapper.clientWidth
            }
        }

        function $(e, t, n, r, s) {
            function c(t) {
                var n = t.nextSibling;
                if (i && v && e.display.currentWheelTarget == t) {
                    t.style.display = "none";
                    t.lineObj = null
                } else {
                    t.parentNode.removeChild(t)
                }
                return n
            }
            var o = V(e);
            var u = e.display,
                a = e.options.lineNumbers;
            if (!r.length && (!i || !e.display.currentWheelTarget)) as(u.lineDiv);
            var f = u.lineDiv,
                l = f.firstChild;
            var h = r.shift(),
                p = t;
            e.doc.iter(t, n, function(t) {
                if (h && h.to == p) h = r.shift();
                if (Ar(e.doc, t)) {
                    if (t.height != 0) ci(t, 0);
                    if (t.widgets && l.previousSibling)
                        for (var n = 0; n < t.widgets.length; ++n) {
                            var i = t.widgets[n];
                            if (i.showIfHidden) {
                                var u = l.previousSibling;
                                if (/pre/i.test(u.nodeName)) {
                                    var d = us("div", null, null, "position: relative");
                                    u.parentNode.replaceChild(d, u);
                                    d.appendChild(u);
                                    u = d
                                }
                                var v = u.appendChild(us("div", [i.node], "CodeMirror-linewidget"));
                                if (!i.handleMouseEvents) v.ignoreEvents = true;
                                K(i, v, u, o)
                            }
                        }
                } else if (h && h.from <= p && h.to > p) {
                    while (l.lineObj != t) l = c(l);
                    if (a && s <= p && l.lineNumber) ls(l.lineNumber, I(e.options, p));
                    l = l.nextSibling
                } else {
                    if (t.widgets)
                        for (var m = 0, g = l, y; g && m < 20; ++m, g = g.nextSibling)
                            if (g.lineObj == t && /div/i.test(g.nodeName)) {
                                y = g;
                                break
                            }
                    var b = J(e, t, p, o, y);
                    if (b != y) {
                        f.insertBefore(b, l)
                    } else {
                        while (l != y) l = c(l);
                        l = l.nextSibling
                    }
                    b.lineObj = t
                }++p
            });
            while (l) l = c(l)
        }

        function J(e, t, r, i, s) {
            var o = Vr(e, t);
            var u = t.gutterMarkers,
                a = e.display,
                f;
            if (!e.options.lineNumbers && !u && !t.bgClass && !t.wrapClass && !t.widgets) return o;
            if (s) {
                s.alignable = null;
                var l = true,
                    c = 0,
                    h = null;
                for (var p = s.firstChild, d; p; p = d) {
                    d = p.nextSibling;
                    if (!/\bCodeMirror-linewidget\b/.test(p.className)) {
                        s.removeChild(p)
                    } else {
                        for (var v = 0; v < t.widgets.length; ++v) {
                            var m = t.widgets[v];
                            if (m.node == p.firstChild) {
                                if (!m.above && !h) h = p;
                                K(m, p, s, i);
                                ++c;
                                break
                            }
                        }
                        if (v == t.widgets.length) {
                            l = false;
                            break
                        }
                    }
                }
                s.insertBefore(o, h);
                if (l && c == t.widgets.length) {
                    f = s;
                    s.className = t.wrapClass || ""
                }
            }
            if (!f) {
                f = us("div", null, t.wrapClass, "position: relative");
                f.appendChild(o)
            }
            if (t.bgClass) f.insertBefore(us("div", null, t.bgClass + " CodeMirror-linebackground"), f.firstChild);
            if (e.options.lineNumbers || u) {
                var g = f.insertBefore(us("div", null, null, "position: absolute; left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px"), f.firstChild);
                if (e.options.fixedGutter)(f.alignable || (f.alignable = [])).push(g);
                if (e.options.lineNumbers && (!u || !u["CodeMirror-linenumbers"])) f.lineNumber = g.appendChild(us("div", I(e.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.lineNumInnerWidth + "px"));
                if (u)
                    for (var y = 0; y < e.options.gutters.length; ++y) {
                        var b = e.options.gutters[y],
                            w = u.hasOwnProperty(b) && u[b];
                        if (w) g.appendChild(us("div", [w], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[b] + "px; width: " + i.gutterWidth[b] + "px"))
                    }
            }
            if (n) f.style.zIndex = 2;
            if (t.widgets && f != s)
                for (var v = 0, E = t.widgets; v < E.length; ++v) {
                    var m = E[v],
                        S = us("div", [m.node], "CodeMirror-linewidget");
                    if (!m.handleMouseEvents) S.ignoreEvents = true;
                    K(m, S, f, i);
                    if (m.above) f.insertBefore(S, e.options.lineNumbers && t.height != 0 ? g : o);
                    else f.appendChild(S);
                    Ii(m, "redraw")
                }
            return f
        }

        function K(e, t, n, r) {
            if (e.noHScroll) {
                (n.alignable || (n.alignable = [])).push(t);
                var i = r.wrapperWidth;
                t.style.left = r.fixedPos + "px";
                if (!e.coverGutter) {
                    i -= r.gutterTotalWidth;
                    t.style.paddingLeft = r.gutterTotalWidth + "px"
                }
                t.style.width = i + "px"
            }
            if (e.coverGutter) {
                t.style.zIndex = 5;
                t.style.position = "relative";
                if (!e.noHScroll) t.style.marginLeft = -r.gutterTotalWidth + "px"
            }
        }

        function Q(e) {
            var t = e.display;
            var n = Nn(e.doc.sel.from, e.doc.sel.to);
            if (n || e.options.showCursorWhenSelecting) G(e);
            else t.cursor.style.display = t.otherCursor.style.display = "none"; if (!n) Y(e);
            else t.selectionDiv.style.display = "none"; if (e.options.moveInputWithCursor) {
                var r = bt(e, e.doc.sel.head, "div");
                var i = cs(t.wrapper),
                    s = cs(t.lineDiv);
                t.inputDiv.style.top = Math.max(0, Math.min(t.wrapper.clientHeight - 10, r.top + s.top - i.top)) + "px";
                t.inputDiv.style.left = Math.max(0, Math.min(t.wrapper.clientWidth - 10, r.left + s.left - i.left)) + "px"
            }
        }

        function G(e) {
            var t = e.display,
                n = bt(e, e.doc.sel.head, "div");
            t.cursor.style.left = n.left + "px";
            t.cursor.style.top = n.top + "px";
            t.cursor.style.height = Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px";
            t.cursor.style.display = "";
            if (n.other) {
                t.otherCursor.style.display = "";
                t.otherCursor.style.left = n.other.left + "px";
                t.otherCursor.style.top = n.other.top + "px";
                t.otherCursor.style.height = (n.other.bottom - n.other.top) * .85 + "px"
            } else {
                t.otherCursor.style.display = "none"
            }
        }

        function Y(e) {
            function u(e, t, n, r) {
                if (t < 0) t = 0;
                i.appendChild(us("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px; top: " + t + "px; width: " + (n == null ? s - e : n) + "px; height: " + (r - t) + "px"))
            }

            function a(t, r, i) {
                function h(n, r) {
                    return yt(e, Tn(t, n), "div", a, r)
                }
                var a = ai(n, t);
                var f = a.text.length;
                var l, c;
                Ss(vi(a), r || 0, i == null ? f : i, function(e, t, n) {
                    var a = h(e, "left"),
                        p, d, v;
                    if (e == t) {
                        p = a;
                        d = v = a.left
                    } else {
                        p = h(t - 1, "right");
                        if (n == "rtl") {
                            var m = a;
                            a = p;
                            p = m
                        }
                        d = a.left;
                        v = p.right
                    } if (r == null && e == 0) d = o;
                    if (p.top - a.top > 3) {
                        u(d, a.top, null, a.bottom);
                        d = o;
                        if (a.bottom < p.top) u(d, a.bottom, null, p.top)
                    }
                    if (i == null && t == f) v = s;
                    if (!l || a.top < l.top || a.top == l.top && a.left < l.left) l = a;
                    if (!c || p.bottom > c.bottom || p.bottom == c.bottom && p.right > c.right) c = p;
                    if (d < o + 1) d = o;
                    u(d, p.top, v - d, p.bottom)
                });
                return {
                    start: l,
                    end: c
                }
            }
            var t = e.display,
                n = e.doc,
                r = e.doc.sel;
            var i = document.createDocumentFragment();
            var s = t.lineSpace.offsetWidth,
                o = ot(e.display);
            if (r.from.line == r.to.line) {
                a(r.from.line, r.from.ch, r.to.ch)
            } else {
                var f = ai(n, r.from.line),
                    l = ai(n, r.to.line);
                var c = Lr(n, f) == Lr(n, l);
                var h = a(r.from.line, r.from.ch, c ? f.text.length : null).end;
                var p = a(r.to.line, c ? 0 : null, r.to.ch).start;
                if (c) {
                    if (h.top < p.top - 2) {
                        u(h.right, h.top, null, h.bottom);
                        u(o, p.top, p.left, p.bottom)
                    } else {
                        u(h.right, h.top, p.left - h.right, h.bottom)
                    }
                }
                if (h.bottom < p.top) u(o, h.bottom, null, p.top)
            }
            fs(t.selectionDiv, i);
            t.selectionDiv.style.display = ""
        }

        function Z(e) {
            if (!e.state.focused) return;
            var t = e.display;
            clearInterval(t.blinker);
            var n = true;
            t.cursor.style.visibility = t.otherCursor.style.visibility = "";
            t.blinker = setInterval(function() {
                t.cursor.style.visibility = t.otherCursor.style.visibility = (n = !n) ? "" : "hidden"
            }, e.options.cursorBlinkRate)
        }

        function et(e, t) {
            if (e.doc.mode.startState && e.doc.frontier < e.display.showingTo) e.state.highlight.set(t, ns(tt, e))
        }

        function tt(e) {
            var t = e.doc;
            if (t.frontier < t.first) t.frontier = t.first;
            if (t.frontier >= e.display.showingTo) return;
            var n = +(new Date) + e.options.workTime;
            var r = ir(t.mode, rt(e, t.frontier));
            var i = [],
                s;
            t.iter(t.frontier, Math.min(t.first + t.size, e.display.showingTo + 500), function(o) {
                if (t.frontier >= e.display.showingFrom) {
                    var u = o.styles;
                    o.styles = Rr(e, o, r);
                    var a = !u || u.length != o.styles.length;
                    for (var f = 0; !a && f < u.length; ++f) a = u[f] != o.styles[f];
                    if (a) {
                        if (s && s.end == t.frontier) s.end++;
                        else i.push(s = {
                            start: t.frontier,
                            end: t.frontier + 1
                        })
                    }
                    o.stateAfter = ir(t.mode, r)
                } else {
                    zr(e, o, r);
                    o.stateAfter = t.frontier % 5 == 0 ? ir(t.mode, r) : null
                }++t.frontier;
                if (+(new Date) > n) {
                    et(e, e.options.workDelay);
                    return true
                }
            });
            if (i.length) At(e, function() {
                for (var e = 0; e < i.length; ++e) _t(this, i[e].start, i[e].end)
            })()
        }

        function nt(e, t, n) {
            var r, i, s = e.doc;
            for (var o = t, u = t - 100; o > u; --o) {
                if (o <= s.first) return s.first;
                var a = ai(s, o - 1);
                if (a.stateAfter && (!n || o <= s.frontier)) return o;
                var f = $i(a.text, null, e.options.tabSize);
                if (i == null || r > f) {
                    i = o - 1;
                    r = f
                }
            }
            return i
        }

        function rt(e, t, n) {
            var r = e.doc,
                i = e.display;
            if (!r.mode.startState) return true;
            var s = nt(e, t, n),
                o = s > r.first && ai(r, s - 1).stateAfter;
            if (!o) o = sr(r.mode);
            else o = ir(r.mode, o);
            r.iter(s, t, function(n) {
                zr(e, n, o);
                var u = s == t - 1 || s % 5 == 0 || s >= i.showingFrom && s < i.showingTo;
                n.stateAfter = u ? ir(r.mode, o) : null;
                ++s
            });
            return o
        }

        function it(e) {
            return e.lineSpace.offsetTop
        }

        function st(e) {
            return e.mover.offsetHeight - e.lineSpace.offsetHeight
        }

        function ot(e) {
            var t = fs(e.measure, us("pre", null, null, "text-align: left")).appendChild(us("span", "x"));
            return t.offsetLeft
        }

        function ut(e, t, n, r, i) {
            var s = -1;
            r = r || lt(e, t);
            for (var o = n;; o += s) {
                var u = r[o];
                if (u) break;
                if (s < 0 && o == 0) s = 1
            }
            i = o > n ? "left" : o < n ? "right" : i;
            if (i == "left" && u.leftSide) u = u.leftSide;
            else if (i == "right" && u.rightSide) u = u.rightSide;
            return {
                left: o < n ? u.right : u.left,
                right: o > n ? u.left : u.right,
                top: u.top,
                bottom: u.bottom
            }
        }

        function at(e, t) {
            var n = e.display.measureLineCache;
            for (var r = 0; r < n.length; ++r) {
                var i = n[r];
                if (i.text == t.text && i.markedSpans == t.markedSpans && e.display.scroller.clientWidth == i.width && i.classes == t.textClass + "|" + t.bgClass + "|" + t.wrapClass) return i
            }
        }

        function ft(e, t) {
            var n = at(e, t);
            if (n) n.text = n.measure = n.markedSpans = null
        }

        function lt(e, t) {
            var n = at(e, t);
            if (n) return n.measure;
            var r = ct(e, t);
            var i = e.display.measureLineCache;
            var s = {
                text: t.text,
                width: e.display.scroller.clientWidth,
                markedSpans: t.markedSpans,
                measure: r,
                classes: t.textClass + "|" + t.bgClass + "|" + t.wrapClass
            };
            if (i.length == 16) i[++e.display.measureLineCachePos % 16] = s;
            else i.push(s);
            return r
        }

        function ct(e, i) {
            function b(e) {
                var t = e.top - v.top,
                    n = e.bottom - v.top;
                if (n > y) n = y;
                if (t < 0) t = 0;
                for (var r = m.length - 2; r >= 0; r -= 2) {
                    var i = m[r],
                        s = m[r + 1];
                    if (i > n || s < t) continue;
                    if (i <= t && s >= n || t <= i && n >= s || Math.min(n, s) - Math.max(t, i) >= n - t >> 1) {
                        m[r] = Math.min(t, i);
                        m[r + 1] = Math.max(n, s);
                        break
                    }
                }
                if (r < 0) {
                    r = m.length;
                    m.push(t, n)
                }
                return {
                    left: e.left - v.left,
                    right: e.right - v.left,
                    top: r,
                    bottom: null
                }
            }

            function w(e) {
                e.bottom = m[e.top + 1];
                e.top = m[e.top]
            }
            var s = e.display,
                o = ts(i.text.length);
            var u = Vr(e, i, o, true);
            if (t && !n && !e.options.lineWrapping && u.childNodes.length > 100) {
                var a = document.createDocumentFragment();
                var f = 10,
                    l = u.childNodes.length;
                for (var c = 0, h = Math.ceil(l / f); c < h; ++c) {
                    var p = us("div", null, null, "display: inline-block");
                    for (var d = 0; d < f && l; ++d) {
                        p.appendChild(u.firstChild);
                        --l
                    }
                    a.appendChild(p)
                }
                u.appendChild(a)
            }
            fs(s.measure, u);
            var v = cs(s.lineDiv);
            var m = [],
                g = ts(i.text.length),
                y = u.offsetHeight;
            if (r && s.measure.first != u) fs(s.measure, u);
            for (var c = 0, E; c < o.length; ++c)
                if (E = o[c]) {
                    var S = E,
                        x = null;
                    if (/\bCodeMirror-widget\b/.test(E.className) && E.getClientRects) {
                        if (E.firstChild.nodeType == 1) S = E.firstChild;
                        var T = S.getClientRects();
                        if (T.length > 1) {
                            x = g[c] = b(T[0]);
                            x.rightSide = b(T[T.length - 1])
                        }
                    }
                    if (!x) x = g[c] = b(cs(S));
                    if (E.measureRight) x.right = cs(E.measureRight).left;
                    if (E.leftSide) x.leftSide = b(cs(E.leftSide))
                }
            for (var c = 0, E; c < g.length; ++c)
                if (E = g[c]) {
                    w(E);
                    if (E.leftSide) w(E.leftSide);
                    if (E.rightSide) w(E.rightSide)
                }
            return g
        }

        function ht(e, t) {
            var n = false;
            if (t.markedSpans)
                for (var r = 0; r < t.markedSpans; ++r) {
                    var i = t.markedSpans[r];
                    if (i.collapsed && (i.to == null || i.to == t.text.length)) n = true
                }
            var s = !n && at(e, t);
            if (s) return ut(e, t, t.text.length, s.measure, "right").right;
            var o = Vr(e, t, null, true);
            var u = o.appendChild(gs(e.display.measure));
            fs(e.display.measure, o);
            return cs(u).right - cs(e.display.lineDiv).left
        }

        function pt(e) {
            e.display.measureLineCache.length = e.display.measureLineCachePos = 0;
            e.display.cachedCharWidth = e.display.cachedTextHeight = null;
            if (!e.options.lineWrapping) e.display.maxLineChanged = true;
            e.display.lineNumChars = null
        }

        function dt() {
            return window.pageXOffset || (document.documentElement || document.body).scrollLeft
        }

        function vt() {
            return window.pageYOffset || (document.documentElement || document.body).scrollTop
        }

        function mt(e, t, n, r) {
            if (t.widgets)
                for (var i = 0; i < t.widgets.length; ++i)
                    if (t.widgets[i].above) {
                        var s = Hr(t.widgets[i]);
                        n.top += s;
                        n.bottom += s
                    }
            if (r == "line") return n;
            if (!r) r = "local";
            var o = di(e, t);
            if (r == "local") o += it(e.display);
            else o -= e.display.viewOffset; if (r == "page" || r == "window") {
                var u = cs(e.display.lineSpace);
                o += u.top + (r == "window" ? 0 : vt());
                var a = u.left + (r == "window" ? 0 : dt());
                n.left += a;
                n.right += a
            }
            n.top += o;
            n.bottom += o;
            return n
        }

        function gt(e, t, n) {
            if (n == "div") return t;
            var r = t.left,
                i = t.top;
            if (n == "page") {
                r -= dt();
                i -= vt()
            } else if (n == "local" || !n) {
                var s = cs(e.display.sizer);
                r += s.left;
                i += s.top
            }
            var o = cs(e.display.lineSpace);
            return {
                left: r - o.left,
                top: i - o.top
            }
        }

        function yt(e, t, n, r, i) {
            if (!r) r = ai(e.doc, t.line);
            return mt(e, r, ut(e, r, t.ch, null, i), n)
        }

        function bt(e, t, n, r, i) {
            function s(t, s) {
                var o = ut(e, r, t, i, s ? "right" : "left");
                if (s) o.left = o.right;
                else o.right = o.left;
                return mt(e, r, o, n)
            }

            function o(e, t) {
                var n = u[t],
                    r = n.level % 2;
                if (e == xs(n) && t && n.level < u[t - 1].level) {
                    n = u[--t];
                    e = Ts(n) - (n.level % 2 ? 0 : 1);
                    r = true
                } else if (e == Ts(n) && t < u.length - 1 && n.level < u[t + 1].level) {
                    n = u[++t];
                    e = xs(n) - n.level % 2;
                    r = false
                }
                if (r && e == n.to && e > n.from) return s(e - 1);
                return s(e, r)
            }
            r = r || ai(e.doc, t.line);
            if (!i) i = lt(e, r);
            var u = vi(r),
                a = t.ch;
            if (!u) return s(a);
            var f = Ms(u, a);
            var l = o(a, f);
            if (Os != null) l.other = o(a, Os);
            return l
        }

        function wt(e, t, n, r) {
            var i = new Tn(e, t);
            i.xRel = r;
            if (n) i.outside = true;
            return i
        }

        function Et(e, t, n) {
            var r = e.doc;
            n += e.display.viewOffset;
            if (n < 0) return wt(r.first, 0, true, -1);
            var i = pi(r, n),
                s = r.first + r.size - 1;
            if (i > s) return wt(r.first + r.size - 1, ai(r, s).text.length, true, 1);
            if (t < 0) t = 0;
            for (;;) {
                var o = ai(r, i);
                var u = St(e, o, i, t, n);
                var a = kr(o);
                var f = a && a.find();
                if (a && (u.ch > f.from.ch || u.ch == f.from.ch && u.xRel > 0)) i = f.to.line;
                else return u
            }
        }

        function St(e, t, n, r, i) {
            function f(r) {
                var i = bt(e, Tn(n, r), "line", t, a);
                o = true;
                if (s > i.bottom) return i.left - u;
                else if (s < i.top) return i.left + u;
                else o = false;
                return i.left
            }
            var s = i - di(e, t);
            var o = false,
                u = 2 * e.display.wrapper.clientWidth;
            var a = lt(e, t);
            var l = vi(t),
                c = t.text.length;
            var h = Ns(t),
                p = Cs(t);
            var d = f(h),
                v = o,
                m = f(p),
                g = o;
            if (r > m) return wt(n, p, g, 1);
            for (;;) {
                if (l ? p == h || p == Ds(t, h, 1) : p - h <= 1) {
                    var y = r < d || r - d <= m - r ? h : p;
                    var b = r - (y == h ? d : m);
                    while (os.test(t.text.charAt(y)))++y;
                    var w = wt(n, y, y == h ? v : g, b < 0 ? -1 : b ? 1 : 0);
                    return w
                }
                var E = Math.ceil(c / 2),
                    S = h + E;
                if (l) {
                    S = h;
                    for (var x = 0; x < E; ++x) S = Ds(t, S, 1)
                }
                var T = f(S);
                if (T > r) {
                    p = S;
                    m = T;
                    if (g = o) m += 1e3;
                    c = E
                } else {
                    h = S;
                    d = T;
                    v = o;
                    c -= E
                }
            }
        }

        function Tt(e) {
            if (e.cachedTextHeight != null) return e.cachedTextHeight;
            if (xt == null) {
                xt = us("pre");
                for (var t = 0; t < 49; ++t) {
                    xt.appendChild(document.createTextNode("x"));
                    xt.appendChild(us("br"))
                }
                xt.appendChild(document.createTextNode("x"))
            }
            fs(e.measure, xt);
            var n = xt.offsetHeight / 50;
            if (n > 3) e.cachedTextHeight = n;
            as(e.measure);
            return n || 1
        }

        function Nt(e) {
            if (e.cachedCharWidth != null) return e.cachedCharWidth;
            var t = us("span", "x");
            var n = us("pre", [t]);
            fs(e.measure, n);
            var r = t.offsetWidth;
            if (r > 2) e.cachedCharWidth = r;
            return r || 10
        }

        function kt(e) {
            e.curOp = {
                changes: [],
                forceUpdate: false,
                updateInput: null,
                userSelChange: null,
                textChanged: null,
                selectionChanged: false,
                cursorActivity: false,
                updateMaxLine: false,
                updateScrollPos: false,
                id: ++Ct
            };
            if (!(Fi++)) ji = []
        }

        function Lt(e) {
            var t = e.curOp,
                n = e.doc,
                r = e.display;
            e.curOp = null;
            if (t.updateMaxLine) D(e);
            if (r.maxLineChanged && !e.options.lineWrapping && r.maxLine) {
                var i = ht(e, r.maxLine);
                r.sizer.style.minWidth = Math.max(0, i + 3 + Wi) + "px";
                r.maxLineChanged = false;
                var s = Math.max(0, r.sizer.offsetLeft + r.sizer.offsetWidth - r.scroller.clientWidth);
                if (s < n.scrollLeft && !t.updateScrollPos) Qt(e, Math.min(r.scroller.scrollLeft, s), true)
            }
            var o, u;
            if (t.updateScrollPos) {
                o = t.updateScrollPos
            } else if (t.selectionChanged && r.scroller.clientHeight) {
                var a = bt(e, n.sel.head);
                o = qn(e, a.left, a.top, a.left, a.bottom)
            }
            if (t.changes.length || t.forceUpdate || o && o.scrollTop != null) {
                u = R(e, t.changes, o && o.scrollTop, t.forceUpdate);
                if (e.display.scroller.offsetHeight) e.doc.scrollTop = e.display.scroller.scrollTop
            }
            if (!u && t.selectionChanged) Q(e);
            if (t.updateScrollPos) {
                r.scroller.scrollTop = r.scrollbarV.scrollTop = n.scrollTop = o.scrollTop;
                r.scroller.scrollLeft = r.scrollbarH.scrollLeft = n.scrollLeft = o.scrollLeft;
                j(e);
                if (t.scrollToPos) Fn(e, An(e.doc, t.scrollToPos), t.scrollToPosMargin)
            } else if (o) {
                jn(e)
            }
            if (t.selectionChanged) Z(e);
            if (e.state.focused && t.updateInput) Bt(e, t.userSelChange);
            var f = t.maybeHiddenMarkers,
                l = t.maybeUnhiddenMarkers;
            if (f)
                for (var c = 0; c < f.length; ++c)
                    if (!f[c].lines.length) Bi(f[c], "hide");
            if (l)
                for (var c = 0; c < l.length; ++c)
                    if (l[c].lines.length) Bi(l[c], "unhide");
            var h;
            if (!--Fi) {
                h = ji;
                ji = null
            }
            if (t.textChanged) Bi(e, "change", e, t.textChanged);
            if (t.cursorActivity) Bi(e, "cursorActivity", e);
            if (h)
                for (var c = 0; c < h.length; ++c) h[c]()
        }

        function At(e, t) {
            return function() {
                var n = e || this,
                    r = !n.curOp;
                if (r) kt(n);
                try {
                    var i = t.apply(n, arguments)
                } finally {
                    if (r) Lt(n)
                }
                return i
            }
        }

        function Ot(e) {
            return function() {
                var t = this.cm && !this.cm.curOp,
                    n;
                if (t) kt(this.cm);
                try {
                    n = e.apply(this, arguments)
                } finally {
                    if (t) Lt(this.cm)
                }
                return n
            }
        }

        function Mt(e, t) {
            var n = !e.curOp,
                r;
            if (n) kt(e);
            try {
                r = t()
            } finally {
                if (n) Lt(e)
            }
            return r
        }

        function _t(e, t, n, r) {
            if (t == null) t = e.doc.first;
            if (n == null) n = e.doc.first + e.doc.size;
            e.curOp.changes.push({
                from: t,
                to: n,
                diff: r
            })
        }

        function Dt(e) {
            if (e.display.pollingFast) return;
            e.display.poll.set(e.options.pollInterval, function() {
                Ht(e);
                if (e.state.focused) Dt(e)
            })
        }

        function Pt(e) {
            function n() {
                var r = Ht(e);
                if (!r && !t) {
                    t = true;
                    e.display.poll.set(60, n)
                } else {
                    e.display.pollingFast = false;
                    Dt(e)
                }
            }
            var t = false;
            e.display.pollingFast = true;
            e.display.poll.set(20, n)
        }

        function Ht(e) {
            var n = e.display.input,
                i = e.display.prevInput,
                s = e.doc,
                o = s.sel;
            if (!e.state.focused || bs(n) || Ft(e) || e.state.disableInput) return false;
            var u = n.value;
            if (u == i && Nn(o.from, o.to)) return false;
            if (t && !r && e.display.inputHasSelection === u) {
                Bt(e, true);
                return false
            }
            var a = !e.curOp;
            if (a) kt(e);
            o.shift = false;
            var f = 0,
                l = Math.min(i.length, u.length);
            while (f < l && i.charCodeAt(f) == u.charCodeAt(f))++f;
            var c = o.from,
                h = o.to;
            if (f < i.length) c = Tn(c.line, c.ch - (i.length - f));
            else if (e.state.overwrite && Nn(c, h) && !e.state.pasteIncoming) h = Tn(h.line, Math.min(ai(s, h.line).text.length, h.ch + (u.length - f)));
            var p = e.curOp.updateInput;
            var d = {
                from: c,
                to: h,
                text: ys(u.slice(f)),
                origin: e.state.pasteIncoming ? "paste" : "+input"
            };
            gn(e.doc, d, "end");
            e.curOp.updateInput = p;
            Ii(e, "inputRead", e, d);
            if (u.length > 1e3 || u.indexOf("\n") > -1) n.value = e.display.prevInput = "";
            else e.display.prevInput = u; if (a) Lt(e);
            e.state.pasteIncoming = false;
            return true
        }

        function Bt(e, n) {
            var i, s, o = e.doc;
            if (!Nn(o.sel.from, o.sel.to)) {
                e.display.prevInput = "";
                i = ws && (o.sel.to.line - o.sel.from.line > 100 || (s = e.getSelection()).length > 1e3);
                var u = i ? "-" : s || e.getSelection();
                e.display.input.value = u;
                if (e.state.focused) Gi(e.display.input);
                if (t && !r) e.display.inputHasSelection = u
            } else if (n) {
                e.display.prevInput = e.display.input.value = "";
                if (t && !r) e.display.inputHasSelection = null
            }
            e.display.inaccurateSelection = i
        }

        function jt(e) {
            if (e.options.readOnly != "nocursor" && (!d || document.activeElement != e.display.input)) e.display.input.focus()
        }

        function Ft(e) {
            return e.options.readOnly || e.doc.cantEdit
        }

        function It(e) {
            function r() {
                if (e.state.focused) setTimeout(ns(jt, e), 0)
            }

            function s() {
                if (i == null) i = setTimeout(function() {
                    i = null;
                    n.cachedCharWidth = n.cachedTextHeight = ds = null;
                    pt(e);
                    Mt(e, ns(_t, e))
                }, 100)
            }

            function o() {
                for (var e = n.wrapper.parentNode; e && e != document.body; e = e.parentNode) {}
                if (e) setTimeout(o, 5e3);
                else Hi(window, "resize", s)
            }

            function u(t) {
                if (qi(e, t) || e.options.onDragEvent && e.options.onDragEvent(e, ki(t))) return;
                Mi(t)
            }

            function a() {
                if (n.inaccurateSelection) {
                    n.prevInput = "";
                    n.inaccurateSelection = false;
                    n.input.value = e.getSelection();
                    Gi(n.input)
                }
            }
            var n = e.display;
            Pi(n.scroller, "mousedown", At(e, Wt));
            if (t) Pi(n.scroller, "dblclick", At(e, function(t) {
                if (qi(e, t)) return;
                var n = Rt(e, t);
                if (!n || Xt(e, t) || qt(e.display, t)) return;
                Li(t);
                var r = $n(ai(e.doc, n.line).text, n);
                _n(e.doc, r.from, r.to)
            }));
            else Pi(n.scroller, "dblclick", function(t) {
                qi(e, t) || Li(t)
            });
            Pi(n.lineSpace, "selectstart", function(e) {
                if (!qt(n, e)) Li(e)
            });
            if (!b) Pi(n.scroller, "contextmenu", function(t) {
                hn(e, t)
            });
            Pi(n.scroller, "scroll", function() {
                if (n.scroller.clientHeight) {
                    Kt(e, n.scroller.scrollTop);
                    Qt(e, n.scroller.scrollLeft, true);
                    Bi(e, "scroll", e)
                }
            });
            Pi(n.scrollbarV, "scroll", function() {
                if (n.scroller.clientHeight) Kt(e, n.scrollbarV.scrollTop)
            });
            Pi(n.scrollbarH, "scroll", function() {
                if (n.scroller.clientHeight) Qt(e, n.scrollbarH.scrollLeft)
            });
            Pi(n.scroller, "mousewheel", function(t) {
                Zt(e, t)
            });
            Pi(n.scroller, "DOMMouseScroll", function(t) {
                Zt(e, t)
            });
            Pi(n.scrollbarH, "mousedown", r);
            Pi(n.scrollbarV, "mousedown", r);
            Pi(n.wrapper, "scroll", function() {
                n.wrapper.scrollTop = n.wrapper.scrollLeft = 0
            });
            var i;
            Pi(window, "resize", s);
            setTimeout(o, 5e3);
            Pi(n.input, "keyup", At(e, function(t) {
                if (qi(e, t) || e.options.onKeyEvent && e.options.onKeyEvent(e, ki(t))) return;
                if (t.keyCode == 16) e.doc.sel.shift = false
            }));
            Pi(n.input, "input", ns(Pt, e));
            Pi(n.input, "keydown", At(e, un));
            Pi(n.input, "keypress", At(e, an));
            Pi(n.input, "focus", ns(fn, e));
            Pi(n.input, "blur", ns(ln, e));
            if (e.options.dragDrop) {
                Pi(n.scroller, "dragstart", function(t) {
                    Jt(e, t)
                });
                Pi(n.scroller, "dragenter", u);
                Pi(n.scroller, "dragover", u);
                Pi(n.scroller, "drop", At(e, $t))
            }
            Pi(n.scroller, "paste", function(t) {
                if (qt(n, t)) return;
                jt(e);
                Pt(e)
            });
            Pi(n.input, "paste", function() {
                e.state.pasteIncoming = true;
                Pt(e)
            });
            Pi(n.input, "cut", a);
            Pi(n.input, "copy", a);
            if (f) Pi(n.sizer, "mouseup", function() {
                if (document.activeElement == n.input) n.input.blur();
                jt(e)
            })
        }

        function qt(e, t) {
            for (var n = _i(t); n != e.wrapper; n = n.parentNode) {
                if (!n || n.ignoreEvents || n.parentNode == e.sizer && n != e.mover) return true
            }
        }

        function Rt(e, t, n) {
            var r = e.display;
            if (!n) {
                var i = _i(t);
                if (i == r.scrollbarH || i == r.scrollbarH.firstChild || i == r.scrollbarV || i == r.scrollbarV.firstChild || i == r.scrollbarFiller || i == r.gutterFiller) return null
            }
            var s, o, u = cs(r.lineSpace);
            try {
                s = t.clientX;
                o = t.clientY
            } catch (t) {
                return null
            }
            return Et(e, s - u.left, o - u.top)
        }

        function Wt(e) {
            function m(e) {
                if (Nn(v, e)) return;
                v = e;
                if (f == "single") {
                    _n(n.doc, An(s, u), e);
                    return
                }
                p = An(s, p);
                d = An(s, d);
                if (f == "double") {
                    var t = $n(ai(s, e.line).text, e);
                    if (Cn(e, p)) _n(n.doc, t.from, d);
                    else _n(n.doc, p, t.to)
                } else if (f == "triple") {
                    if (Cn(e, p)) _n(n.doc, d, An(s, Tn(e.line, 0)));
                    else _n(n.doc, p, An(s, Tn(e.line + 1, 0)))
                }
            }

            function w(e) {
                var t = ++y;
                var i = Rt(n, e, true);
                if (!i) return;
                if (!Nn(i, c)) {
                    if (!n.state.focused) fn(n);
                    c = i;
                    m(i);
                    var o = B(r, s);
                    if (i.line >= o.to || i.line < o.from) setTimeout(At(n, function() {
                        if (y == t) w(e)
                    }), 150)
                } else {
                    var u = e.clientY < g.top ? -20 : e.clientY > g.bottom ? 20 : 0;
                    if (u) setTimeout(At(n, function() {
                        if (y != t) return;
                        r.scroller.scrollTop += u;
                        w(e)
                    }), 50)
                }
            }

            function E(e) {
                y = Infinity;
                Li(e);
                jt(n);
                Hi(document, "mousemove", S);
                Hi(document, "mouseup", x)
            }
            if (qi(this, e)) return;
            var n = this,
                r = n.display,
                s = n.doc,
                o = s.sel;
            o.shift = e.shiftKey;
            if (qt(r, e)) {
                if (!i) {
                    r.scroller.draggable = false;
                    setTimeout(function() {
                        r.scroller.draggable = true
                    }, 100)
                }
                return
            }
            if (Xt(n, e)) return;
            var u = Rt(n, e);
            switch (Di(e)) {
                case 3:
                    if (b) hn.call(n, n, e);
                    return;
                case 2:
                    if (u) _n(n.doc, u);
                    setTimeout(ns(jt, n), 20);
                    Li(e);
                    return
            }
            if (!u) {
                if (_i(e) == r.scroller) Li(e);
                return
            }
            if (!n.state.focused) fn(n);
            var a = +(new Date),
                f = "single";
            if (zt && zt.time > a - 400 && Nn(zt.pos, u)) {
                f = "triple";
                Li(e);
                setTimeout(ns(jt, n), 20);
                Jn(n, u.line)
            } else if (Ut && Ut.time > a - 400 && Nn(Ut.pos, u)) {
                f = "double";
                zt = {
                    time: a,
                    pos: u
                };
                Li(e);
                var l = $n(ai(s, u.line).text, u);
                _n(n.doc, l.from, l.to)
            } else {
                Ut = {
                    time: a,
                    pos: u
                }
            }
            var c = u;
            if (n.options.dragDrop && hs && !Ft(n) && !Nn(o.from, o.to) && !Cn(u, o.from) && !Cn(o.to, u) && f == "single") {
                var h = At(n, function(t) {
                    if (i) r.scroller.draggable = false;
                    n.state.draggingText = false;
                    Hi(document, "mouseup", h);
                    Hi(r.scroller, "drop", h);
                    if (Math.abs(e.clientX - t.clientX) + Math.abs(e.clientY - t.clientY) < 10) {
                        Li(t);
                        _n(n.doc, u);
                        jt(n)
                    }
                });
                if (i) r.scroller.draggable = true;
                n.state.draggingText = h;
                if (r.scroller.dragDrop) r.scroller.dragDrop();
                Pi(document, "mouseup", h);
                Pi(r.scroller, "drop", h);
                return
            }
            Li(e);
            if (f == "single") _n(n.doc, An(s, u));
            var p = o.from,
                d = o.to,
                v = u;
            var g = cs(r.wrapper);
            var y = 0;
            var S = At(n, function(e) {
                if (!t && !Di(e)) E(e);
                else w(e)
            });
            var x = At(n, E);
            Pi(document, "mousemove", S);
            Pi(document, "mouseup", x)
        }

        function Xt(e, t) {
            var n = e.display;
            try {
                var r = t.clientX,
                    i = t.clientY
            } catch (t) {
                return false
            }
            if (r >= Math.floor(cs(n.gutters).right)) return false;
            Li(t);
            if (!Ui(e, "gutterClick")) return true;
            var s = cs(n.lineDiv);
            if (i > s.bottom) return true;
            i -= s.top - n.viewOffset;
            for (var o = 0; o < e.options.gutters.length; ++o) {
                var u = n.gutters.childNodes[o];
                if (u && cs(u).right >= r) {
                    var a = pi(e.doc, i);
                    var f = e.options.gutters[o];
                    Ii(e, "gutterClick", e, a, f, t);
                    break
                }
            }
            return true
        }

        function $t(e) {
            var n = this;
            if (qi(n, e) || qt(n.display, e) || n.options.onDragEvent && n.options.onDragEvent(n, ki(e))) return;
            Li(e);
            if (t) Vt = +(new Date);
            var r = Rt(n, e, true),
                i = e.dataTransfer.files;
            if (!r || Ft(n)) return;
            if (i && i.length && window.FileReader && window.File) {
                var s = i.length,
                    o = Array(s),
                    u = 0;
                var a = function(e, t) {
                    var i = new FileReader;
                    i.onload = function() {
                        o[t] = i.result;
                        if (++u == s) {
                            r = An(n.doc, r);
                            gn(n.doc, {
                                from: r,
                                to: r,
                                text: ys(o.join("\n")),
                                origin: "paste"
                            }, "around")
                        }
                    };
                    i.readAsText(e)
                };
                for (var f = 0; f < s; ++f) a(i[f], f)
            } else {
                if (n.state.draggingText && !(Cn(r, n.doc.sel.from) || Cn(n.doc.sel.to, r))) {
                    n.state.draggingText(e);
                    setTimeout(ns(jt, n), 20);
                    return
                }
                try {
                    var o = e.dataTransfer.getData("Text");
                    if (o) {
                        var l = n.doc.sel.from,
                            c = n.doc.sel.to;
                        Pn(n.doc, r, r);
                        if (n.state.draggingText) xn(n.doc, "", l, c, "paste");
                        n.replaceSelection(o, null, "paste");
                        jt(n);
                        fn(n)
                    }
                } catch (e) {}
            }
        }

        function Jt(e, n) {
            if (t && (!e.state.draggingText || +(new Date) - Vt < 100)) {
                Mi(n);
                return
            }
            if (qi(e, n) || qt(e.display, n)) return;
            var r = e.getSelection();
            n.dataTransfer.setData("Text", r);
            if (n.dataTransfer.setDragImage && !a) {
                var i = us("img", null, null, "position: fixed; left: 0; top: 0;");
                if (u) {
                    i.width = i.height = 1;
                    e.display.wrapper.appendChild(i);
                    i._top = i.offsetTop
                }
                n.dataTransfer.setDragImage(i, 0, 0);
                if (u) i.parentNode.removeChild(i)
            }
        }

        function Kt(t, n) {
            if (Math.abs(t.doc.scrollTop - n) < 2) return;
            t.doc.scrollTop = n;
            if (!e) R(t, [], n);
            if (t.display.scroller.scrollTop != n) t.display.scroller.scrollTop = n;
            if (t.display.scrollbarV.scrollTop != n) t.display.scrollbarV.scrollTop = n;
            if (e) R(t, []);
            et(t, 100)
        }

        function Qt(e, t, n) {
            if (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) return;
            t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth);
            e.doc.scrollLeft = t;
            j(e);
            if (e.display.scroller.scrollLeft != t) e.display.scroller.scrollLeft = t;
            if (e.display.scrollbarH.scrollLeft != t) e.display.scrollbarH.scrollLeft = t
        }

        function Zt(t, n) {
            var r = n.wheelDeltaX,
                s = n.wheelDeltaY;
            if (r == null && n.detail && n.axis == n.HORIZONTAL_AXIS) r = n.detail;
            if (s == null && n.detail && n.axis == n.VERTICAL_AXIS) s = n.detail;
            else if (s == null) s = n.wheelDelta;
            var o = t.display,
                a = o.scroller;
            if (!(r && a.scrollWidth > a.clientWidth || s && a.scrollHeight > a.clientHeight)) return;
            if (s && v && i) {
                for (var f = n.target; f != a; f = f.parentNode) {
                    if (f.lineObj) {
                        t.display.currentWheelTarget = f;
                        break
                    }
                }
            }
            if (r && !e && !u && Yt != null) {
                if (s) Kt(t, Math.max(0, Math.min(a.scrollTop + s * Yt, a.scrollHeight - a.clientHeight)));
                Qt(t, Math.max(0, Math.min(a.scrollLeft + r * Yt, a.scrollWidth - a.clientWidth)));
                Li(n);
                o.wheelStartX = null;
                return
            }
            if (s && Yt != null) {
                var l = s * Yt;
                var c = t.doc.scrollTop,
                    h = c + o.wrapper.clientHeight;
                if (l < 0) c = Math.max(0, c + l - 50);
                else h = Math.min(t.doc.height, h + l + 50);
                R(t, [], {
                    top: c,
                    bottom: h
                })
            }
            if (Gt < 20) {
                if (o.wheelStartX == null) {
                    o.wheelStartX = a.scrollLeft;
                    o.wheelStartY = a.scrollTop;
                    o.wheelDX = r;
                    o.wheelDY = s;
                    setTimeout(function() {
                        if (o.wheelStartX == null) return;
                        var e = a.scrollLeft - o.wheelStartX;
                        var t = a.scrollTop - o.wheelStartY;
                        var n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                        o.wheelStartX = o.wheelStartY = null;
                        if (!n) return;
                        Yt = (Yt * Gt + n) / (Gt + 1);
                        ++Gt
                    }, 200)
                } else {
                    o.wheelDX += r;
                    o.wheelDY += s
                }
            }
        }

        function en(e, t, n) {
            if (typeof t == "string") {
                t = or[t];
                if (!t) return false
            }
            if (e.display.pollingFast && Ht(e)) e.display.pollingFast = false;
            var r = e.doc,
                i = r.sel.shift,
                s = false;
            try {
                if (Ft(e)) e.state.suppressEdits = true;
                if (n) r.sel.shift = false;
                s = t(e) != Xi
            } finally {
                r.sel.shift = i;
                e.state.suppressEdits = false
            }
            return s
        }

        function tn(e) {
            var t = e.state.keyMaps.slice(0);
            if (e.options.extraKeys) t.push(e.options.extraKeys);
            t.push(e.options.keyMap);
            return t
        }

        function rn(e, t) {
            var n = ar(e.options.keyMap),
                i = n.auto;
            clearTimeout(nn);
            if (i && !lr(t)) nn = setTimeout(function() {
                if (ar(e.options.keyMap) == n) {
                    e.options.keyMap = i.call ? i.call(null, e) : i;
                    L(e)
                }
            }, 50);
            var s = cr(t, true),
                o = false;
            if (!s) return false;
            var u = tn(e);
            if (t.shiftKey) {
                o = fr("Shift-" + s, u, function(t) {
                        return en(e, t, true)
                    }) || fr(s, u, function(t) {
                        if (typeof t == "string" ? /^go[A-Z]/.test(t) : t.motion) return en(e, t)
                    })
            } else {
                o = fr(s, u, function(t) {
                    return en(e, t)
                })
            } if (o) {
                Li(t);
                Z(e);
                if (r) {
                    t.oldKeyCode = t.keyCode;
                    t.keyCode = 0
                }
                Ii(e, "keyHandled", e, s, t)
            }
            return o
        }

        function sn(e, t, n) {
            var r = fr("'" + n + "'", tn(e), function(t) {
                return en(e, t, true)
            });
            if (r) {
                Li(t);
                Z(e);
                Ii(e, "keyHandled", e, "'" + n + "'", t)
            }
            return r
        }

        function un(e) {
            var n = this;
            if (!n.state.focused) fn(n);
            if (t && e.keyCode == 27) {
                e.returnValue = false
            }
            if (qi(n, e) || n.options.onKeyEvent && n.options.onKeyEvent(n, ki(e))) return;
            var r = e.keyCode;
            n.doc.sel.shift = r == 16 || e.shiftKey;
            var i = rn(n, e);
            if (u) {
                on = i ? r : null;
                if (!i && r == 88 && !ws && (v ? e.metaKey : e.ctrlKey)) n.replaceSelection("")
            }
        }

        function an(e) {
            var n = this;
            if (qi(n, e) || n.options.onKeyEvent && n.options.onKeyEvent(n, ki(e))) return;
            var i = e.keyCode,
                s = e.charCode;
            if (u && i == on) {
                on = null;
                Li(e);
                return
            }
            if ((u && (!e.which || e.which < 10) || f) && rn(n, e)) return;
            var o = String.fromCharCode(s == null ? i : s);
            if (this.options.electricChars && this.doc.mode.electricChars && this.options.smartIndent && !Ft(this) && this.doc.mode.electricChars.indexOf(o) > -1) setTimeout(At(n, function() {
                zn(n, n.doc.sel.to.line, "smart")
            }), 75);
            if (sn(n, e, o)) return;
            if (t && !r) n.display.inputHasSelection = null;
            Pt(n)
        }

        function fn(e) {
            if (e.options.readOnly == "nocursor") return;
            if (!e.state.focused) {
                Bi(e, "focus", e);
                e.state.focused = true;
                if (e.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1) e.display.wrapper.className += " CodeMirror-focused";
                Bt(e, true)
            }
            Dt(e);
            Z(e)
        }

        function ln(e) {
            if (e.state.focused) {
                Bi(e, "blur", e);
                e.state.focused = false;
                e.display.wrapper.className = e.display.wrapper.className.replace(" CodeMirror-focused", "")
            }
            clearInterval(e.display.blinker);
            setTimeout(function() {
                if (!e.state.focused) e.doc.sel.shift = false
            }, 150)
        }

        function hn(e, n) {
            function l() {
                if (i.input.selectionStart != null) {
                    var e = i.input.value = " " + (Nn(s.from, s.to) ? "" : i.input.value);
                    i.prevInput = " ";
                    i.input.selectionStart = 1;
                    i.input.selectionEnd = e.length
                }
            }

            function c() {
                i.inputDiv.style.position = "relative";
                i.input.style.cssText = f;
                if (r) i.scrollbarV.scrollTop = i.scroller.scrollTop = a;
                Dt(e);
                if (i.input.selectionStart != null) {
                    if (!t || r) l();
                    clearTimeout(cn);
                    var n = 0,
                        s = function() {
                            if (i.prevInput == " " && i.input.selectionStart == 0) At(e, or.selectAll)(e);
                            else if (n++ < 10) cn = setTimeout(s, 500);
                            else Bt(e)
                        };
                    cn = setTimeout(s, 200)
                }
            }
            if (qi(e, n, "contextmenu")) return;
            var i = e.display,
                s = e.doc.sel;
            if (qt(i, n)) return;
            var o = Rt(e, n),
                a = i.scroller.scrollTop;
            if (!o || u) return;
            if (Nn(s.from, s.to) || Cn(o, s.from) || !Cn(o, s.to)) At(e, Pn)(e.doc, o, o);
            var f = i.input.style.cssText;
            i.inputDiv.style.position = "absolute";
            i.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (n.clientY - 5) + "px; left: " + (n.clientX - 5) + "px; z-index: 1000; background: white; outline: none;" + "border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);";
            jt(e);
            Bt(e, true);
            if (Nn(s.from, s.to)) i.input.value = i.prevInput = " ";
            if (t && !r) l();
            if (b) {
                Mi(n);
                var h = function() {
                    Hi(window, "mouseup", h);
                    setTimeout(c, 20)
                };
                Pi(window, "mouseup", h)
            } else {
                setTimeout(c, 50)
            }
        }

        function dn(e, t, n) {
            if (!Cn(t.from, n)) return An(e, n);
            var r = t.text.length - 1 - (t.to.line - t.from.line);
            if (n.line > t.to.line + r) {
                var i = n.line - r,
                    s = e.first + e.size - 1;
                if (i > s) return Tn(s, ai(e, s).text.length);
                return On(n, ai(e, i).text.length)
            }
            if (n.line == t.to.line + r) return On(n, Qi(t.text).length + (t.text.length == 1 ? t.from.ch : 0) + ai(e, t.to.line).text.length - t.to.ch);
            var o = n.line - t.from.line;
            return On(n, t.text[o].length + (o ? 0 : t.from.ch))
        }

        function vn(e, t, n) {
            if (n && typeof n == "object") return {
                anchor: dn(e, t, n.anchor),
                head: dn(e, t, n.head)
            };
            if (n == "start") return {
                anchor: t.from,
                head: t.from
            };
            var r = pn(t);
            if (n == "around") return {
                anchor: t.from,
                head: r
            };
            if (n == "end") return {
                anchor: r,
                head: r
            };
            var i = function(e) {
                if (Cn(e, t.from)) return e;
                if (!Cn(t.to, e)) return r;
                var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
                    i = e.ch;
                if (e.line == t.to.line) i += r.ch - t.to.ch;
                return Tn(n, i)
            };
            return {
                anchor: i(e.sel.anchor),
                head: i(e.sel.head)
            }
        }

        function mn(e, t, n) {
            var r = {
                canceled: false,
                from: t.from,
                to: t.to,
                text: t.text,
                origin: t.origin,
                cancel: function() {
                    this.canceled = true
                }
            };
            if (n) r.update = function(t, n, r, i) {
                if (t) this.from = An(e, t);
                if (n) this.to = An(e, n);
                if (r) this.text = r;
                if (i !== undefined) this.origin = i
            };
            Bi(e, "beforeChange", e, r);
            if (e.cm) Bi(e.cm, "beforeChange", e.cm, r);
            if (r.canceled) return null;
            return {
                from: r.from,
                to: r.to,
                text: r.text,
                origin: r.origin
            }
        }

        function gn(e, t, n, r) {
            if (e.cm) {
                if (!e.cm.curOp) return At(e.cm, gn)(e, t, n, r);
                if (e.cm.state.suppressEdits) return
            }
            if (Ui(e, "beforeChange") || e.cm && Ui(e.cm, "beforeChange")) {
                t = mn(e, t, true);
                if (!t) return
            }
            var i = w && !r && Tr(e, t.from, t.to);
            if (i) {
                for (var s = i.length - 1; s >= 1; --s) yn(e, {
                    from: i[s].from,
                    to: i[s].to,
                    text: [""]
                });
                if (i.length) yn(e, {
                    from: i[0].from,
                    to: i[0].to,
                    text: t.text
                }, n)
            } else {
                yn(e, t, n)
            }
        }

        function yn(e, t, n) {
            var r = vn(e, t, n);
            bi(e, t, r, e.cm ? e.cm.curOp.id : NaN);
            En(e, t, r, Sr(e, t));
            var i = [];
            oi(e, function(e, n) {
                if (!n && Yi(i, e.history) == -1) {
                    Ni(e.history, t);
                    i.push(e.history)
                }
                En(e, t, null, Sr(e, t))
            })
        }

        function bn(e, t) {
            if (e.cm && e.cm.state.suppressEdits) return;
            var n = e.history;
            var r = (t == "undo" ? n.done : n.undone).pop();
            if (!r) return;
            var i = {
                changes: [],
                anchorBefore: r.anchorAfter,
                headBefore: r.headAfter,
                anchorAfter: r.anchorBefore,
                headAfter: r.headBefore,
                generation: n.generation
            };
            (t == "undo" ? n.undone : n.done).push(i);
            n.generation = r.generation || ++n.maxGeneration;
            var s = Ui(e, "beforeChange") || e.cm && Ui(e.cm, "beforeChange");
            for (var o = r.changes.length - 1; o >= 0; --o) {
                var u = r.changes[o];
                u.origin = t;
                if (s && !mn(e, u, false)) {
                    (t == "undo" ? n.done : n.undone).length = 0;
                    return
                }
                i.changes.push(yi(e, u));
                var a = o ? vn(e, u, null) : {
                    anchor: r.anchorBefore,
                    head: r.headBefore
                };
                En(e, u, a, xr(e, u));
                var f = [];
                oi(e, function(e, t) {
                    if (!t && Yi(f, e.history) == -1) {
                        Ni(e.history, u);
                        f.push(e.history)
                    }
                    En(e, u, null, xr(e, u))
                })
            }
        }

        function wn(e, t) {
            function n(e) {
                return Tn(e.line + t, e.ch)
            }
            e.first += t;
            if (e.cm) _t(e.cm, e.first, e.first, t);
            e.sel.head = n(e.sel.head);
            e.sel.anchor = n(e.sel.anchor);
            e.sel.from = n(e.sel.from);
            e.sel.to = n(e.sel.to)
        }

        function En(e, t, n, r) {
            if (e.cm && !e.cm.curOp) return At(e.cm, En)(e, t, n, r);
            if (t.to.line < e.first) {
                wn(e, t.text.length - 1 - (t.to.line - t.from.line));
                return
            }
            if (t.from.line > e.lastLine()) return;
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                wn(e, i);
                t = {
                    from: Tn(e.first, 0),
                    to: Tn(t.to.line + i, t.to.ch),
                    text: [Qi(t.text)],
                    origin: t.origin
                }
            }
            var s = e.lastLine();
            if (t.to.line > s) {
                t = {
                    from: t.from,
                    to: Tn(s, ai(e, s).text.length),
                    text: [t.text[0]],
                    origin: t.origin
                }
            }
            t.removed = fi(e, t.from, t.to);
            if (!n) n = vn(e, t, null);
            if (e.cm) Sn(e.cm, t, r, n);
            else Zr(e, t, r, n)
        }

        function Sn(e, t, n, r) {
            var i = e.doc,
                s = e.display,
                o = t.from,
                u = t.to;
            var a = false,
                f = o.line;
            if (!e.options.lineWrapping) {
                f = hi(Lr(i, ai(i, o.line)));
                i.iter(f, u.line + 1, function(e) {
                    if (e == s.maxLine) {
                        a = true;
                        return true
                    }
                })
            }
            if (!Cn(i.sel.head, t.from) && !Cn(t.to, i.sel.head)) e.curOp.cursorActivity = true;
            Zr(i, t, n, r, C(e));
            if (!e.options.lineWrapping) {
                i.iter(f, o.line + t.text.length, function(e) {
                    var t = _(i, e);
                    if (t > s.maxLineLength) {
                        s.maxLine = e;
                        s.maxLineLength = t;
                        s.maxLineChanged = true;
                        a = false
                    }
                });
                if (a) e.curOp.updateMaxLine = true
            }
            i.frontier = Math.min(i.frontier, o.line);
            et(e, 400);
            var l = t.text.length - (u.line - o.line) - 1;
            _t(e, o.line, u.line + 1, l);
            if (Ui(e, "change")) {
                var c = {
                    from: o,
                    to: u,
                    text: t.text,
                    removed: t.removed,
                    origin: t.origin
                };
                if (e.curOp.textChanged) {
                    for (var h = e.curOp.textChanged; h.next; h = h.next) {}
                    h.next = c
                } else e.curOp.textChanged = c
            }
        }

        function xn(e, t, n, r, i) {
            if (!r) r = n;
            if (Cn(r, n)) {
                var s = r;
                r = n;
                n = s
            }
            if (typeof t == "string") t = ys(t);
            gn(e, {
                from: n,
                to: r,
                text: t,
                origin: i
            }, null)
        }

        function Tn(e, t) {
            if (!(this instanceof Tn)) return new Tn(e, t);
            this.line = e;
            this.ch = t
        }

        function Nn(e, t) {
            return e.line == t.line && e.ch == t.ch
        }

        function Cn(e, t) {
            return e.line < t.line || e.line == t.line && e.ch < t.ch
        }

        function kn(e) {
            return Tn(e.line, e.ch)
        }

        function Ln(e, t) {
            return Math.max(e.first, Math.min(t, e.first + e.size - 1))
        }

        function An(e, t) {
            if (t.line < e.first) return Tn(e.first, 0);
            var n = e.first + e.size - 1;
            if (t.line > n) return Tn(n, ai(e, n).text.length);
            return On(t, ai(e, t.line).text.length)
        }

        function On(e, t) {
            var n = e.ch;
            if (n == null || n > t) return Tn(e.line, t);
            else if (n < 0) return Tn(e.line, 0);
            else return e
        }

        function Mn(e, t) {
            return t >= e.first && t < e.first + e.size
        }

        function _n(e, t, n, r) {
            if (e.sel.shift || e.sel.extend) {
                var i = e.sel.anchor;
                if (n) {
                    var s = Cn(t, i);
                    if (s != Cn(n, i)) {
                        i = t;
                        t = n
                    } else if (s != Cn(t, n)) {
                        t = n
                    }
                }
                Pn(e, i, t, r)
            } else {
                Pn(e, t, n || t, r)
            } if (e.cm) e.cm.curOp.userSelChange = true
        }

        function Dn(e, t, n) {
            var r = {
                anchor: t,
                head: n
            };
            Bi(e, "beforeSelectionChange", e, r);
            if (e.cm) Bi(e.cm, "beforeSelectionChange", e.cm, r);
            r.anchor = An(e, r.anchor);
            r.head = An(e, r.head);
            return r
        }

        function Pn(e, t, n, r, i) {
            if (!i && Ui(e, "beforeSelectionChange") || e.cm && Ui(e.cm, "beforeSelectionChange")) {
                var s = Dn(e, t, n);
                n = s.head;
                t = s.anchor
            }
            var o = e.sel;
            o.goalColumn = null;
            if (i || !Nn(t, o.anchor)) t = Bn(e, t, r, i != "push");
            if (i || !Nn(n, o.head)) n = Bn(e, n, r, i != "push");
            if (Nn(o.anchor, t) && Nn(o.head, n)) return;
            o.anchor = t;
            o.head = n;
            var u = Cn(n, t);
            o.from = u ? n : t;
            o.to = u ? t : n;
            if (e.cm) e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = e.cm.curOp.cursorActivity = true;
            Ii(e, "cursorActivity", e)
        }

        function Hn(e) {
            Pn(e.doc, e.doc.sel.from, e.doc.sel.to, null, "push")
        }

        function Bn(e, t, n, r) {
            var i = false,
                s = t;
            var o = n || 1;
            e.cantEdit = false;
            e: for (;;) {
                var u = ai(e, s.line);
                if (u.markedSpans) {
                    for (var a = 0; a < u.markedSpans.length; ++a) {
                        var f = u.markedSpans[a],
                            l = f.marker;
                        if ((f.from == null || (l.inclusiveLeft ? f.from <= s.ch : f.from < s.ch)) && (f.to == null || (l.inclusiveRight ? f.to >= s.ch : f.to > s.ch))) {
                            if (r) {
                                Bi(l, "beforeCursorEnter");
                                if (l.explicitlyCleared) {
                                    if (!u.markedSpans) break;
                                    else {
                                        --a;
                                        continue
                                    }
                                }
                            }
                            if (!l.atomic) continue;
                            var c = l.find()[o < 0 ? "from" : "to"];
                            if (Nn(c, s)) {
                                c.ch += o;
                                if (c.ch < 0) {
                                    if (c.line > e.first) c = An(e, Tn(c.line - 1));
                                    else c = null
                                } else if (c.ch > u.text.length) {
                                    if (c.line < e.first + e.size - 1) c = Tn(c.line + 1, 0);
                                    else c = null
                                }
                                if (!c) {
                                    if (i) {
                                        if (!r) return Bn(e, t, n, true);
                                        e.cantEdit = true;
                                        return Tn(e.first, 0)
                                    }
                                    i = true;
                                    c = t;
                                    o = -o
                                }
                            }
                            s = c;
                            continue e
                        }
                    }
                }
                return s
            }
        }

        function jn(e) {
            var t = Fn(e, e.doc.sel.head, e.options.cursorScrollMargin);
            if (!e.state.focused) return;
            var n = e.display,
                r = cs(n.sizer),
                i = null;
            if (t.top + r.top < 0) i = true;
            else if (t.bottom + r.top > (window.innerHeight || document.documentElement.clientHeight)) i = false;
            if (i != null && !h) {
                var s = n.cursor.style.display == "none";
                if (s) {
                    n.cursor.style.display = "";
                    n.cursor.style.left = t.left + "px";
                    n.cursor.style.top = t.top - n.viewOffset + "px"
                }
                n.cursor.scrollIntoView(i);
                if (s) n.cursor.style.display = "none"
            }
        }

        function Fn(e, t, n) {
            if (n == null) n = 0;
            for (;;) {
                var r = false,
                    i = bt(e, t);
                var s = qn(e, i.left, i.top - n, i.left, i.bottom + n);
                var o = e.doc.scrollTop,
                    u = e.doc.scrollLeft;
                if (s.scrollTop != null) {
                    Kt(e, s.scrollTop);
                    if (Math.abs(e.doc.scrollTop - o) > 1) r = true
                }
                if (s.scrollLeft != null) {
                    Qt(e, s.scrollLeft);
                    if (Math.abs(e.doc.scrollLeft - u) > 1) r = true
                }
                if (!r) return i
            }
        }

        function In(e, t, n, r, i) {
            var s = qn(e, t, n, r, i);
            if (s.scrollTop != null) Kt(e, s.scrollTop);
            if (s.scrollLeft != null) Qt(e, s.scrollLeft)
        }

        function qn(e, t, n, r, i) {
            var s = e.display,
                o = Tt(e.display);
            if (n < 0) n = 0;
            var u = s.scroller.clientHeight - Wi,
                a = s.scroller.scrollTop,
                f = {};
            var l = e.doc.height + st(s);
            var c = n < o,
                h = i > l - o;
            if (n < a) {
                f.scrollTop = c ? 0 : n
            } else if (i > a + u) {
                var p = Math.min(n, (h ? l : i) - u);
                if (p != a) f.scrollTop = p
            }
            var d = s.scroller.clientWidth - Wi,
                v = s.scroller.scrollLeft;
            t += s.gutters.offsetWidth;
            r += s.gutters.offsetWidth;
            var m = s.gutters.offsetWidth;
            var g = t < m + 10;
            if (t < v + m || g) {
                if (g) t = 0;
                f.scrollLeft = Math.max(0, t - 10 - m)
            } else if (r > d + v - 3) {
                f.scrollLeft = r + 10 - d
            }
            return f
        }

        function Rn(e, t, n) {
            e.curOp.updateScrollPos = {
                scrollLeft: t == null ? e.doc.scrollLeft : t,
                scrollTop: n == null ? e.doc.scrollTop : n
            }
        }

        function Un(e, t, n) {
            var r = e.curOp.updateScrollPos || (e.curOp.updateScrollPos = {
                    scrollLeft: e.doc.scrollLeft,
                    scrollTop: e.doc.scrollTop
                });
            var i = e.display.scroller;
            r.scrollTop = Math.max(0, Math.min(i.scrollHeight - i.clientHeight, r.scrollTop + n));
            r.scrollLeft = Math.max(0, Math.min(i.scrollWidth - i.clientWidth, r.scrollLeft + t))
        }

        function zn(e, t, n, r) {
            var i = e.doc;
            if (n == null) n = "add";
            if (n == "smart") {
                if (!e.doc.mode.indent) n = "prev";
                else var s = rt(e, t)
            }
            var o = e.options.tabSize;
            var u = ai(i, t),
                a = $i(u.text, null, o);
            var f = u.text.match(/^\s*/)[0],
                l;
            if (n == "smart") {
                l = e.doc.mode.indent(s, u.text.slice(f.length), u.text);
                if (l == Xi) {
                    if (!r) return;
                    n = "prev"
                }
            }
            if (n == "prev") {
                if (t > i.first) l = $i(ai(i, t - 1).text, null, o);
                else l = 0
            } else if (n == "add") {
                l = a + e.options.indentUnit
            } else if (n == "subtract") {
                l = a - e.options.indentUnit
            } else if (typeof n == "number") {
                l = a + n
            }
            l = Math.max(0, l);
            var c = "",
                h = 0;
            if (e.options.indentWithTabs)
                for (var p = Math.floor(l / o); p; --p) {
                    h += o;
                    c += "	"
                }
            if (h < l) c += Ki(l - h);
            if (c != f) xn(e.doc, c, Tn(t, 0), Tn(t, f.length), "+input");
            u.stateAfter = null
        }

        function Wn(e, t, n) {
            var r = t,
                i = t,
                s = e.doc;
            if (typeof t == "number") i = ai(s, Ln(s, t));
            else r = hi(t); if (r == null) return null;
            if (n(i, r)) _t(e, r, r + 1);
            else return null;
            return i
        }

        function Xn(e, t, n, r, i) {
            function l() {
                var t = s + n;
                if (t < e.first || t >= e.first + e.size) return f = false;
                s = t;
                return a = ai(e, t)
            }

            function c(e) {
                var t = (i ? Ds : Ps)(a, o, n, true);
                if (t == null) {
                    if (!e && l()) {
                        if (i) o = (n < 0 ? Cs : Ns)(a);
                        else o = n < 0 ? a.text.length : 0
                    } else return f = false
                } else o = t;
                return true
            }
            var s = t.line,
                o = t.ch,
                u = n;
            var a = ai(e, s);
            var f = true;
            if (r == "char") c();
            else if (r == "column") c(true);
            else if (r == "word" || r == "group") {
                var h = null,
                    p = r == "group";
                for (var d = true;; d = false) {
                    if (n < 0 && !c(!d)) break;
                    var v = a.text.charAt(o) || "\n";
                    var m = is(v) ? "w" : !p ? null : /\s/.test(v) ? null : "p";
                    if (h && h != m) {
                        if (n < 0) {
                            n = 1;
                            c()
                        }
                        break
                    }
                    if (m) h = m;
                    if (n > 0 && !c(!d)) break
                }
            }
            var g = Bn(e, Tn(s, o), u, true);
            if (!f) g.hitSide = true;
            return g
        }

        function Vn(e, t, n, r) {
            var i = e.doc,
                s = t.left,
                o;
            if (r == "page") {
                var u = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
                o = t.top + n * (u - (n < 0 ? 1.5 : .5) * Tt(e.display))
            } else if (r == "line") {
                o = n > 0 ? t.bottom + 3 : t.top - 3
            }
            for (;;) {
                var a = Et(e, s, o);
                if (!a.outside) break;
                if (n < 0 ? o <= 0 : o >= i.height) {
                    a.hitSide = true;
                    break
                }
                o += n * 5
            }
            return a
        }

        function $n(e, t) {
            var n = t.ch,
                r = t.ch;
            if (e) {
                if ((t.xRel < 0 || r == e.length) && n)--n;
                else ++r;
                var i = e.charAt(n);
                var s = is(i) ? is : /\s/.test(i) ? function(e) {
                    return /\s/.test(e)
                } : function(e) {
                    return !/\s/.test(e) && !is(e)
                };
                while (n > 0 && s(e.charAt(n - 1)))--n;
                while (r < e.length && s(e.charAt(r)))++r
            }
            return {
                from: Tn(t.line, n),
                to: Tn(t.line, r)
            }
        }

        function Jn(e, t) {
            _n(e.doc, Tn(t, 0), An(e.doc, Tn(t + 1, 0)))
        }

        function Gn(e, t, n, r) {
            S.defaults[e] = t;
            if (n) Kn[e] = r ? function(e, t, r) {
                if (r != Yn) n(e, t, r)
            } : n
        }

        function ir(e, t) {
            if (t === true) return t;
            if (e.copyState) return e.copyState(t);
            var n = {};
            for (var r in t) {
                var i = t[r];
                if (i instanceof Array) i = i.concat([]);
                n[r] = i
            }
            return n
        }

        function sr(e, t, n) {
            return e.startState ? e.startState(t, n) : true
        }

        function ar(e) {
            if (typeof e == "string") return ur[e];
            else return e
        }

        function fr(e, t, n) {
            function r(t) {
                t = ar(t);
                var i = t[e];
                if (i === false) return "stop";
                if (i != null && n(i)) return true;
                if (t.nofallthrough) return "stop";
                var s = t.fallthrough;
                if (s == null) return false;
                if (Object.prototype.toString.call(s) != "[object Array]") return r(s);
                for (var o = 0, u = s.length; o < u; ++o) {
                    var a = r(s[o]);
                    if (a) return a
                }
                return false
            }
            for (var i = 0; i < t.length; ++i) {
                var s = r(t[i]);
                if (s) return s != "stop"
            }
        }

        function lr(e) {
            var t = Es[e.keyCode];
            return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod"
        }

        function cr(e, t) {
            if (u && e.keyCode == 34 && e["char"]) return false;
            var n = Es[e.keyCode];
            if (n == null || e.altGraphKey) return false;
            if (e.altKey) n = "Alt-" + n;
            if (y ? e.metaKey : e.ctrlKey) n = "Ctrl-" + n;
            if (y ? e.ctrlKey : e.metaKey) n = "Cmd-" + n;
            if (!t && e.shiftKey) n = "Shift-" + n;
            return n
        }

        function hr(e, t) {
            this.pos = this.start = 0;
            this.string = e;
            this.tabSize = t || 8;
            this.lastColumnPos = this.lastColumnValue = 0
        }

        function pr(e, t) {
            this.lines = [];
            this.type = t;
            this.doc = e
        }

        function dr(e, t, n, r, i) {
            if (r && r.shared) return mr(e, t, n, r, i);
            if (e.cm && !e.cm.curOp) return At(e.cm, dr)(e, t, n, r, i);
            var s = new pr(e, i);
            if (i == "range" && !Cn(t, n)) return s;
            if (r) es(r, s);
            if (s.replacedWith) {
                s.collapsed = true;
                s.replacedWith = us("span", [s.replacedWith], "CodeMirror-widget");
                if (!r.handleMouseEvents) s.replacedWith.ignoreEvents = true
            }
            if (s.collapsed) E = true;
            if (s.addToHistory) bi(e, {
                from: t,
                to: n,
                origin: "markText"
            }, {
                head: e.sel.head,
                anchor: e.sel.anchor
            }, NaN);
            var o = t.line,
                u = 0,
                a, f, l = e.cm,
                c;
            e.iter(o, n.line + 1, function(r) {
                if (l && s.collapsed && !l.options.lineWrapping && Lr(e, r) == l.display.maxLine) c = true;
                var i = {
                    from: null,
                    to: null,
                    marker: s
                };
                u += r.text.length;
                if (o == t.line) {
                    i.from = t.ch;
                    u -= t.ch
                }
                if (o == n.line) {
                    i.to = n.ch;
                    u -= r.text.length - n.ch
                }
                if (s.collapsed) {
                    if (o == n.line) f = Nr(r, n.ch);
                    if (o == t.line) a = Nr(r, t.ch);
                    else ci(r, 0)
                }
                br(r, i);
                ++o
            });
            if (s.collapsed) e.iter(t.line, n.line + 1, function(t) {
                if (Ar(e, t)) ci(t, 0)
            });
            if (s.clearOnEnter) Pi(s, "beforeCursorEnter", function() {
                s.clear()
            });
            if (s.readOnly) {
                w = true;
                if (e.history.done.length || e.history.undone.length) e.clearHistory()
            }
            if (s.collapsed) {
                if (a != f) throw new Error("Inserting collapsed marker overlapping an existing one");
                s.size = u;
                s.atomic = true
            }
            if (l) {
                if (c) l.curOp.updateMaxLine = true;
                if (s.className || s.title || s.startStyle || s.endStyle || s.collapsed) _t(l, t.line, n.line + 1);
                if (s.atomic) Hn(l)
            }
            return s
        }

        function vr(e, t) {
            this.markers = e;
            this.primary = t;
            for (var n = 0, r = this; n < e.length; ++n) {
                e[n].parent = this;
                Pi(e[n], "clear", function() {
                    r.clear()
                })
            }
        }

        function mr(e, t, n, r, i) {
            r = es(r);
            r.shared = false;
            var s = [dr(e, t, n, r, i)],
                o = s[0];
            var u = r.replacedWith;
            oi(e, function(e) {
                if (u) r.replacedWith = u.cloneNode(true);
                s.push(dr(e, An(e, t), An(e, n), r, i));
                for (var a = 0; a < e.linked.length; ++a)
                    if (e.linked[a].isParent) return;
                o = Qi(s)
            });
            return new vr(s, o)
        }

        function gr(e, t) {
            if (e)
                for (var n = 0; n < e.length; ++n) {
                    var r = e[n];
                    if (r.marker == t) return r
                }
        }

        function yr(e, t) {
            for (var n, r = 0; r < e.length; ++r)
                if (e[r] != t)(n || (n = [])).push(e[r]);
            return n
        }

        function br(e, t) {
            e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t];
            t.marker.attachLine(e)
        }

        function wr(e, t, n) {
            if (e)
                for (var r = 0, i; r < e.length; ++r) {
                    var s = e[r],
                        o = s.marker;
                    var u = s.from == null || (o.inclusiveLeft ? s.from <= t : s.from < t);
                    if (u || o.type == "bookmark" && s.from == t && (!n || !s.marker.insertLeft)) {
                        var a = s.to == null || (o.inclusiveRight ? s.to >= t : s.to > t);
                        (i || (i = [])).push({
                            from: s.from,
                            to: a ? null : s.to,
                            marker: o
                        })
                    }
                }
            return i
        }

        function Er(e, t, n) {
            if (e)
                for (var r = 0, i; r < e.length; ++r) {
                    var s = e[r],
                        o = s.marker;
                    var u = s.to == null || (o.inclusiveRight ? s.to >= t : s.to > t);
                    if (u || o.type == "bookmark" && s.from == t && (!n || s.marker.insertLeft)) {
                        var a = s.from == null || (o.inclusiveLeft ? s.from <= t : s.from < t);
                        (i || (i = [])).push({
                            from: a ? null : s.from - t,
                            to: s.to == null ? null : s.to - t,
                            marker: o
                        })
                    }
                }
            return i
        }

        function Sr(e, t) {
            var n = Mn(e, t.from.line) && ai(e, t.from.line).markedSpans;
            var r = Mn(e, t.to.line) && ai(e, t.to.line).markedSpans;
            if (!n && !r) return null;
            var i = t.from.ch,
                s = t.to.ch,
                o = Nn(t.from, t.to);
            var u = wr(n, i, o);
            var a = Er(r, s, o);
            var f = t.text.length == 1,
                l = Qi(t.text).length + (f ? i : 0);
            if (u) {
                for (var c = 0; c < u.length; ++c) {
                    var h = u[c];
                    if (h.to == null) {
                        var p = gr(a, h.marker);
                        if (!p) h.to = i;
                        else if (f) h.to = p.to == null ? null : p.to + l
                    }
                }
            }
            if (a) {
                for (var c = 0; c < a.length; ++c) {
                    var h = a[c];
                    if (h.to != null) h.to += l;
                    if (h.from == null) {
                        var p = gr(u, h.marker);
                        if (!p) {
                            h.from = l;
                            if (f)(u || (u = [])).push(h)
                        }
                    } else {
                        h.from += l;
                        if (f)(u || (u = [])).push(h)
                    }
                }
            }
            if (f && u) {
                for (var c = 0; c < u.length; ++c)
                    if (u[c].from != null && u[c].from == u[c].to && u[c].marker.type != "bookmark") u.splice(c--, 1);
                if (!u.length) u = null
            }
            var d = [u];
            if (!f) {
                var v = t.text.length - 2,
                    m;
                if (v > 0 && u)
                    for (var c = 0; c < u.length; ++c)
                        if (u[c].to == null)(m || (m = [])).push({
                            from: null,
                            to: null,
                            marker: u[c].marker
                        });
                for (var c = 0; c < v; ++c) d.push(m);
                d.push(a)
            }
            return d
        }

        function xr(e, t) {
            var n = Ei(e, t);
            var r = Sr(e, t);
            if (!n) return r;
            if (!r) return n;
            for (var i = 0; i < n.length; ++i) {
                var s = n[i],
                    o = r[i];
                if (s && o) {
                    e: for (var u = 0; u < o.length; ++u) {
                        var a = o[u];
                        for (var f = 0; f < s.length; ++f)
                            if (s[f].marker == a.marker) continue e;
                        s.push(a)
                    }
                } else if (o) {
                    n[i] = o
                }
            }
            return n
        }

        function Tr(e, t, n) {
            var r = null;
            e.iter(t.line, n.line + 1, function(e) {
                if (e.markedSpans)
                    for (var t = 0; t < e.markedSpans.length; ++t) {
                        var n = e.markedSpans[t].marker;
                        if (n.readOnly && (!r || Yi(r, n) == -1))(r || (r = [])).push(n)
                    }
            });
            if (!r) return null;
            var i = [{
                from: t,
                to: n
            }];
            for (var s = 0; s < r.length; ++s) {
                var o = r[s],
                    u = o.find();
                for (var a = 0; a < i.length; ++a) {
                    var f = i[a];
                    if (Cn(f.to, u.from) || Cn(u.to, f.from)) continue;
                    var l = [a, 1];
                    if (Cn(f.from, u.from) || !o.inclusiveLeft && Nn(f.from, u.from)) l.push({
                        from: f.from,
                        to: u.from
                    });
                    if (Cn(u.to, f.to) || !o.inclusiveRight && Nn(f.to, u.to)) l.push({
                        from: u.to,
                        to: f.to
                    });
                    i.splice.apply(i, l);
                    a += l.length - 1
                }
            }
            return i
        }

        function Nr(e, t) {
            var n = E && e.markedSpans,
                r;
            if (n)
                for (var i, s = 0; s < n.length; ++s) {
                    i = n[s];
                    if (!i.marker.collapsed) continue;
                    if ((i.from == null || i.from < t) && (i.to == null || i.to > t) && (!r || r.width < i.marker.width)) r = i.marker
                }
            return r
        }

        function Cr(e) {
            return Nr(e, -1)
        }

        function kr(e) {
            return Nr(e, e.text.length + 1)
        }

        function Lr(e, t) {
            var n;
            while (n = Cr(t)) t = ai(e, n.find().from.line);
            return t
        }

        function Ar(e, t) {
            var n = E && t.markedSpans;
            if (n)
                for (var r, i = 0; i < n.length; ++i) {
                    r = n[i];
                    if (!r.marker.collapsed) continue;
                    if (r.from == null) return true;
                    if (r.marker.replacedWith) continue;
                    if (r.from == 0 && r.marker.inclusiveLeft && Or(e, t, r)) return true
                }
        }

        function Or(e, t, n) {
            if (n.to == null) {
                var r = n.marker.find().to,
                    i = ai(e, r.line);
                return Or(e, i, gr(i.markedSpans, n.marker))
            }
            if (n.marker.inclusiveRight && n.to == t.text.length) return true;
            for (var s, o = 0; o < t.markedSpans.length; ++o) {
                s = t.markedSpans[o];
                if (s.marker.collapsed && !s.marker.replacedWith && s.from == n.to && (s.marker.inclusiveLeft || n.marker.inclusiveRight) && Or(e, t, s)) return true
            }
        }

        function Mr(e) {
            var t = e.markedSpans;
            if (!t) return;
            for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
            e.markedSpans = null
        }

        function _r(e, t) {
            if (!t) return;
            for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
            e.markedSpans = t
        }

        function Pr(e) {
            return function() {
                var t = !this.cm.curOp;
                if (t) kt(this.cm);
                try {
                    var n = e.apply(this, arguments)
                } finally {
                    if (t) Lt(this.cm)
                }
                return n
            }
        }

        function Hr(e) {
            if (e.height != null) return e.height;
            if (!e.node.parentNode || e.node.parentNode.nodeType != 1) fs(e.cm.display.measure, us("div", [e.node], null, "position: relative"));
            return e.height = e.node.offsetHeight
        }

        function Br(e, t, n, r) {
            var i = new Dr(e, n, r);
            if (i.noHScroll) e.display.alignWidgets = true;
            Wn(e, t, function(t) {
                var n = t.widgets || (t.widgets = []);
                if (i.insertAt == null) n.push(i);
                else n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i);
                i.line = t;
                if (!Ar(e.doc, t) || i.showIfHidden) {
                    var r = di(e, t) < e.doc.scrollTop;
                    ci(t, t.height + Hr(i));
                    if (r) Un(e, 0, i.height)
                }
                return true
            });
            return i
        }

        function Fr(e, t, n, r) {
            e.text = t;
            if (e.stateAfter) e.stateAfter = null;
            if (e.styles) e.styles = null;
            if (e.order != null) e.order = null;
            Mr(e);
            _r(e, n);
            var i = r ? r(e) : 1;
            if (i != e.height) ci(e, i)
        }

        function Ir(e) {
            e.parent = null;
            Mr(e)
        }

        function qr(e, t, n, r, i) {
            var s = n.flattenSpans;
            if (s == null) s = e.options.flattenSpans;
            var o = 0,
                u = null;
            var a = new hr(t, e.options.tabSize),
                f;
            if (t == "" && n.blankLine) n.blankLine(r);
            while (!a.eol()) {
                if (a.pos > e.options.maxHighlightLength) {
                    s = false;
                    a.pos = Math.min(t.length, a.start + 5e4);
                    f = null
                } else {
                    f = n.token(a, r)
                } if (!s || u != f) {
                    if (o < a.start) i(a.start, u);
                    o = a.start;
                    u = f
                }
                a.start = a.pos
            }
            if (o < a.pos) i(a.pos, u)
        }

        function Rr(e, t, n) {
            var r = [e.state.modeGen];
            qr(e, t.text, e.doc.mode, n, function(e, t) {
                r.push(e, t)
            });
            for (var i = 0; i < e.state.overlays.length; ++i) {
                var s = e.state.overlays[i],
                    o = 1,
                    u = 0;
                qr(e, t.text, s.mode, true, function(e, t) {
                    var n = o;
                    while (u < e) {
                        var i = r[o];
                        if (i > e) r.splice(o, 1, e, r[o + 1], i);
                        o += 2;
                        u = Math.min(e, i)
                    }
                    if (!t) return;
                    if (s.opaque) {
                        r.splice(n, o - n, e, t);
                        o = n + 2
                    } else {
                        for (; n < o; n += 2) {
                            var a = r[n + 1];
                            r[n + 1] = a ? a + " " + t : t
                        }
                    }
                })
            }
            return r
        }

        function Ur(e, t) {
            if (!t.styles || t.styles[0] != e.state.modeGen) t.styles = Rr(e, t, t.stateAfter = rt(e, hi(t)));
            return t.styles
        }

        function zr(e, t, n) {
            var r = e.doc.mode;
            var i = new hr(t.text, e.options.tabSize);
            if (t.text == "" && r.blankLine) r.blankLine(n);
            while (!i.eol() && i.pos <= e.options.maxHighlightLength) {
                r.token(i, n);
                i.start = i.pos
            }
        }

        function Xr(e) {
            if (!e) return null;
            return Wr[e] || (Wr[e] = "cm-" + e.replace(/ +/g, " cm-"))
        }

        function Vr(e, n, r, s) {
            var o, u = n,
                a = true;
            while (o = Cr(u)) u = ai(e.doc, o.find().from.line);
            var f = {
                pre: us("pre"),
                col: 0,
                pos: 0,
                measure: null,
                measuredSomething: false,
                cm: e,
                copyWidgets: s
            };
            if (u.textClass) f.pre.className = u.textClass;
            do {
                if (u.text) a = false;
                f.measure = u == n && r;
                f.pos = 0;
                f.addToken = f.measure ? Kr : Jr;
                if ((t || i) && e.getOption("lineWrapping")) f.addToken = Qr(f.addToken);
                var l = Yr(u, f, Ur(e, u));
                if (r && u == n && !f.measuredSomething) {
                    r[0] = f.pre.appendChild(gs(e.display.measure));
                    f.measuredSomething = true
                }
                if (l) u = ai(e.doc, l.to.line)
            } while (l);
            if (r && !f.measuredSomething && !r[0]) r[0] = f.pre.appendChild(a ? us("span", " ") : gs(e.display.measure));
            if (!f.pre.firstChild && !Ar(e.doc, n)) f.pre.appendChild(document.createTextNode(" "));
            var c;
            if (r && t && (c = vi(u))) {
                var h = c.length - 1;
                if (c[h].from == c[h].to)--h;
                var p = c[h],
                    d = c[h - 1];
                if (p.from + 1 == p.to && d && p.level < d.level) {
                    var v = r[f.pos - 1];
                    if (v) v.parentNode.insertBefore(v.measureRight = gs(e.display.measure), v.nextSibling)
                }
            }
            Bi(e, "renderLine", e, n, f.pre);
            return f.pre
        }

        function Jr(e, t, n, r, i, s) {
            if (!t) return;
            if (!$r.test(t)) {
                e.col += t.length;
                var o = document.createTextNode(t)
            } else {
                var o = document.createDocumentFragment(),
                    u = 0;
                while (true) {
                    $r.lastIndex = u;
                    var a = $r.exec(t);
                    var f = a ? a.index - u : t.length - u;
                    if (f) {
                        o.appendChild(document.createTextNode(t.slice(u, u + f)));
                        e.col += f
                    }
                    if (!a) break;
                    u += f + 1;
                    if (a[0] == "	") {
                        var l = e.cm.options.tabSize,
                            c = l - e.col % l;
                        o.appendChild(us("span", Ki(c), "cm-tab"));
                        e.col += c
                    } else {
                        var h = us("span", "•", "cm-invalidchar");
                        h.title = "\\u" + a[0].charCodeAt(0).toString(16);
                        o.appendChild(h);
                        e.col += 1
                    }
                }
            } if (n || r || i || e.measure) {
                var p = n || "";
                if (r) p += r;
                if (i) p += i;
                var h = us("span", [o], p);
                if (s) h.title = s;
                return e.pre.appendChild(h)
            }
            e.pre.appendChild(o)
        }

        function Kr(e, n, r, i, s) {
            var o = e.cm.options.lineWrapping;
            for (var u = 0; u < n.length; ++u) {
                var a = n.charAt(u),
                    f = u == 0;
                if (a >= "�" && a < "�" && u < n.length - 1) {
                    a = n.slice(u, u + 2);
                    ++u
                } else if (u && o && ps(n, u)) {
                    e.pre.appendChild(us("wbr"))
                }
                var l = e.measure[e.pos];
                var c = e.measure[e.pos] = Jr(e, a, r, f && i, u == n.length - 1 && s);
                if (l) c.leftSide = l.leftSide || l;
                if (t && o && a == " " && u && !/\s/.test(n.charAt(u - 1)) && u < n.length - 1 && !/\s/.test(n.charAt(u + 1))) c.style.whiteSpace = "normal";
                e.pos += a.length
            }
            if (n.length) e.measuredSomething = true
        }

        function Qr(e) {
            function t(e) {
                var t = " ";
                for (var n = 0; n < e.length - 2; ++n) t += n % 2 ? " " : " ";
                t += " ";
                return t
            }
            return function(n, r, i, s, o, u) {
                return e(n, r.replace(/ {3,}/, t), i, s, o, u)
            }
        }

        function Gr(e, t, n, r) {
            var i = !r && n.replacedWith;
            if (i) {
                if (e.copyWidgets) i = i.cloneNode(true);
                e.pre.appendChild(i);
                if (e.measure) {
                    if (t) {
                        e.measure[e.pos] = i
                    } else {
                        var s = e.measure[e.pos] = gs(e.cm.display.measure);
                        if (n.type != "bookmark" || n.insertLeft) e.pre.insertBefore(s, i);
                        else e.pre.appendChild(s)
                    }
                    e.measuredSomething = true
                }
            }
            e.pos += t
        }

        function Yr(e, t, n) {
            var r = e.markedSpans,
                i = e.text,
                s = 0;
            if (!r) {
                for (var o = 1; o < n.length; o += 2) t.addToken(t, i.slice(s, s = n[o]), Xr(n[o + 1]));
                return
            }
            var u = i.length,
                a = 0,
                o = 1,
                f = "",
                l;
            var c = 0,
                h, p, d, v, m;
            for (;;) {
                if (c == a) {
                    h = p = d = v = "";
                    m = null;
                    c = Infinity;
                    var g = null;
                    for (var y = 0; y < r.length; ++y) {
                        var b = r[y],
                            w = b.marker;
                        if (b.from <= a && (b.to == null || b.to > a)) {
                            if (b.to != null && c > b.to) {
                                c = b.to;
                                p = ""
                            }
                            if (w.className) h += " " + w.className;
                            if (w.startStyle && b.from == a) d += " " + w.startStyle;
                            if (w.endStyle && b.to == c) p += " " + w.endStyle;
                            if (w.title && !v) v = w.title;
                            if (w.collapsed && (!m || m.marker.size < w.size)) m = b
                        } else if (b.from > a && c > b.from) {
                            c = b.from
                        }
                        if (w.type == "bookmark" && b.from == a && w.replacedWith) g = w
                    }
                    if (m && (m.from || 0) == a) {
                        Gr(t, (m.to == null ? u : m.to) - a, m.marker, m.from == null);
                        if (m.to == null) return m.marker.find()
                    }
                    if (g && !m) Gr(t, 0, g)
                }
                if (a >= u) break;
                var E = Math.min(u, c);
                while (true) {
                    if (f) {
                        var S = a + f.length;
                        if (!m) {
                            var x = S > E ? f.slice(0, E - a) : f;
                            t.addToken(t, x, l ? l + h : h, d, a + x.length == c ? p : "", v)
                        }
                        if (S >= E) {
                            f = f.slice(E - a);
                            a = E;
                            break
                        }
                        a = S;
                        d = ""
                    }
                    f = i.slice(s, s = n[o++]);
                    l = Xr(n[o++])
                }
            }
        }

        function Zr(e, t, n, r, i) {
            function s(e) {
                return n ? n[e] : null
            }

            function o(e, n, r) {
                Fr(e, n, r, i);
                Ii(e, "change", e, t)
            }
            var u = t.from,
                a = t.to,
                f = t.text;
            var l = ai(e, u.line),
                c = ai(e, a.line);
            var h = Qi(f),
                p = s(f.length - 1),
                d = a.line - u.line;
            if (u.ch == 0 && a.ch == 0 && h == "") {
                for (var v = 0, m = f.length - 1, g = []; v < m; ++v) g.push(new jr(f[v], s(v), i));
                o(c, c.text, p);
                if (d) e.remove(u.line, d);
                if (g.length) e.insert(u.line, g)
            } else if (l == c) {
                if (f.length == 1) {
                    o(l, l.text.slice(0, u.ch) + h + l.text.slice(a.ch), p)
                } else {
                    for (var g = [], v = 1, m = f.length - 1; v < m; ++v) g.push(new jr(f[v], s(v), i));
                    g.push(new jr(h + l.text.slice(a.ch), p, i));
                    o(l, l.text.slice(0, u.ch) + f[0], s(0));
                    e.insert(u.line + 1, g)
                }
            } else if (f.length == 1) {
                o(l, l.text.slice(0, u.ch) + f[0] + c.text.slice(a.ch), s(0));
                e.remove(u.line + 1, d)
            } else {
                o(l, l.text.slice(0, u.ch) + f[0], s(0));
                o(c, h + c.text.slice(a.ch), p);
                for (var v = 1, m = f.length - 1, g = []; v < m; ++v) g.push(new jr(f[v], s(v), i));
                if (d > 1) e.remove(u.line + 1, d - 1);
                e.insert(u.line + 1, g)
            }
            Ii(e, "change", e, t);
            Pn(e, r.anchor, r.head, null, true)
        }

        function ei(e) {
            this.lines = e;
            this.parent = null;
            for (var t = 0, n = e.length, r = 0; t < n; ++t) {
                e[t].parent = this;
                r += e[t].height
            }
            this.height = r
        }

        function ti(e) {
            this.children = e;
            var t = 0,
                n = 0;
            for (var r = 0, i = e.length; r < i; ++r) {
                var s = e[r];
                t += s.chunkSize();
                n += s.height;
                s.parent = this
            }
            this.size = t;
            this.height = n;
            this.parent = null
        }

        function oi(e, t, n) {
            function r(e, i, s) {
                if (e.linked)
                    for (var o = 0; o < e.linked.length; ++o) {
                        var u = e.linked[o];
                        if (u.doc == i) continue;
                        var a = s && u.sharedHist;
                        if (n && !a) continue;
                        t(u.doc, a);
                        r(u.doc, e, a)
                    }
            }
            r(e, null, true)
        }

        function ui(e, t) {
            if (t.cm) throw new Error("This document is already in use.");
            e.doc = t;
            t.cm = e;
            k(e);
            T(e);
            if (!e.options.lineWrapping) D(e);
            e.options.mode = t.modeOption;
            _t(e)
        }

        function ai(e, t) {
            t -= e.first;
            while (!e.lines) {
                for (var n = 0;; ++n) {
                    var r = e.children[n],
                        i = r.chunkSize();
                    if (t < i) {
                        e = r;
                        break
                    }
                    t -= i
                }
            }
            return e.lines[t]
        }

        function fi(e, t, n) {
            var r = [],
                i = t.line;
            e.iter(t.line, n.line + 1, function(e) {
                var s = e.text;
                if (i == n.line) s = s.slice(0, n.ch);
                if (i == t.line) s = s.slice(t.ch);
                r.push(s);
                ++i
            });
            return r
        }

        function li(e, t, n) {
            var r = [];
            e.iter(t, n, function(e) {
                r.push(e.text)
            });
            return r
        }

        function ci(e, t) {
            var n = t - e.height;
            for (var r = e; r; r = r.parent) r.height += n
        }

        function hi(e) {
            if (e.parent == null) return null;
            var t = e.parent,
                n = Yi(t.lines, e);
            for (var r = t.parent; r; t = r, r = r.parent) {
                for (var i = 0;; ++i) {
                    if (r.children[i] == t) break;
                    n += r.children[i].chunkSize()
                }
            }
            return n + t.first
        }

        function pi(e, t) {
            var n = e.first;
            e: do {
                for (var r = 0, i = e.children.length; r < i; ++r) {
                    var s = e.children[r],
                        o = s.height;
                    if (t < o) {
                        e = s;
                        continue e
                    }
                    t -= o;
                    n += s.chunkSize()
                }
                return n
            } while (!e.lines);
            for (var r = 0, i = e.lines.length; r < i; ++r) {
                var u = e.lines[r],
                    a = u.height;
                if (t < a) break;
                t -= a
            }
            return n + r
        }

        function di(e, t) {
            t = Lr(e.doc, t);
            var n = 0,
                r = t.parent;
            for (var i = 0; i < r.lines.length; ++i) {
                var s = r.lines[i];
                if (s == t) break;
                else n += s.height
            }
            for (var o = r.parent; o; r = o, o = r.parent) {
                for (var i = 0; i < o.children.length; ++i) {
                    var u = o.children[i];
                    if (u == r) break;
                    else n += u.height
                }
            }
            return n
        }

        function vi(e) {
            var t = e.order;
            if (t == null) t = e.order = Hs(e.text);
            return t
        }

        function mi(e) {
            return {
                done: [],
                undone: [],
                undoDepth: Infinity,
                lastTime: 0,
                lastOp: null,
                lastOrigin: null,
                generation: e || 1,
                maxGeneration: e || 1
            }
        }

        function gi(e, t, n, r) {
            var i = t["spans_" + e.id],
                s = 0;
            e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(n) {
                if (n.markedSpans)(i || (i = t["spans_" + e.id] = {}))[s] = n.markedSpans;
                ++s
            })
        }

        function yi(e, t) {
            var n = {
                line: t.from.line,
                ch: t.from.ch
            };
            var r = {
                from: n,
                to: pn(t),
                text: fi(e, t.from, t.to)
            };
            gi(e, r, t.from.line, t.to.line + 1);
            oi(e, function(e) {
                gi(e, r, t.from.line, t.to.line + 1)
            }, true);
            return r
        }

        function bi(e, t, n, r) {
            var i = e.history;
            i.undone.length = 0;
            var s = +(new Date),
                o = Qi(i.done);
            if (o && (i.lastOp == r || i.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && e.cm && i.lastTime > s - e.cm.options.historyEventDelay || t.origin.charAt(0) == "*"))) {
                var u = Qi(o.changes);
                if (Nn(t.from, t.to) && Nn(t.from, u.to)) {
                    u.to = pn(t)
                } else {
                    o.changes.push(yi(e, t))
                }
                o.anchorAfter = n.anchor;
                o.headAfter = n.head
            } else {
                o = {
                    changes: [yi(e, t)],
                    generation: i.generation,
                    anchorBefore: e.sel.anchor,
                    headBefore: e.sel.head,
                    anchorAfter: n.anchor,
                    headAfter: n.head
                };
                i.done.push(o);
                i.generation = ++i.maxGeneration;
                while (i.done.length > i.undoDepth) i.done.shift()
            }
            i.lastTime = s;
            i.lastOp = r;
            i.lastOrigin = t.origin
        }

        function wi(e) {
            if (!e) return null;
            for (var t = 0, n; t < e.length; ++t) {
                if (e[t].marker.explicitlyCleared) {
                    if (!n) n = e.slice(0, t)
                } else if (n) n.push(e[t])
            }
            return !n ? e : n.length ? n : null
        }

        function Ei(e, t) {
            var n = t["spans_" + e.id];
            if (!n) return null;
            for (var r = 0, i = []; r < t.text.length; ++r) i.push(wi(n[r]));
            return i
        }

        function Si(e, t) {
            for (var n = 0, r = []; n < e.length; ++n) {
                var i = e[n],
                    s = i.changes,
                    o = [];
                r.push({
                    changes: o,
                    anchorBefore: i.anchorBefore,
                    headBefore: i.headBefore,
                    anchorAfter: i.anchorAfter,
                    headAfter: i.headAfter
                });
                for (var u = 0; u < s.length; ++u) {
                    var a = s[u],
                        f;
                    o.push({
                        from: a.from,
                        to: a.to,
                        text: a.text
                    });
                    if (t)
                        for (var l in a)
                            if (f = l.match(/^spans_(\d+)$/)) {
                                if (Yi(t, Number(f[1])) > -1) {
                                    Qi(o)[l] = a[l];
                                    delete a[l]
                                }
                            }
                }
            }
            return r
        }

        function xi(e, t, n, r) {
            if (n < e.line) {
                e.line += r
            } else if (t < e.line) {
                e.line = t;
                e.ch = 0
            }
        }

        function Ti(e, t, n, r) {
            for (var i = 0; i < e.length; ++i) {
                var s = e[i],
                    o = true;
                for (var u = 0; u < s.changes.length; ++u) {
                    var a = s.changes[u];
                    if (!s.copied) {
                        a.from = kn(a.from);
                        a.to = kn(a.to)
                    }
                    if (n < a.from.line) {
                        a.from.line += r;
                        a.to.line += r
                    } else if (t <= a.to.line) {
                        o = false;
                        break
                    }
                }
                if (!s.copied) {
                    s.anchorBefore = kn(s.anchorBefore);
                    s.headBefore = kn(s.headBefore);
                    s.anchorAfter = kn(s.anchorAfter);
                    s.readAfter = kn(s.headAfter);
                    s.copied = true
                }
                if (!o) {
                    e.splice(0, i + 1);
                    i = 0
                } else {
                    xi(s.anchorBefore);
                    xi(s.headBefore);
                    xi(s.anchorAfter);
                    xi(s.headAfter)
                }
            }
        }

        function Ni(e, t) {
            var n = t.from.line,
                r = t.to.line,
                i = t.text.length - (r - n) - 1;
            Ti(e.done, n, r, i);
            Ti(e.undone, n, r, i)
        }

        function Ci() {
            Mi(this)
        }

        function ki(e) {
            if (!e.stop) e.stop = Ci;
            return e
        }

        function Li(e) {
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false
        }

        function Ai(e) {
            if (e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true
        }

        function Oi(e) {
            return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false
        }

        function Mi(e) {
            Li(e);
            Ai(e)
        }

        function _i(e) {
            return e.target || e.srcElement
        }

        function Di(e) {
            var t = e.which;
            if (t == null) {
                if (e.button & 1) t = 1;
                else if (e.button & 2) t = 3;
                else if (e.button & 4) t = 2
            }
            if (v && e.ctrlKey && t == 1) t = 3;
            return t
        }

        function Pi(e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, false);
            else if (e.attachEvent) e.attachEvent("on" + t, n);
            else {
                var r = e._handlers || (e._handlers = {});
                var i = r[t] || (r[t] = []);
                i.push(n)
            }
        }

        function Hi(e, t, n) {
            if (e.removeEventListener) e.removeEventListener(t, n, false);
            else if (e.detachEvent) e.detachEvent("on" + t, n);
            else {
                var r = e._handlers && e._handlers[t];
                if (!r) return;
                for (var i = 0; i < r.length; ++i)
                    if (r[i] == n) {
                        r.splice(i, 1);
                        break
                    }
            }
        }

        function Bi(e, t) {
            var n = e._handlers && e._handlers[t];
            if (!n) return;
            var r = Array.prototype.slice.call(arguments, 2);
            for (var i = 0; i < n.length; ++i) n[i].apply(null, r)
        }

        function Ii(e, t) {
            function i(e) {
                return function() {
                    e.apply(null, r)
                }
            }
            var n = e._handlers && e._handlers[t];
            if (!n) return;
            var r = Array.prototype.slice.call(arguments, 2);
            if (!ji) {
                ++Fi;
                ji = [];
                setTimeout(Ri, 0)
            }
            for (var s = 0; s < n.length; ++s) ji.push(i(n[s]))
        }

        function qi(e, t, n) {
            Bi(e, n || t.type, e, t);
            return Oi(t) || t.codemirrorIgnore
        }

        function Ri() {
            --Fi;
            var e = ji;
            ji = null;
            for (var t = 0; t < e.length; ++t) e[t]()
        }

        function Ui(e, t) {
            var n = e._handlers && e._handlers[t];
            return n && n.length > 0
        }

        function zi(e) {
            e.prototype.on = function(e, t) {
                Pi(this, e, t)
            };
            e.prototype.off = function(e, t) {
                Hi(this, e, t)
            }
        }

        function Vi() {
            this.id = null
        }

        function $i(e, t, n, r, i) {
            if (t == null) {
                t = e.search(/[^\s\u00a0]/);
                if (t == -1) t = e.length
            }
            for (var s = r || 0, o = i || 0; s < t; ++s) {
                if (e.charAt(s) == "	") o += n - o % n;
                else ++o
            }
            return o
        }

        function Ki(e) {
            while (Ji.length <= e) Ji.push(Qi(Ji) + " ");
            return Ji[e]
        }

        function Qi(e) {
            return e[e.length - 1]
        }

        function Gi(e) {
            if (p) {
                e.selectionStart = 0;
                e.selectionEnd = e.value.length
            } else {
                try {
                    e.select()
                } catch (t) {}
            }
        }

        function Yi(e, t) {
            if (e.indexOf) return e.indexOf(t);
            for (var n = 0, r = e.length; n < r; ++n)
                if (e[n] == t) return n;
            return -1
        }

        function Zi(e, t) {
            function n() {}
            n.prototype = e;
            var r = new n;
            if (t) es(t, r);
            return r
        }

        function es(e, t) {
            if (!t) t = {};
            for (var n in e)
                if (e.hasOwnProperty(n)) t[n] = e[n];
            return t
        }

        function ts(e) {
            for (var t = [], n = 0; n < e; ++n) t.push(undefined);
            return t
        }

        function ns(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return function() {
                return e.apply(null, t)
            }
        }

        function is(e) {
            return /\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || rs.test(e))
        }

        function ss(e) {
            for (var t in e)
                if (e.hasOwnProperty(t) && e[t]) return false;
            return true
        }

        function us(e, t, n, r) {
            var i = document.createElement(e);
            if (n) i.className = n;
            if (r) i.style.cssText = r;
            if (typeof t == "string") ls(i, t);
            else if (t)
                for (var s = 0; s < t.length; ++s) i.appendChild(t[s]);
            return i
        }

        function as(e) {
            for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
            return e
        }

        function fs(e, t) {
            return as(e).appendChild(t)
        }

        function ls(e, t) {
            if (r) {
                e.innerHTML = "";
                e.appendChild(document.createTextNode(t))
            } else e.textContent = t
        }

        function cs(e) {
            return e.getBoundingClientRect()
        }

        function ps() {
            return false
        }

        function vs(e) {
            if (ds != null) return ds;
            var t = us("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
            fs(e, t);
            if (t.offsetWidth) ds = t.offsetHeight - t.clientHeight;
            return ds || 0
        }

        function gs(e) {
            if (ms == null) {
                var t = us("span", "​");
                fs(e, us("span", [t, document.createTextNode("x")]));
                if (e.firstChild.offsetHeight != 0) ms = t.offsetWidth <= 1 && t.offsetHeight > 2 && !n
            }
            if (ms) return us("span", "​");
            else return us("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
        }

        function Ss(e, t, n, r) {
            if (!e) return r(t, n, "ltr");
            var i = false;
            for (var s = 0; s < e.length; ++s) {
                var o = e[s];
                if (o.from < n && o.to > t || t == n && o.to == t) {
                    r(Math.max(o.from, t), Math.min(o.to, n), o.level == 1 ? "rtl" : "ltr");
                    i = true
                }
            }
            if (!i) r(t, n, "ltr")
        }

        function xs(e) {
            return e.level % 2 ? e.to : e.from
        }

        function Ts(e) {
            return e.level % 2 ? e.from : e.to
        }

        function Ns(e) {
            var t = vi(e);
            return t ? xs(t[0]) : 0
        }

        function Cs(e) {
            var t = vi(e);
            if (!t) return e.text.length;
            return Ts(Qi(t))
        }

        function ks(e, t) {
            var n = ai(e.doc, t);
            var r = Lr(e.doc, n);
            if (r != n) t = hi(r);
            var i = vi(r);
            var s = !i ? 0 : i[0].level % 2 ? Cs(r) : Ns(r);
            return Tn(t, s)
        }

        function Ls(e, t) {
            var n, r;
            while (n = kr(r = ai(e.doc, t))) t = n.find().to.line;
            var i = vi(r);
            var s = !i ? r.text.length : i[0].level % 2 ? Ns(r) : Cs(r);
            return Tn(t, s)
        }

        function As(e, t, n) {
            var r = e[0].level;
            if (t == r) return true;
            if (n == r) return false;
            return t < n
        }

        function Ms(e, t) {
            for (var n = 0, r; n < e.length; ++n) {
                var i = e[n];
                if (i.from < t && i.to > t) {
                    Os = null;
                    return n
                }
                if (i.from == t || i.to == t) {
                    if (r == null) {
                        r = n
                    } else if (As(e, i.level, e[r].level)) {
                        Os = r;
                        return n
                    } else {
                        Os = n;
                        return r
                    }
                }
            }
            Os = null;
            return r
        }

        function _s(e, t, n, r) {
            if (!r) return t + n;
            do t += n; while (t > 0 && os.test(e.text.charAt(t)));
            return t
        }

        function Ds(e, t, n, r) {
            var i = vi(e);
            if (!i) return Ps(e, t, n, r);
            var s = Ms(i, t),
                o = i[s];
            var u = _s(e, t, o.level % 2 ? -n : n, r);
            for (;;) {
                if (u > o.from && u < o.to) return u;
                if (u == o.from || u == o.to) {
                    if (Ms(i, u) == s) return u;
                    o = i[s += n];
                    return n > 0 == o.level % 2 ? o.to : o.from
                } else {
                    o = i[s += n];
                    if (!o) return null;
                    if (n > 0 == o.level % 2) u = _s(e, o.to, -1, r);
                    else u = _s(e, o.from, 1, r)
                }
            }
        }

        function Ps(e, t, n, r) {
            var i = t + n;
            if (r)
                while (i > 0 && os.test(e.text.charAt(i))) i += n;
            return i < 0 || i > e.text.length ? null : i
        }
        var e = /gecko\/\d/i.test(navigator.userAgent);
        var t = /MSIE \d/.test(navigator.userAgent);
        var n = t && (document.documentMode == null || document.documentMode < 8);
        var r = t && (document.documentMode == null || document.documentMode < 9);
        var i = /WebKit\//.test(navigator.userAgent);
        var s = i && /Qt\/\d+\.\d+/.test(navigator.userAgent);
        var o = /Chrome\//.test(navigator.userAgent);
        var u = /Opera\//.test(navigator.userAgent);
        var a = /Apple Computer/.test(navigator.vendor);
        var f = /KHTML\//.test(navigator.userAgent);
        var l = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent);
        var c = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
        var h = /PhantomJS/.test(navigator.userAgent);
        var p = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
        var d = p || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
        var v = p || /Mac/.test(navigator.platform);
        var m = /windows/i.test(navigator.platform);
        var g = u && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
        if (g) g = Number(g[1]);
        if (g && g >= 15) {
            u = false;
            i = true
        }
        var y = v && (s || u && (g == null || g < 12.11));
        var b = e || t && !r;
        var w = false,
            E = false;
        var xt;
        var Ct = 0;
        var Ut, zt;
        var Vt = 0;
        var Gt = 0,
            Yt = null;
        if (t) Yt = -.53;
        else if (e) Yt = 15;
        else if (o) Yt = -.7;
        else if (a) Yt = -1 / 3;
        var nn;
        var on = null;
        var cn;
        var pn = S.changeEnd = function(e) {
            if (!e.text) return e.to;
            return Tn(e.from.line + e.text.length - 1, Qi(e.text).length + (e.text.length == 1 ? e.from.ch : 0))
        };
        S.Pos = Tn;
        S.prototype = {
            constructor: S,
            focus: function() {
                window.focus();
                jt(this);
                fn(this);
                Pt(this)
            },
            setOption: function(e, t) {
                var n = this.options,
                    r = n[e];
                if (n[e] == t && e != "mode") return;
                n[e] = t;
                if (Kn.hasOwnProperty(e)) At(this, Kn[e])(this, t, r)
            },
            getOption: function(e) {
                return this.options[e]
            },
            getDoc: function() {
                return this.doc
            },
            addKeyMap: function(e, t) {
                this.state.keyMaps[t ? "push" : "unshift"](e)
            },
            removeKeyMap: function(e) {
                var t = this.state.keyMaps;
                for (var n = 0; n < t.length; ++n)
                    if (t[n] == e || typeof t[n] != "string" && t[n].name == e) {
                        t.splice(n, 1);
                        return true
                    }
            },
            addOverlay: At(null, function(e, t) {
                var n = e.token ? e : S.getMode(this.options, e);
                if (n.startState) throw new Error("Overlays may not be stateful.");
                this.state.overlays.push({
                    mode: n,
                    modeSpec: e,
                    opaque: t && t.opaque
                });
                this.state.modeGen++;
                _t(this)
            }),
            removeOverlay: At(null, function(e) {
                var t = this.state.overlays;
                for (var n = 0; n < t.length; ++n) {
                    var r = t[n].modeSpec;
                    if (r == e || typeof e == "string" && r.name == e) {
                        t.splice(n, 1);
                        this.state.modeGen++;
                        _t(this);
                        return
                    }
                }
            }),
            indentLine: At(null, function(e, t, n) {
                if (typeof t != "string" && typeof t != "number") {
                    if (t == null) t = this.options.smartIndent ? "smart" : "prev";
                    else t = t ? "add" : "subtract"
                }
                if (Mn(this.doc, e)) zn(this, e, t, n)
            }),
            indentSelection: At(null, function(e) {
                var t = this.doc.sel;
                if (Nn(t.from, t.to)) return zn(this, t.from.line, e);
                var n = t.to.line - (t.to.ch ? 0 : 1);
                for (var r = t.from.line; r <= n; ++r) zn(this, r, e)
            }),
            getTokenAt: function(e, t) {
                var n = this.doc;
                e = An(n, e);
                var r = rt(this, e.line, t),
                    i = this.doc.mode;
                var s = ai(n, e.line);
                var o = new hr(s.text, this.options.tabSize);
                while (o.pos < e.ch && !o.eol()) {
                    o.start = o.pos;
                    var u = i.token(o, r)
                }
                return {
                    start: o.start,
                    end: o.pos,
                    string: o.current(),
                    className: u || null,
                    type: u || null,
                    state: r
                }
            },
            getTokenTypeAt: function(e) {
                e = An(this.doc, e);
                var t = Ur(this, ai(this.doc, e.line));
                var n = 0,
                    r = (t.length - 1) / 2,
                    i = e.ch;
                if (i == 0) return t[2];
                for (;;) {
                    var s = n + r >> 1;
                    if ((s ? t[s * 2 - 1] : 0) >= i) r = s;
                    else if (t[s * 2 + 1] < i) n = s + 1;
                    else return t[s * 2 + 2]
                }
            },
            getModeAt: function(e) {
                var t = this.doc.mode;
                if (!t.innerMode) return t;
                return S.innerMode(t, this.getTokenAt(e).state).mode
            },
            getHelper: function(e, t) {
                if (!rr.hasOwnProperty(t)) return;
                var n = rr[t],
                    r = this.getModeAt(e);
                return r[t] && n[r[t]] || r.helperType && n[r.helperType] || n[r.name]
            },
            getStateAfter: function(e, t) {
                var n = this.doc;
                e = Ln(n, e == null ? n.first + n.size - 1 : e);
                return rt(this, e + 1, t)
            },
            cursorCoords: function(e, t) {
                var n, r = this.doc.sel;
                if (e == null) n = r.head;
                else if (typeof e == "object") n = An(this.doc, e);
                else n = e ? r.from : r.to;
                return bt(this, n, t || "page")
            },
            charCoords: function(e, t) {
                return yt(this, An(this.doc, e), t || "page")
            },
            coordsChar: function(e, t) {
                e = gt(this, e, t || "page");
                return Et(this, e.left, e.top)
            },
            lineAtHeight: function(e, t) {
                e = gt(this, {
                    top: e,
                    left: 0
                }, t || "page").top;
                return pi(this.doc, e + this.display.viewOffset)
            },
            heightAtLine: function(e, t) {
                var n = false,
                    r = this.doc.first + this.doc.size - 1;
                if (e < this.doc.first) e = this.doc.first;
                else if (e > r) {
                    e = r;
                    n = true
                }
                var i = ai(this.doc, e);
                return mt(this, ai(this.doc, e), {
                        top: 0,
                        left: 0
                    }, t || "page").top + (n ? i.height : 0)
            },
            defaultTextHeight: function() {
                return Tt(this.display)
            },
            defaultCharWidth: function() {
                return Nt(this.display)
            },
            setGutterMarker: At(null, function(e, t, n) {
                return Wn(this, e, function(e) {
                    var r = e.gutterMarkers || (e.gutterMarkers = {});
                    r[t] = n;
                    if (!n && ss(r)) e.gutterMarkers = null;
                    return true
                })
            }),
            clearGutter: At(null, function(e) {
                var t = this,
                    n = t.doc,
                    r = n.first;
                n.iter(function(n) {
                    if (n.gutterMarkers && n.gutterMarkers[e]) {
                        n.gutterMarkers[e] = null;
                        _t(t, r, r + 1);
                        if (ss(n.gutterMarkers)) n.gutterMarkers = null
                    }++r
                })
            }),
            addLineClass: At(null, function(e, t, n) {
                return Wn(this, e, function(e) {
                    var r = t == "text" ? "textClass" : t == "background" ? "bgClass" : "wrapClass";
                    if (!e[r]) e[r] = n;
                    else if ((new RegExp("(?:^|\\s)" + n + "(?:$|\\s)")).test(e[r])) return false;
                    else e[r] += " " + n;
                    return true
                })
            }),
            removeLineClass: At(null, function(e, t, n) {
                return Wn(this, e, function(e) {
                    var r = t == "text" ? "textClass" : t == "background" ? "bgClass" : "wrapClass";
                    var i = e[r];
                    if (!i) return false;
                    else if (n == null) e[r] = null;
                    else {
                        var s = i.match(new RegExp("(?:^|\\s+)" + n + "(?:$|\\s+)"));
                        if (!s) return false;
                        var o = s.index + s[0].length;
                        e[r] = i.slice(0, s.index) + (!s.index || o == i.length ? "" : " ") + i.slice(o) || null
                    }
                    return true
                })
            }),
            addLineWidget: At(null, function(e, t, n) {
                return Br(this, e, t, n)
            }),
            removeLineWidget: function(e) {
                e.clear()
            },
            lineInfo: function(e) {
                if (typeof e == "number") {
                    if (!Mn(this.doc, e)) return null;
                    var t = e;
                    e = ai(this.doc, e);
                    if (!e) return null
                } else {
                    var t = hi(e);
                    if (t == null) return null
                }
                return {
                    line: t,
                    handle: e,
                    text: e.text,
                    gutterMarkers: e.gutterMarkers,
                    textClass: e.textClass,
                    bgClass: e.bgClass,
                    wrapClass: e.wrapClass,
                    widgets: e.widgets
                }
            },
            getViewport: function() {
                return {
                    from: this.display.showingFrom,
                    to: this.display.showingTo
                }
            },
            addWidget: function(e, t, n, r, i) {
                var s = this.display;
                e = bt(this, An(this.doc, e));
                var o = e.bottom,
                    u = e.left;
                t.style.position = "absolute";
                s.sizer.appendChild(t);
                if (r == "over") {
                    o = e.top
                } else if (r == "above" || r == "near") {
                    var a = Math.max(s.wrapper.clientHeight, this.doc.height),
                        f = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth);
                    if ((r == "above" || e.bottom + t.offsetHeight > a) && e.top > t.offsetHeight) o = e.top - t.offsetHeight;
                    else if (e.bottom + t.offsetHeight <= a) o = e.bottom;
                    if (u + t.offsetWidth > f) u = f - t.offsetWidth
                }
                t.style.top = o + "px";
                t.style.left = t.style.right = "";
                if (i == "right") {
                    u = s.sizer.clientWidth - t.offsetWidth;
                    t.style.right = "0px"
                } else {
                    if (i == "left") u = 0;
                    else if (i == "middle") u = (s.sizer.clientWidth - t.offsetWidth) / 2;
                    t.style.left = u + "px"
                } if (n) In(this, u, o, u + t.offsetWidth, o + t.offsetHeight)
            },
            triggerOnKeyDown: At(null, un),
            execCommand: function(e) {
                return or[e](this)
            },
            findPosH: function(e, t, n, r) {
                var i = 1;
                if (t < 0) {
                    i = -1;
                    t = -t
                }
                for (var s = 0, o = An(this.doc, e); s < t; ++s) {
                    o = Xn(this.doc, o, i, n, r);
                    if (o.hitSide) break
                }
                return o
            },
            moveH: At(null, function(e, t) {
                var n = this.doc.sel,
                    r;
                if (n.shift || n.extend || Nn(n.from, n.to)) r = Xn(this.doc, n.head, e, t, this.options.rtlMoveVisually);
                else r = e < 0 ? n.from : n.to;
                _n(this.doc, r, r, e)
            }),
            deleteH: At(null, function(e, t) {
                var n = this.doc.sel;
                if (!Nn(n.from, n.to)) xn(this.doc, "", n.from, n.to, "+delete");
                else xn(this.doc, "", n.from, Xn(this.doc, n.head, e, t, false), "+delete");
                this.curOp.userSelChange = true
            }),
            findPosV: function(e, t, n, r) {
                var i = 1,
                    s = r;
                if (t < 0) {
                    i = -1;
                    t = -t
                }
                for (var o = 0, u = An(this.doc, e); o < t; ++o) {
                    var a = bt(this, u, "div");
                    if (s == null) s = a.left;
                    else a.left = s;
                    u = Vn(this, a, i, n);
                    if (u.hitSide) break
                }
                return u
            },
            moveV: At(null, function(e, t) {
                var n = this.doc.sel;
                var r = bt(this, n.head, "div");
                if (n.goalColumn != null) r.left = n.goalColumn;
                var i = Vn(this, r, e, t);
                if (t == "page") Un(this, 0, yt(this, i, "div").top - r.top);
                _n(this.doc, i, i, e);
                n.goalColumn = r.left
            }),
            toggleOverwrite: function(e) {
                if (e != null && e == this.state.overwrite) return;
                if (this.state.overwrite = !this.state.overwrite) this.display.cursor.className += " CodeMirror-overwrite";
                else this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", "")
            },
            hasFocus: function() {
                return this.state.focused
            },
            scrollTo: At(null, function(e, t) {
                Rn(this, e, t)
            }),
            getScrollInfo: function() {
                var e = this.display.scroller,
                    t = Wi;
                return {
                    left: e.scrollLeft,
                    top: e.scrollTop,
                    height: e.scrollHeight - t,
                    width: e.scrollWidth - t,
                    clientHeight: e.clientHeight - t,
                    clientWidth: e.clientWidth - t
                }
            },
            scrollIntoView: At(null, function(e, t) {
                if (typeof e == "number") e = Tn(e, 0);
                if (!t) t = 0;
                var n = e;
                if (!e || e.line != null) {
                    this.curOp.scrollToPos = e ? An(this.doc, e) : this.doc.sel.head;
                    this.curOp.scrollToPosMargin = t;
                    n = bt(this, this.curOp.scrollToPos)
                }
                var r = qn(this, n.left, n.top - t, n.right, n.bottom + t);
                Rn(this, r.scrollLeft, r.scrollTop)
            }),
            setSize: At(null, function(e, t) {
                function n(e) {
                    return typeof e == "number" || /^\d+$/.test(String(e)) ? e + "px" : e
                }
                if (e != null) this.display.wrapper.style.width = n(e);
                if (t != null) this.display.wrapper.style.height = n(t);
                if (this.options.lineWrapping) this.display.measureLineCache.length = this.display.measureLineCachePos = 0;
                this.curOp.forceUpdate = true
            }),
            operation: function(e) {
                return Mt(this, e)
            },
            refresh: At(null, function() {
                pt(this);
                Rn(this, this.doc.scrollLeft, this.doc.scrollTop);
                _t(this)
            }),
            swapDoc: At(null, function(e) {
                var t = this.doc;
                t.cm = null;
                ui(this, e);
                pt(this);
                Bt(this, true);
                Rn(this, e.scrollLeft, e.scrollTop);
                return t
            }),
            getInputField: function() {
                return this.display.input
            },
            getWrapperElement: function() {
                return this.display.wrapper
            },
            getScrollerElement: function() {
                return this.display.scroller
            },
            getGutterElement: function() {
                return this.display.gutters
            }
        };
        zi(S);
        var Kn = S.optionHandlers = {};
        var Qn = S.defaults = {};
        var Yn = S.Init = {
            toString: function() {
                return "CodeMirror.Init"
            }
        };
        Gn("value", "", function(e, t) {
            e.setValue(t)
        }, true);
        Gn("mode", null, function(e, t) {
            e.doc.modeOption = t;
            T(e)
        }, true);
        Gn("indentUnit", 2, T, true);
        Gn("indentWithTabs", false);
        Gn("smartIndent", true);
        Gn("tabSize", 4, function(e) {
            T(e);
            pt(e);
            _t(e)
        }, true);
        Gn("electricChars", true);
        Gn("rtlMoveVisually", !m);
        Gn("theme", "default", function(e) {
            A(e);
            O(e)
        }, true);
        Gn("keyMap", "default", L);
        Gn("extraKeys", null);
        Gn("onKeyEvent", null);
        Gn("onDragEvent", null);
        Gn("lineWrapping", false, N, true);
        Gn("gutters", [], function(e) {
            P(e.options);
            O(e)
        }, true);
        Gn("fixedGutter", true, function(e, t) {
            e.display.gutters.style.left = t ? q(e.display) + "px" : "0";
            e.refresh()
        }, true);
        Gn("coverGutterNextToScrollbar", false, H, true);
        Gn("lineNumbers", false, function(e) {
            P(e.options);
            O(e)
        }, true);
        Gn("firstLineNumber", 1, O, true);
        Gn("lineNumberFormatter", function(e) {
            return e
        }, O, true);
        Gn("showCursorWhenSelecting", false, Q, true);
        Gn("readOnly", false, function(e, t) {
            if (t == "nocursor") {
                ln(e);
                e.display.input.blur()
            } else if (!t) Bt(e, true)
        });
        Gn("dragDrop", true);
        Gn("cursorBlinkRate", 530);
        Gn("cursorScrollMargin", 0);
        Gn("cursorHeight", 1);
        Gn("workTime", 100);
        Gn("workDelay", 100);
        Gn("flattenSpans", true);
        Gn("pollInterval", 100);
        Gn("undoDepth", 40, function(e, t) {
            e.doc.history.undoDepth = t
        });
        Gn("historyEventDelay", 500);
        Gn("viewportMargin", 10, function(e) {
            e.refresh()
        }, true);
        Gn("maxHighlightLength", 1e4, function(e) {
            T(e);
            e.refresh()
        }, true);
        Gn("moveInputWithCursor", true, function(e, t) {
            if (!t) e.display.inputDiv.style.top = e.display.inputDiv.style.left = 0
        });
        Gn("tabindex", null, function(e, t) {
            e.display.input.tabIndex = t || ""
        });
        Gn("autofocus", null);
        var Zn = S.modes = {}, er = S.mimeModes = {};
        S.defineMode = function(e, t) {
            if (!S.defaults.mode && e != "null") S.defaults.mode = e;
            if (arguments.length > 2) {
                t.dependencies = [];
                for (var n = 2; n < arguments.length; ++n) t.dependencies.push(arguments[n])
            }
            Zn[e] = t
        };
        S.defineMIME = function(e, t) {
            er[e] = t
        };
        S.resolveMode = function(e) {
            if (typeof e == "string" && er.hasOwnProperty(e)) {
                e = er[e]
            } else if (e && typeof e.name == "string" && er.hasOwnProperty(e.name)) {
                var t = er[e.name];
                e = Zi(t, e);
                e.name = t.name
            } else if (typeof e == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) {
                return S.resolveMode("application/xml")
            }
            if (typeof e == "string") return {
                name: e
            };
            else return e || {
                    name: "null"
                }
        };
        S.getMode = function(e, t) {
            var t = S.resolveMode(t);
            var n = Zn[t.name];
            if (!n) return S.getMode(e, "text/plain");
            var r = n(e, t);
            if (tr.hasOwnProperty(t.name)) {
                var i = tr[t.name];
                for (var s in i) {
                    if (!i.hasOwnProperty(s)) continue;
                    if (r.hasOwnProperty(s)) r["_" + s] = r[s];
                    r[s] = i[s]
                }
            }
            r.name = t.name;
            return r
        };
        S.defineMode("null", function() {
            return {
                token: function(e) {
                    e.skipToEnd()
                }
            }
        });
        S.defineMIME("text/plain", "null");
        var tr = S.modeExtensions = {};
        S.extendMode = function(e, t) {
            var n = tr.hasOwnProperty(e) ? tr[e] : tr[e] = {};
            es(t, n)
        };
        S.defineExtension = function(e, t) {
            S.prototype[e] = t
        };
        S.defineDocExtension = function(e, t) {
            ri.prototype[e] = t
        };
        S.defineOption = Gn;
        var nr = [];
        S.defineInitHook = function(e) {
            nr.push(e)
        };
        var rr = S.helpers = {};
        S.registerHelper = function(e, t, n) {
            if (!rr.hasOwnProperty(e)) rr[e] = S[e] = {};
            rr[e][t] = n
        };
        S.isWordChar = is;
        S.copyState = ir;
        S.startState = sr;
        S.innerMode = function(e, t) {
            while (e.innerMode) {
                var n = e.innerMode(t);
                if (!n || n.mode == e) break;
                t = n.state;
                e = n.mode
            }
            return n || {
                    mode: e,
                    state: t
                }
        };
        var or = S.commands = {
            selectAll: function(e) {
                e.setSelection(Tn(e.firstLine(), 0), Tn(e.lastLine()))
            },
            killLine: function(e) {
                var t = e.getCursor(true),
                    n = e.getCursor(false),
                    r = !Nn(t, n);
                if (!r && e.getLine(t.line).length == t.ch) e.replaceRange("", t, Tn(t.line + 1, 0), "+delete");
                else e.replaceRange("", t, r ? n : Tn(t.line), "+delete")
            },
            deleteLine: function(e) {
                var t = e.getCursor().line;
                e.replaceRange("", Tn(t, 0), Tn(t), "+delete")
            },
            delLineLeft: function(e) {
                var t = e.getCursor();
                e.replaceRange("", Tn(t.line, 0), t, "+delete")
            },
            undo: function(e) {
                e.undo()
            },
            redo: function(e) {
                e.redo()
            },
            goDocStart: function(e) {
                e.extendSelection(Tn(e.firstLine(), 0))
            },
            goDocEnd: function(e) {
                e.extendSelection(Tn(e.lastLine()))
            },
            goLineStart: function(e) {
                e.extendSelection(ks(e, e.getCursor().line))
            },
            goLineStartSmart: function(e) {
                var t = e.getCursor(),
                    n = ks(e, t.line);
                var r = e.getLineHandle(n.line);
                var i = vi(r);
                if (!i || i[0].level == 0) {
                    var s = Math.max(0, r.text.search(/\S/));
                    var o = t.line == n.line && t.ch <= s && t.ch;
                    e.extendSelection(Tn(n.line, o ? 0 : s))
                } else e.extendSelection(n)
            },
            goLineEnd: function(e) {
                e.extendSelection(Ls(e, e.getCursor().line))
            },
            goLineRight: function(e) {
                var t = e.charCoords(e.getCursor(), "div").top + 5;
                e.extendSelection(e.coordsChar({
                    left: e.display.lineDiv.offsetWidth + 100,
                    top: t
                }, "div"))
            },
            goLineLeft: function(e) {
                var t = e.charCoords(e.getCursor(), "div").top + 5;
                e.extendSelection(e.coordsChar({
                    left: 0,
                    top: t
                }, "div"))
            },
            goLineUp: function(e) {
                e.moveV(-1, "line")
            },
            goLineDown: function(e) {
                e.moveV(1, "line")
            },
            goPageUp: function(e) {
                e.moveV(-1, "page")
            },
            goPageDown: function(e) {
                e.moveV(1, "page")
            },
            goCharLeft: function(e) {
                e.moveH(-1, "char")
            },
            goCharRight: function(e) {
                e.moveH(1, "char")
            },
            goColumnLeft: function(e) {
                e.moveH(-1, "column")
            },
            goColumnRight: function(e) {
                e.moveH(1, "column")
            },
            goWordLeft: function(e) {
                e.moveH(-1, "word")
            },
            goGroupRight: function(e) {
                e.moveH(1, "group")
            },
            goGroupLeft: function(e) {
                e.moveH(-1, "group")
            },
            goWordRight: function(e) {
                e.moveH(1, "word")
            },
            delCharBefore: function(e) {
                e.deleteH(-1, "char")
            },
            delCharAfter: function(e) {
                e.deleteH(1, "char")
            },
            delWordBefore: function(e) {
                e.deleteH(-1, "word")
            },
            delWordAfter: function(e) {
                e.deleteH(1, "word")
            },
            delGroupBefore: function(e) {
                e.deleteH(-1, "group")
            },
            delGroupAfter: function(e) {
                e.deleteH(1, "group")
            },
            indentAuto: function(e) {
                e.indentSelection("smart")
            },
            indentMore: function(e) {
                e.indentSelection("add")
            },
            indentLess: function(e) {
                e.indentSelection("subtract")
            },
            insertTab: function(e) {
                e.replaceSelection("	", "end", "+input")
            },
            defaultTab: function(e) {
                if (e.somethingSelected()) e.indentSelection("add");
                else e.replaceSelection("	", "end", "+input")
            },
            transposeChars: function(e) {
                var t = e.getCursor(),
                    n = e.getLine(t.line);
                if (t.ch > 0 && t.ch < n.length - 1) e.replaceRange(n.charAt(t.ch) + n.charAt(t.ch - 1), Tn(t.line, t.ch - 1), Tn(t.line, t.ch + 1))
            },
            newlineAndIndent: function(e) {
                At(e, function() {
                    e.replaceSelection("\n", "end", "+input");
                    e.indentLine(e.getCursor().line, null, true)
                })()
            },
            toggleOverwrite: function(e) {
                e.toggleOverwrite()
            }
        };
        var ur = S.keyMap = {};
        ur.basic = {
            Left: "goCharLeft",
            Right: "goCharRight",
            Up: "goLineUp",
            Down: "goLineDown",
            End: "goLineEnd",
            Home: "goLineStartSmart",
            PageUp: "goPageUp",
            PageDown: "goPageDown",
            Delete: "delCharAfter",
            Backspace: "delCharBefore",
            Tab: "defaultTab",
            "Shift-Tab": "indentAuto",
            Enter: "newlineAndIndent",
            Insert: "toggleOverwrite"
        };
        ur.pcDefault = {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Alt-Up": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Down": "goDocEnd",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            fallthrough: "basic"
        };
        ur.macDefault = {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineStart",
            "Cmd-Right": "goLineEnd",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delLineLeft",
            fallthrough: ["basic", "emacsy"]
        };
        ur["default"] = v ? ur.macDefault : ur.pcDefault;
        ur.emacsy = {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Alt-F": "goWordRight",
            "Alt-B": "goWordLeft",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-D": "delWordAfter",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars"
        };
        S.lookupKey = fr;
        S.isModifierKey = lr;
        S.keyName = cr;
        S.fromTextArea = function(e, t) {
            function i() {
                e.value = a.getValue()
            }
            if (!t) t = {};
            console.log('e.value:', e.value);
            t.value = e.value;
            if (!t.tabindex && e.tabindex) t.tabindex = e.tabindex;
            if (!t.placeholder && e.placeholder) t.placeholder = e.placeholder;
            if (t.autofocus == null) {
                var n = document.body;
                try {
                    n = document.activeElement
                } catch (r) {}
                console.log(e);
                t.autofocus = n == e || e.getAttribute("autofocus") != null && n == document.body
            }
            if (e.form) {
                Pi(e.form, "submit", i);
                if (!t.leaveSubmitMethodAlone) {
                    var s = e.form,
                        o = s.submit;
                    try {
                        var u = s.submit = function() {
                            i();
                            s.submit = o;
                            s.submit();
                            s.submit = u
                        }
                    } catch (r) {}
                }
            }
            e.style.display = "none";
            var a = S(function(t) {
                e.parentNode.insertBefore(t, e.nextSibling)
            }, t);
            a.save = i;
            a.getTextArea = function() {
                return e
            };
            a.toTextArea = function() {
                i();
                e.parentNode.removeChild(a.getWrapperElement());
                e.style.display = "";
                if (e.form) {
                    Hi(e.form, "submit", i);
                    if (typeof e.form.submit == "function") e.form.submit = o
                }
            };
            return a
        };
        hr.prototype = {
            eol: function() {
                return this.pos >= this.string.length
            },
            sol: function() {
                return this.pos == 0
            },
            peek: function() {
                return this.string.charAt(this.pos) || undefined
            },
            next: function() {
                if (this.pos < this.string.length) return this.string.charAt(this.pos++)
            },
            eat: function(e) {
                var t = this.string.charAt(this.pos);
                if (typeof e == "string") var n = t == e;
                else var n = t && (e.test ? e.test(t) : e(t)); if (n) {
                    ++this.pos;
                    return t
                }
            },
            eatWhile: function(e) {
                var t = this.pos;
                while (this.eat(e)) {}
                return this.pos > t
            },
            eatSpace: function() {
                var e = this.pos;
                while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;
                return this.pos > e
            },
            skipToEnd: function() {
                this.pos = this.string.length
            },
            skipTo: function(e) {
                var t = this.string.indexOf(e, this.pos);
                if (t > -1) {
                    this.pos = t;
                    return true
                }
            },
            backUp: function(e) {
                this.pos -= e
            },
            column: function() {
                if (this.lastColumnPos < this.start) {
                    this.lastColumnValue = $i(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
                    this.lastColumnPos = this.start
                }
                return this.lastColumnValue
            },
            indentation: function() {
                return $i(this.string, null, this.tabSize)
            },
            match: function(e, t, n) {
                if (typeof e == "string") {
                    var r = function(e) {
                        return n ? e.toLowerCase() : e
                    };
                    var i = this.string.substr(this.pos, e.length);
                    if (r(i) == r(e)) {
                        if (t !== false) this.pos += e.length;
                        return true
                    }
                } else {
                    var s = this.string.slice(this.pos).match(e);
                    if (s && s.index > 0) return null;
                    if (s && t !== false) this.pos += s[0].length;
                    return s
                }
            },
            current: function() {
                return this.string.slice(this.start, this.pos)
            }
        };
        S.StringStream = hr;
        S.TextMarker = pr;
        zi(pr);
        pr.prototype.clear = function() {
            if (this.explicitlyCleared) return;
            var e = this.doc.cm,
                t = e && !e.curOp;
            if (t) kt(e);
            if (Ui(this, "clear")) {
                var n = this.find();
                if (n) Ii(this, "clear", n.from, n.to)
            }
            var r = null,
                i = null;
            for (var s = 0; s < this.lines.length; ++s) {
                var o = this.lines[s];
                var u = gr(o.markedSpans, this);
                if (u.to != null) i = hi(o);
                o.markedSpans = yr(o.markedSpans, u);
                if (u.from != null) r = hi(o);
                else if (this.collapsed && !Ar(this.doc, o) && e) ci(o, Tt(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
                for (var s = 0; s < this.lines.length; ++s) {
                    var a = Lr(e.doc, this.lines[s]),
                        f = _(e.doc, a);
                    if (f > e.display.maxLineLength) {
                        e.display.maxLine = a;
                        e.display.maxLineLength = f;
                        e.display.maxLineChanged = true
                    }
                }
            if (r != null && e) _t(e, r, i + 1);
            this.lines.length = 0;
            this.explicitlyCleared = true;
            if (this.atomic && this.doc.cantEdit) {
                this.doc.cantEdit = false;
                if (e) Hn(e)
            }
            if (t) Lt(e)
        };
        pr.prototype.find = function() {
            var e, t;
            for (var n = 0; n < this.lines.length; ++n) {
                var r = this.lines[n];
                var i = gr(r.markedSpans, this);
                if (i.from != null || i.to != null) {
                    var s = hi(r);
                    if (i.from != null) e = Tn(s, i.from);
                    if (i.to != null) t = Tn(s, i.to)
                }
            }
            if (this.type == "bookmark") return e;
            return e && {
                    from: e,
                    to: t
                }
        };
        pr.prototype.changed = function() {
            var e = this.find(),
                t = this.doc.cm;
            if (!e || !t) return;
            var n = ai(this.doc, e.from.line);
            ft(t, n);
            if (e.from.line >= t.display.showingFrom && e.from.line < t.display.showingTo) {
                for (var r = t.display.lineDiv.firstChild; r; r = r.nextSibling)
                    if (r.lineObj == n) {
                        if (r.offsetHeight != n.height) ci(n, r.offsetHeight);
                        break
                    }
                Mt(t, function() {
                    t.curOp.selectionChanged = t.curOp.forceUpdate = t.curOp.updateMaxLine = true
                })
            }
        };
        pr.prototype.attachLine = function(e) {
            if (!this.lines.length && this.doc.cm) {
                var t = this.doc.cm.curOp;
                if (!t.maybeHiddenMarkers || Yi(t.maybeHiddenMarkers, this) == -1)(t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
            }
            this.lines.push(e)
        };
        pr.prototype.detachLine = function(e) {
            this.lines.splice(Yi(this.lines, e), 1);
            if (!this.lines.length && this.doc.cm) {
                var t = this.doc.cm.curOp;
                (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
            }
        };
        S.SharedTextMarker = vr;
        zi(vr);
        vr.prototype.clear = function() {
            if (this.explicitlyCleared) return;
            this.explicitlyCleared = true;
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
            Ii(this, "clear")
        };
        vr.prototype.find = function() {
            return this.primary.find()
        };
        var Dr = S.LineWidget = function(e, t, n) {
            if (n)
                for (var r in n)
                    if (n.hasOwnProperty(r)) this[r] = n[r];
            this.cm = e;
            this.node = t
        };
        zi(Dr);
        Dr.prototype.clear = Pr(function() {
            var e = this.line.widgets,
                t = hi(this.line);
            if (t == null || !e) return;
            for (var n = 0; n < e.length; ++n)
                if (e[n] == this) e.splice(n--, 1);
            if (!e.length) this.line.widgets = null;
            var r = di(this.cm, this.line) < this.cm.doc.scrollTop;
            ci(this.line, Math.max(0, this.line.height - Hr(this)));
            if (r) Un(this.cm, 0, -this.height);
            _t(this.cm, t, t + 1)
        });
        Dr.prototype.changed = Pr(function() {
            var e = this.height;
            this.height = null;
            var t = Hr(this) - e;
            if (!t) return;
            ci(this.line, this.line.height + t);
            var n = hi(this.line);
            _t(this.cm, n, n + 1)
        });
        var jr = S.Line = function(e, t, n) {
            this.text = e;
            _r(this, t);
            this.height = n ? n(this) : 1
        };
        zi(jr);
        var Wr = {};
        var $r = /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\uFEFF]/g;
        ei.prototype = {
            chunkSize: function() {
                return this.lines.length
            },
            removeInner: function(e, t) {
                for (var n = e, r = e + t; n < r; ++n) {
                    var i = this.lines[n];
                    this.height -= i.height;
                    Ir(i);
                    Ii(i, "delete")
                }
                this.lines.splice(e, t)
            },
            collapse: function(e) {
                e.splice.apply(e, [e.length, 0].concat(this.lines))
            },
            insertInner: function(e, t, n) {
                this.height += n;
                this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
                for (var r = 0, i = t.length; r < i; ++r) t[r].parent = this
            },
            iterN: function(e, t, n) {
                for (var r = e + t; e < r; ++e)
                    if (n(this.lines[e])) return true
            }
        };
        ti.prototype = {
            chunkSize: function() {
                return this.size
            },
            removeInner: function(e, t) {
                this.size -= t;
                for (var n = 0; n < this.children.length; ++n) {
                    var r = this.children[n],
                        i = r.chunkSize();
                    if (e < i) {
                        var s = Math.min(t, i - e),
                            o = r.height;
                        r.removeInner(e, s);
                        this.height -= o - r.height;
                        if (i == s) {
                            this.children.splice(n--, 1);
                            r.parent = null
                        }
                        if ((t -= s) == 0) break;
                        e = 0
                    } else e -= i
                }
                if (this.size - t < 25) {
                    var u = [];
                    this.collapse(u);
                    this.children = [new ei(u)];
                    this.children[0].parent = this
                }
            },
            collapse: function(e) {
                for (var t = 0, n = this.children.length; t < n; ++t) this.children[t].collapse(e)
            },
            insertInner: function(e, t, n) {
                this.size += t.length;
                this.height += n;
                for (var r = 0, i = this.children.length; r < i; ++r) {
                    var s = this.children[r],
                        o = s.chunkSize();
                    if (e <= o) {
                        s.insertInner(e, t, n);
                        if (s.lines && s.lines.length > 50) {
                            while (s.lines.length > 50) {
                                var u = s.lines.splice(s.lines.length - 25, 25);
                                var a = new ei(u);
                                s.height -= a.height;
                                this.children.splice(r + 1, 0, a);
                                a.parent = this
                            }
                            this.maybeSpill()
                        }
                        break
                    }
                    e -= o
                }
            },
            maybeSpill: function() {
                if (this.children.length <= 10) return;
                var e = this;
                do {
                    var t = e.children.splice(e.children.length - 5, 5);
                    var n = new ti(t);
                    if (!e.parent) {
                        var r = new ti(e.children);
                        r.parent = e;
                        e.children = [r, n];
                        e = r
                    } else {
                        e.size -= n.size;
                        e.height -= n.height;
                        var i = Yi(e.parent.children, e);
                        e.parent.children.splice(i + 1, 0, n)
                    }
                    n.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            },
            iterN: function(e, t, n) {
                for (var r = 0, i = this.children.length; r < i; ++r) {
                    var s = this.children[r],
                        o = s.chunkSize();
                    if (e < o) {
                        var u = Math.min(t, o - e);
                        if (s.iterN(e, u, n)) return true;
                        if ((t -= u) == 0) break;
                        e = 0
                    } else e -= o
                }
            }
        };
        var ni = 0;
        var ri = S.Doc = function(e, t, n) {
            if (!(this instanceof ri)) return new ri(e, t, n);
            if (n == null) n = 0;
            ti.call(this, [new ei([new jr("", null)])]);
            this.first = n;
            this.scrollTop = this.scrollLeft = 0;
            this.cantEdit = false;
            this.history = mi();
            this.cleanGeneration = 1;
            this.frontier = n;
            var r = Tn(n, 0);
            this.sel = {
                from: r,
                to: r,
                head: r,
                anchor: r,
                shift: false,
                extend: false,
                goalColumn: null
            };
            this.id = ++ni;
            this.modeOption = t;
            if (typeof e == "string") e = ys(e);
            Zr(this, {
                from: r,
                to: r,
                text: e
            }, null, {
                head: r,
                anchor: r
            })
        };
        ri.prototype = Zi(ti.prototype, {
            constructor: ri,
            iter: function(e, t, n) {
                if (n) this.iterN(e - this.first, t - e, n);
                else this.iterN(this.first, this.first + this.size, e)
            },
            insert: function(e, t) {
                var n = 0;
                for (var r = 0, i = t.length; r < i; ++r) n += t[r].height;
                this.insertInner(e - this.first, t, n)
            },
            remove: function(e, t) {
                this.removeInner(e - this.first, t)
            },
            getValue: function(e) {
                var t = li(this, this.first, this.first + this.size);
                if (e === false) return t;
                return t.join(e || "\n")
            },
            setValue: function(e) {
                var t = Tn(this.first, 0),
                    n = this.first + this.size - 1;
                gn(this, {
                    from: t,
                    to: Tn(n, ai(this, n).text.length),
                    text: ys(e),
                    origin: "setValue"
                }, {
                    head: t,
                    anchor: t
                }, true)
            },
            replaceRange: function(e, t, n, r) {
                t = An(this, t);
                n = n ? An(this, n) : t;
                xn(this, e, t, n, r)
            },
            getRange: function(e, t, n) {
                var r = fi(this, An(this, e), An(this, t));
                if (n === false) return r;
                return r.join(n || "\n")
            },
            getLine: function(e) {
                var t = this.getLineHandle(e);
                return t && t.text
            },
            setLine: function(e, t) {
                if (Mn(this, e)) xn(this, t, Tn(e, 0), An(this, Tn(e)))
            },
            removeLine: function(e) {
                if (e) xn(this, "", An(this, Tn(e - 1)), An(this, Tn(e)));
                else xn(this, "", Tn(0, 0), An(this, Tn(1, 0)))
            },
            getLineHandle: function(e) {
                if (Mn(this, e)) return ai(this, e)
            },
            getLineNumber: function(e) {
                return hi(e)
            },
            getLineHandleVisualStart: function(e) {
                if (typeof e == "number") e = ai(this, e);
                return Lr(this, e)
            },
            lineCount: function() {
                return this.size
            },
            firstLine: function() {
                return this.first
            },
            lastLine: function() {
                return this.first + this.size - 1
            },
            clipPos: function(e) {
                return An(this, e)
            },
            getCursor: function(e) {
                var t = this.sel,
                    n;
                if (e == null || e == "head") n = t.head;
                else if (e == "anchor") n = t.anchor;
                else if (e == "end" || e === false) n = t.to;
                else n = t.from;
                return kn(n)
            },
            somethingSelected: function() {
                return !Nn(this.sel.head, this.sel.anchor)
            },
            setCursor: Ot(function(e, t, n) {
                var r = An(this, typeof e == "number" ? Tn(e, t || 0) : e);
                if (n) _n(this, r);
                else Pn(this, r, r)
            }),
            setSelection: Ot(function(e, t) {
                Pn(this, An(this, e), An(this, t || e))
            }),
            extendSelection: Ot(function(e, t) {
                _n(this, An(this, e), t && An(this, t))
            }),
            getSelection: function(e) {
                return this.getRange(this.sel.from, this.sel.to, e)
            },
            replaceSelection: function(e, t, n) {
                gn(this, {
                    from: this.sel.from,
                    to: this.sel.to,
                    text: ys(e),
                    origin: n
                }, t || "around")
            },
            undo: Ot(function() {
                bn(this, "undo")
            }),
            redo: Ot(function() {
                bn(this, "redo")
            }),
            setExtending: function(e) {
                this.sel.extend = e
            },
            historySize: function() {
                var e = this.history;
                return {
                    undo: e.done.length,
                    redo: e.undone.length
                }
            },
            clearHistory: function() {
                this.history = mi(this.history.maxGeneration)
            },
            markClean: function() {
                this.cleanGeneration = this.changeGeneration()
            },
            changeGeneration: function() {
                this.history.lastOp = this.history.lastOrigin = null;
                return this.history.generation
            },
            isClean: function(e) {
                return this.history.generation == (e || this.cleanGeneration)
            },
            getHistory: function() {
                return {
                    done: Si(this.history.done),
                    undone: Si(this.history.undone)
                }
            },
            setHistory: function(e) {
                var t = this.history = mi(this.history.maxGeneration);
                t.done = e.done.slice(0);
                t.undone = e.undone.slice(0)
            },
            markText: function(e, t, n) {
                return dr(this, An(this, e), An(this, t), n, "range")
            },
            setBookmark: function(e, t) {
                var n = {
                    replacedWith: t && (t.nodeType == null ? t.widget : t),
                    insertLeft: t && t.insertLeft
                };
                e = An(this, e);
                return dr(this, e, e, n, "bookmark")
            },
            findMarksAt: function(e) {
                e = An(this, e);
                var t = [],
                    n = ai(this, e.line).markedSpans;
                if (n)
                    for (var r = 0; r < n.length; ++r) {
                        var i = n[r];
                        if ((i.from == null || i.from <= e.ch) && (i.to == null || i.to >= e.ch)) t.push(i.marker.parent || i.marker)
                    }
                return t
            },
            getAllMarks: function() {
                var e = [];
                this.iter(function(t) {
                    var n = t.markedSpans;
                    if (n)
                        for (var r = 0; r < n.length; ++r)
                            if (n[r].from != null) e.push(n[r].marker)
                });
                return e
            },
            posFromIndex: function(e) {
                var t, n = this.first;
                this.iter(function(r) {
                    var i = r.text.length + 1;
                    if (i > e) {
                        t = e;
                        return true
                    }
                    e -= i;
                    ++n
                });
                return An(this, Tn(n, t))
            },
            indexFromPos: function(e) {
                e = An(this, e);
                var t = e.ch;
                if (e.line < this.first || e.ch < 0) return 0;
                this.iter(this.first, e.line, function(e) {
                    t += e.text.length + 1
                });
                return t
            },
            copy: function(e) {
                var t = new ri(li(this, this.first, this.first + this.size), this.modeOption, this.first);
                t.scrollTop = this.scrollTop;
                t.scrollLeft = this.scrollLeft;
                t.sel = {
                    from: this.sel.from,
                    to: this.sel.to,
                    head: this.sel.head,
                    anchor: this.sel.anchor,
                    shift: this.sel.shift,
                    extend: false,
                    goalColumn: this.sel.goalColumn
                };
                if (e) {
                    t.history.undoDepth = this.history.undoDepth;
                    t.setHistory(this.getHistory())
                }
                return t
            },
            linkedDoc: function(e) {
                if (!e) e = {};
                var t = this.first,
                    n = this.first + this.size;
                if (e.from != null && e.from > t) t = e.from;
                if (e.to != null && e.to < n) n = e.to;
                var r = new ri(li(this, t, n), e.mode || this.modeOption, t);
                if (e.sharedHist) r.history = this.history;
                (this.linked || (this.linked = [])).push({
                    doc: r,
                    sharedHist: e.sharedHist
                });
                r.linked = [{
                    doc: this,
                    isParent: true,
                    sharedHist: e.sharedHist
                }];
                return r
            },
            unlinkDoc: function(e) {
                if (e instanceof S) e = e.doc;
                if (this.linked)
                    for (var t = 0; t < this.linked.length; ++t) {
                        var n = this.linked[t];
                        if (n.doc != e) continue;
                        this.linked.splice(t, 1);
                        e.unlinkDoc(this);
                        break
                    }
                if (e.history == this.history) {
                    var r = [e.id];
                    oi(e, function(e) {
                        r.push(e.id)
                    }, true);
                    e.history = mi();
                    e.history.done = Si(this.history.done, r);
                    e.history.undone = Si(this.history.undone, r)
                }
            },
            iterLinkedDocs: function(e) {
                oi(this, e)
            },
            getMode: function() {
                return this.mode
            },
            getEditor: function() {
                return this.cm
            }
        });
        ri.prototype.eachLine = ri.prototype.iter;
        var ii = "iter insert remove copy getEditor".split(" ");
        for (var si in ri.prototype)
            if (ri.prototype.hasOwnProperty(si) && Yi(ii, si) < 0) S.prototype[si] = function(e) {
                return function() {
                    return e.apply(this.doc, arguments)
                }
            }(ri.prototype[si]);
        zi(ri);
        S.e_stop = Mi;
        S.e_preventDefault = Li;
        S.e_stopPropagation = Ai;
        var ji, Fi = 0;
        S.on = Pi;
        S.off = Hi;
        S.signal = Bi;
        var Wi = 30;
        var Xi = S.Pass = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        };
        Vi.prototype = {
            set: function(e, t) {
                clearTimeout(this.id);
                this.id = setTimeout(t, e)
            }
        };
        S.countColumn = $i;
        var Ji = [""];
        var rs = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
        var os = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;
        S.replaceGetRect = function(e) {
            cs = e
        };
        var hs = function() {
            if (r) return false;
            var e = us("div");
            return "draggable" in e || "dragDrop" in e
        }();
        if (e) ps = function(e, t) {
            return e.charCodeAt(t - 1) == 36 && e.charCodeAt(t) == 39
        };
        else if (a && !/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent)) ps = function(e, t) {
            return /\-[^ \-?]|\?[^ !\'\"\),.\-\/:;\?\]\}]/.test(e.slice(t - 1, t + 1))
        };
        else if (i && !/Chrome\/(?:29|[3-9]\d|\d\d\d)\./.test(navigator.userAgent)) ps = function(e, t) {
            if (t > 1 && e.charCodeAt(t - 1) == 45) {
                if (/\w/.test(e.charAt(t - 2)) && /[^\-?\.]/.test(e.charAt(t))) return true;
                if (t > 2 && /[\d\.,]/.test(e.charAt(t - 2)) && /[\d\.,]/.test(e.charAt(t))) return false
            }
            return /[~!#%&*)=+}\]|\"\.>,:;][({[<]|-[^\-?\.\u2010-\u201f\u2026]|\?[\w~`@#$%\^&*(_=+{[|><]|…[\w~`@#$%\^&*(_=+{[><]/.test(e.slice(t - 1, t + 1))
        };
        var ds;
        var ms;
        var ys = "\n\nb".split(/\n/).length != 3 ? function(e) {
            var t = 0,
                n = [],
                r = e.length;
            while (t <= r) {
                var i = e.indexOf("\n", t);
                if (i == -1) i = e.length;
                var s = e.slice(t, e.charAt(i - 1) == "\r" ? i - 1 : i);
                var o = s.indexOf("\r");
                if (o != -1) {
                    n.push(s.slice(0, o));
                    t += o + 1
                } else {
                    n.push(s);
                    t = i + 1
                }
            }
            return n
        } : function(e) {
            return e.split(/\r\n?|\n/)
        };
        S.splitLines = ys;
        var bs = window.getSelection ? function(e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (t) {
                return false
            }
        } : function(e) {
            try {
                var t = e.ownerDocument.selection.createRange()
            } catch (n) {}
            if (!t || t.parentElement() != e) return false;
            return t.compareEndPoints("StartToEnd", t) != 0
        };
        var ws = function() {
            var e = us("div");
            if ("oncopy" in e) return true;
            e.setAttribute("oncopy", "return;");
            return typeof e.oncopy == "function"
        }();
        var Es = {
            3: "Enter",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            109: "-",
            107: "=",
            127: "Delete",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63276: "PageUp",
            63277: "PageDown",
            63275: "End",
            63273: "Home",
            63234: "Left",
            63232: "Up",
            63235: "Right",
            63233: "Down",
            63302: "Insert",
            63272: "Delete"
        };
        S.keyNames = Es;
        (function() {
            for (var e = 0; e < 10; e++) Es[e + 48] = String(e);
            for (var e = 65; e <= 90; e++) Es[e] = String.fromCharCode(e);
            for (var e = 1; e <= 12; e++) Es[e + 111] = Es[e + 63235] = "F" + e
        })();
        var Os;
        var Hs = function() {
            function n(n) {
                if (n <= 255) return e.charAt(n);
                else if (1424 <= n && n <= 1524) return "R";
                else if (1536 <= n && n <= 1791) return t.charAt(n - 1536);
                else if (1792 <= n && n <= 2220) return "r";
                else return "L"
            }
            var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL";
            var t = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr";
            var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
            var i = /[stwN]/,
                s = /[LRr]/,
                o = /[Lb1n]/,
                u = /[1n]/;
            var a = "L";
            return function(e) {
                if (!r.test(e)) return false;
                var t = e.length,
                    f = [];
                for (var l = 0, c; l < t; ++l) f.push(c = n(e.charCodeAt(l)));
                for (var l = 0, h = a; l < t; ++l) {
                    var c = f[l];
                    if (c == "m") f[l] = h;
                    else h = c
                }
                for (var l = 0, p = a; l < t; ++l) {
                    var c = f[l];
                    if (c == "1" && p == "r") f[l] = "n";
                    else if (s.test(c)) {
                        p = c;
                        if (c == "r") f[l] = "R"
                    }
                }
                for (var l = 1, h = f[0]; l < t - 1; ++l) {
                    var c = f[l];
                    if (c == "+" && h == "1" && f[l + 1] == "1") f[l] = "1";
                    else if (c == "," && h == f[l + 1] && (h == "1" || h == "n")) f[l] = h;
                    h = c
                }
                for (var l = 0; l < t; ++l) {
                    var c = f[l];
                    if (c == ",") f[l] = "N";
                    else if (c == "%") {
                        for (var d = l + 1; d < t && f[d] == "%"; ++d) {}
                        var v = l && f[l - 1] == "!" || d < t - 1 && f[d] == "1" ? "1" : "N";
                        for (var m = l; m < d; ++m) f[m] = v;
                        l = d - 1
                    }
                }
                for (var l = 0, p = a; l < t; ++l) {
                    var c = f[l];
                    if (p == "L" && c == "1") f[l] = "L";
                    else if (s.test(c)) p = c
                }
                for (var l = 0; l < t; ++l) {
                    if (i.test(f[l])) {
                        for (var d = l + 1; d < t && i.test(f[d]); ++d) {}
                        var g = (l ? f[l - 1] : a) == "L";
                        var y = (d < t - 1 ? f[d] : a) == "L";
                        var v = g || y ? "L" : "R";
                        for (var m = l; m < d; ++m) f[m] = v;
                        l = d - 1
                    }
                }
                var b = [],
                    w;
                for (var l = 0; l < t;) {
                    if (o.test(f[l])) {
                        var E = l;
                        for (++l; l < t && o.test(f[l]); ++l) {}
                        b.push({
                            from: E,
                            to: l,
                            level: 0
                        })
                    } else {
                        var S = l,
                            x = b.length;
                        for (++l; l < t && f[l] != "L"; ++l) {}
                        for (var m = S; m < l;) {
                            if (u.test(f[m])) {
                                if (S < m) b.splice(x, 0, {
                                    from: S,
                                    to: m,
                                    level: 1
                                });
                                var T = m;
                                for (++m; m < l && u.test(f[m]); ++m) {}
                                b.splice(x, 0, {
                                    from: T,
                                    to: m,
                                    level: 2
                                });
                                S = m
                            } else ++m
                        }
                        if (S < l) b.splice(x, 0, {
                            from: S,
                            to: l,
                            level: 1
                        })
                    }
                }
                if (b[0].level == 1 && (w = e.match(/^\s+/))) {
                    b[0].from = w[0].length;
                    b.unshift({
                        from: 0,
                        to: w[0].length,
                        level: 0
                    })
                }
                if (Qi(b).level == 1 && (w = e.match(/\s+$/))) {
                    Qi(b).to -= w[0].length;
                    b.push({
                        from: t - w[0].length,
                        to: t,
                        level: 0
                    })
                }
                if (b[0].level != Qi(b).level) b.push({
                    from: t,
                    to: t,
                    level: b[0].level
                });
                return b
            }
        }();
        S.version = "3.15.0";
        return S
    }();
    (function() {
        "use strict";
        var e = /^(\s*)([*+-]|(\d+)\.)(\s*)/,
            n = "*+-";
        t.commands.newlineAndIndentContinueMarkdownList = function(t) {
            var r = t.getCursor(),
                i = t.getStateAfter(r.line).list,
                s;
            if (!i || !(s = t.getLine(r.line).match(e))) {
                t.execCommand("newlineAndIndent");
                return
            }
            var o = s[1],
                u = s[4];
            var a = n.indexOf(s[2]) >= 0 ? s[2] : parseInt(s[3], 10) + 1 + ".";
            t.replaceSelection("\n" + o + a + u, "end")
        }
    })();
    t.defineMode("xml", function(e, t) {
        function f(e, t) {
            function n(n) {
                t.tokenize = n;
                return n(e, t)
            }
            var r = e.next();
            if (r == "<") {
                if (e.eat("!")) {
                    if (e.eat("[")) {
                        if (e.match("CDATA[")) return n(h("atom", "]]>"));
                        else return null
                    } else if (e.match("--")) {
                        return n(h("comment", "-->"))
                    } else if (e.match("DOCTYPE", true, true)) {
                        e.eatWhile(/[\w\._\-]/);
                        return n(p(1))
                    } else {
                        return null
                    }
                } else if (e.eat("?")) {
                    e.eatWhile(/[\w\._\-]/);
                    t.tokenize = h("meta", "?>");
                    return "meta"
                } else {
                    var i = e.eat("/");
                    u = "";
                    var s;
                    while (s = e.eat(/[^\s\u00a0=<>\"\'\/?]/)) u += s;
                    if (!u) return "error";
                    a = i ? "closeTag" : "openTag";
                    t.tokenize = l;
                    return "tag"
                }
            } else if (r == "&") {
                var o;
                if (e.eat("#")) {
                    if (e.eat("x")) {
                        o = e.eatWhile(/[a-fA-F\d]/) && e.eat(";")
                    } else {
                        o = e.eatWhile(/[\d]/) && e.eat(";")
                    }
                } else {
                    o = e.eatWhile(/[\w\.\-:]/) && e.eat(";")
                }
                return o ? "atom" : "error"
            } else {
                e.eatWhile(/[^&<]/);
                return null
            }
        }

        function l(e, t) {
            var n = e.next();
            if (n == ">" || n == "/" && e.eat(">")) {
                t.tokenize = f;
                a = n == ">" ? "endTag" : "selfcloseTag";
                return "tag"
            } else if (n == "=") {
                a = "equals";
                return null
            } else if (n == "<") {
                return "error"
            } else if (/[\'\"]/.test(n)) {
                t.tokenize = c(n);
                t.stringStartCol = e.column();
                return t.tokenize(e, t)
            } else {
                e.eatWhile(/[^\s\u00a0=<>\"\']/);
                return "word"
            }
        }

        function c(e) {
            var t = function(t, n) {
                while (!t.eol()) {
                    if (t.next() == e) {
                        n.tokenize = l;
                        break
                    }
                }
                return "string"
            };
            t.isInAttribute = true;
            return t
        }

        function h(e, t) {
            return function(n, r) {
                while (!n.eol()) {
                    if (n.match(t)) {
                        r.tokenize = f;
                        break
                    }
                    n.next()
                }
                return e
            }
        }

        function p(e) {
            return function(t, n) {
                var r;
                while ((r = t.next()) != null) {
                    if (r == "<") {
                        n.tokenize = p(e + 1);
                        return n.tokenize(t, n)
                    } else if (r == ">") {
                        if (e == 1) {
                            n.tokenize = f;
                            break
                        } else {
                            n.tokenize = p(e - 1);
                            return n.tokenize(t, n)
                        }
                    }
                }
                return "meta"
            }
        }

        function g() {
            for (var e = arguments.length - 1; e >= 0; e--) d.cc.push(arguments[e])
        }

        function y() {
            g.apply(null, arguments);
            return true
        }

        function b(e, t) {
            var n = s.doNotIndent.hasOwnProperty(e) || d.context && d.context.noIndent;
            d.context = {
                prev: d.context,
                tagName: e,
                indent: d.indented,
                startOfLine: t,
                noIndent: n
            }
        }

        function w() {
            if (d.context) d.context = d.context.prev
        }

        function E(e) {
            if (e == "openTag") {
                d.tagName = u;
                d.tagStart = v.column();
                return y(N, S(d.startOfLine))
            } else if (e == "closeTag") {
                var t = false;
                if (d.context) {
                    if (d.context.tagName != u) {
                        if (s.implicitlyClosed.hasOwnProperty(d.context.tagName.toLowerCase())) {
                            w()
                        }
                        t = !d.context || d.context.tagName != u
                    }
                } else {
                    t = true
                } if (t) m = "error";
                return y(x(t))
            }
            return y()
        }

        function S(e) {
            return function(t) {
                var n = d.tagName;
                d.tagName = d.tagStart = null;
                if (t == "selfcloseTag" || t == "endTag" && s.autoSelfClosers.hasOwnProperty(n.toLowerCase())) {
                    T(n.toLowerCase());
                    return y()
                }
                if (t == "endTag") {
                    T(n.toLowerCase());
                    b(n, e);
                    return y()
                }
                return y()
            }
        }

        function x(e) {
            return function(t) {
                if (e) m = "error";
                if (t == "endTag") {
                    w();
                    return y()
                }
                m = "error";
                return y(arguments.callee)
            }
        }

        function T(e) {
            var t;
            while (true) {
                if (!d.context) {
                    return
                }
                t = d.context.tagName.toLowerCase();
                if (!s.contextGrabbers.hasOwnProperty(t) || !s.contextGrabbers[t].hasOwnProperty(e)) {
                    return
                }
                w()
            }
        }

        function N(e) {
            if (e == "word") {
                m = "attribute";
                return y(C, N)
            }
            if (e == "endTag" || e == "selfcloseTag") return g();
            m = "error";
            return y(N)
        }

        function C(e) {
            if (e == "equals") return y(k, N);
            if (!s.allowMissing) m = "error";
            else if (e == "word") m = "attribute";
            return e == "endTag" || e == "selfcloseTag" ? g() : y()
        }

        function k(e) {
            if (e == "string") return y(L);
            if (e == "word" && s.allowUnquoted) {
                m = "string";
                return y()
            }
            m = "error";
            return e == "endTag" || e == "selfCloseTag" ? g() : y()
        }

        function L(e) {
            if (e == "string") return y(L);
            else return g()
        }
        var n = e.indentUnit;
        var r = t.multilineTagIndentFactor || 1;
        var i = t.multilineTagIndentPastTag || true;
        var s = t.htmlMode ? {
            autoSelfClosers: {
                area: true,
                base: true,
                br: true,
                col: true,
                command: true,
                embed: true,
                frame: true,
                hr: true,
                img: true,
                input: true,
                keygen: true,
                link: true,
                meta: true,
                param: true,
                source: true,
                track: true,
                wbr: true
            },
            implicitlyClosed: {
                dd: true,
                li: true,
                optgroup: true,
                option: true,
                p: true,
                rp: true,
                rt: true,
                tbody: true,
                td: true,
                tfoot: true,
                th: true,
                tr: true
            },
            contextGrabbers: {
                dd: {
                    dd: true,
                    dt: true
                },
                dt: {
                    dd: true,
                    dt: true
                },
                li: {
                    li: true
                },
                option: {
                    option: true,
                    optgroup: true
                },
                optgroup: {
                    optgroup: true
                },
                p: {
                    address: true,
                    article: true,
                    aside: true,
                    blockquote: true,
                    dir: true,
                    div: true,
                    dl: true,
                    fieldset: true,
                    footer: true,
                    form: true,
                    h1: true,
                    h2: true,
                    h3: true,
                    h4: true,
                    h5: true,
                    h6: true,
                    header: true,
                    hgroup: true,
                    hr: true,
                    menu: true,
                    nav: true,
                    ol: true,
                    p: true,
                    pre: true,
                    section: true,
                    table: true,
                    ul: true
                },
                rp: {
                    rp: true,
                    rt: true
                },
                rt: {
                    rp: true,
                    rt: true
                },
                tbody: {
                    tbody: true,
                    tfoot: true
                },
                td: {
                    td: true,
                    th: true
                },
                tfoot: {
                    tbody: true
                },
                th: {
                    td: true,
                    th: true
                },
                thead: {
                    tbody: true,
                    tfoot: true
                },
                tr: {
                    tr: true
                }
            },
            doNotIndent: {
                pre: true
            },
            allowUnquoted: true,
            allowMissing: true
        } : {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: false,
            allowMissing: false
        };
        var o = t.alignCDATA;
        var u, a;
        var d, v, m;
        return {
            startState: function() {
                return {
                    tokenize: f,
                    cc: [],
                    indented: 0,
                    startOfLine: true,
                    tagName: null,
                    tagStart: null,
                    context: null
                }
            },
            token: function(e, t) {
                if (!t.tagName && e.sol()) {
                    t.startOfLine = true;
                    t.indented = e.indentation()
                }
                if (e.eatSpace()) return null;
                m = a = u = null;
                var n = t.tokenize(e, t);
                t.type = a;
                if ((n || a) && n != "comment") {
                    d = t;
                    v = e;
                    while (true) {
                        var r = t.cc.pop() || E;
                        if (r(a || n)) break
                    }
                }
                t.startOfLine = false;
                return m || n
            },
            indent: function(e, t, s) {
                var u = e.context;
                if (e.tokenize.isInAttribute) {
                    return e.stringStartCol + 1
                }
                if (e.tokenize != l && e.tokenize != f || u && u.noIndent) return s ? s.match(/^(\s*)/)[0].length : 0;
                if (e.tagName) {
                    if (i) return e.tagStart + e.tagName.length + 2;
                    else return e.tagStart + n * r
                }
                if (o && /<!\[CDATA\[/.test(t)) return 0;
                if (u && /^<\//.test(t)) u = u.prev;
                while (u && !u.startOfLine) u = u.prev;
                if (u) return u.indent + n;
                else return 0
            },
            electricChars: "/",
            blockCommentStart: "<!--",
            blockCommentEnd: "-->",
            configuration: t.htmlMode ? "html" : "xml",
            helperType: t.htmlMode ? "html" : "xml"
        }
    });
    t.defineMIME("text/xml", "xml");
    t.defineMIME("application/xml", "xml");
    if (!t.mimeModes.hasOwnProperty("text/html")) t.defineMIME("text/html", {
        name: "xml",
        htmlMode: true
    });
    t.defineMode("markdown", function(e, n) {
        function A(e, t, n) {
            t.f = t.inline = n;
            return n(e, t)
        }

        function O(e, t, n) {
            t.f = t.block = n;
            return n(e, t)
        }

        function M(e) {
            e.linkTitle = false;
            e.em = false;
            e.strong = false;
            e.quote = 0;
            if (!r && e.f == D) {
                e.f = j;
                e.block = _
            }
            e.trailingSpace = 0;
            e.trailingSpaceNewLine = false;
            e.thisLineHasContent = false;
            return null
        }

        function _(e, t) {
            var r = t.list !== false;
            if (t.list !== false && t.indentationDiff >= 0) {
                if (t.indentationDiff < 4) {
                    t.indentation -= t.indentationDiff
                }
                t.list = null
            } else if (t.list !== false && t.indentation > 0) {
                t.list = null;
                t.listDepth = Math.floor(t.indentation / 4)
            } else if (t.list !== false) {
                t.list = false;
                t.listDepth = 0
            }
            if (t.indentationDiff >= 4) {
                t.indentation -= 4;
                e.skipToEnd();
                return f
            } else if (e.eatSpace()) {
                return null
            } else if (e.peek() === "#" || t.prevLineHasContent && e.match(k)) {
                t.header = true
            } else if (e.eat(">")) {
                t.indentation++;
                t.quote = 1;
                e.eatSpace();
                while (e.eat(">")) {
                    e.eatSpace();
                    t.quote++
                }
            } else if (e.peek() === "[") {
                return A(e, t, I)
            } else if (e.match(x, true)) {
                return v
            } else if ((!t.prevLineHasContent || r) && (e.match(T, true) || e.match(N, true))) {
                t.indentation += 4;
                t.list = true;
                t.listDepth++;
                if (n.taskLists && e.match(C, false)) {
                    t.taskList = true
                }
            } else if (n.fencedCodeBlocks && e.match(/^```([\w+#]*)/, true)) {
                t.localMode = o(RegExp.$1);
                if (t.localMode) t.localState = t.localMode.startState();
                O(e, t, P);
                return f
            }
            return A(e, t, t.inline)
        }

        function D(e, t) {
            var n = i.token(e, t.htmlState);
            if (r && n === "tag" && t.htmlState.type !== "openTag" && !t.htmlState.context) {
                t.f = j;
                t.block = _
            }
            if (t.md_inside && e.current().indexOf(">") != -1) {
                t.f = j;
                t.block = _;
                t.htmlState.context = undefined
            }
            return n
        }

        function P(e, t) {
            if (e.sol() && e.match(/^```/, true)) {
                t.localMode = t.localState = null;
                t.f = j;
                t.block = _;
                return f
            } else if (t.localMode) {
                return t.localMode.token(e, t.localState)
            } else {
                e.skipToEnd();
                return f
            }
        }

        function H(e) {
            var t = [];
            if (e.taskOpen) {
                return "meta"
            }
            if (e.taskClosed) {
                return "property"
            }
            if (e.strong) {
                t.push(S)
            }
            if (e.em) {
                t.push(E)
            }
            if (e.linkText) {
                t.push(b)
            }
            if (e.code) {
                t.push(f)
            }
            if (e.header) {
                t.push(a)
            }
            if (e.quote) {
                t.push(e.quote % 2 ? l : c)
            }
            if (e.list !== false) {
                var n = (e.listDepth - 1) % 3;
                if (!n) {
                    t.push(h)
                } else if (n === 1) {
                    t.push(p)
                } else {
                    t.push(d)
                }
            }
            if (e.trailingSpaceNewLine) {
                t.push("trailing-space-new-line")
            } else if (e.trailingSpace) {
                t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b"))
            }
            return t.length ? t.join(" ") : null
        }

        function B(e, t) {
            if (e.match(L, true)) {
                return H(t)
            }
            return undefined
        }

        function j(e, t) {
            var r = t.text(e, t);
            if (typeof r !== "undefined") return r;
            if (t.list) {
                t.list = null;
                return H(t)
            }
            if (t.taskList) {
                var i = e.match(C, true)[1] !== "x";
                if (i) t.taskOpen = true;
                else t.taskClosed = true;
                t.taskList = false;
                return H(t)
            }
            t.taskOpen = false;
            t.taskClosed = false;
            var s = e.next();
            if (s === "\\") {
                e.next();
                return H(t)
            }
            if (t.linkTitle) {
                t.linkTitle = false;
                var o = s;
                if (s === "(") {
                    o = ")"
                }
                o = (o + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                var a = "^\\s*(?:[^" + o + "\\\\]+|\\\\\\\\|\\\\.)" + o;
                if (e.match(new RegExp(a), true)) {
                    return w
                }
            }
            if (s === "`") {
                var f = H(t);
                var l = e.pos;
                e.eatWhile("`");
                var c = 1 + e.pos - l;
                if (!t.code) {
                    u = c;
                    t.code = true;
                    return H(t)
                } else {
                    if (c === u) {
                        t.code = false;
                        return f
                    }
                    return H(t)
                }
            } else if (t.code) {
                return H(t)
            }
            if (s === "!" && e.match(/\[[^\]]*\] ?(?:\(|\[)/, false)) {
                e.match(/\[[^\]]*\]/);
                t.inline = t.f = F;
                return m
            }
            if (s === "[" && e.match(/.*\](\(| ?\[)/, false)) {
                t.linkText = true;
                return H(t)
            }
            if (s === "]" && t.linkText) {
                var h = H(t);
                t.linkText = false;
                t.inline = t.f = F;
                return h
            }
            if (s === "<" && e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, false)) {
                return A(e, t, z(g, ">"))
            }
            if (s === "<" && e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, false)) {
                return A(e, t, z(y, ">"))
            }
            if (s === "<" && e.match(/^\w/, false)) {
                if (e.string.indexOf(">") != -1) {
                    var p = e.string.substring(1, e.string.indexOf(">"));
                    if (/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(p)) {
                        t.md_inside = true
                    }
                }
                e.backUp(1);
                return O(e, t, D)
            }
            if (s === "<" && e.match(/^\/\w*?>/)) {
                t.md_inside = false;
                return "tag"
            }
            var d = false;
            if (!n.underscoresBreakWords) {
                if (s === "_" && e.peek() !== "_" && e.match(/(\w)/, false)) {
                    var v = e.pos - 2;
                    if (v >= 0) {
                        var b = e.string.charAt(v);
                        if (b !== "_" && b.match(/(\w)/, false)) {
                            d = true
                        }
                    }
                }
            }
            var f = H(t);
            if (s === "*" || s === "_" && !d) {
                if (t.strong === s && e.eat(s)) {
                    t.strong = false;
                    return f
                } else if (!t.strong && e.eat(s)) {
                    t.strong = s;
                    return H(t)
                } else if (t.em === s) {
                    t.em = false;
                    return f
                } else if (!t.em) {
                    t.em = s;
                    return H(t)
                }
            } else if (s === " ") {
                if (e.eat("*") || e.eat("_")) {
                    if (e.peek() === " ") {
                        return H(t)
                    } else {
                        e.backUp(1)
                    }
                }
            }
            if (s === " ") {
                if (e.match(/ +$/, false)) {
                    t.trailingSpace++
                } else if (t.trailingSpace) {
                    t.trailingSpaceNewLine = true
                }
            }
            return H(t)
        }

        function F(e, t) {
            if (e.eatSpace()) {
                return null
            }
            var n = e.next();
            if (n === "(" || n === "[") {
                return A(e, t, z(w, n === "(" ? ")" : "]"))
            }
            return "error"
        }

        function I(e, t) {
            if (e.match(/^[^\]]*\]:/, true)) {
                t.f = q;
                return b
            }
            return A(e, t, j)
        }

        function q(e, t) {
            if (e.eatSpace()) {
                return null
            }
            e.match(/^[^\s]+/, true);
            if (e.peek() === undefined) {
                t.linkTitle = true
            } else {
                e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, true)
            }
            t.f = t.inline = j;
            return w
        }

        function U(e) {
            if (!R[e]) {
                e = (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
                R[e] = new RegExp("^(?:[^\\\\]|\\\\.)*?(" + e + ")")
            }
            return R[e]
        }

        function z(e, t, n) {
            n = n || j;
            return function(r, i) {
                r.match(U(t));
                i.inline = i.f = n;
                return e
            }
        }
        var r = t.modes.hasOwnProperty("xml");
        var i = t.getMode(e, r ? {
            name: "xml",
            htmlMode: true
        } : "text/plain");
        var s = {
            html: "htmlmixed",
            js: "javascript",
            json: "application/json",
            c: "text/x-csrc",
            "c++": "text/x-c++src",
            java: "text/x-java",
            csharp: "text/x-csharp",
            "c#": "text/x-csharp",
            scala: "text/x-scala"
        };
        var o = function() {
            var n, r = {}, i = {}, o;
            var u = [];
            for (var a in t.modes)
                if (t.modes.propertyIsEnumerable(a)) u.push(a);
            for (n = 0; n < u.length; n++) {
                r[u[n]] = u[n]
            }
            var f = [];
            for (var a in t.mimeModes)
                if (t.mimeModes.propertyIsEnumerable(a)) f.push({
                    mime: a,
                    mode: t.mimeModes[a]
                });
            for (n = 0; n < f.length; n++) {
                o = f[n].mime;
                i[o] = f[n].mime
            }
            for (var l in s) {
                if (s[l] in r || s[l] in i) r[l] = s[l]
            }
            return function(n) {
                return r[n] ? t.getMode(e, r[n]) : null
            }
        }();
        if (n.underscoresBreakWords === undefined) n.underscoresBreakWords = true;
        if (n.fencedCodeBlocks === undefined) n.fencedCodeBlocks = false;
        if (n.taskLists === undefined) n.taskLists = false;
        var u = 0;
        var a = "header",
            f = "comment",
            l = "atom",
            c = "number",
            h = "variable-2",
            p = "variable-3",
            d = "keyword",
            v = "hr",
            m = "tag",
            g = "link",
            y = "link",
            b = "link",
            w = "string",
            E = "em",
            S = "strong";
        var x = /^([*\-=_])(?:\s*\1){2,}\s*$/,
            T = /^[*\-+]\s+/,
            N = /^[0-9]+\.\s+/,
            C = /^\[(x| )\](?=\s)/,
            k = /^(?:\={1,}|-{1,})$/,
            L = /^[^!\[\]*_\\<>` "'(]+/;
        var R = [];
        return {
            startState: function() {
                return {
                    f: _,
                    prevLineHasContent: false,
                    thisLineHasContent: false,
                    block: _,
                    htmlState: t.startState(i),
                    indentation: 0,
                    inline: j,
                    text: B,
                    linkText: false,
                    linkTitle: false,
                    em: false,
                    strong: false,
                    header: false,
                    taskList: false,
                    list: false,
                    listDepth: 0,
                    quote: 0,
                    trailingSpace: 0,
                    trailingSpaceNewLine: false
                }
            },
            copyState: function(e) {
                return {
                    f: e.f,
                    prevLineHasContent: e.prevLineHasContent,
                    thisLineHasContent: e.thisLineHasContent,
                    block: e.block,
                    htmlState: t.copyState(i, e.htmlState),
                    indentation: e.indentation,
                    localMode: e.localMode,
                    localState: e.localMode ? t.copyState(e.localMode, e.localState) : null,
                    inline: e.inline,
                    text: e.text,
                    linkTitle: e.linkTitle,
                    em: e.em,
                    strong: e.strong,
                    header: e.header,
                    taskList: e.taskList,
                    list: e.list,
                    listDepth: e.listDepth,
                    quote: e.quote,
                    trailingSpace: e.trailingSpace,
                    trailingSpaceNewLine: e.trailingSpaceNewLine,
                    md_inside: e.md_inside
                }
            },
            token: function(e, t) {
                if (e.sol()) {
                    if (e.match(/^\s*$/, true)) {
                        t.prevLineHasContent = false;
                        return M(t)
                    } else {
                        t.prevLineHasContent = t.thisLineHasContent;
                        t.thisLineHasContent = true
                    }
                    t.header = false;
                    t.taskList = false;
                    t.code = false;
                    t.trailingSpace = 0;
                    t.trailingSpaceNewLine = false;
                    t.f = t.block;
                    var n = e.match(/^\s*/, true)[0].replace(/\t/g, "    ").length;
                    var r = Math.floor((n - t.indentation) / 4) * 4;
                    if (r > 4) r = 4;
                    var i = t.indentation + r;
                    t.indentationDiff = i - t.indentation;
                    t.indentation = i;
                    if (n > 0) return null
                }
                return t.f(e, t)
            },
            blankLine: M,
            getType: H
        }
    }, "xml");
    t.defineMIME("text/x-markdown", "markdown");
    var n = /Mac/.test(navigator.platform);
    var r = {
        "Cmd-B": f,
        "Cmd-I": l,
        "Cmd-K": d,
        "Cmd-Alt-I": v,
        "Cmd-'": c,
        "Cmd-Alt-L": p,
        "Cmd-L": h
    };
    var S = [{
        name: "bold",
        action: f
    }, {
        name: "italic",
        action: l
    }, "|", {
        name: "quote",
        action: c
    }, {
        name: "unordered-list",
        action: h
    }, {
        name: "ordered-list",
        action: p
    }, "|", {
        name: "link",
        action: d
    }, {
        name: "image",
        action: v
    }, "|", {
        name: "info",
        action: "http://lab.lepture.com/editor/markdown"
    }, {
        name: "preview",
        action: y
    }, {
        name: "fullscreen",
        action: a
    }];
    x.toolbar = S;
    x.markdown = function(e) {
        if (window.marked) {
            return marked(e)
        }
    };
    x.prototype.render = function(e) {
        if (!e) {
            e = this.element // || document.getElementsByTagName("textarea")[0]
        }
        if (this._rendered && this._rendered === e) {
            return
        }
        this.element = e;
        var n = this.options;
        var s = this;
        var o = {};
        for (var u in r) {
            (function(e) {
                o[i(e)] = function(t) {
                    r[e](s)
                }
            })(u)
        }
        o["Enter"] = "newlineAndIndentContinueMarkdownList";
        this.codemirror = t.fromTextArea(e, {
            mode: "markdown",
            theme: "paper",
            indentWithTabs: true,
            lineNumbers: false,
            extraKeys: o
        });
        if (n.toolbar !== false) {
            this.createToolbar()
        }
        if (n.status !== false) {
            this.createStatusbar()
        }
        this._rendered = this.element
    };
    x.prototype.createToolbar = function(e) {
        e = e || this.options.toolbar;
        if (!e || e.length === 0) {
            return
        }
        var t = document.createElement("div");
        t.className = "editor-toolbar";
        var n = this;
        var r;
        n.toolbar = {};
        for (var i = 0; i < e.length; i++) {
            (function(e) {
                var r;
                if (e.name) {
                    r = s(e.name, e)
                } else if (e === "|") {
                    r = o()
                } else {
                    r = s(e)
                } if (e.action) {
                    if (typeof e.action === "function") {
                        r.onclick = function(t) {
                            e.action(n)
                        }
                    } else if (typeof e.action === "string") {
                        r.href = e.action;
                        r.target = "_blank"
                    }
                }
                n.toolbar[e.name || e] = r;
                t.appendChild(r)
            })(e[i])
        }
        var a = this.codemirror;
        a.on("cursorActivity", function() {
            var e = u(a);
            for (var t in n.toolbar) {
                (function(t) {
                    var r = n.toolbar[t];
                    if (e[t]) {
                        r.className += " active"
                    } else {
                        r.className = r.className.replace(/\s*active\s*/g, "")
                    }
                })(t)
            }
        });
        var f = a.getWrapperElement();
        f.parentNode.insertBefore(t, f);
        return t
    };
    x.prototype.createStatusbar = function(e) {
        e = e || this.options.status;
        if (!e || e.length === 0) return;
        var t = document.createElement("div");
        t.className = "editor-statusbar";
        var n, r = this.codemirror;
        for (var i = 0; i < e.length; i++) {
            (function(e) {
                var i = document.createElement("span");
                i.className = e;
                if (e === "words") {
                    i.innerHTML = "0";
                    r.on("update", function() {
                        i.innerHTML = E(r.getValue())
                    })
                } else if (e === "lines") {
                    i.innerHTML = "0";
                    r.on("update", function() {
                        i.innerHTML = r.lineCount()
                    })
                } else if (e === "cursor") {
                    i.innerHTML = "0:0";
                    r.on("cursorActivity", function() {
                        n = r.getCursor();
                        i.innerHTML = n.line + ":" + n.ch
                    })
                }
                t.appendChild(i)
            })(e[i])
        }
        var s = this.codemirror.getWrapperElement();
        s.parentNode.insertBefore(t, s.nextSibling);
        return t
    };
    x.toggleBold = f;
    x.toggleItalic = l;
    x.toggleBlockquote = c;
    x.toggleUnOrderedList = h;
    x.toggleOrderedList = p;
    x.drawLink = d;
    x.drawImage = v;
    x.undo = m;
    x.redo = g;
    x.togglePreview = y;
    x.toggleFullScreen = a;
    x.prototype.toggleBold = function() {
        f(this)
    };
    x.prototype.toggleItalic = function() {
        l(this)
    };
    x.prototype.toggleBlockquote = function() {
        c(this)
    };
    x.prototype.toggleUnOrderedList = function() {
        h(this)
    };
    x.prototype.toggleOrderedList = function() {
        p(this)
    };
    x.prototype.drawLink = function() {
        d(this)
    };
    x.prototype.drawImage = function() {
        v(this)
    };
    x.prototype.undo = function() {
        m(this)
    };
    x.prototype.redo = function() {
        g(this)
    };
    x.prototype.togglePreview = function() {
        y(this)
    };
    x.prototype.toggleFullScreen = function() {
        a(this)
    };
    e.Editor = x
})(this)