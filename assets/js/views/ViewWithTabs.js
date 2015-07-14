/**
 *
 *	view.js
 *	Backbone View Implementation with Tabs
 *
 */
(function( $ ){
    
    window.ViewWithTabs = Backbone.View.extend({
       
        tabs: {}, // list of tabs
        
        initialize: function(options) {
		
			// Initialize the tab views
			this.tab1 = new Tab1();
			this.tab2 = new Tab2();			
		
        },

        events:{
        },		
		
		render: function() {
	
			this.$el.html(this.template());
			
			// Render tabs
			this.$el.find('#tab1').append(this.tab1.render().el);
			this.$el.find('#tab2').append(this.tab2.render().el);
			
			// Register tabs
			this.registerTab('#tab1', [this.tab1]);
			this.registerTab('#tab2', [this.tab2]);
			this.listenToTabEvents();
			
			this.delegateEvents();
			return this;
	
		},
		
		/**
		 *	Register a tab
		 */
        registerTab: function(href, subviews) {
            var $el = $('a[href='+href+']');
            $el.data('views', subviews);  
            var tab = {
                $el: $el, 
                href: href,
                subviews: subviews
            }
            this.tabs[href] = tab;
        },		

		/**
		 *	Listen to tab events to refresh views as needed
		 */		
        listenToTabEvents: function() {
            this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                
                var current = e.target; // newly activated tab
                e.relatedTarget; // previous active tab
                
                // Update url
                var href = $(current).attr('href');
                href = href[0] === '#' ? href = href.substr(1) : href;
                var url = Backbone.history.getFragment();                
                var arr = url.split(new RegExp("\/tab\/[^\/\?]*")); // up to slash or ?
                url = arr[0] + '/tab/' + href;
                for(var i=1; i < arr.length; i++) {
                    url += arr[i];
                }
                app.navigate(url, {replace: true});
                
                // Refresh tab view
                var views = $(current).data('views');                
                $.each(views, function(index, view) {
                    view.refresh(); // this is assuming the view has a refresh method
					                // that will refresh the model
                });
                
            });            
            
            var href = this.startTab;
            if(href) {
                // Show specific tab
                var tab = this.tabs['#'+href];
                if(tab) {
                    tab.$el.tab('show');
                }
            } else {
                // Show first tab
                this.$el.find('a[data-toggle="tab"]').first().tab('show');
            }
        }
        
    });

})(jQuery); 
