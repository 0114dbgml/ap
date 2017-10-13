$(function(){

  var item = [];
  var itemFlag = [];
  var fileData = [];
  var wholeCount = 0;
  var doneCount = 0;

  $.getJSON('file_list.json', function(data){

    $.each(data, function(key, val){

      item[key] = val.split('.')[0];

    });

  }).done(function(){

    $('.file-list tbody tr').each(function(){

      for(var j=0; j<item.length; j++){

        if( $(this).children('td:last-child').text() == item[j] ){

          $(this).append('<td class="center"><a href="../html/' + item[j] + '.html" class="list-link" target="blonk"> DONE </a></td>');
          itemFlag[j] = true;
          break;

        } else {

          if( j == item.length-1 ){
            $(this).append('<td class="center">X</td>');
          }

        }
      }

      if( $(this).children('td').has('s').length ){
        $(this).addClass('cancel');
      } else {
        if($(this).find('.list-link').length){
          $(this).addClass('done');
          doneCount++;
        }
        wholeCount++;
      }

    });

    $('.page-whole-num').text(wholeCount);
    $('.page-current-num').text(doneCount);
    $('.progress-bar').css({width : Math.floor(doneCount/wholeCount*100) + '%'}).html('<div class="progress-percent">' + Math.floor(doneCount/wholeCount*100) + '%</div>');

    for(var k=0; k<itemFlag.length; k++){
      if( itemFlag[k] != true ){
        fileData.push(item[k]);
      }
    }

    console.log(fileData);

  });

  $('body').on('click', 'tr', function(e){

    if( $(this).find('.list-link').length ){

      window.open($(this).find('.list-link').attr('href'));

    } else if( $(this).find('.cancel').length ){

      alert('제작이 취소된 페이지 입니다')

    } else {

      alert('준비 중 입니다.');

    }

  });

});