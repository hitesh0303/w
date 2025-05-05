const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB and create database 'music'
mongoose.connect('mongodb+srv://sarang:sarang@cluster0.oix2jzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model('songdetails', songSchema);

// c) Insert 5 documents (call only once to avoid duplicates)
app.get('/insert', async (req, res) => {
    await Song.insertMany([
        { Songname: "ABC", Film: "DEF", Music_director: "GHI", Singer: "JKL", Actor: "MNO", Actress: "PQR" },
        { Songname: "LoveYou", Film: "Star", Music_director: "A.R. Rahman", Singer: "Arijit", Actor: "SRK", Actress: "Deepika" },
        { Songname: "Peace", Film: "Calm", Music_director: "GHI", Singer: "Shreya", Actor: "Varun", Actress: "Sara" },
        { Songname: "DanceIt", Film: "Fun", Music_director: "A.R. Rahman", Singer: "Shreya", Actor: "Tiger", Actress: "Ananya" },
        { Songname: "FeelGood", Film: "Feel", Music_director: "GHI", Singer: "JKL", Actor: "MNO", Actress: "PQR" }
    ]);
    res.send("5 songs inserted.");
});

app.get('/', (req, res) => {
    res.send("Server is working fine!");
  });
  

// d) Display total count and list all
app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.send(`<h3>Total Songs: ${count}</h3><pre>${JSON.stringify(songs, null, 2)}</pre>`);
});

// e) List songs by specified Music Director
app.get('/music-director/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.json(songs);
});

// f) List songs by specified Music Director & Singer
app.get('/music-director/:md/singer/:singer', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.md, Singer: req.params.singer });
    res.json(songs);
});

// g) Delete song by name
app.delete('/delete/:name', async (req, res) => {
    await Song.deleteOne({ Songname: req.params.name });
    res.send(`Deleted song: ${req.params.name}`);
});

// h) Add new song
app.post('/add', async (req, res) => {
    const newSong = new Song(req.body);
    await newSong.save();
    res.send("New favorite song added.");
});

// i) List songs by specified singer from specified film
app.get('/film/:film/singer/:singer', async (req, res) => {
    const songs = await Song.find({ Film: req.params.film, Singer: req.params.singer });
    res.json(songs);
});

// j) Update document by adding actor and actress
app.put('/update/:name', async (req, res) => {
    const { Actor, Actress } = req.body;
    await Song.updateOne({ Songname: req.params.name }, { $set: { Actor, Actress } });
    res.send("Song updated with Actor and Actress.");
});

// k) Display data in tabular format
app.get('/table', async (req, res) => {
    const songs = await Song.find();
    let html = `
    <table border="1" cellpadding="5">
        <tr><th>Song Name</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>
    `;
    songs.forEach(s => {
        html += `<tr>
            <td>${s.Songname}</td><td>${s.Film}</td><td>${s.Music_director}</td>
            <td>${s.Singer}</td><td>${s.Actor || '-'}</td><td>${s.Actress || '-'}</td>
        </tr>`;
    });
    html += "</table>";
    res.send(html);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
