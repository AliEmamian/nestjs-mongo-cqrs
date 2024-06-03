const axios = require('axios').default;

const baseurl = 'http://127.0.0.1:5000/api/v1'
const username = "ali"
const password = "emamian"


describe.only('Test', () => {
  let user: any;
  let todo: any;
  let todoItem: any;

  beforeEach(async () => {
  });

  it('signup', async () => {
    user = await axios({
      method: 'POST',
      url: baseurl + '/user/signup',
      data: {
        "username": username,
        "password": password
      }
    })

    expect(user.status).toBe(201);
    expect(user.data.status).toBe(200);

  });
  it('signing', async () => {
    user = await axios({
      method: 'POST',
      url: baseurl + '/user/signing',
      data: {
        "username": username,
        "password": password
      }
    })

    expect(user.status).toBe(200);
    expect(user.data.status).toBe(200);

  });

  it('create todo-list', async () => {

    todo = await axios({
      method: 'POST',
      url: baseurl + '/todo-list',
      headers: {
        "Authorization": "Bearer " + user.data.data.accessToken
      },
      data: {
        "title": 'todo list 1',
      }
    })

    expect(todo.status).toBe(201);
    expect(todo.data.status).toBe(200);

  });
  it('get todo-list', async () => {

    todo = await axios({
      method: 'GET',
      url: baseurl + '/todo-list',
      headers: {
        "Authorization": "Bearer " + user.data.data.accessToken
      },

    })

    expect(todo.status).toBe(200);
    expect(todo.data.status).toBe(200);

  });

  it('create todo-item', async () => {

    todoItem = await axios({
      method: 'POST',
      url: baseurl + '/todo-item',
      headers: {
        "Authorization": "Bearer " + user.data.data.accessToken
      },
      data: {
        "title": "item 1",
        "description": "desc1",
        "priority": 2,
        "todoListId": todo.data.data[0]._id
      }
    })

    expect(todo.status).toBe(200);
    expect(todo.data.status).toBe(200);

  });

  it('get todo-item of todo-list', async () => {

    todoItem = await axios({
      method: 'GET',
      url: baseurl + '/todo-item/todo-list/'+todo.data.data[0]._id,
      headers: {
        "Authorization": "Bearer " + user.data.data.accessToken
      },
    })

    expect(todo.status).toBe(200);
    expect(todo.data.status).toBe(200);

  });
});
