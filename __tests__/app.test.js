/* eslint-disable indent */
require('dotenv').config();

// const { execSync } = require('child_process');

// const fakeRequest = require('supertest');
// const app = require('../lib/app');
// const client = require('../lib/client');

const rawWeatherData = require('../data/weatherjson.js');
const rawYelpData = require('../data/yelpData.js');

const { formatGeo, formatWeather, formatReviews } = require('../lib/mungeUtils.js');

describe('app routes', () => {
  describe('routes', () => {
    // let token;

    // beforeAll(async done => {
    //   execSync('npm run setup-db');

    //   client.connect();

    //   const signInData = await fakeRequest(app)
    //     .post('/auth/signup')
    //     .send({
    //       email: 'jon@user.com',
    //       password: '1234'
    //     });

    //   token = signInData.body.token; // eslint-disable-line

    //   return done();
    // });

    // afterAll(done => {
    //   return client.end(done);
    // });

    test('returns formatted location information', async () => {
      const rawLocationData = [
        {
          'place_id': '236451037',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '3503616',
          'boundingbox': [
            '34.0763893',
            '34.098071',
            '-118.3958762',
            '-118.343381'
          ],
          'lat': 34.0923014,
          'lon': -118.3692894,
          'display_name': 'West Hollywood, Los Angeles County, California, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.731289226828133,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        }
      ];

      const expectation = {
        formatted_query: 'West Hollywood, Los Angeles County, California, USA',
        latitude: 34.0923014,
        longitude: -118.3692894
      };

      const mungedLocal = formatGeo(rawLocationData);

      expect(mungedLocal).toEqual(expectation);
    });

    test('returns formatted weather information', async () => {
      const expectation = [
        {
          'forecast': 'Few clouds',
          'time': 'Sat Mar 06 2021',
        },
        {
          'forecast': 'Overcast clouds',
          'time': 'Sun Mar 07 2021',
        },
        {
          'forecast': 'Light shower rain',
          'time': 'Mon Mar 08 2021',
        },
        {
          'forecast': 'Few clouds',
          'time': 'Tue Mar 09 2021',
        },
        {
          'forecast': 'Light rain',
          'time': 'Wed Mar 10 2021',
        },
        {
          'forecast': 'Scattered clouds',
          'time': 'Thu Mar 11 2021',
        },
        {
          'forecast': 'Clear Sky',
          'time': 'Fri Mar 12 2021',
        }
      ];

      const mungedLocal = formatWeather(rawWeatherData);

      expect(mungedLocal).toEqual(expectation);
    });

    test('returns formatted restaurunt information', async () => {
      const expectation = [
        {
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/1TTqJZLs3MJzAwj0BvJl3Q/o.jpg',
          'name': 'The Abbey Food & Bar',
          'price': '$$',
          'rating': 3.5,
          'url': 'https://www.yelp.com/biz/the-abbey-food-and-bar-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/wSi9IeEQmDeSHn0qHPvT0w/o.jpg',
          'name': 'Poppy',
          'price': '$$$',
          'rating': 1.5,
          'url': 'https://www.yelp.com/biz/poppy-los-angeles-3?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/ZdSEZVXT926lwDsl_fYA5A/o.jpg',
          'name': 'Nightingale Plaza',
          'price': '$$$$',
          'rating': 2,
          'url': 'https://www.yelp.com/biz/nightingale-plaza-los-angeles?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/3KRB7WSlbTnFrvoTK-IkdA/o.jpg',
          'name': 'Bar Lubitsch',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/bar-lubitsch-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Ufst9LUiQ1WGCzuWZWq20w/o.jpg',
          'name': 'Greystone Manor Supperclub',
          'price': '$$$',
          'rating': 3,
          'url': 'https://www.yelp.com/biz/greystone-manor-supperclub-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/nUFJahhGJnLTs1brpqQLfA/o.jpg',
          'name': 'Micky\'s West Hollywood',
          'price': '$$',
          'rating': 3,
          'url': 'https://www.yelp.com/biz/mickys-west-hollywood-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/U2VcifTctSOe0JJHXnjmyA/o.jpg',
          'name': 'Skybar',
          'price': '$$$',
          'rating': 3.5,
          'url': 'https://www.yelp.com/biz/skybar-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/i_9_3MvjypwsPHQbKeUl2Q/o.jpg',
          'name': '1 Oak',
          'price': '$$$',
          'rating': 2,
          'url': 'https://www.yelp.com/biz/1-oak-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/Rc1eWKpq3xSK2wueTWw4hw/o.jpg',
          'name': 'Party In LA',
          'price': '$',
          'rating': 4.5,
          'url': 'https://www.yelp.com/biz/party-in-la-los-angeles-2?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/AgnNTSovPBcyldaSQeQXNw/o.jpg',
          'name': 'The Viper Room',
          'price': '$$',
          'rating': 3,
          'url': 'https://www.yelp.com/biz/the-viper-room-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/18KVk0F-KGYdcSK8eg9MYg/o.jpg',
          'name': 'Derriere',
          'price': undefined,
          'rating': 3.5,
          'url': 'https://www.yelp.com/biz/derriere-los-angeles?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/6zrHRZNOdQpKBqIHndAG4A/o.jpg',
          'name': 'Sound Nightclub',
          'price': '$$',
          'rating': 3,
          'url': 'https://www.yelp.com/biz/sound-nightclub-los-angeles?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/ERljXDNUijwKoWNwSD37Cg/o.jpg',
          'name': 'RASPOUTINE Los Angeles',
          'price': undefined,
          'rating': 3,
          'url': 'https://www.yelp.com/biz/raspoutine-los-angeles-west-hollywood-2?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/B7TPwZJyBRXawaZIFLiKng/o.jpg',
          'name': 'Avalon Hollywood',
          'price': '$$',
          'rating': 3,
          'url': 'https://www.yelp.com/biz/avalon-hollywood-los-angeles-2?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/GGHrsKmKuPQCUdpqF8d62g/o.jpg',
          'name': 'Bootsy Bellows',
          'price': '$$$',
          'rating': 2,
          'url': 'https://www.yelp.com/biz/bootsy-bellows-west-hollywood?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/hmn0fikXEXH4atluYcld7Q/o.jpg',
          'name': 'The Chapel at The Abbey ',
          'price': '$$$',
          'rating': 3,
          'url': 'https://www.yelp.com/biz/the-chapel-at-the-abbey-west-hollywood-7?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/T0dxcsn-FwZEo4rcfk8s-g/o.jpg',
          'name': 'Freak City',
          'price': '$$',
          'rating': 4,
          'url': 'https://www.yelp.com/biz/freak-city-los-angeles?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/kt_fYtxQgJFSxw0_aiDZcw/o.jpg',
          'name': 'Las Palmas Club',
          'price': undefined,
          'rating': 5,
          'url': 'https://www.yelp.com/biz/las-palmas-club-los-angeles?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/igqU4NiCgSM-jkWRYEC7kA/o.jpg',
          'name': 'Ladies Touch',
          'price': '$$',
          'rating': 5,
          'url': 'https://www.yelp.com/biz/ladies-touch-los-angeles?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
        {
          'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/9nJlju7hrEsWKqkpu9j3mA/o.jpg',
          'name': 'Arena Ktown',
          'price': '$$',
          'rating': 3.5,
          'url': 'https://www.yelp.com/biz/arena-ktown-los-angeles?adjust_creative=hLvgdwJDPYbXXs7G7K4diA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hLvgdwJDPYbXXs7G7K4diA',
        },
      ];
      const mungedYelp = formatReviews(rawYelpData);

      expect(mungedYelp).toEqual(expectation);
    });

  });
});