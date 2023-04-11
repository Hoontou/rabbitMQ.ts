## rabbitMQ amqplib example
내가 나중에 가져다쓰려고 만드는.

---
old

지금 example에서 amqp를 commonjs require로 가져온다.  
// i use commonjs require as importing amqplib.

import 로 하면 오류난다.
tsconfig에서 module: commonjs로 돼 있어서 그런것같다...  
각자의 환경에서 코드를 적절히 수정해야함.  
// i think because my project's tsconfig is { module:commonjs.. }.  
// i hope u find right way for importing when using my code on ur environment.
---
can handle with import * as amqp from 'amqplib';

import식으로 테스트에 성공했으면 ts가이드를 받기위해 @types/amqplib를 설치하세요.  
// if u success 'import' not 'require', install @types/amqplib for type guide

writing on fastify, ts

main codes in src
