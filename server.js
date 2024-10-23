const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB 88FEoS3NcXbxFN3C
const mongoose = require('mongoose');
const uri = "mongodb+srv://maksimmaksimum:88FEoS3NcXbxFN3C@cluster0.xhf47.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("MongoDB connected");

    // Запуск сервера только после успешного подключения к базе данных
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


// Определение модели
const Contact = mongoose.model('Contact', new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
}));

// Маршруты API
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts);
    } catch (error) {
        res.status(500).send('Error fetching contacts');
    }
});

app.post('/api/contacts', async (req, res) => {
    try {
        const contact = new Contact({
            name: req.body.name,
            phone: req.body.phone
        });
        await contact.save();
        res.send(contact);
    } catch (error) {
        res.status(500).send('Error saving contact');
    }
});

app.put('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone
        }, { new: true });
        res.send(contact);
    } catch (error) {
        res.status(500).send('Error updating contact');
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.send(contact);
    } catch (error) {
        res.status(500).send('Error deleting contact');
    }
});
