(function($){var hack={ltie7:$.browser.msie&&/MSIE\s(5\.5|6\.)/.test(navigator.userAgent),pixel:'images/pixel.gif',filter:function(src){return"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src='"+src+"')";}};$.fn.pngfix=hack.ltie7?function(){return this.each(function(){var $$=$(this);var base=$('base').attr('href');if($$.is('img')||$$.is('input')){if($$.attr('src').match(/.*\.png$/i)){var source=(base&&$$.attr('src').substring(0,1)!='/')?base+$$.attr('src'):$$.attr('src');$$.css({filter:hack.filter(source),width:$$.width(),height:$$.height()})
.attr({src:hack.pixel})
.positionFix();}}else{var image=$$.css('backgroundImage');if(image.match(/^url\(["']?(.*\.png)["']?\)$/i)){image=RegExp.$1;$$.css({backgroundImage:'none',filter:hack.filter(image)})
.positionFix();}}});}:function(){return this;};$.fn.pngunfix=hack.ltie7?function(){return this.each(function(){var $$=$(this);var src=$$.css('filter');if(src.match(/src=["']?(.*\.png)["']?/i)){src=RegExp.$1;if($$.is('img')||$$.is('input')){$$.attr({src:src}).css({filter:''});}else{$$.css({filter:'',background:'url('+src+')'});}}});}:function(){return this;};$.fn.positionFix=function(){return this.each(function(){var $$=$(this);var position=$$.css('position');if(position!='absolute'&&position!='relative'){$$.css({position:'relative'});}});};})(jQuery);