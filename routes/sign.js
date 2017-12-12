var express = require('express');
var router = express.Router();
var User = new require('../models/User');
var jwt = require('jsonwebtoken');
const config = require("../configs/config");

router.post('/', (req, res) => {
    User.findOne({username : req.body.username}, (err, user) => {
        if(err)
            res.status(200).json({result : {success : false, message : '알 수 없는 오류가 발생하였습니다!'}});
        if(user && req.body.password === user.password) {
            let payload = {username : user.username};
            let token = jwt.sign(payload, config.salt, {algorithm : config.jwtAlgorithm} , {});
            user.password = undefined;
            res.json({
                result : {success : true, message : '로그인에 성공하였습니다!'},
                auth : {token : token},
                user : user
            });
        } else {
            res.json({result : {success : false, message : '아이디 또는 비밀번호를 확인해주세요!'}});
        }
    });
});

module.exports = router;