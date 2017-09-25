// 
// jQuery Game
//

$(document).ready(function() {

  // VARIABLES
  var myHealth;
  var defenderHealth; 
  var myPower = 8;
  var defenderPower = 25;
  var fightMode;

  // var characterWrapper = '<div class="character"></div>';
  // var characterInner = '<div class="name">name</div><img><div class="health-points">health points</div>';

  // MAIN GAME OBJECT 
  var rpg = {
    characters: {
      names: ['Cornelius', 'Dr. Zaius', 'Gen. Ursus', 'Nova'],
      namesshort: ['cornelius', 'drzaius', 'generalursus', 'nova'],
      healthpoints: [150, 130, 170, 110]
    },
    initialize: function() {
      for (i = 0; i < rpg.characters.names.length; i++) {
        var characterBox = $('<div>');
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
      rpg.initialize();
    }
  };

  rpg.initialize();

  // INITIAL CHARACTER CHOICE
  $('#characters').on('click', '.unselected', function() {
    thisData = $(this).attr('data-charactername');
      // console.log('hasClass(\'unselected\')');
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
      $('#defender .character').remove();
      $('#battle-text1').text('');
      $('#battle-text2').text('');
      defenderData = $(this).attr('data-charactername');
        console.log(defenderData);
      defenderName = $(this).children('.name').text();
      defenderHealth = $(this).children('.health').text();
      defenderHealthNum = parseInt(defenderHealth);
      myHealth = $('.chosen').children('.health').text();
      myHealthNum = parseInt(myHealth);

      $(this).removeClass('enemy');
      $(this).addClass('defender');
      $(this).siblings('h3').text('Enemies Available to Attack');
      $(this).remove();
      $('#defender').append(this);
      $('#attack-button').removeClass('disabled');
      $('.sidebar, #fight, #defender').show('slow');
      fightMode = 1;
    }
  });

  // CLICKING ATTACK BUTTON
  $('#attack-button').on('click', function() {
    if (fightMode === 1) {
      // var battleText1 = $('<div>');
      // $(battleText1).addClass('battle-text');
      $('#battle-text1').text('You attacked ' + defenderName + ' for ' + myPower + ' damage.');
      // var battleText2 = $('<div>');
      // $(battleText2).addClass('battle-text');
      $('#battle-text2').text(defenderName + ' attacked you for ' + defenderPower + ' damage.');
      // $('#defender').append(battleText1);
      // $('#defender').append(battleText2);
      defenderHealth -= myPower;
      // line below works but data attribute combined with class more complicated
      // $('.character[data-charactername="' + defenderData + '"]').children('.health').text(defenderHealth);
      if (defenderHealth <= 0) {
        console.log('defender loses');
        $('.defender').children('.health').text('0');
        $('#battle-text1').text('You have defeated ' + defenderName + '. You can chose to fight another enemy.');
        $('#battle-text2').text('');
        $('#attack-button').addClass('disabled');
        fightMode = 0;
      } else {
        $('.defender').children('.health').text(defenderHealth);
      }
      myHealthNum -= defenderPower;
      if (myHealthNum <= 0) {
        $('.chosen').children('.health').text('0');
        $('#battle-text1').text('You have been defeated. Game over.');
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
