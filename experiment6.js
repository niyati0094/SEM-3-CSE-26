const express = require('express');
const app = express();
let students = [
    { id: 1, name: "Rahul", branch: "Cse" },
    {id: 2, name: "Aman", branch: "IT" }
];
app.get('/students', (req, res) => {
    res.json(students);
});
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
