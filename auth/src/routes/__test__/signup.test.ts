import request from 'supertest';
import { app } from '../../app';

it('return 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
      confirmPassword: '12123132133',
    })
    .expect(201);
});

it('return 400 on invalid credetial', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1.com',
      password: '12123132133',
      confirmPassword: '12123132133',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '1',
      confirmPassword: '1',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
      confirmPassword: '12123132',
    })
    .expect(400);
});

it('dissalows duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
      confirmPassword: '12123132133',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
      confirmPassword: '12123132133',
    })
    .expect(400);
});

it('set cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test1@test2.com',
      password: '12123132133',
      confirmPassword: '12123132133',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
