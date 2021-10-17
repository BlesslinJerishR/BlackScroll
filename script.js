window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var space = "                         ";
var txt = "If debugging is the process of removing software bugs, then programming must be the process of putting them in." +
  " - Edsger Dijkstra " + space + "The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.  - Anonymous " +
  space +
  "Walking on water && developing software from a specification are easy if both are frozen.  - Edward V Berard" +
  space + " First, solve the problem. Then, write the code. - John Johnson" + space +
  "The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time. - Tom Cargil" + space +
  "Copy && paste is a design error." +
  " - David Parnas" + space +
  " Any code of your own that you haven't looked at for six or more months might as well have been written by someone else. " +
  " - Eagleson's law" + space +
  "It's hard enough to find an error in your code when you're looking for it; it's even harder when you've assumed your code is error-free. - Steve McConnell" + space;

var hCell = 160;
var vCell = 30;
var sPos = Math.random() * 10000;
var tick = false;
var pval = false;
var u = 0;
var ready = true;

var c = document.createElement("canvas");

function _div() {
  return document.getElementById("led");
}

function _class(e, cn) {
  if (e.setAttribute) {
    e.setAttribute("className", cn);
  }
  e.className = cn;
}

function _isOn(x, y) {
  x += Math.floor(sPos);

  if (y >= charH)
    return false;

  var cidx = x / charW;
  cidx = cidx % txt.length;

  var gidx = txt.charCodeAt(cidx) - _cOff;
  if (gidx < 0 || gidx >= _cdisp.length)
    return false;
  else {
    x = x % charW;
    var val = _cdisp[gidx][x * charH + y];

    if (val == 0)
      return true;
    else
      return false;
  }
}

function _ref(c) {
  if (!c)
    return;

  var $ = c.getContext("2d");
  if (!$)
    return;

  var colOn = 'hsla(' + u + ', 100%, 50%, 1)';
  var colOff = "hsla(0,0%,10%,1)";
  var w = c.width = window.innerWidth;
  var h = c.height = window.innerHeight / 4;
  var cw = w / hCell;
  var ch = h / vCell;

  for (var i = 0; i < hCell; i++) {
    for (var j = 0; j < vCell; j++) {
      var on = _isOn(i, j);
      var comp = false;
      if (pval) {
        if (on == pval[i][j])
          comp = true;
      }
      if (!comp) {
        var col = 0;
        if (on)
          col = colOn;
        else
          col = colOff;
        $.fillStyle = col;
        $.beginPath();

        $.rect(i * cw, j * ch, cw - 1, ch - 1);
        $.fill();
        $.closePath();
      }
    }
  }
}

function refTbl(tbody) {
  var trs = tbody.getElementsByTagName("tr");
  var nval = new Array();
  for (var i = 0; i < trs.length; i++) {
    var j = 0;
    nval.push(new Array());
    for (var tdN = trs[i].firstChild; tdN; tdN = tdN.nextSibling) {
      if (!tdN.tagName)
        continue;
      if (!tdN.tagName.toUpperCase() == "TD")
        continue;

      var on = _isOn(j, i);
      nval[i].push(on);
      var comp = false;
      if (pval) {
        if (on == pval[i][j])
          comp = true;
      }
      if (!comp) {
        if (_isOn(j, i))
          _class(tdN, "on");
        else
          _class(tdN, "off");
      }
      j++;
    }
  }
  pval = nval;
}

function dsptbel() {
  var tb = document.createElement("tbody");

  for (var j = 0; j < vCell; j++) {
    var tr = document.createElement("tr");
    for (var i = 0; i < hCell; i++) {
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(" "));
      tr.appendChild(td);
    }
    tb.appendChild(tr);
  }

  return tb;
}

function tblelm() {
  var c = document.createElement("canvas");

  return c;
}

function _dsptblelm() {
  var tble = document.createElement("table");
  var tb = dsptbel();

  refTbl(tb);

  tbl.appendChild(tb);
  return tbl;
}

function _anim() {
  u -= .5;
  if (!ready)
    return;
  var _curt = new Date().getTime();
  if (tick) {
    var dt = _curt - tick;
    sPos += dt * 0.02;
  }
  tick = _curt;
  upd();

  window.requestAnimFrame(_anim);
}

function upd() {
  var elem = _div();
  if (elem) {
    var tbs = elem.getElementsByTagName("tbody");
    if (tbs.length > 0) {
      refTbl(tbs[0]);
    } else {
      var celm = elem.getElementsByTagName("canvas");

      if (celm.length > 0) {
        _ref(celm[0]);
      } else {
        var c = tblelm()
        elem.appendChild(c);
        _ref(c);

      }
    }
  }
}
_anim();