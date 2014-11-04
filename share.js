$(function(){
  var hiscore = 666;
  var plays = 0;
  var floor = Math.floor;
  function init () {
    // $("facebook").bind("click", Share.facebook);
    $("#twitter").bind("click", Share.twitter);
    $(window).bind("share", update);
  }
  var Share = {
    "url": "http://wheresthepixel.com/",
    "msg": "where's the pixel?",
    "openLink": function (url) {
      window.open(url, "_blank");
    },
    "facebook": function () {
      var url = "http://www.facebook.com/share.php?u=" + encodeURIComponent(Share.url) + "&t=" + encodeURIComponent(Share.msg);
      Share.openLink(url);
      return false;
    },
    "twitter": function () {
      var url = "http://twitter.com/home?status=" + encodeURIComponent(Share.msg + " " + Share.url);
      Share.openLink(url);
      return false;
    }
  }
  function update (e, tick) {
    if (tick < hiscore) hiscore = tick;
    Share.msg = "i found the pixel in ";
    var dec = tick % 10,
        sec = floor(tick/10) % 60,
        min = floor(tick/60) % 60;
    if (min > 1) {
      Share.msg += min + ":";
      Share.msg += sec > 0 ? sec : "0" + sec;
    } else {
      sec += min * 60;
      Share.msg += sec > 0 ? sec : "0";
      Share.msg += "." + dec;
    }
    Share.msg += "s!";
    plays += 1;
    if (plays > 1) {
      $("share").stop().show();
    }
  }
  init();
});

