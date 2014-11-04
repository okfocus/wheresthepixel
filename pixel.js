$(function(){
  var x, y;
  var win_zone = 10;
  var margin = 60;
  var cheating = 0, ww = $(window).width() + $(window).height();
  var floor = Math.floor, random = Math.random, abs = Math.abs, sqrt = Math.sqrt, max = Math.max, min = Math.min;
  var clamp = function (n, a, b) { return max(min(n,b),a) };
  function init () {
    $(window).bind("click", guess);
    $(window).bind("mousemove", look);
    $(window).bind("keydown", cheat);
    start();
  }
  function start () {
    x = margin + floor(random() * ($(window).width()  - 2 * margin));
    y = margin + floor(random() * ($(window).height() - 2 * margin));
    if (inside("header") || inside("scores") || inside("like")) {
      start();
    } else {
      $("pixel").css({"top": y, "left": x});
    }
    _gaq.push(['_trackEvent', 'game', 'start']);
  }
  function inside (el) {
    var $el = $(el);
    var offset = $el.offset();
    return (offset.left < x && x < offset.left + $el.width() &&
            offset.top  < y && y < offset.top  + $el.height());
  }
  function look (e) {
    if (score(e) < win_zone)
      $("body").css({"cursor": "pointer"});
    else
      $("body").css({"cursor": "default"});
    hint(e);
  }
  function guess (e) {
    // console.log("click", e.pageX - x, e.pageY - y, score(e))
    if (score(e) < win_zone) {
      win();
    } else {
      _gaq.push(['_trackEvent', 'game', 'bad guess']);
    }  
  }
  function score (e) {
    return abs(e.pageX - x) + abs(e.pageY - y);
  }
  function hint (e) {
    var dx = abs(e.pageX - x), dy = abs(e.pageY - y);
    switch (cheating) {
      case 0:
        document.body.style.backgroundColor = "white";
        break;
      /*
      case 1:
        var c = floor(256 - 256 * (dx + dy) / ww);
        // console.log(c, e.pageX, x, e.pageY, y);
        document.body.style.backgroundColor = "rgb(" + [c,c,c].join(",") + ")";
        break;
      */
      case 1:
        var hyp = sqrt(dx*dx + dy*dy);
        var dr = clamp(512 - hyp, 0, 512);
        var dg = clamp(32 - hyp, 0, 32);
        var db = clamp(512 - hyp, 0, 512);
        var r = floor(255 * (dr / 512));
        var g = floor(255 * (dg / 32));
        var b = floor(255 * (1 - (db/512)));
        // console.log(r,g,b," ",dx,dy,floor(hyp),floor(dr),floor(db));
        document.body.style.backgroundColor = "rgb(" + [r,g,b].join(",") + ")";
    }
  }
  function cheat (e) {
    if (! (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) && e.keyCode == 81)
      cheating = (cheating + 1) % 2;
      _gaq.push(['_trackEvent', 'game', 'cheating']);
  }
  function choice (list) { return list[floor(random() * list.length)] }
  win_strings = window.win_strings || "you found it!; got em!; whoa, nice job!; quick there's another one!; sharp shootin'!; damn you good at this; slick clicking yo; we have a new winner...; you found the pixel!; sweet, you found it!; got it -- look out, pixels!; amazing, you got it!; good aim!; fantastic, you got it!; cool! another round?; you good at this; rad skills!; you got it!; there goes another one!; ooh! great job!; you're soooooo wonderful!; did u get your pHD in pixel clickin or what?; is there a point to this game? nope but there's a pixel!; i like a person with good aim; pixel clickers make great lovers; you know what they say about guys who can find the pixel..; you could be doing so many worse things with your life right now!; wheres waldo for graphic designers?; easier than finding your other sock; clicking it harder doesnt help; LOL you're totally clicking pixels right now; if pixel clicking was a real sport you would totally win!; this should be a windex ad; this should be an ad for paper towels; clicking pixels is good for you, but scientists havent discovered yet why; clicking pixels may change the world, but we are currently unsure; clicking pixels might have an effect on the people around you; you just clicked a pixel!; for every pixel clicked we will give a pixel away for free!; how many people clicked that same pixel?; we are all united through 1 pixel!; no pixel left behind; great pixel pushing!; are you a professional or something?".split("; ");
  function win () {
    $("win").stop().html(choice(win_strings)).show().css({"opacity": 1}).delay(2000).fadeOut(4000);
    $(window).trigger("win");
    _gaq.push(['_trackEvent', 'game', 'win']);
    start();
  }
  init();
});

