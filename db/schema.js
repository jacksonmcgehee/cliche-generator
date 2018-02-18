const { Schema } = require('mongoose')


const ResponseSchema = new Schema(
    {
        body: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        votes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: {},
        usePushEach : true
    }
)

const PostSchema = new Schema(
    {
        cliche: {
            type: String,
            required: true
        },
        photo_url: {
            type: String,
            default: "https://i.imgur.com/oMCtdkm.jpg",
            required: false
        },
        votes: {
            type: Number,
            default: 0
        },
        responses: [ResponseSchema]
    },
    {
        timestamps: {},
        usePushEach : true
    }
)

module.exports = {
    PostSchema,
    ResponseSchema
}