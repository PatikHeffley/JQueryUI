/*
UI items used
.ready()
.draggable()
.droppable()
.hide()
.toggle()
.progressbar()
.button()
.tooltip()
.dialog()
.show()
*/
var counter = 0;
var i = 1;
var k = 0;
var o = 0;
let j = 0
var up = 0;
var left = 0;
var p = 1;
var g = 0;
var width = 0;
var level = 1;
var items = 0;
var gold = 0;
var currentRock = false;
$(document).ready(function() {
  // When page loads, display popup
  $( "#dialog" ).dialog({
    modal: true,
    resizable: false,
  });
  // Gold prices on hover
  $("#upgrade1").tooltip({
    tooltipClass: "toolStyling",
  });
  $("#upgrade2").tooltip({
    tooltipClass: "toolStyling",
  });
  $("#upgrade1").button();
  $("#upgrade2").button();
  $(".gold").draggable();
  $("#cart").draggable();
  // When gold is dropped onto the furnace, add money and destroy the gold
    $("#cart").droppable({
        accept: ".gold",
          drop: function(event, ui) {
            $("#count").show( "fold", 10000 );
            counter += 1;
            gold += 1;
            document.getElementById("gold").innerHTML = "Current Gold:" + gold;
            document.getElementById("count").innerHTML = "score " + counter;
            o += 1
            $(this).css("background-image", "url('images/cart1.webp')")
            smelt();
            if (o == k) {
              rockCreate();
              o = 0;
            }
            $(ui.draggable).remove();
          }
    })
    rockCreate()

    // The smelting upgrade which automatically smelts gold ore 
    $("#upgrade1").click(function() {
      if (gold < 10) {

      }
      else {
      gold -= 10;
        $("#upgrade1").css({"pointer-events": "none", "opacity": "0.5", "display": "block"})
      document.getElementById("gold").innerHTML = "Current Gold:" + gold;
      setInterval(function () {
        items = $('.gold');
        if (items.length != 0) {
        var random = shuffle(items).slice(0, 1);
        var offseted = document.getElementById("cart").getBoundingClientRect();
        random.animate({
          top: offseted.top,
          left: offseted.left
        }, 1000)
        setTimeout(function(){
          random.remove();
          smelt()
          counter += 1;
          document.getElementById("count").innerHTML = "score " + counter;
          o += 1
          gold += 1;
          document.getElementById("gold").innerHTML = "Current Gold:" + gold;
          document.getElementById("gold").value = gold;
          if (o == k) {
            setTimeout(function(){
              k = 0;
            o = 0;
            rockCreate();
          }, 500)
          }
        }, 1000)
      }
      }, 5000)
    }
    })
    // The mining upgrade which mines the rocks automatically
    $("#upgrade2").click(function() {
      if (gold < 10) {

      }
      else {
      gold -= 10;
      $("#upgrade2").css({"pointer-events": "none", "opacity": "0.5", "display": "block"})
      document.getElementById("gold").innerHTML = "Current Gold:" + gold;
      setInterval(function () {
      if (currentRock == true) {
            console.log(i)
          if (i < 9) {
            $(".rock").css("background-image", "url('images/rock" + p + ".png')");
            i += 1;
            if (i % 2 == 1) {
              p += 1;
            }
          }
          else {
            currentRock = false;
            p = 1;
            i = 1;
            $(".rock").toggle( "explode" );
            $(".rock").remove();
            k = Math.floor(Math.random() * 10) + 1;
            for (j = 0; j < k; j++) {
              create();
            } 
          }
        }
        else {
        }
      }, 2000)
    }
    })
})
// Creating gold ore from a broken rock
function create() {
  var money = document.createElement("div");
money.classList.add("gold");
money.style.left = (Math.floor(Math.random() * 10) * 5) + left + "px"
money.style.top = (Math.floor(Math.random() * 10) * 5) + up + "px"
    document.body.appendChild(money);
    $(".gold").draggable();
}
// Creating a new rock
function rockCreate() {
  var rock = document.createElement("div");
rock.classList.add("rock");
left = Math.floor(Math.random() * 50) * 23;
rock.style.left = left + "px";
up = Math.floor(Math.random() * 50) * 12;
rock.style.top = up + "px";
    document.body.appendChild(rock);
    $(".rock").css({"display": "none"})
    $(".rock").show( "puff", 1000 );
    currentRock = true;
    $(".rock").click(function(){
      if (i < 9 && currentRock == true) {
        $(this).css("background-image", "url('images/rock" + p + ".png')");
        i += 1;
        if (i % 2 == 1) {
          p += 1;
        }
      }
      else {
        currentRock = false;
        p = 1;
        i = 1;
        $(this).toggle( "explode" );
        $(this).remove();
        k = Math.floor(Math.random() * 10) + 1;
        for (j = 0; j < k; j++) {
          create();
        } 
      }
    })
}
// Gold smelting animation and progress bar progression
function smelt() {
  setTimeout(function(){
    $("#cart").css("background-image", "url('images/cart.webp')")
    var ingot = document.createElement("div");
    ingot.classList.add("ingot");
    var offsets = document.getElementById("cart").getBoundingClientRect();
    ingot.style.left = (offsets.left + 20) + "px"
    ingot.style.top = (offsets.top + -30) + "px"
    document.body.appendChild(ingot);
      $(".ingot").hide( "drop", { direction: "up" }, "500" );
      setTimeout(function(){
      $(".ingot").remove();
    }, 1000)
// Progress bar progression
        width += 10 / level;
        document.getElementById("myBar").style.width = width + "%";
      if (width >= 99) {
        width = 0;
        document.getElementById("myBar").style.width = width + "%";
        level += 1;
        document.getElementById("level").innerHTML = "Level:" + level
        if (level == 2) {
          $("#upgrade1").css({"pointer-events": "auto", "background-color": "white", "border-color": "black"})
          $("#upgrade2").css({"pointer-events": "auto", "background-color": "white", "border-color": "black"})
        }
      }
  }, 400)
}
// Used for chosing a random gold ore to smelt with the smelting upgrade
function shuffle(array) {
  var counter = array.length, temp, index;

  while (counter--) {
      index = (Math.random() * counter) | 0;

      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }

  return array;
}
