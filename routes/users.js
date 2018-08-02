var express = require('express');
var router = express.Router();
var User = new require('../models/User');
var validator = require('../tools/validator');

router.post('/', (req, res) => {
    var userData = validator.checkData(req, res, 'basic', true);
    if(!userData) return;
    User.findOne({username : req.body.username}, (err, user) => {
        if(err)
            res.status(200).json({result : {success : false, message : '알 수 없는 오류가 발생하였습니다!'}});
        if(!user) {
                if(req.files && req.files.profile)
                    req.files.profile.mv(`${__dirname}/../public/images/${userData.username}.jpg`, (err) => {
                        if (!err) {
                            var user = new User(userData);
                            user.save();
                            res.json({result: {success: true, message: '등록에 성공하였습니다!'}});
                        }
                        else
                            res.status(200).json({result: {success: true, message: err.message}});
                    });
                else {
                    res.json({result: {success: true, message: '프로필 이미지를 등록해주세요'}});
                }
        } else
            res.json({result : {success :false, message : '이미 존재하는 아이디입니다!'}});
    });
});

router.get('/:username', (req, res) => {
    User.findOne({username : req.params.username}, (err, user) => {
        if(err)
            res.status(200).json({result : {success : false, message : '알 수 없는 오류가 발생하였습니다.'}});
        res.json({
            result : {success : false, message : '계정 조회에 성공하였습니다!'},
            user : user
        });
    }).select('-password');
});

router.put('/:username', (req, res) => {
    if(!validator.isLogin(req, res)) return;
    var userData = validator.checkData(req, res, 'basic', false);
    if(!userData) return;
    if (req.user.username === req.params.username) {
        User.update({username: req.params.username}, userData, (err, user) => {
            if (err)
                res.status(200).json({result: {success: false, message: '알 수 없는 오류가 발생하였습니다!'}});
            User.findOne({username : req.params.username}, (err, result) => {
                if (err) throw err;
                if (req.files && req.files.profile)
                    req.files.profile.mv(`${__dirname}/../public/images/${req.params.username}.jpg`, (err) => {
                        if(err) {
                            console.log(err);
                            res.status(200).json({result: {success: false, message: '알 수 없는 오류가 발생하였습니다!'}});
                        }
                        let payload = {username : result.username};
                        let token = jwt.sign(payload, config.salt, {algorithm : config.jwtAlgorithm} , {});            
                            res.json({result: {
                                success: true,
                                message: err.message,
                                token : token}});
                    });
                res.json({
                    result: {success: true, message: '성공적으로 업데이트 되었습니다!'},
                    user: result
                });
            }).select('-_id')
        });
    } else {
        res.json({result: {success: false, message: '권한이 없습니다!'}});
    }
});

router.delete('/:username', (req, res) => {
    if(!validator.isLogin(req, res)) return;
    if(req.user.username === req.params.username) {
        User.findOne({username: req.params.username}, (err, user) => {
            if (err)
                res.status(200).json({result: {success: false, message: '알 수 없는 오류가 발생하였습니다!'}});
            user.remove();
            res.json({result: {success: true, message: '성공적으로 계정을 삭제하였습니다!'}});
        });
    } else {
        res.json({result : {success : false, message : '권한이 없습니다!'}});
    }
});

module.exports = router;