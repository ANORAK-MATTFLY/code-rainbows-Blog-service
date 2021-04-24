const Post = require("./models/blog-post-model");
const Author = require("./models/author-model");
const { v4: uuidv4 } = require("uuid");


const resolvers = {
    Query: {
        async getAuthor(_, { id }, __) {
            try {
                const author = await Author.findOne({ id }, (error, data) => {
                    if (data) {
                        return data;
                    } else {
                        return error;
                    }
                });
                if (author) {
                    return author;
                }
                return "Something went wrong";
            } catch (error) {
                return error;
            }
        },
        async getAllPosts(_, args, __) {
            try {
                return Post.find({});
            } catch (error) {
                return error;
            }
        },
        async getPostById(_, { id }, __) {
            const post = await Post.findOne({ id }).exec();
            if (post) {
                return post;
            }
            return "Something went wrong";
        }
    },

    Mutation: {
        async createAuthor(_, { authorName, authorProfilePicture }, __) {
            const author = await Author({
                id: await uuidv4(),
                authorName,
                authorProfilePicture
            });
            await author.save().then(result => result).catch(error => { throw new Error(error); });
            try {
                if (author != null) {
                    return "A new author has been created!";
                }
            }
            catch (error) {
                throw new Error(error);
            }
        },

        async createPost(_, { title, content, thumbnail, tags }, __) {
            const post = await Post({
                id: await uuidv4(),
                authorId: "6a8d04cd-1613-4a94-9259-abde996d4df8",
                title,
                content,
                thumbnail,
                tags,
                releaseDate: `Released on  ${Date.now('MM DD YYYY')}`,
            });

            await post.save().then(result => result).catch(error => { throw new Error(error); });
            try {
                if (post != null) {
                    return "The post has been created!";
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
