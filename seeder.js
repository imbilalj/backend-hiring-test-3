import dotenv from 'dotenv';
import users from './data/users.js';
import volumes from './data/volumes.js';
import bookshelves from './data/bookshelves.js';
import User from './models/userModel.js';
import { Volume } from './models/volumeModel.js';
import Bookshelf from './models/bookshelfModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Cleaning the collections
    await Bookshelf.deleteMany();
    await Volume.deleteMany();
    await User.deleteMany();

    const insertedUsers = await User.insertMany(users);
    const adminId = insertedUsers[0]._id;

    await Volume.insertMany(volumes);
    // For testing purpose, relating all the shelves to the admin user
    const processedShelves = bookshelves.map((bookshelf) => {
      return { ...bookshelf, user: adminId };
    });

    await Bookshelf.insertMany(processedShelves);

    console.log('Data Imported to MongoDB Database!');

    // Successful Exit
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    // Exit with failure
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Bookshelf.deleteMany();
    await Volume.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed from DB!');
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d' || process.argv[2] === '--delete') {
  destroyData();
} else {
  importData();
}
