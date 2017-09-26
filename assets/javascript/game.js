// 
// jQuery Game
//

$(document).ready(function() {

  // VARIABLES
  var myHealth;
  var defenderPower;
  var defenderHealth; 
  var myPower = 6;
  var fightMode = 0;
  var finalFight = 0;

  // MAIN GAME OBJECT 
  var rpg = {
    characters: {
      names: ['Cornelius', 'Dr. Zaius', 'Gen. Ursus', 'Nova'],
      namesshort: ['cornelius', 'drzaius', 'generalursus', 'nova'],
      healthpoints: [150, 130, 170, 110],
      defenderPower: [25, 10, 20, 15]
    },
    initialize: function() {
      for (i = 0; i < rpg.characters.names.length; i++) {
        var characterBox = $('<div>');
        $(characterBox).attr('data-characterpower', rpg.characters.defenderPower[i]);
        $(characterBox).attr('data-charactername', rpg.characters.namesshort[i]);
        $(characterBox).addClass('character unselected');
        $(characterBox).append('<div class="name"></div>');
        $(characterBox).children('.name').text(rpg.characters.names[i]);
        $(characterBox).append('<img>');
        $(characterBox).children('img').attr('src','assets/images/' + rpg.characters.namesshort[i] + '.jpg');
        $(characterBox).append('<div class="health"></div>');
        $(characterBox).children('.health').text(rpg.characters.healthpoints[i]);
        $('#characters').append(characterBox);
      }
    },
    restart: function() {
      $('#characters h3').text('Choose a Great Ape as Your Character');
      $('#characters, #enemies, #vanquished, #defender').children('div').remove();
      $('.sidebar, #enemies, #vanquished, #fight, #defender, #restart-button').hide();
      myPower = 8;
      fightMode = 0;
      finalFight = 0;
      rpg.initialize();
    }
  };

  rpg.initialize();

  // INITIAL CHARACTER CHOICE
  $('#characters').on('click', '.unselected', function() {
    thisData = $(this).attr('data-charactername');
    $(this).removeClass('unselected');
    $(this).addClass('chosen');
    $(this).siblings('h3').text('Your Character');
    var sibs = $(this).siblings('.character');
    $(sibs).remove();
    $(sibs).removeClass('unselected');
    $(sibs).addClass('enemy');
    $('#enemies').append(sibs);
    $('#enemies').show('slow');
  });

  // CHOOSING AN ENEMY FROM REMAINING
  $('#enemies').on('click', '.enemy', function() {
    if (fightMode !== 1) {
      // if ($('#defender .character')) {
      //     console.log('#defender .character');
      // //$('#defender .character').remove();
      // }
      $('#battle-text1').text('');
      $('#battle-text2').text('');
      defenderData = $(this).attr('data-charactername');
      defenderName = $(this).children('.name').text();
      defenderPower = $(this).attr('data-characterpower');
      defenderPowerNum = parseInt(defenderPower);
        console.log(defenderPowerNum);
      defenderHealth = $(this).children('.health').text();
      defenderHealthNum = parseInt(defenderHealth);
      myHealth = $('.chosen').children('.health').text();
      myHealthNum = parseInt(myHealth);

      $(this).removeClass('enemy');
      $(this).addClass('defender');
      $(this).siblings('h3').text('Enemies Available to Attack');
      $(this).remove();
      var enemiesNum = $('#enemies').children('div').length;
      if (enemiesNum === 0) {
        // #enemies DIV is now empty
        $('#enemies').children('h3').text('No Enemies Remaining to Attack');
        // set flag for last defender
        finalFight = 1;
      }
      $('#enemies .character').addClass('inactive');
      $('#defender').append(this);
      $('#attack-button').removeClass('disabled');
      $('.sidebar, #fight, #defender').show('slow');
      fightMode = 1;
    }
  });

  // ATTACK BUTTON
  $('#attack-button').on('click', function() {
    if (fightMode === 1) {
      $('#battle-text1').text('You attacked ' + defenderName + ' for ' + myPower + ' damage.');
      $('#battle-text2').text(defenderName + ' attacked you back for ' + defenderPowerNum + ' damage.');
      defenderHealth -= myPower;
      // line below works but data attribute combined with class more complicated
      // $('.character[data-charactername="' + defenderData + '"]').children('.health').text(defenderHealth);
      if (defenderHealth <= 0) {
        if (finalFight === 1) {
          // final fight WON!! 
          $('#battle-text1').html('<div id="game-message">You won!!!<br>GAME OVER!!!</div>');
          $('#restart-button').show('fast');
        } else {
          // continue with fight if not final fight
          $('.defender').children('.health').text('0');
          $('#battle-text1').text('You have defeated ' + defenderName + '. You can chose to fight another enemy.');
        }
        // do after every fight
        $('#enemies .character').removeClass('inactive');
        $('.defender').children('.health').text('0');
        $('#battle-text2').text('');
        $('#attack-button').addClass('disabled');
        var vanquishedDefender = $('#defender').children('div');
        $(vanquishedDefender).removeClass('defender');
        $(vanquishedDefender).addClass('vanquished');
        $(vanquishedDefender).remove();
        $('#vanquished').append(vanquishedDefender);
        $('#vanquished').show('slow');
        fightMode = 0;
      } else {
        $('.defender').children('.health').text(defenderHealth);
      }
      myHealthNum -= defenderPowerNum;
      if (myHealthNum <= 0) {
        $('.chosen').children('.health').text('0');
        $('#battle-text1').html('<div id="game-message">You have been defeated.<br>Game over.</div>');
        $('#enemies').children('h3').text('Enemies Never Fought');
        $('#battle-text2').text('');
        $('#attack-button').addClass('disabled');
        $('#restart-button').show('fast');
        fightMode = 0;
      } else {
        $('.chosen').children('.health').text(myHealthNum);
      }
      myPower += 8;
    }
  });

  // RESTART BUTTON
  $('#restart-button').on('click', function() {
    rpg.restart();
  });

});
