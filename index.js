const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();

const port = 8000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("Helo from the users");
});
//for the browser work.
app.get("/users", (req, res) => {
  const html = `
    <ul>

    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    

    </ul>
    
    `;
  return res.send(html);
});

//For the appWork
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  return res.json(user);
});

//create a new user

//edit a user

// app.patch('/api/users/:id',(req,res)=>{
//     return res.json({status:"pending"});
// })

// app.delete('/api/users/:id',(req,res)=>{
//     return res.json({status:"pending"});
// })

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {

    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        users.splice(index, 1);
        return res.json({ status: "User Deleted Successfully" });
    } else {
        return res.status(404).json({ error: "User not found" });
    }

  });

app.post("/api/users/", (req, res) => {
  const body = req.body;

  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
