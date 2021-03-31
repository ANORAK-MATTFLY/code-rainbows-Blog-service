const Post = require("./models/blog-post-model");

class AllCrudOnBlogDatabase{
    constructor(id, title, content, tags) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tags = tags;
  }

  findBlogPostById(id){
      this.findById(id).exec();
  }
}

module.exports = new AllCrudOnBlogDatabase();