(function( $ ){
    
    window.Router = Backbone.Router.extend({

        routes: {
            ""              : "home",
            "home"          : "home"
        },

        initialize: function () {
		
            this.homeView = new ViewWithTabs({el: '#content'});
            this.homeView.render();

            // Close the search dropdown on click anywhere in the UI
            $('body').click(function () {
                $('.dropdown').removeClass("open");
            });
            
        },
		
        home: function () {
            // Since the home view never changes, we instantiate it and render it only once
            console.log("Navigate to home.");
            this.homeView.delegateEvents(); // delegate events when the view is recycled
            this.homeView.render();
        }

    });

})(jQuery);
