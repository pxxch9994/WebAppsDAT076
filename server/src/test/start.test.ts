import * as SuperTest from "supertest";
import { app } from "../start";
import { User } from "../model/userModel";
import { userRouter } from "../router/userRouter";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const testname = "Pelle";

    const res1 = await request.post("/user/users").send({name : testname});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.name).toEqual(testname);

    const res2 = await request.get("/user/users");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((user : User) => user.name)).toContain(testname);


});

test("End-to-end test", async () => {
    const testname2 = 444444;
    const res3 = await request.post("/user/users").send({name : testname2});
    expect(res3.statusCode).toEqual(400);
});

