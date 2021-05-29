# Nuber Eats

The Backend of Nuber Eats Clone

## 1.0 backend 구성

### Graphql

- npm i @nestjs/graphql graphql-tools graphql apollo-server-express
- code firest(autoSchemaFile: join(process.cwd(), 'src/schema.gql'),)

### TypeORM

- npm i @nestjs/typeorm typeorm pg
- npm i cross-env: 가상변수를 설정할 수 있도록 하는 라이브러리


node.js에서 base64로 표시하는 방법.
Buffer.from('api:YOUR_API_KEY').toString('base64');
