/**
 * Tab2 View
 */
(function( $ ){
    
    window.Tab2 = Backbone.View.extend({

        initialize:function (options) {
		
			this.model = new Time();
			this.refresh();
		
            this.listenTo(this.model, "sync", this.render);         
            this.listenTo(this.model, "change", this.render);
			
        },

        events:{
        },
        
        refresh: function() { 
		
			var view = this;
			this.$el.css('opacity', 0.25);
			view.model.set('current', 'Refreshing..');
			
			setTimeout(function() {				
				var time = new Date().toLocaleTimeString();
				view.model.set('current', time);
				view.$el.css('opacity', 1);
			}, 1000);
			
        },        

        render:function () {
		
            this.$el.html(this.template({model: this.model}));
                                                 
            this.delegateEvents();
            return this;
            
        }

    });
    
})(jQuery);    