# Introduce V0.0 (2024.02 서비스 예정)

![image](https://github.com/yjglab/Hoolter/assets/70316567/110aaf64-15c3-4e6b-babd-d673f98d4294)

Author/Developer: Jaekyeong Yuk

#### 기술 태그

> Frontend

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

> Backend

<img src="https://img.shields.io/badge/nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
<img src="https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white">
<img src="https://img.shields.io/badge/postgre sql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
</div>

## 기능 기획 문서

#### 구현 리스트 (추가 중)

> 프로젝트

- UPLOAD

1. 업로드 폼에 정보(github 또는 behance link, 섹션별 헤더, 섹션별 설명, 사진 8p이내(이미지 링크 또는 업로드, 업로드 시 최대 2MB로 자동 압축)), 기술 스택 정보 제출. 제출 후 제출 버튼 비활성.
2. 프로젝트 대기 상태
3. 어드민 이메일로 제출 정보 발송
4. 어드민 페이지 확인
   5-1. 업로드 승인 시 페이지에 기재
   5-2. 업로드 반려 시 대기 상태 유지. 대기 상태의 포스트 정보 수정 가능. 재요청 시도 가능. 재요청 후 제출 버튼 비활성.

- OFFER FOR PLAN

1. 추천/찜/평점 입력
2. 단일 프로젝트 대상 실시간 채팅
3. 단일 프로젝트 대상 코멘트
4. 섹션별 키워드 모달 (10회, Free Plan / 100회, Pro Plan)
5. 프라이빗 프로젝트 (Pro Plan Only)

- REMOVE

1. 삭제 사유 입력(선택 5, 직접입력 1) 제출(어드민 이메일로 전송) 및 삭제 대기 상태로 변경
2. 어드민 페이지 확인
3. 삭제 승인 후 완전 삭제

- FILTERING

1. 기본 랜덤
2. 기술 스택
3. 가장 많은 추천을 받은 순
4. 가장 높은 평점 순
5. 가장 많은 조회를 받은 순

> 회원

- AUTHENTICATION

1. JWT 토큰 로컬/소셜 로그인/레지스트레이션

- PROFILE

1. 아바타 랜덤시드 기본사용 및 커스텀 수정
2. 표시 이름/소개
3. 포지션 (1회 변경 제한)
4. 비밀번호 (bcrypt, 단방향 암호화-DB)
5. 이메일 (cryptoJS, 양방향 암호화-DB, 복호화-클라이언트)
6. 플랜 (User/Pro/Expert)

- REMOVE

1. 이메일 인증 시도
2. 관련 데이터 완전 삭제

> ETC.

1. 그룹 / 프라이빗 채팅 (Pro Plan Only)
2. Rate limiting

#### DB 테이블 설계

> 사용자 & 포스트 Data Types

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DB_URL")
}

model User {
  provider      Provider
  providerId    String?
  id            String            @id
  email         String            @unique
  displayName   String            @unique
  password      String
  position      String
  about         String            @default("")
  plan          UserPlan          @default(user)
  planExpiry    DateTime?
  accountStatus AccountStatus     @default(pending)
  avatar        String?           @default("")
  Projects      UserProject[]
  LikedProjects UserProjectLike[]
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @default(now())
}

model UserProject {
  projectId   String            @id
  category    String
  title       String
  subTitle    String
  thumbnail   String
  description String
  Source      ProjectSource?
  grades      Float             @default(0)
  skills      String[]
  Likers      UserProjectLike[]
  Sections    Section[]
  private     Boolean           @default(false)
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  User        User              @relation(fields: [userId], references: [id])
  userId      String
}

model UserProjectLike {
  userId      String
  projectId   String
  User        User        @relation(fields: [userId], references: [id])
  UserProject UserProject @relation(fields: [projectId], references: [projectId])
  createdAt   DateTime    @default(now())

  @@id([projectId, userId])
}

model Section {
  sectionId   Int         @id @default(autoincrement())
  name        String
  description String
  images      Json[] // { src, alt }[]
  Keywords    Keyword[]
  Project     UserProject @relation(fields: [projectId], references: [projectId])
  projectId   String
}

model Keyword {
  name      String  @id
  image     Json // { src, alt }
  Section   Section @relation(fields: [sectionId], references: [sectionId])
  sectionId Int
}

model ProjectSource {
  name      String
  link      String      @id
  owner     String
  Project   UserProject @relation(fields: [projectId], references: [projectId])
  projectId String      @unique
}

enum UserPlan {
  user
  pro
  expert
  manager
  admin
}

enum Provider {
  local
  google
  facebook
  kakao
}

enum AccountStatus {
  pending
  verified
  banned
}
```

### References

- [JWT Refresh Token Implementation](https://wanago.io/2020/09/21/api-nestjs-refresh-tokens-jwt/)
- [nestjs+prisma](https://docs.nestjs.com/recipes/prisma)

### Memo

- prisma asia timezone 문제있음.

![image](https://github.com/yjglab/nebaram/assets/70316567/5bc77120-ce07-4052-9db3-460c082852b1)
