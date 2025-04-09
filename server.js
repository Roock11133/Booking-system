const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = [
    { username: 'admin', password: '123', isAdmin: true },
    { username: 'customer1', password: '123', isAdmin: false },
    { username: 'customer2', password: '123', isAdmin: false },
    { username: 'customer3', password: '123', isAdmin: false }
];

let movies = [
    {
      curr_movie: 'Inception',
      screen_no: 1,
      show_time: '18:00',
      price: 200
    },
    {
      curr_movie: 'The Dark Knight',
      screen_no: 2,
      show_time: '20:30',
      price: 180
    },
    {
      curr_movie: 'Spider-Man: No Way Home',
      screen_no: 3,
      show_time: '22:00',
      price: 150
    }
  ];
  
  let bookings = [
    { ticket_no: 'T001', movie_name: 'Inception', show_time: '18:00', movie_date: '2024-04-10', screen_no: 1, user_id: 'customer1' },
    { ticket_no: 'T002', movie_name: 'The Dark Knight', show_time: '20:30', movie_date: '2024-04-11', screen_no: 2, user_id: 'customer1' },
    { ticket_no: 'T003', movie_name: 'Spider-Man: No Way Home', show_time: '22:00', movie_date: '2024-04-12', screen_no: 3, user_id: 'customer2' },
    { ticket_no: 'T004', movie_name: 'Inception', show_time: '18:00', movie_date: '2024-04-13', screen_no: 1, user_id: 'customer2' },
    { ticket_no: 'T005', movie_name: 'The Dark Knight', show_time: '20:30', movie_date: '2024-04-14', screen_no: 2, user_id: 'customer3' },
    { ticket_no: 'T006', movie_name: 'Spider-Man: No Way Home', show_time: '22:00', movie_date: '2024-04-15', screen_no: 3, user_id: 'customer3' }
  ];
  

let payments = [
    { ticket_no: 'T001', movie_date: '2024-04-10', bank_name: 'TTB Bank' },
    { ticket_no: 'T003', movie_date: '2024-04-12', bank_name: 'K Bank' },
    { ticket_no: 'T005', movie_date: '2024-04-14', bank_name: 'Bangkok Bank' }
];

let cancelled = [];


app.post('/api/auth/register', (req, res) => {
    const user = { ...req.body, isAdmin: false };
    users.push(user);
    res.send('User registered!');
});

app.post('/api/auth/login', (req, res) => {
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
    if (!user) return res.status(401).send('Invalid credentials');
    res.json({ isAdmin: user.isAdmin, userId: user.username });
});

app.post('/api/movies', (req, res) => {
    const movie = { ...req.body, price: parseFloat(req.body.price) };
    movies.push(movie);
    res.send('Movie added!');
});

app.get('/api/movies', (req, res) => {
    res.json(movies);
});

app.post('/api/bookings', (req, res) => {

    bookings.push(req.body);
    res.send('Ticket booked!');
});

app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

app.post('/api/payments', (req, res) => {
    payments.push(req.body);
    res.send('Payment recorded!');
});

app.get('/api/payments', (req, res) => {
    res.json(payments);
});

app.post('/api/cancel', (req, res) => {
    const index = bookings.findIndex(b => b.ticket_no === req.body.ticket_no);
    if (index === -1) return res.status(404).send('Ticket not found');
    const removed = bookings.splice(index, 1)[0];
    cancelled.push({
        movie_name: removed.movie_name,
        show_time: removed.show_time,
        show_date: removed.movie_date,
        ticket_no: removed.ticket_no
    });
    res.send('Ticket cancelled');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
