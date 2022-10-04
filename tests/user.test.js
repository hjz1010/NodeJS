const request = require('supertest');

const { createApp } = require('../app1')

// 테스트용 DB 연결하기
const { DataSource } = require('typeorm')
const myDataSource = new DataSource ({
    type    : process.env.TYPEORM_CONNECTION,
    host    : process.env.TYPEORM_HOST,
    port    : process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})
// initialize는 beforeAll 안에서!

describe("User sign up test", () => {
		let app;

		beforeAll(async () => {
				app = createApp();
				await myDataSource.initialize()
		})
		afterAll(async () => {
				await myDataSource.query(`TRUNCATE users`)
				await myDataSource.destroy()  // 테스트 후 DB 연결 끊어주기!
		})
		test("SUCCESS: create user", async () => {
				await request(app)
						.post("/users/signup")
						.send({
                            data: {
                                name: "SungJin",
                                email: "melony@wecode.com", 
                                password: "password111"
                            }
                        })
						.expect(200);
		})
})
