require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({extensions: true}))
app.get('/', (req, res) => {
   res.send("Server listening on port 5000");
})

app.use('/static/images', express.static(path.join(__dirname, 'static/images')))

app.get('/api/files', (req, res) => {
  const folderPath = path.join(__dirname, 'static/images');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.json({ files });
  });
});

app.use('/api/admin', require('./routes/admin.route'))
app.use('/api/events', require('./routes/events.route')) 
app.use('/api/categories', require('./routes/categories.route')) 
app.use('/api/file', require('./routes/file.route'))

const start = async () => {
   try{
      mongoose.set("strictQuery", true);
      await mongoose.connect(process.env.URL_MONGO, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('Connect MongoDB');
      app.listen(PORT, () => {
         console.log("Server listening on port " + PORT)
      })
   }
   catch(err){
      console.error(err)
   }
}

start()
