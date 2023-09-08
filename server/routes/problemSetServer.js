const express =require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Problems = require('../../dbms/schema/ProblemSchema');
const {connectToDB,searchRecord,createRecord} = require('../../dbms/db');

connectToDB("problems");

router.get('/all',auth,async (req,res)=>{
    const problems = await searchRecord(Problems,{});
    res.status(200).send({'problemSet':problems});
});

router.get('/:problemId',auth, async (req,res)=>{
    const problemId = req.params.problemId;
    const problem = await searchRecord(Problems,{_id:problemId});
    res.status(200).send(problem);
});

router.post('/addProblem',auth, async (req,res)=>{
   const newProblem = req.body;
   await createRecord(Problems, newProblem);
   res.status(201).send({'msg':'Problem added'});
});

module.exports= router;