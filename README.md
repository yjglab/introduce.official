# Nebaram Hoolter V0.0 (2023.12 서비스 예정)

![image](https://github.com/yjglab/Hoolter/assets/70316567/9b823283-9168-4fd2-be2e-cb6485378346)

Author: Jaekyeong Yuk

#### 기술 태그

<div> 
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/Redux--Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=Tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/Emotion-569A31?style=for-the-badge&logo=Emotion&logoColor=white">
<img src="https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=Framer&logoColor=white">
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img src="https://img.shields.io/badge/postgre sql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
</div>

## 기획 문서

#### 구현할 기능 리스트 (추가 중)

> 프로젝트 업로드 과정

1. 업로드 폼에 정보(github 또는 behance link, 섹션별 헤더, 섹션별 설명, 사진 8p이내(이미지 링크 또는 업로드, 업로드 시 최대 2MB로 자동 압축)), 기술 스택 정보(검색 기능 algolia 도입) 제출. 제출 후 제출 버튼 비활성.
2. 프로젝트 대기 상태
3. 어드민 이메일로 제출 정보 발송
4. 어드민 페이지 확인
   5-1. 업로드 승인 시 페이지에 기재
   5-2. 업로드 반려 시 대기 상태 유지. 대기 상태의 포스트 정보 수정 가능. 재요청 시도 가능. 재요청 후 제출 버튼 비활성.

> 프로젝트 포스트 기능

- 찜 기능
- 추천 기능
- 평점 입력 기능 (1-5)

> 프로젝트 삭제 기능

1. 삭제 사유 입력(선택 5, 직접입력 1) 제출(어드민 이메일로 전송) 및 삭제 대기 상태로 변경
2. 어드민 페이지 확인
3. 삭제 승인 후 완전 삭제

> 프로젝트 필터

- 기본 랜덤
- 기술 스택
- 가장 많은 추천을 받은 순
- 가장 높은 평점 순
- 가장 많은 조회를 받은 순

> 사용자 프로필

- Avvvatar 아바타 사용
- 닉네임
- 비밀번호 (bcrypt, 단방향 암호화-DB)
- 이메일 (cryptoJS, 양방향 암호화-DB, 복호화-클라이언트)

> 사용자 삭제

- 이메일 인증 시도
- 인증키 확인
- 관련 데이터 완전 삭제

#### DB 테이블 설계

> 사용자 & 포스트 Data Types

```json
{
    "email": "30자 이내 string",
    "name": "10자 이내 string",
    "password": "300자 이내 string(hashed)",
    "social": {
        "id": "100자 이내 string",
        "name": "20자 이내 string",
    },
    "class": "normal", // normal, pro
    "position": "20자 이내 string", // developer, designer, general
    "admin": "boolean",
    "Posts": {
        "project": [
            {
                "id": "number",
                "type": "project",
                "category": "20자 이내 string",
                "title": "20자 이내 string",
                "description": "500자 이내 string",
                "source": {
                    "name": "string(선택)",
                    "link": "300자 이내 string",
                    "owner": "20자 이내 string",
                },
                "skills": [
                    {
                        "name": "20자 이내 string(선택)",
                    }
                ],
                "sections": [
                    {
                        "header": "20자 이내 string",
                        "description": "500자 이내 string",
                        "images": [
                            {
                                "src": "300자 이내 string",
                            }
                        ]
                    }
                ],
                "grades": "float number",
                "likers": [
                    {
                        "name": "10자 이내 string(user name)",
                    }
                ],
                "markers": [
                    {
                        "name": "10자 이내 string(user name)",
                    }
                ]
            }
        ],
        "finding": [
            {
                "id": "number",
                "type": "finding",
                "category": "20자 이내 string",
                "title": "20자 이내 string",
                "description": "500자 이내 string",
                "skills": [
                    {
                        "name": "20자 이내 string(선택)",
                    }
                ],
                "sections": [
                    {
                        "header": "20자 이내 string",
                        "description": "500자 이내 string",
                        "images": [
                            {
                                "src": "300자 이내 string",
                            }
                        ]
                    }
                ],
                "deadline": "10자 이내 string", // 2020.09.04 형식의 문자열
                "markers": [
                    {
                        "name": "10자 이내 string(user name)",
                    }
                ]
            }
        ]
    }
}
-
```

![image](https://github.com/yjglab/nebaram/assets/70316567/5bc77120-ce07-4052-9db3-460c082852b1)
