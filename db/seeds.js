require('dotenv').config()

const Post = require('./models/Post.js')
const Response = require('./models/Response.js')

const mongoose = require('mongoose')

// Connect to my DB
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
  console.log('Mongoose has connected to MongoDB!')
})

mongoose.connection.on('error', (error) => {
  console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
  process.exit(-1)
})

Post.remove({})
    .then(() => {
        const loop = new Post({
            cliche: "Close the loop on that tomorrow.",
            photo_url: "https://i.imgur.com/orLZehO.jpg"
        })
        const one = new Response({
            body: "So stupid",
            author: "Not a Russian Bot"
        })
        const two = new Response({
            body: "Joking about this is not a joke. Closing the loop is vital to gaining traction in this space.",
            author: "New MBA Grad"
        })
        loop.responses.push(one, two)

        return loop.save()
    }).then(() => {
        const circle = new Post({
            cliche: "Let's circle back to that one later.",
            photo_url: "https://i.imgur.com/sOV2WTA.jpg"
        })
        const three = new Response({
            body: "If I hear this one more time I will burn down the building.",
            author: "Where's my stapler?"
        })
        const four = new Response({
            body: "Without closing the circles, all we are left with is U. Think about that.",
            author: "Michael Bolton Fan"
        })
        circle.responses.push(three, four)

        return circle.save()
    }).then(() => {
        const pin = new Post({
            cliche: "Let's put a pin in that for now.",
            photo_url: "https://i.imgur.com/j96tO87.jpg"
        })
        const five = new Response({
            body: "Without pins, the board is empty",
            author: "Corporate Confucius"
        })
        const six = new Response({
            body: "We never come back to the pins. Ever. What happens to the pins man?",
            author: "Justa Drone"
        })
        pin.responses.push(five, six)

        return pin.save()
    }).catch((error) => {
        console.log('!!!!! ERROR SAVING SEEDED DATA !!!!!')
        console.log(error)
    }).then(() => {
        mongoose.connection.close()
        console.log(`
            Finished seeding database...
            
            Disconnected from MongoDB
          `)
    })