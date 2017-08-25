$(document).ready(function(){

  // collect data
var verArr = [];
var verVer = [];
var score = 0;
var check = 0;
var cnt = 0;
var zulugula = 0;
var combination = ["green","yellow","blue","red"];
var gameStatus = {};

  // off/on function
  $(".switch").click(function(){
    var on = $(".on");
    var off = $(".off");
    off.toggle();
    on.toggle();

    if(on.css('display') !== 'none'){
      $(".start").prop("disabled", false);
      $(".init").prop("disabled", false);
      $(".score").css("color", "red");
    }else{
      $(".start").prop("disabled", true);
      $(".init").prop("disabled", true);
      $(".cell").addClass("disabled");
      $(".score").css("color", "#8b0606");
      $(".score > p").html("--");
      reset();
      // TODO reset score and array
    }
  });

  // init mode
  $(".init").click(function(){
    var led = $(".led");
      if(led.hasClass("init-off")){
         led.removeClass("init-off");
         led.addClass("init-on");
         }else{
         led.removeClass("init-on");
         led.addClass("init-off");
         }

  });
  // start function

function startFlash(msg,time){
    $(".score > p").html(msg);

    var sf = function(){
      $(".score > p").addClass("ledOff");
      gameStatus.HndlOff1 = setTimeout(function(){
        $(".score > p").removeClass("ledOff");
      },250);
    };
    var rst = 0;
    sf();
    gameStatus.flHndlOff2 = setInterval(function(){
        sf();
        rst++;
        if(rst === time)
          clearInterval(gameStatus.flHndlOff2);
      },500);
  };


// play function

    function numPlay(re){

  $("." + verArr[re]).css("opacity",0.5);
  $("." + verArr[re]).children().trigger('play');
   setTimeout(function(){
      $("." + verArr[re]).css("opacity",1);
    },1000);

};
var inc = 0;
function play(n){

  if(verArr.length + 1 === cnt){
       verArr.push(combination[Math.floor(Math.random() * 4)]);
       if(cnt < 10){
       $(".score > p").html("0" + cnt);
       }else{
         $(".score > p").html(cnt);
       }
       }
       numPlay(inc);
  inc++;
  console.log("inc w play jest: " + inc)
  console.log(verArr);
  return true;
};

  function nextPlay(){

    inc = 0;
    zulugula = 0;
    cnt++;
    if(cnt < 10){
    var repeat = setInterval(function(){
      $(".cell").addClass("disabled");
    play(1);
    zulugula++;
    console.log("check is:" + check + " and zulugula is: " + zulugula + "and cnt is: " + cnt);
    if(zulugula >= cnt){
      $(".cell").removeClass("disabled");
      clearInterval(repeat);
    }
  },2000);
    }else{
      var repeat = setInterval(function(){
      $(".cell").addClass("disabled");
    play(1);
    zulugula++;
    console.log("check is:" + check + " and zulugula is: " + zulugula + "and cnt is: " + cnt);
    if(zulugula >= cnt){
      $(".cell").removeClass("disabled");
      clearInterval(repeat);
    }
  },1200);

    }
  }

  $(".cell").mousedown(function(){
    $(this).css("opacity",0.5);
    $(this).children().trigger('play');
    verVer.push($(this).attr("id"));
    console.log(verVer);
    if(verVer[check] === verArr[check]){
      check++;
      console.log("check is:" + check + " verVer is: " + verVer);
    }else if(verVer[check] !== verArr[check]){
      verVer = [];
      check = 0;
      cnt--;
      zulugula--;
      nextPlay();
      numPlay(cnt);

      if($(".led").hasClass("init-on")){
        reset();
      }

    }
    console.log("check is: " + check + " and cnt is: " + cnt);
    if(check === cnt){
      nextPlay();
      numPlay(cnt);
      check = 0;
      verVer = [];
    }
      }).mouseup(function(){
    $(this).css("opacity",1);
  });

  // reset function

  function reset(){
    cnt = 0;
    inc = 0;
    verArr = [];
    verVer = [];
    score = 0;
    check = 0;
    zulugula = 0;
    $(".cell").css("opacity",1);

  };

   // start
  $(".start").click(function(){
  reset();
  startFlash("--",2);
  cnt++;
   var elo = setTimeout(function(){
      play(1);
    },1800);
    $(".cell").removeClass("disabled");
});


});
