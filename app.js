const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000

const hubkaBob = [
    {
        name: 'Hubka Bob',
        age: 18,
        gender: 'male'
    },
    {
        name: 'Hubka Bob',
        age: 16,
        gender: 'other'
    },
    {
        name: 'Hubka Bob',
        age: 5,
        gender: 'other'
    },
    {
        name: 'Hubka Bob',
        age: 20,
        gender: 'male'
    },
    {
        name: 'Hubka Bob',
        age: 19,
        gender: 'other'
    },
]

app.get('/hubkaBob', (req, res) => {
    // res.send('Hello World!')
    res.json(hubkaBob)
})

app.post('/hubkaBob', (req, res) => {
    // console.log('Post request to HubkaBob')
    // console.log(req.body)

    const hubkabob = req.body;
    hubkaBob.push(hubkabob);
    res.status(201).json({message: 'Hubka Bob Created'})
})

app.put('/hubkaBob/:id', (req, res) => {
   const {id} = req.params;

   updatedHubkaBobInfo = req.body;

   hubkaBob[+id] = updatedHubkaBobInfo;

   res.status(200).json({
       message: 'Hubka Bob update successfully',
       data: hubkaBob[id]
   })
})

app.delete('/hubkaBob/:id', (req, res) => {
    const {id} = req.params;

    hubkaBob.splice(+id, 1);

    res.status(200).json({
        message: 'Hubka Bob delete'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})