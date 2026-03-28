import express from 'express';
import RouteTask from './routers/task.js';

const app =express();

app.use(express.json());

app.use('/tasks',RouteTask);

app.listen(3000,()=>{
    console.log('server running at http://localhost:3000');
})