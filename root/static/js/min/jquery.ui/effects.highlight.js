;(function($){$.effects.highlight=function(o){return this.queue(function(){var el=$(this),props=['backgroundImage','backgroundColor','opacity'];var mode=$.effects.setMode(el,o.options.mode||'show');var color=o.options.color||"#ffff99";var oldColor=el.css("backgroundColor");$.effects.save(el,props);el.show();el.css({backgroundImage:'none',backgroundColor:color});var animation={backgroundColor:oldColor};if(mode=="hide")animation['opacity']=0;el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=="hide")el.hide();$.effects.restore(el,props);if(mode=="show"&&jQuery.browser.msie)this.style.removeAttribute('filter');if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);