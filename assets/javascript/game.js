let intgame = {
    // Dynamically constructs each character div and appends them to the proper div.
    buildchars: function () {
        var dychar = $("<div class='char'>").addClass(character[i].name);
        var dyname = $("<div class='charnamer'>").text(character[i].name);
        dyname.val(i);
        var dyRHB = $("<div class='RHB'>").css({width: character[i].hp});
        var dyGHB = $("<div class='GHB'>").text("HP:" + character[i].hp).css({width:character[i].hp});
        $(dychar).append(dyname);
        $(dychar).append(dyRHB);
        $(dychar).append(dyGHB);
        $("#charholder").append(dychar)
    },
    // Randomly takes a character from the character array and makes them the enemy.
    // Dynamically builds enemy div and appends it to the proper div.
    buildenemies: function(){
        enemy = character[Math.floor(Math.random()*character.length)];
        enmHP = enemy.hp
        var dyenm = $("<div class='enemy'>").addClass(enemy.name);
        var enmname = $("<div class='charnamer'>").text(enemy.name);
        var enmRHB = $("<div class='enRHB'>").css({width:enmHP});
        var enmGHB = $("<div class='enGHB'>").text("HP:" + enmHP).css({width:enmHP});
        $(dyenm).append(enmname);
        $(dyenm).append(enmRHB);
        $(dyenm).append(enmGHB);
        // $(dyenm).css({"margin":"auto"});
        $("#oppspot").append(dyenm);
        
    },
    // Takes both enemy and player hp and subtracts player ap and enemy cap respectivley.
    // If enemy hp is at 0, clear the enemy from the screen and make the next button visible.
    calcAttack: function() {
        if (enmHP <= 0){
            alert(enemy.name + " is dead");
            wins = wins + 1;
            $(".enGHB").text("HP: 0");
            $(".enGHB").animate({width: 0});
            $("#oppspot").empty();
            $(".btn-warning").css("visibility", "visible");
            return false;
        }
        else {
        playerselected.ap = playerselected.ap + (playerselected.ap + 1);
        enmHP = enmHP - playerselected.ap;
        plyHP = plyHP - enemy.cap;

        $(".GHB").text("HP: " + plyHP);
        $(".GHB").animate({width: plyHP});
        $(".enGHB").text("HP: " + enmHP);
        $(".enGHB").animate({width: enmHP});
    }
    if (enmHP <= 0){
        alert(enemy.name + " is dead");
        wins = wins + 1;
        $(".enGHB").text("HP: 0");
        $(".enGHB").animate({width: 0});
        $("#oppspot").empty();
        playerselected.ap = baseap;
        $(".btn-warning").css("visibility", "visible");
        return false;
    }
    
    },
};
//Global variables
var wins = 0;
var enmHP;
var plyHP;
var baseap;
var enemy;
var playerselected;
// Array of character objects with their respective stats.
var character = [
    jake = {
        name: "jake",
        hp: 125,
        ap: 5,
        cap: 5,
    },
    finn = {
        name: "finn",
        hp: 125,
        ap: 5,
        cap: 5,
    },
    bubblegum = {
        name: "bubblegum",
        hp: 140,
        ap: 2,
        cap: 3,
    },
    marceline = {
        name: "marceline",
        hp: 75,
        ap: 10,
        cap: 8,
    },
]

$(document).ready(function () {
    // Always check to see if player has died
    if (plyHP === 0){
        alert("You Died....")
    }
    // Upon the page fully loading, for each character in the character array,
    // dynamically creates characters.
    for (i = 0; i < character.length; i++) {
        intgame.buildchars();
    }
    $(".char").on("click", function () {
        // when a character is clicked, they become the player and are moved to the proper div.
            $(".rower").css({"visibility": "visible"})
            $("#choice").empty();
            playerselected = character[$(this).children(".charnamer").val()];
            plyHP = playerselected.hp
            baseap = playerselected.ap
            $("#charspot").append($(this));
            $("#charholder").empty();
            $(".btn-success").css("visibility", "visible");
            $("#charholder").css({height:0})
        }
    )
    $(".btn-danger").on("click",function(){
    // Upon press of the Red Attack button, if you have defeated 3 opponents, 
    // clear the screen and alert the user.
    // Otherwise keep calculating attack.
     intgame.calcAttack();
    });
    
    $(".btn-success").on("click", function (){
        // Upon press of Green Ready button, build an enemy, hide the ready button,
        // and show the attack button
        intgame.buildenemies();
        $(".btn-success").css("visibility", "hidden")
        $(".btn-danger").css("visibility", "visible")
    });
    $(".btn-warning").on("click", function(){
        if (wins === 3){
        alert("you win!");
        $(".logo").html("<center><img src='assets/images/thankyou.png'alt='logo' id='winscrn'></center>")
        $("#charholder").html("<img src='assets/images/winscreen.jpg'alt='winscreen'>")
        $("#charspot").empty();
        $("#buttonspot").empty();
        return false;
    }
        // Upon press of the Yellow Next button,
        // another enemy is generated and the Next button is hidden
        intgame.buildenemies();
        $(".btn-warning").css("visibility", "hidden");
    })

    
    
})
