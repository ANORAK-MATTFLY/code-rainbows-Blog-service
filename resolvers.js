const Post = require("./models/blog-post-model");
const {v4: uuidv4} = require("uuid");
const AllCrudOnBlogDatabase = require("./db-query");

const CRUD = AllCrudOnBlogDatabase;

const resolvers = {
    Mutation: {
        async createPost(_, {title, content }, __) {
            const post = await Post({
                id: await uuidv4(),
                title,
                content
            });
            await post.save();
            // .then(result => result).catch(error => { throw new Error(error); });
            try {
                if (post != null) {
                    return "The post was created!";
                }
            }
            catch (error) {
                throw new Error(error);
            }
        },

        async deletePost(_, {id}, __){
            Post.findByIdAndRemove(id, (error)=> {
        if (error)
            throw new Error(error);
        else
            return "Operation proceed successfully";
    });
        }
    }
};

module.exports = resolvers;
