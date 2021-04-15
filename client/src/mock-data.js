const faker = require('faker');

const ads = [];
let set = 10;

while (set) {
  let ad = {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    photo: faker.image.image(),
    condition: 'new',
    email: faker.internet.email(),
    zipCode: faker.address.zipCode(),
    createdDate: faker.datatype.datetime(),
    modifiedDate: faker.datatype.datetime()
  };
  ads.push(ad);
  set--;
}

exports.ads = ads;
