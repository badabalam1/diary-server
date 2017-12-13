var express = require('express');
var Diary = new require('../models/diary');
var router = express.Router();
var validator = require('../tools/validator');

router.get('/users/:username', (req, res) => {
    Diary.find({username : req.params.username}, (err, diaries) => {
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
    if(!validator.isLogin(req, res)) return;
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
    if(!validator.isLogin(req, res)) return;
    var id = req.params.id;
    var diaryData = validator.checkData(req, res, 'diary', false);
    if(!diaryData) return;
    Diary.findOne({_id : id}, (err, diary) => {
        if(err)
            res.json({result : {success : false, message : '해당 내용을 찾을 수 없습니다!'}});
        if(diary.username === req.user.username) {
            Diary.update({_id: id}, diaryData, (err, raw) => {
                if (err)
                    res.status(200).json({result: {success: false, message: err.message}});
                res.json({result: {success: true, message: '성공적으로 수정이 완료되었습니다.'}});
            });
        } else {
            res.json({result : {success :false, message : '권한이 없습니다!'}});
        }
    });
});

router.delete('/:id', (req, res) => {
    if(!validator.isLogin(req, res)) return;
    var id = req.params.id;
    Diary.findOne({_id : id}, (err, diary) => {
        if(err)
            res.json({result : {success : false, message : err.message}});
        if(req.user.username === diary.username) {
            diary.remove();
            res.json({result: {success: true, message: '성공적으로 삭제되었습니다!'}});
        } else {
            res.json({result : {success : false, message : '권한이 없습니다!'}});
        }
    });
});

module.exports = router;