var Channel = {

	init: function() {
		var self = this;

		this.neighborhood = "Bastrop";
		Utils.getPosts(function(posts){
			Channel.build(posts);
		})
	},

	build: function(posts){
		var html = "";
		var len = posts.length;
		for (var i=0; i<len; i++) {
			var post = posts[i];
			console.log("post", post);
			if (post.parent == 0) {
				var link = "post.html#" + this.neighborhood.toLowerCase() + "-" + post.id;
				html += "<div class='post'>";
				html += "<a href='" + link + "'><h2>" + post.title + "</h2><p>" + post.content + "</p></a>";
				html += Utils.getMedia(post);
				html += "</div>";
			}
		}
		document.getElementById("content").innerHTML = html;
	}
};

Channel.init();