import { Joi, Segments, celebrate, errors } from 'celebrate';
import "dotenv/config";
import { authUser } from './middlewares/authUser.middleware';
import handleErrorMiddleware from './middlewares/handleError.middleware';
import validateIsAdmOrOwner from './middlewares/validateIsAdmOrOwner.middleware';
import { getUser, getUsers } from './teste1';
import { createUser } from './teste2';
import { deleteUser } from './teste3';
import { updateUser } from './teste4';
import { getAccessTimes } from './teste5';
import { loginUser } from './teste6';

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req: Request, res: any) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.post("/auth/login", celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    password: Joi.string().required()
  }
}), loginUser)
app.get("/user", getUser);
app.get("/users", getUsers);
app.post("/users", celebrate({
  [Segments.BODY]: {
    job: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean(),
  }
}), createUser);
app.delete("/users/:id", celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().integer(),
  }
}), deleteUser);
app.put("/users/:id", celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().integer(),
  },
  [Segments.BODY]: {
    job: Joi.string().optional(),
    name: Joi.string().optional()
  }
}), authUser, validateIsAdmOrOwner, updateUser);
app.get("/users/access", getAccessTimes);

app.use(errors());
app.use(handleErrorMiddleware);

const port = 3000;

app.listen(port, function () {
  console.log("Express server listening on port " + port);
});

export default app
