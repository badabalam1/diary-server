# diary-server
> Training for android server development


# API Document
## `/users/`
### POST
**Request**
```json
{
  "result " : {
    "username" : "사용자명(String)",
    "password" : "비밀번호(String)"
  }
}
```
`profile : 프로필 사진객체`

**Response**
> 성공했을 경우
```json 
{
  "result" : {
    "success" : true,
    "message " : "등록에 성공하였습니다!"
  }
}
```

> 실패하였을 경우
```json
{
  "result" : {
    "success" : false,
    "message" : "이미 존재하는 아이디입니다!"
  }
}
```

## `/users/:username`
### GET
**Request**

`username : 사용자명`

**Response**
> 성공하였을 경우
```json
{
  "result" : {
    "success" : true, 
    "message" : "조회에 성공하였습니다!"
  },
  "user" : {
    "username " : "사용자명 (스트링)"
   }
}
```

> 실패하였을 경우
```json
{
  "result" : {
    "success" : false, 
    "message" : "알 수 없는 오류가 발생하였습니다."
  }
}
```

### PUT
**Request**
```
headers:
  authorization : "token value"
```
