var express = require('express');
var Diary = require('../models/diary');
var router = express.Router();

router.get('/', (req, res) => {
    Diary.find({}, (err, diaries) => {
        if(err)
            res.status(200).json({result : {success : false , message : err.message}});
        res.json({diaries : diaries, result : {success : true, message : '조회에 성공하였습니다.' }});
    }).sort({date : -1});
});

router.get('/:id', (req, res) => {
    Diary.findOne({_id : req.params.id}, (err, diary) => {
        if(err)
            res.status(200).json({result : {success : false, message :  err.message}});
        res.json({diary : diary, result : {success : true, message :  '성공적으로 조회되었습니다!'}});
    });
});

router.post('/', (req, res) => {
    req.body._id = undefined;
    req.body.date = undefined;
    Diary.create(req.body, (err, post) => {
        if(err)
            res.status(200).json({result : {success : false, message : err.message}});
        console.log(post);
        res.json({result : {success : true, message : '성공적으로 작성되었습니다.'}});
    });
});

router.put('/:id', (req, res) => {
    var id = req.params.id;
    Diary.update({_id : id}, req.body, (err, raw) => {
        if(err)
            res.status(200).json({result : {success : false, message : err.message}});
        res.json({result : {success : true, message : '성공적으로 수정이 완료되었습니다.'}});
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    Diary.findOne({_id : id}, (err, diary) => {
        if(err)
            res.json({result : {success : false, message : err.message}});
        diary.remove();
        res.json({result : {success : true, message : '성공적으로 삭제되었습니다!'}});
    });
});

module.exports = router;