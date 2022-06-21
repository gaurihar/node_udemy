const Joi= require('joi');
const express = require('express');
//const Joi = require('joi');
const app = express(); 




const courses=[
    {id:1,name: 'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},

]
console.log(courses.length)
    


app.use(express.json());

// app.get(endpoint, callback)

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=>{
   res.send(courses);


});

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id==parseInt(req.params.id));
    console.log(course)
    if(!course) res.status(404).send('course of given id is Not Found');
    res.send(course);

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

    console.log("you are in put call");
    const course=courses.find(c=>c.id==parseInt(req.params.id));
    console.log(course)
    if(!course) res.status(404).send('course of given id is Not Found');
    //if invalidat return bad req

    
    //object destruction
    const { error }=validateCourse(req.body); //reult.error
//     if(error)
//     {
//     res.status(400).send(error.details[0].message);
//     return;
//    }
    //update
    course.name=req.body.name;
    console.log(course.name)
    res.send(course);

});


app.delete('/api/courses/:id',(req,res)=>{

    const course=courses.find(c=>c.id==parseInt(req.params.id));
    console.log(course)
    if(!course) res.status(404).send('course of given id is Not Found');
    const index=courses.includes(course);
    courses.splice(index,1);
    res.send(course);
})

function validateCourse(course){
    const schema={
        name: Joi.string().min(3).required()
    };
    return Joi.valid(course,schema)
}



const port=process.env.PORT || 3000;
app.listen(port, () => console.log("Listing port 3000 ..working !!!!"));