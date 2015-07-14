window.templateLoader = {

	load: function(url, views, callback) {

		var deferreds = [];

		$.each(views, function(index, viewPath) {
			var view = viewPath.replace(/^.*[\\\/]/, '')
			console.log('Loading view: ' + view + ' -> from url: ' + (url + viewPath + '.html'));                
			if (window[view]) {
				deferreds.push($.get(url + viewPath + '.html', function(data) {
					window[view].prototype.template = _.template(data);
				}, 'html'));
			} else {
				console.log(view + " not found");
			}
		});

		$.when.apply(null, deferreds).done(callback);
	}

};