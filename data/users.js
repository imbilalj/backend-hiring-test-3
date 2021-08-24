import bcrypt from 'bcryptjs';

// Dummy users data for seeder
const users = [
  {
    name: 'Bilal',
    email: 'imbilalj@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'jdoe@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Sajid Khan',
    email: 'sajid@gmail.com',
    password: bcrypt.hashSync('1234567', 10)
  }
];

export default users;
