
import request from "supertest";
import app from "../app";
const mockedAdmin = {
    name: "guiAdmin",
    password: "1234@",
    isAdmin: true,
    job: 'dev'

};

const mockedAdminLogin = {
    name: "guiAdmin",
    password: "1234@",
}

const mockedUser = {
    name: "guiUser",
    password: "12345#W",
    isAdmin: false,
    job: 'dev'
};

const mockedUserLogin = {
    name: "guiUser",
    password: "12345#W",
}

describe("/users", () => {
    test("POST /users -  Must be able to create a user", async () => {
        const response = await request(app).post("/users").send(mockedUser);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("isAdmin");
        expect(response.body).toHaveProperty("job");
        expect(response.body).not.toHaveProperty("password");

        expect(response.body.name).toEqual("guiUser");
        expect(response.body.job).toEqual("dev");

        expect(response.status).toBe(201);
    });

    test("POST /users -  should not be able to create a user that already exists", async () => {
        const response = await request(app).post("/users").send(mockedUser);
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("GET /user -  should be able to list an user", async () => {
        const response = await request(app).get("/user").query({ name: 'guiUser' });
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("isAdmin");
        expect(response.body).toHaveProperty("job");
        expect(response.body).not.toHaveProperty("password");
        expect(response.status).toBe(200);
    });

    test("GET /user -  should be able to check access times", async () => {
        const response = await request(app).get("/users/access").query({ name: 'guiUser' });
        expect(response.body.message).toBe("Usuário guiUser foi lido 1 vezes.");
        expect(response.status).toBe(200);
    });

    test("PUT /users/:id -  should not to be able to update another user if is not admin", async () => {
        const newValuesUser = {
            name: "Joao",
        };
        const userLoginResponse = await request(app)
            .post("/auth/login")
            .send(mockedUserLogin);

        const response = await request(app)
            .put("/users/1")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send(newValuesUser);
        expect(response.body).toHaveProperty("message");

        expect(response.status).toBe(403);
    });

    test("PUT /users/:id -  owner should be able to update ", async () => {
        const newValuesUser = {
            name: "Joao",
        };
        const userLoginResponse = await request(app)
            .post("/auth/login")
            .send(mockedUserLogin);
        console.log(userLoginResponse.body)
        const response = await request(app)
            .put("/users/2")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send(newValuesUser);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body.name).toBe("Joao");
        expect(response.status).toBe(200);
    });

    test("PUT /users/:id -  admin should be able to update another user ", async () => {
        await request(app).post("/users").send(mockedAdmin);

        const newValuesUser = {
            name: "UserEdit",
        };
        const userLoginResponse = await request(app)
            .post("/auth/login")
            .send(mockedAdminLogin);

        const response = await request(app)
            .put("/users/2")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
            .send(newValuesUser);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body.name).toBe("UserEdit");
        expect(response.status).toBe(200);
    });

    test("DELETE /users/:id -  admin should be able to delete an user ", async () => {
        const newValuesUser = {
            name: "UserEdit",
        };
        const userLoginResponse = await request(app)
            .post("/auth/login")
            .send(mockedAdminLogin);

        const response = await request(app)
            .delete("/users/2")
            .set("Authorization", `Bearer ${userLoginResponse.body.token}`)

        expect(response.status).toBe(204);
        // check database

        const resAllUsers = await request(app).get('/users')

        expect(resAllUsers.body).toHaveLength(2);

    });
    // test("PUT /users/:id -  should be able to update an user", async () => {
    //     const newValuesUser = {
    //         name: "Joao",
    //     };
    //     const userLoginResponse = await request(app)
    //         .post("/auth/login")
    //         .send(mockedUserLogin);

    //     const response = await request(app)
    //         .put("/users/2")
    //         .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
    //         .send(newValuesUser);
    //     console.log(data)

    //     expect(response.body).toHaveProperty("id");
    //     expect(response.body).toHaveProperty("name");
    //     expect(response.body).toHaveProperty("isAdmin");
    //     expect(response.body.name).toEqual("Joao");

    //     expect(response.body).toHaveProperty("job");
    //     expect(response.body).not.toHaveProperty("password");
    //     expect(response.status).toBe(200);
    // });
});
