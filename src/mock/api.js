import Mock from 'mockjs'
Mock.mock('/api/user/login', {
  data: {
    user: {
      id: 1,
      username: 'test',
      email: 'test@aiplux.com',
    },
    token: 'fake-token',
  },
  status: 200,
})
