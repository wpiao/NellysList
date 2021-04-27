const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const uuidv4 = require('uuid').v4;
const moment = require('moment');

const ads = [
  {
    id: '26955cee-a010-4131-b15a-1b2c18863741',
    title: 'Air Jordans 1',
    price: 100,
    description: 'Satin red Air Jordan 1 (Mens). Size 10.5',
    photo:
      'http://res.cloudinary.com/drtxi16qr/image/upload/v1619205589/nellys_list/oejev91bqfhox5j6bbc5.jpg',
    condition: 'New',
    email: 'john@gmail.com',
    zipCode: '94591',
    modifiedDate: '2021-04-23 19:19:50',
    createdDate: '2021-04-23 19:19:50',
  },
  {
    id: '4adb5800-1448-4ad5-bcb9-cbc9299fce83',
    title: 'Used Tires x4',
    price: 50,
    description: '15”16”17”18”19”20” ALL SIZE TIRES AVAILABLE',
    photo:
      'http://res.cloudinary.com/drtxi16qr/image/upload/v1619205802/nellys_list/lnrmvs6be93vlg29ioes.jpg',
    condition: 'Old',
    email: 'email@gmail.com',
    zipCode: '89148',
    modifiedDate: '2021-04-23 20:04:48',
    createdDate: '2021-04-23 19:23:23',
  },
  {
    id: '8c914cc0-711a-40db-bd50-3f8ad2a17495',
    title: 'Extremely Rare Pokemon Card',
    price: 2500,
    description: 'Extremely Rare Charizard Glurak Pokemon Card Foil Holigram',
    photo:
      'http://res.cloudinary.com/drtxi16qr/image/upload/v1619206402/nellys_list/uptlzxpglmud6pdmikgd.jpg',
    condition: 'New',
    email: 'pokemon@gmail.com',
    zipCode: '66012',
    modifiedDate: '2021-04-23 19:38:38',
    createdDate: '2021-04-23 19:33:22',
  },
  {
    id: 'e36ecb32-e6b4-4b70-99a4-d3ed2ab8532a',
    title: 'Razor Gaming Laptop',
    price: 1300,
    description:
      'Comes with charger. Specs 15.6" Gaming Laptop - Intel Core i7 - 16GB Memory - NVIDIA GeForce RTX 2060 ,512GB SSD works amazing only seeking because not fully taking advantage of laptop.',
    photo:
      'http://res.cloudinary.com/drtxi16qr/image/upload/v1619206584/nellys_list/o7vmjtobbevhmh7kx0hq.jpg',
    condition: 'Old',
    email: 'laptop@gmail.com',
    zipCode: '60007',
    modifiedDate: '2021-04-23 19:38:19',
    createdDate: '2021-04-23 19:36:25',
  },
  {
    id: '88db285a-69d7-4d8a-9c28-d0472207fce9',
    title: 'Banana',
    price: 10,
    description: 'This is a banana',
    photo:
      'http://res.cloudinary.com/drtxi16qr/image/upload/v1619208359/nellys_list/vevkivfjsmamn0shougw.jpg',
    condition: 'Old',
    email: 'banana@banana.com',
    zipCode: '94112',
    modifiedDate: '2021-04-23 23:09:48',
    createdDate: '2021-04-23 20:06:00',
  },
];

const AdType = new GraphQLObjectType({
  name: 'Ad',
  description: "This is a Nelly's List Ad",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLInt },
    photo: { type: GraphQLString },
    condition: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    zipCode: { type: GraphQLNonNull(GraphQLString) },
    modifiedDate: { type: GraphQLNonNull(GraphQLString) },
    createdDate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    ad: {
      type: AdType,
      description: 'A Single Ad',
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, args) => ads.find((ad) => ad.id === args.id),
    },
    ads: {
      type: new GraphQLList(AdType),
      description: 'List of All Ads',
      resolve: () => ads,
    },
  }),
});

// const RootMutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Root Mutation',
//   fields: () => ({
//     addBook: {
//       type: BookType,
//       description: 'Add a book',
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//       },
//       resolve: (parent, args) => {
//         const book = {
//           id: ads.length + 1,
//           name: args.name,
//         };
//         ads.push(book);
//         return book;
//       },
//     },
//   }),
// });

const schema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: RootMutationType,
});

router.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    debug: true,
    graphiql: true
  })
);

module.exports = router;
