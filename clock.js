$(function(){
  var tick = 0;
  var $clock = $("clock");
  var floor = Math.floor;
  var timer = null;
  function init () {
    $(window).on("win", reset);
    start();
  }
  function start () {
    timer = setInterval(update, 100);
    $clock.html("0:00");
  }
  function update () {
    tick += 1;
    var sec = floor(tick / 10) % 60,
        min = floor(tick / 600) % 60,
        hr = floor(tick / 36000);
    if (hr > 0 && min < 10)
      min = "0" + min;
    if (sec < 10)
      sec = "0" + sec
    if (hr > 0)
      $clock.html(hr + ":" + min + ":" + sec);
    else
      $clock.html(min + ":" + sec);
  }
  function reset () {
    clearInterval(timer);
    var score = $clock.html();
    $(window).trigger("share", [tick]);
    $(score).insertBefore($clock);
    $clock.html("0:00");
    tick = 0;
    start();
  }
  init();
});
