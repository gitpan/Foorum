(function($){$.effects.transfer=function(o){return this.queue(function(){var el=$(this);var mode=$.effects.setMode(el,o.options.mode||'effect');var target=$(o.options.to);var position=el.offset();var transfer=$('<div class="ui-effects-transfer"></div>').appendTo(document.body);if(o.options.className)transfer.addClass(o.options.className);transfer.addClass(o.options.className);transfer.css({top:position.top,left:position.left,height:el.outerHeight(true)-parseInt(transfer.css('borderTopWidth'))-parseInt(transfer.css('borderBottomWidth')),width:el.outerWidth(true)-parseInt(transfer.css('borderLeftWidth'))-parseInt(transfer.css('borderRightWidth')),position:'absolute'});position=target.offset();animation={top:position.top,left:position.left,height:target.outerHeight()-parseInt(transfer.css('borderTopWidth'))-parseInt(transfer.css('borderBottomWidth')),width:target.outerWidth()-parseInt(transfer.css('borderLeftWidth'))-parseInt(transfer.css('borderRightWidth'))};transfer.animate(animation,o.duration,o.options.easing,function(){transfer.remove();if(o.callback)o.callback.apply(el[0],arguments);el.dequeue();});});};})(jQuery);