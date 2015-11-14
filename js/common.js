var Utils = {
	
	getPosts: function(cb) {
		var cb = cb || {};
		Tabletop.init( { 
			key: '1LA-h2hJOS4U2P5Mx4dheb7LEY3Yx9afR2pxd2WwlCMM',
			callback: function(data, tabletop) {
				var posts = tabletop.models.posts.elements;
				console.log("posts", posts, cb);
				cb(posts);
			},
			simpleSheet: true
		});
	},
	
	getMedia: function(post) {
		var html = "";

		if (post["media-thumbnail"] != "") {
			html += "<div class='media'>";
			html += "<img src='" + post["media-thumbnail"] + "'/>";
			if (post["media-description"] != "") {
				html += "<p>" + post["media-description"] + "</p>";
			}
			html += "</div>";
		}
		
		return html;
	},
};