const express = require('express')
const connectDB = require('./config/db')
const app = express()
connectDB()
const PORT = process.env.PORT || 5000
app.use(express.json({ extended: false }))
//Define routes
app.use('/api/blogs', require('./routes/api/blogs'))

app.listen(PORT, console.log(`Server is running on port ${PORT}`))
