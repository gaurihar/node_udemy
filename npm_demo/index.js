const Joi= require('joi');
const express = require('express');
//const Joi = require('joi');
const app = express(); 




const courses=[
    {id:1,name: 'course1'},
    {id:2,name:'course2'},
    {id:2,name:'course2'},

]
console.log(courses.length)
    


app.use(express.json());

// app.get(endpoint, callback)

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=>{
    res.send(["Marathi", "Hindi", "Eng"]);

});

app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);

});

// app.get('/api/posts/:year/:month/:day',(req,res)=>{
//     res.send(req.params);

// });


app.post('/api/courses',(req,res)=>{
    if (!req.body.name || req.body.name.length < 3)
    {
        res.status(400).send("Name is required and should be  minimum 3 character");
        return;
    }
    
    const course={
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course)
    res.send(course)
});

app.put('/api/courses/:id',(req,res)=>{
    // id check
    const course=courses.find(c=>c.id==parseInt(req.params.id));
    if(!course) res.status(404).send('course of given id is Not Found');
    //if invalidat return bad req

    //const result=validateCourse(req.body);
    //object destruction
    const {error}=validateCourse(req.body); //reult.error
    if(error){
    res.status(400).send(error.details[0].message)
    }


    //update

    course.name=req.body.name;
    res.send(course)

});

function validateCourse(course){
    const schema={
        name: Joi.string().min(3).required()
    };
    return Joi.valid(course,schema)
}



const port=process.env.PORT || 3000;
app.listen(port, () => console.log("Listing port 3000 ..working !!!!"));