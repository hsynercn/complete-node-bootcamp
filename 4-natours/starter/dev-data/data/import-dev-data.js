const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<USERNAME>', process.env.DATABASE_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted all tours!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const importData = async () => {
  const fileContent = fs.readFileSync(
    `${__dirname}/tours-simple.json`,
    'utf-8'
  );
  const tours = JSON.parse(fileContent);
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
