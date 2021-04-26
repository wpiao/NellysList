const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const jwtClient = require('../bin/jwtClient.js');
const spreadsheetId = process.env.SPREADSHEET_ID;
const sheets = google.sheets('v4');
const uuidv4 = require('uuid').v4;
const moment = require('moment');
let sheetRange = 'Ads!A2:J';
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

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
    price: { type: GraphQLNonNull(GraphQLInt) },
    photo: { type: GraphQLNonNull(GraphQLString) },
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
    book: {
      type: AdType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt },
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

const schema = new GraphQLSchema({
  query: RootQueryType,
});

router.post(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
// get all ads
router.get('/', async (req, res, next) => {
  let id = req.query.id;
  const processData = async (data) => {
    return data.map((ad) => {
      // remove all non decimal / digits and convert to number
      const price = ad[2] ? Number(ad[2].replace(/[^0-9.-]+/g, '')) : null;
      return {
        id: ad[0],
        title: ad[1],
        price: price,
        description: ad[3],
        photo: ad[4],
        condition: ad[5],
        email: ad[6],
        zipCode: ad[7],
        modifiedDate: ad[8],
        createdDate: ad[9],
      };
    });
  };

  const getRes = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: sheetRange,
  });

  let result = await processData(getRes.data.values);

  if (!id) {
    res.status(200).json({ data: { ads: result } });
  } else {
    result = result.filter((item) => {
      if (item.id === id) {
        return item;
      }
    });
    if (result.length === 0) {
      res.status(404).json('Ad not found. Please check your id.');
    } else {
      res.status(200).json({ data: { ads: result } });
    }
  }
});

// delete ad
router.delete('/', async (req, res, next) => {
  let id = req.query.id;

  const findRowById = async (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === id) {
        return i;
      }
    }
  };

  const getRes = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: sheetRange,
  });

  const rowToDelete = await findRowById(getRes.data.values);
  if (rowToDelete) {
    await sheets.spreadsheets.batchUpdate({
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: rowToDelete + 1,
                endIndex: rowToDelete + 2,
              },
            },
          },
        ],
      },
    });
    res.status(204).json();
  } else {
    res.status(404).json({ error: 'ID not found.' });
  }
});

// post new ad
router.post('/', async (req, res, next) => {
  const now = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  const createdDate = now;
  const modifiedDate = now;
  const {
    title,
    price,
    description,
    photo,
    condition,
    email,
    zipCode,
  } = req.body;
  if (req.body.id) {
    res
      .status(400)
      .json({ error: 'Remove id from request body and try again.' });
  }
  const id = uuidv4();

  const sheetsRequest = {
    spreadsheetId: spreadsheetId,
    range: sheetRange,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      majorDimension: 'ROWS',
      values: [
        [
          id,
          title,
          price,
          description,
          photo,
          condition,
          email,
          zipCode,
          modifiedDate,
          createdDate,
        ],
      ],
    },
    auth: jwtClient,
  };
  try {
    const response = (await sheets.spreadsheets.values.append(sheetsRequest))
      .data;
    res.status(200).json({
      id: id,
    });
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

module.exports = router;
