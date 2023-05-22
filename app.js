const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my-database");


// E-mail
const emailSchema = new mongoose.Schema({
    content: String,
    from: String,
    to: String
 });
 
 // Senha
 const passwordSchema = new mongoose.Schema({
    content: String,
 });
 
 // Imagem
 const imageSchema = new mongoose.Schema({
    title: String,
    image: String,
 });
 
 // Resultado
 const resultSchema = new mongoose.Schema({
    content: String,
 });
 
 // Criar os modelos
 const Email = mongoose.model("Email", emailSchema);
 const Password = mongoose.model("Password", passwordSchema);
 const Image = mongoose.model("Image", imageSchema);
 const Result = mongoose.model("Result", resultSchema);
 
 // Relacionamentos
 const relationSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Email"
    },
    password: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Password"
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result"
    }
 });
 
 const Relation = mongoose.model("Relation", relationSchema);

 //Criar
app.post("/create-email", (req, res) => {
    const newEmail = new Email({
        content: req.body.emailContent,
        from: req.body.emailFrom,
        to: req.body.emailTo
    });  
     
    newEmail.save().then(() => {
        res.json({status: "email_created"});
    })
 });
 
 //Recuperar
 app.get("/get-emails", (req, res) => {
    Email.find().then((emails) => {
        res.json(emails);
    });
 });
 
 //Atualizar
 app.put('/update-email/:id', (req, res) => {
   Email.findByIdAndUpdate(req.params.id, {
       content: req.body.emailContent,
       from: req.body.emailFrom,
       to: req.body.emailTo
   }, {new: true}).then(() => {
       res.json({ status: 'email_updated' });
   });
 });
 
 //Deletar
 app.delete('/delete-email/:id', (req, res) => {
   Email.findByIdAndDelete(req.params.id).then(() => {
       res.json({ status: 'email_deleted' });
   });
 });

 app.listen(3000, () => {
    console.log('Server running on port 3000');
 });

