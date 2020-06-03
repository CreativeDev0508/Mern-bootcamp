const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes =require('./routes');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

try {
	mongoose.connect(process.env.MONGO_DB_SECRET, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	console.log('MongoDb connected successfully!')
} catch (error) {
	console.log(error)
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")))
app.use(routes);

app.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
