const express = require('express');
const router = express.Router();
const {searchRecord,connectToDB,createRecord} = require('../../dbms/db');
const Submissions = require('../../dbms/schema/SubmissionsSchema');
const Users = require('../../dbms/schema/UserSchema');
const auth = require('../../middleware/auth');

connectToDB("submissions");

//get all submissions of a particular user
router.get('/users/:userId/all', auth, async (req, res) => {
    const userId = req.params.userId;
    const allSubmissionsOfReqUser = await searchRecord(Submissions, { userId });
    const submissionsWithSpecificFields = allSubmissionsOfReqUser.map(submission=>{
        return {
            "Language":submission.language,
            "Code":submission.code,
            "Problem Id":submission.problemId

        }
    })
    res.status(200).send(submissionsWithSpecificFields);
});

//get all submissions on a particular problem
router.get('/problems/:problemId/all', auth, async (req, res) => {
    const problemId = req.params.problemId;
    const allSubmissionsOfReqUser = await searchRecord(Submissions, { problemId });
    const submissionsWithSpecificFields = allSubmissionsOfReqUser.map(submission=>{
        return {
            "Language":submission.language,
            "Code":submission.code,
            "User Id":submission.userId
        }
    })
    res.status(200).send(submissionsWithSpecificFields);
});
router.post('/',auth,async (req, res)=>{
    const userQuery = searchRecord(Users, { email: req.body.userId }).select("_id");  //getting the user id from user email provided in request body
    const user = await userQuery.exec();
    req.body.userId = user[0];
    await createRecord(Submissions,req.body)
    res.status(200).send({"msg":"Submitted successfully!"});
})

module.exports = router;