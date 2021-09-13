const Post = require("./models/blog-post-model");
const Author = require("./models/author-model");
const Page = require("./models/page-model");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const resolvers = {
    Query: {
        async getPageCount(_, { id }, __) {
            try {
                const page = await Page.findOne({ id }, (error, data) => {
                    if (data) {
                        return data;
                    } else {
                        return error;
                    }
                });
                return page;
            } catch (error) {
                throw new Error(error);
            }
        },

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
        async createPage(_, { title }, __) {
            const page = await Page({
                id: await uuidv4(),
                title,
                visits: 1,
            });
            await page.save().then(result => result).catch(error => { throw new Error(error); });
            try {
                if (page != null) {
                    return "A new page has been created!";
                }
            }
            catch (error) {
                throw new Error(error);
            }
        },

        async updatePageVisitById(_, { id }, __) {
            const visitCount = await Page.findOne({ _id: id }).exec();
            try {
                await Page.findByIdAndUpdate({ _id: id }, { visits: visitCount.visits + 1 })
                return "Success"
            }
            catch (error) {
                throw new Error(error);
            }
        },

    }
};

module.exports = resolvers;
