var Channel = {

	init: function() {
		var self = this;

		this.neighborhood = "Bastrop";

		this.getPosts(function(data){
			self.build();
		})
	},

	getPosts: function(callback) {
		var callback = callback || {};
		var self = this;
		Tabletop.init( { 
			key: '1LA-h2hJOS4U2P5Mx4dheb7LEY3Yx9afR2pxd2WwlCMM',
			callback: function(data, tabletop) {
				var posts = tabletop.models.posts.elements;
				console.log("posts", posts);
				self.build(posts);
			},
			simpleSheet: true
		});
	},

	build: function(posts){

		var html = "";
		var len = posts.length;
		for (var i=0; i<len; i++) {
			var post = posts[i];
			console.log("post", post);
			if (post.parent == 0) {
				var link = "post.html#" + this.neighborhood.toLowerCase() + "-" + post.id;
				html += "<div class='post'><a href='" + link + "'><h2>" + post.title + "</h2><p>" + post.content + "</p></a></div>"
			}
		}
		document.getElementById("content").innerHTML = html;
	}
};

Channel.init();