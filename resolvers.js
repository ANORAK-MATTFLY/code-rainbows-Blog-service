const Post = require("./models/blog-post-model");
const { v4: uuidv4 } = require("uuid");


const resolvers = {
    Query: {
        async getPostById(_, { id }, __) {
            const post = await Post.findOne({ id }).exec();

            if (post) {
                return post;
            }
            return "Something went wrong";
        }
    },

    Mutation: {
        async createPost(_, { title, content }, __) {
            const post = await Post({
                id: await uuidv4(),
                title,
                content
            });
            await post.save().then(result => result).catch(error => { throw new Error(error); });
            try {
                if (post != null) {
                    return "The post was created!";
                }
            }
            catch (error) {
                throw new Error(error);
            }
        },

        async deletePost(_, { id }, __) {
            Post.findOneAndDelete(id, (error) => {
                if (error)
                    return error;
                else
                    return "Operation proceed successfully";
            });
            return "Success!!!";
        },
    }
};

module.exports = resolvers;
