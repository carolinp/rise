var Posts = {

	init: function() {
		var self = this;
		this.postId = this.getPostId();
		if (this.postId) {
			this.getPosts(function(data){
				self.build();
			})
		} else {
			console.log("Deadend. No post id");
		}

	},

	getPostId:function() {
		var hash = location.hash.replace("#", "") || false;
		if (hash) {
			hash = hash.split("-");
			if (hash.length) {
				hash = hash[hash.length-1];
			}
		}
		console.log("hash as id = ", hash);
		return hash;
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

		var subPosts = [];

		for (var i=0; i<len; i++) {
			var post = posts[i];

			console.log("post", post);

			if ( post.id == this.postId ) {
				html += this.getPostHTML(post);
			}
			if ( post.parent == this.postId ) {
				subPosts.push(post);
			}
		}

		if (subPosts.length > 0 ) {
			html += this.getSubPostHTML(subPosts);
		}
		console.log("subPosts",subPosts);

		document.getElementById("content").innerHTML = html;
	},

	getPostHTML: function(post) {
		var title = (post.title != "") ? "<h2>" + post.title + "</h2>" : "";
		return "<div class='post'>" + title + "<p>" + post.content + "</p></div>";
	},

	getSubPostHTML: function(posts) {

		var len = posts.length;
		if (len ==0) {
			return "";
		}

		var html = "";
		for (var i=0; i<len; i++) {
			html += this.getPostHTML(posts[i]);
		}

		return "<div class=\"subposts\">" + html + "</div>";
	}
};

Posts.init();