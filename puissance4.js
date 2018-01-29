(function($) {
    $.fn.puissance4 = function(options) {
        var  x = 7;
        var  y = 6;
        var  t1=20;
        var  t2=20;
        var  h = (70*y)+(t1*3.8);
        var  w = (70*x)+(t2*4);

        return this.each(function() {

          $(this).append("<div id='grid' style='position:absolute;height:"+h+"px;width:"+w+"px;left:300px;top:100px;background-color:blue;border-radius:20px;'></div>");
          for(a=0;a<x;a++){
            for(b=0;b<y;b++){
              var nomdudiv=a.toString()+b.toString();
                $('#grid').append("<div id='v"+nomdudiv+"' style='position:absolute;height:70px;width:70px;left:"+t2*1.1+"px;top:"+t1*1.1+"px;background-color:white;border-radius:50px;' onClick='clic("+nomdudiv+")'></div>");
                $('#grid').append("<div id='v"+nomdudiv+"' style='position:absolute;height:70px;width:70px;left:"+t2*1.1+"px;top:"+t1*1.1+"px;background-color:red;border-radius:50px;visibility:hidden;' onClick='clic("+nomdudiv+")'></div>");
                $('#grid').append("<div id='v"+nomdudiv+"' style='position:absolute;height:70px;width:70px;left:"+t2*1.1+"px;top:"+t1*1.1+"px;background-color:yellow;border-radius:50px;visibility:hidden;' onClick='clic("+nomdudiv+")'></div>");
              t1=t1+70;
            }
            t1=20;
            t2=t2+70;
          }
        });
  };
})(jQuery);
