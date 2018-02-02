(function($) {
  $.fn.puissance4 = function(options) {
    var defaults = {
      "x": 7,
      "y": 6
    };
    var param = $.extend(defaults, options);
    var game = setArray(param.x, param.y + 1, 0);
    var player1 = 0;
    var player2 = 0;
    var p1_win = 0;
    var p2_win = 0;
    var nul = 0;

    // turn Red if true
    var turn = true;

    function setArray(rows, cols, defaultValue) {
      var arr = [];
      for (var i = 0; i < rows; i++) {
        arr.push([]);
        arr[i].push(new Array(cols));
        for (var j = 0; j < cols; j++) {
          arr[i][j] = defaultValue;
        }
      }
      return arr;
    }

    function setGame(t1, t2){
      for (a = 0; a < param.x; a++) {
        for (b = 0; b <= param.y; b++) {
          var nameDiv = a.toString() + b.toString();
          $('#grid').append("<div id='n" + nameDiv + "' style='position:absolute;height:70px;width:70px;left:" + t2 * 1.1 + "px;top:" + ((t1 * 1.1) - 95) + "px;background-color:white;border-radius:50px;'></div>");
          $('#grid').append("<div id='r" + nameDiv + "' style='position:absolute;height:70px;width:70px;left:" + t2 * 1.1 + "px;top:" + ((t1 * 1.1) - 95) + "px;background-color:red;border-radius:50px;'></div>");
          $('#grid').append("<div id='y" + nameDiv + "' style='position:absolute;height:70px;width:70px;left:" + t2 * 1.1 + "px;top:" + ((t1 * 1.1) - 95) + "px;background-color:yellow;border-radius:50px;'></div>");
          $('#n' + nameDiv + '').click(animation);
          $('#r' + nameDiv + '').click(animation).hide();
          $('#y' + nameDiv + '').click(animation).hide();
          t1 = t1 + 70;
        }
        t1 = 20;
        t2 = t2 + 70;
      }
    }
    function resetGame(){
      for (a = 0; a < param.x; a++) {
        for (b = 0; b <= param.y; b++) {
          var nameDiv = a.toString() + b.toString();
          $('#r' + nameDiv + '').hide();
          $('#y' + nameDiv + '').hide();
        }
      }
      game = setArray(param.x, param.y + 1, 0);
      // console.log(game);
      for (a = 0; a < param.x; a++) {
        for (b = 0; b <= param.y; b++) {
          var nameDiv = a.toString() + b.toString();
          $('#n'+nameDiv+'').on('click');
          $('#r'+nameDiv+'').on('click');
          $('#y'+nameDiv+'').on('click');
        }
      }

    }

    function animation(e) {
      var numberX = e.target.id.substr(1, 1);
      var numberY = e.target.id.substr(2, 1);
      var loc = location(numberX, game);

      if (turn) {
        var prefix = "r";
      } else {
        var prefix = "y";
      }
      var i = 0;
      $('#' + prefix + numberX + i + '').fadeIn('fast').fadeOut('fast', function fall() {
        i++;
        if (i < loc) {
          $('#' + prefix + numberX + i + '').fadeIn('fast').fadeOut('fast', fall());
        }
        if (i = loc) {
          $('#' + prefix + numberX + i + '').delay(200).fadeIn('fast', function() {

          });
        }
      });
      var currentCoord = insertToArray(turn, numberX, game);
      var win = searchVictory(currentCoord, game);
      changeColorPlayer(turn, win);
      // countDiago(game);
    }

    function changeState() {
      return turn = !turn;
    }

    function location(numberX, game) {
      var i = 0;
      game[numberX].forEach(function(element) {
        if (element == 0) {
          i++;
        } else {
          return false;
        }
      });

      if (i == -1) {
        return i = 0;
      }
      if (i >= 0) {
        return i - 1;
      }
    }

    function insertToArray(turn, numberX, game) {
      var loc = location(numberX, game);

      if (turn && loc >= 0) {
        game[numberX][loc] = 1;
      }
      if (!turn && loc >= 0) {
        game[numberX][loc] = 2;
      }
      if (loc != 0 && loc != -1) {
        changeState();
      }
      var coord = [parseInt(numberX, 10), loc];
      return coord;
    }

    function searchVictory(coord, game) {
      var x = coord[0];
      var y = coord[1];
      var player = game[x][y];

      var col = Array.from(game[x]);
      var row = game.map(x => x[y]);
      var diagoDown = diagonaleDown(x,y,game,player);
      var diagoUp = diagonaleUp(x,y,game,player);
      // console.log(diagoUp);
      // console.log(diagoDown);
      var arrNumb = new Array;
      var yb = param.y;
      for(i=0;i<=param.y;i++){
        arrNumb[i] = yb;
        yb--;
      }
      if (count(y, col) == 4 || count(x, row) == 4 || count(x, diagoDown) == 4 || count(arrNumb[y], diagoUp) == 4) {
        if(player == 1){
          p1_win++;
        }
        else{
          p2_win++;
        }
        $('#winp1').html(p1_win);
        $('#winp2').html(p2_win);
        $('.win').append("<h3>Victoire joueur " + player + " !</h3>");
        $('#player1').css({
          backgroundColor: 'white'
        });
        $('#player2').css({
          backgroundColor: 'white'
        });
        for (a = 0; a < param.x; a++) {
          for (b = 0; b <= param.y; b++) {
            var nameDiv = a.toString() + b.toString();
            $('#n'+nameDiv+'').off('click');
            $('#r'+nameDiv+'').off('click');
            $('#y'+nameDiv+'').off('click');
          }
        }
        return true;
      }
      else{
        return false;
      }
    }

    function diagonaleDown(x,y,game,player){
      var arrUp = new Array;
      for(i=1; i<=param.x; i++){
        var r = x-i;
        var t = y-i;
        if(r>=0 && t>0){
          arrUp.push(game[r][t]);
        }
        if(r<0 || t<0){
          break;
        }
      }
      var arrDown = arrUp.reverse();
      arrDown.push(player);

      for(i=1; i<=param.x; i++){
        var r = x+i;
        var t = y+i;
        if(r<param.x && t<=param.y){
          arrDown.push(game[r][t]);
        }
        if(r>param.x || t>param.y){
          break;
        }
      }
      return arrDown;
    }

    function diagonaleUp(x,y,game,player){
      var arrDown = new Array;
      for(i=1; i<=param.x; i++){
        var r = x-i;
        var t = y+i;
        if(r>=0 && t<=param.y){
          arrDown.push(game[r][t]);
        }
        if(r<0 || t>param.y){
          break;
        }
      }
      var arrUp = arrDown.reverse();
      arrUp.push(player);

      for(i=1; i<=param.x; i++){
        var r = x+i;
        var t = y-i;
        if(r<param.x && t>0){
          arrUp.push(game[r][t]);
        }
        if(r>param.x || t<=0){
          break;
        }
      }
      return arrUp;
    }

    function count(pos, array) {
      var player = array[pos];

      let right = array.slice(pos + 1).reduce(function(accumulateur, valeurCourante, index, arr) {
        if (valeurCourante == player) {
          accumulateur++;
        } else {
          arr.splice(1);
        }
        return accumulateur;
      }, 0);

      let left = array.slice(0, pos).reduceRight(function(accumulateur, valeurCourante, index, arr) {
        if (valeurCourante == player) {
          accumulateur++;
        } else {
          arr.splice(1);
        }
        return accumulateur;
      }, 0);
      return left + right + 1;
    }

    function changeColorPlayer(turn, win){
      if(win){
        $('#player1').css({
          backgroundColor: 'white'
        });
        $('#player2').css({
          backgroundColor: 'white'
        });
      }
      else if (turn) {
        $('#player1').css({
          backgroundColor: '#FF0040'
        });
        $('#player2').css({
          backgroundColor: 'white'
        });
      }
      else {
        $('#player1').css({
          backgroundColor: 'white'
        });
        $('#player2').css({
          backgroundColor: '#FBE871'
        });
      }
    }

    // //      if(game[x][y] == 1){
    //         for (i = x; i < x+4; i++) {
    //           if(game[i][y] == player){
    //             totalD++;
    //           }
    //           else{
    //             return totalD;
    //           }
    //         }
    //         if(totalD == 4){
    //           console.log("victoire player1");
    //         }
    //
    //         for (i = x; i < x-4; i--) {
    //           if(game[i][y] == player){
    //             totalG++;
    //           }
    //           else{
    //             return totalG;
    //           }
    //         }
    //         if(totalG == 4){
    //           console.log("victoire player1");
    //         }
    //       //}
    //     }

    return this.each(function() {
      var t1 = 20;
      var t2 = 20;
      var h = (70 * param.y) + (t1 * 3);
      var w = (70 * param.x) + (t2 * 4.2);

      $(this).append("<div id='grid' style='position:absolute;height:" + h + "px;width:" + w + "px;left:300px;top:200px;background-color:blue;border-radius:20px;'></div>");
      $(this).append("<div id='monitor'></div>");
      $('#monitor').append("<div class='players'><div id='player1'><h3>Joueur 1</h3></div><div id='player2'><h3>Joueur 2</h3></div></div>");
      $('#monitor').append("<div class='wins'><div id='winp1'>0</div><div id='winp2'>0</div></div>");
      $('#monitor').append("<div class='win' style='margin:10px;font-family:arial;color:#2E2EFE;'></div>");
      $('#monitor').append("<button class='btn' type='button'>Rejouer</button>");
      $('.btn').click(resetGame);

      setGame(t1, t2);

      $('#monitor').css({
        position: 'absolute',
        left: '900px',
        top: '200px',
        'margin-left': '40px',
        'width': '300px',
        'display': 'flex',
        'flex-direction': 'column',
        'text-align': 'center',
        'background-color': '#58D3F7',
        'border-radius': '10px',
      })
      $('.players').css({
        'width': 'auto',
        'display': 'block',
        'text-align': 'center',
        'margin-top': '30px',
      })
      $('.wins').css({
        'width': 'auto',
        'display': 'block',
        'text-align': 'center',
        // margin: '30px',
      })
      $('#player1').css({
        backgroundColor: '#FF0040',
        width: 'auto',
        display: 'inline-block',
        'font-family': 'arial',
        border: '3px solid #B40431',
        color: '#610B21',
        'border-radius': '10px',
        'margin-right': '20px',
        'padding-left': '10px',
        'padding-right': '10px',
      });
      $('#player2').css({
        width: 'auto',
        display: 'inline-block',
        'font-family': 'arial',
        border: '3px solid #D49E00',
        color: '#765901',
        'border-radius': '10px',
        'background-color': 'white',
        'padding-left': '10px',
        'padding-right': '10px',
      });
      $('#winp1').css({
        // backgroundColor: '#FF0040',
        width: 'auto',
        display: 'inline-block',
        'font-family': 'arial',
        // border: '3px solid #B40431',
        // color: '#610B21',
        'border-radius': '10px',
        'margin-left': '20px',
        'margin-right': '20px',
        'margin-bottom': '20px',
        'padding-left': '10px',
        'padding-right': '10px',
      });
      $('#winp2').css({
        // backgroundColor: '#FF0040',
        width: 'auto',
        display: 'inline-block',
        'font-family': 'arial',
        // border: '3px solid #B40431',
        // color: '#610B21',
        'border-radius': '10px',
        'margin-right': '20px',
        'margin-bottom': '20px',
        'padding-left': '10px',
        'padding-right': '10px',
      });
      $('.btn').css({
        'font-family': 'arial',
        'font-size': '18px',
        'border-radius': '10px',
        border: '3px solid #045FB4',
        color: '#045FB4',
        padding: '15px 32px',
        'text-align': 'center',
        display: 'inline-block',
        backgroundColor: '#CEE3F6',
      });
    });
  };
})(jQuery);
