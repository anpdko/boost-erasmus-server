require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path')
const fs = require('fs');

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

 function readFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.flatMap(file => {
      const filePath = path.join(dir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        return readFiles(filePath).map(subFile => path.join(file, subFile));
      } else {
        return file;
      }
    });
  }

  const allFiles = readFiles(folderPath);

  res.json({ files: allFiles });
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
