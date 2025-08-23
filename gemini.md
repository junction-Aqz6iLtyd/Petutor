- [ ]  예문
- [ ]  퀴즈
- [ ]  난이도 파악

<aside>
✅

## 서버 관련 정보

- API Domain : [https://junction-backend-production.up.railway.app](https://junction-backend-production.up.railway.app/pet)
</aside>

<aside>
🔒

## Auth

- [ POST ] 로그인 `/auth/login`
    - 현재는 플랫폼이 web일때만 로그인 가능
    - Mory 코드 참고
    - Mory

        ```tsx
        // Auth.tsx
        export const googleSignInApi = async () => {
          try {
            const redirectUri =
              Platform.OS === "web"
                ? "http://localhost:**8081**/oauth" // 또는 배포된 웹 주소
                : Linking.createURL("oauth");
            // 결과적으로 myapp://oauth 로 리다이렉트 됨
        
            const result = await WebBrowser.openAuthSessionAsync(
              `${API_BASE_URL}/auth/google`,
              redirectUri
            );
            console.log('A');
            if (result.type === "success" && result.url) {
              console.log('B');
              const url = new URL(result.url);
              return {
                status: url.searchParams.get("status"),
                accessToken: url.searchParams.get("accessToken"),
                email: url.searchParams.get("email"),
                name: url.searchParams.get("name"),
                provider: url.searchParams.get("provider"),
              };
            }
        
            throw new Error("Google 로그인 실패");
          } catch (error) {
            console.error("Error in googleSignInApi:", error);
            throw error;
          }
        };
        ```


    Request
    
    ```json
    {
      "email" : "korean1790@gmail.com",
      "password" : "1234"
    }
    ```
    
    Response
    
    - 받은 accessToken은 요청할때 마다 Header > Bearer Token에 넣어주세요
    
    ```json
    {
    	accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJrb3JlYW4xNzkwQGdtYWlsLmNvbSIsIm5hbWUiOiLsnbTsnqztl4wiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1MTc5NjE2NiwiZXhwIjoxNzUxODEwNTY2fQ.8__MrfJ0oq20P2JU7YA2FhLMRdLVEE6NDtuudQA6i-8"
    }
    ```

- [ POST ]  회원가입 `/auth/register`

  Request

    ```json
    {
        "name": "Guest",
        "email": "guest",
        "password": "guest"
    }
    ```

  Response

    ```json
    {
        "email": "guest",
        "id": 1,
        "name": "홍길동",
        "password": "$2b$10$Sn7LsO0X5EAzWLvsEaOeJOzDLD9qWzSWUlH/iG4yP0IccCVigYLfi",
        "point": 1000
    }
    ```

- [ DELETE ] 회원탈퇴 `/auth/me`

    ```json
    {
        "raw": [],
        "affected": 1
    }
    ```

</aside>

<aside>
🗨️

## Words

- [ GET ] 단어장 목록 `/words`

    ```java
    [
        {
            "createdAt": "2025-08-23T03:23:23.196Z",
            "id": 2,
            "name": "테스트 단어장",
            "words": []
        },
        {
            "createdAt": "2025-08-23T03:25:44.668Z",
            "id": 3,
            "name": "테스트 단어장22",
            "words": []
        }
    ]
    ```

- [ GET ] 단어장 조회 `/words/:id`

    ```java
    {
        "createdAt": "2025-08-23T03:23:23.196Z",
        "id": 2,
        "name": "테스트 단어장",
        "words": [
            {
                "createdAt": "2025-08-23T03:33:48.612Z",
                "english": "apple",
                "id": 2,
                "isHighlight": false,
                "korean": "사과"
            },
            {
                "createdAt": "2025-08-23T03:34:01.610Z",
                "english": "banana",
                "id": 3,
                "isHighlight": false,
                "korean": "바나나"
            },
            {
                "createdAt": "2025-08-23T03:34:18.532Z",
                "english": "pineapple",
                "id": 4,
                "isHighlight": false,
                "korean": "피네프레"
            }
        ]
    }
    ```

- [ POST ] 단어장 추가 `/words`

  Request

    ```java
    {
    	"english":"테스트 단어장"
    }
    ```

  Response

    ```java
    {
        "createdAt": "2025-08-23T03:23:23.196Z",
        "id": 2,
        "name": "테스트 단어장",
        "user": {
            "id": 1
        },
        "words": []
    }
    ```

- [ POST ] 단어장 단어 추가 `/words/:listId`

  Request

    ```java
    {
    		"english": "pineapple",
        "korean": "피네프레"
    }
    ```

  Response

    ```java
    {
        "createdAt": "2025-08-23T03:34:18.532Z",
        "english": "pineapple",
        "korean": "피네프레",
        "id": 4,
        "isHighlight": false,
        "wordList": {
            "id": 2
        }
    }
    ```

- [ PATCH ] 단어장 단어 수정 `/words/:listId/:wordId`

  Request

    ```java
    {
    	"english": "modify",
    	"korean": "수정하다2"
    }
    ```

  Response

    ```java
    {
        "createdAt": "2025-08-23T03:38:17.568Z",
        "english": "modify",
        "id": 7,
        "isHighlight": false,
        "korean": "수정하다"
    }
    ```

- [ DELETE ] 단어장 삭제 `/words/:id`
- [ DELETE ] 단어 삭제 `/words/:listId/:wordId`
</aside>

<aside>
🐈

## Pet

- [ GET ] 자신의 펫 조회 `/pet`


- [ GET ] 장식품 선택하기 `/pet/select/deco`
    - /pet/select/deco?decoId=1

    ```java
    {
        "decos": [
            {
                "decoType": "species",
                "id": 1,
                "itemId": 1,
                "name": "여행가는 야옹이",
                "price": 1000
            }
        ],
        "id": 1,
        "selectedDecoId": 1
    }
    ```


</aside>

<aside>
🎀

## Decos

- [ GET ] 장식품 목록 `/decos`

    ```java
    [
        {
            "decoType": "species",
            "id": 1,
            "itemId": 1,
            "name": "여행가는 야옹이",
            "price": 0
        },
        {
            "decoType": "species",
            "id": 2,
            "itemId": 2,
            "name": "집 가는 멍뭉이",
            "price": 1000
        },
        {
            "decoType": "species",
            "id": 3,
            "itemId": 3,
            "name": "화난 햄찌",
            "price": 1100
        }
    ]
    ```

- [ GET ] 장식품 상점 `/shop`

    ```java
    [
        {
            "decoType": "species",
            **"hasDeco": true,** // 이거 추가됨
            "id": 1,
            "itemId": 1,
            "name": "여행가는 야옹이",
            "price": 1000
        },
        {
            "decoType": "species",
            "hasDeco": false,
            "id": 2,
            "itemId": 2,
            "name": "집 가는 멍뭉이",
            "price": 1000
        },
        {
            "decoType": "species",
            "hasDeco": false,
            "id": 3,
            "itemId": 3,
            "name": "화난 햄찌",
            "price": 1100
        }
    ]
    ```

- [ GET ] 장식품 상세정보 `/decos/detail/:id`

    ```java
    {
        "decoType": "species",
        "id": 1,
        "itemId": 1,
        "name": "여행가는 야옹이",
        "price": 1000
    }
    ```

- [ GET ] 장식품 구매 `/decos/buy`
    - /decos/buy?decoId=1

    ```java
    
    {
        "decos": [
            {
                "decoType": "species",
                "id": 1,
                "itemId": 1,
                "name": "여행가는 야옹이",
                "price": 1000
            }
        ],
        "id": 1,
        "selectedDecoId": 0,
        "selectedItemId": 0
    }
    ```

- [ GET ] 기본 장식품 품목 설정 `/decos/init`
</aside>

<aside>
⚽

## Goals

- [ GET ] 목표 조회 `/goals`

    ```java
    [
        {
            "content": "2시간",
            "id": 2,
            "isEveryday": false,
            "title": "독해",
            "week": [
                0,
                1,
                3
            ]
        },
        {
            "content": "8시간",
            "id": 3,
            "isEveryday": false,
            "title": "독해",
            "week": [
                0,
                1,
                2
            ]
        },
        {
            "content": "world!",
            "id": 4,
            "isEveryday": false,
            "title": "Hello",
            "week": [
                0,
                1,
                3
            ]
        }
    ]
    ```

- [ GET ] 목표 상세정보 조회 `/goals/:id`

    ```java
    {
        "content": "world!",
        "id": 4,
        "isEveryday": false,
        "title": "Hello",
        "week": [
            0,
            1,
            3
        ]
    }
    ```

- [ POST] 목표 생성 `/goals`

  Request

    ```java
    {
        "title": "독해",
        "content": "1시간",
        "week": [0, 1, 3],
        "isEveryday": false
    }
    ```

  Response

    ```java
    {
        "content": "1시간",
        "id": 2,
        "isEveryday": false,
        "title": "독해",
        "user": {
            "id": 1
        },
        "week": [0, 1, 2]
    }
    ```

- [ PATCH ] 목표 수정 `/goals/:id`

  Request

    ```java
    {
        "title": "Hello",
        "content": "world!",
        "week": [0, 1, 3],
        "isEveryday": false
    }
    ```

  Response

    ```java
    {
        "content": "1시간",
        "id": 2,
        "isEveryday": false,
        "title": "독해",
        "user": {
            "id": 1
        },
        "week": [0, 1, 2]
    }
    ```

- [ DELETE ] 목표 수정 `/goals/:id`
</aside>