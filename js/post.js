var Posts = {

	init: function() {
		var self = this;
		this.postId = this.getPostId();
		if (this.postId) {
			Utils.getPosts(function(posts){
				Posts.build(posts);
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

	build: function(posts){

		var html = "";
		var len = posts.length;

		var subPosts = [];

		for (var i=0; i<len; i++) {
			var post = posts[i];

			console.log("post", post);

			if ( post.id == this.postId ) {
				html += this.getPostHTML(post);
				document.title = "Rise: " + post.title;
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
		var html = "";
		html += "<div class='post'>";
		html += title + "<p>" + post.content + "</p>";

	//	if (post.parent == 0) {
			html += Utils.getMedia(post);
	//	}
		html += "</div>";

		return html;
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
