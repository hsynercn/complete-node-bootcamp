const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

//We have a better mechanism then 'then' expression
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Done');
  })
  .catch((err) => {
    console.log(err);
  });
*/

//async: that is a special function, this code will run at the background without blocking the event loop
const getDocPic = async () => {
  try {
    //this code will wait until read promise is resolved
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    //if we want to get more than one picture
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

    const images = all.map(element => element.body.message)
    console.log(all.length);
    console.log(images);

    await writeFilePro('dog-img.txt', images.join('\n'));
    console.log('Done');
  } catch (error) {
    console.log(err);
  }
  return '2: Ready';
};
(async () => {
  try {
    console.log('1: Will get dog pics');
    const a = await getDocPic(); // this code is offloaded, execution continues with the next line
    console.log(a);
    console.log('3: Done getting dog pics');
  } catch (error) {
    console.log('Error');
  }
})();
