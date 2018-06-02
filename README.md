# diary-server
> Training for android server development


# API Document
## `/users/`
### POST
**Request**
```json
{
  {
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

`username : 사용자명`
```
headers:
  authorization : "token value"
```

**Response**
> 성공하였을 경우
```json
{
  "result" : {
     "success" : true,
     "message" : "성공적으로 업데이트 되었습니다!"
  }
}
```

> 실패하였을 경우
```json
{
  "result" : {
     "success" : true,
     "message" : "권한이 없습니다!"
  }
}
```

### DELETE
**Request**

`username : 사용자명`
```
headers:
  authorization : "token value"
```

**Response**
> 성공하였을 경우
```json
{
  "result" : {
     "success" : true,
     "message" : "성공적으로 계정을 삭제하였습니다!"
  }
}
```

> 실패하였을 경우
```json
{
  "result" : {
     "success" : true,
     "message" : "권한이 없습니다!"
  }
}
```

## `/sign`
### POST
**Request**
```json
{
  "username" : "사용자명",
  "password" : "비밀번호"
}
```

**Response**
```json
 "result" : {
  "success" : true, 
  "message" : "로그인에 성공하였습니다!"
 },
 "auth" : {
  "token" : "token"
  },
  "user" : {
    "username" : "사용자명"
  }
}
```

## `/diaries/users/:username`
### GET
`username : 사용자명`
```
headers:
  authorization : "token value"
```

**Response**
> 성공하였을 경우
```json
{
  "result" : {
    "success" : true,
    "message" : "성공적으로 조회하였습니다!"
  },
  "diaries" : [{
    "title" : "제목", 
    "content" : "내용",
    "username" : "작성자명",
    "date" : "작성 날짜 및 시간"
  }]
}
```

> 실패하였을 경우
```json
{
  "result" : {
     "success" : true,
     "message" : "알 수 없는 오류가 발생하였습니다!"
  }
}
```

## `/diaries/:id`
### GET
**Request**

`id : 다이어리 아이디값`

**Response**
> 성공하였을 경우
```json
{
  "diary" : {
    "title" : "제목",
    "content" : "내용",
    "username" : "작성자명",
    "date" : "작성 날짜 및 시간"
  },
  "result" : {
    "success" : true, 
    "message" : "성공적으로 조회하였습니다!"
  }
}
```

> 실패하였을 경우
```json
{
  "result" : {
      "success" : true,
      "message" : "알 수 없는 오류가 발생하였습니다!"
  }
}
```
### POST
**Request**

`id : 다이어리 아이디값`
```json
{
  "title" : "제목", 
  "content" : "내용",
  "username" : "작성자",
}
```

**Response**
> 성공하였을 경우
```json
{
  "result" : {
    "success" : true,
    "message" : "성공적으로 작성되었습니다."
  }
}
```

> 실패하였을 경우
```json
{
  "result" : {
      "success" : true,
      "message" : "알 수 없는 오류가 발생하였습니다!"
  }
}
```

### PUT
**Request**

`id : 다이어리 아이디값`
```
header:
  authorization : "토큰값"
```
```json
{
  "title" : "제목", 
  "content" : "내용",
  "username" : "작성자",
}
```

> 성공하였을 경우
```json
{
  "result" : {
    "success" : true,
    "message" : "성공적으로 작성되었습니다."
  }
}
```

> 실패하였을 경우
```json
{
  "result" : {
      "success" : true,
      "message" : "권한이 없습니다!"
  }
}
```

### DELETE

**Request**
`id : 다이어리 아이디값`

**Response**
```json
{
  "result" : {
    "success" : true,
    "message" : "성공적으로 삭제되었습니다!"
  }
}
```

> 실패하였을 경우
```json 
{
  "result" : {
    "success" : true,
    "message" : "권한이 없습니다!"
  }
}
```
