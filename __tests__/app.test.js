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

    test.skip('returns formatted weather information', async () => {
      const expectation = [
        {
          'moonrise_ts': 1615022573,
          'wind_cdir': 'SSE',
          'rh': 76,
          'pres': 991.7,
          'high_temp': 18.3,
          'sunset_ts': 1615082109,
          'ozone': 302.5,
          'moon_phase': 0.308073,
          'wind_gust_spd': 4.296875,
          'snow_depth': 0,
          'clouds': 10,
          'ts': 1615017660,
          'sunrise_ts': 1615040135,
          'app_min_temp': 10,
          'wind_spd': 2.613449,
          'pop': 20,
          'wind_cdir_full': 'south-southeast',
          'slp': 1015.9,
          'moon_phase_lunation': 0.78,
          'valid_date': '2021-03-06',
          'app_max_temp': 18.3,
          'vis': 20.7616,
          'dewpt': 9.3,
          'snow': 0,
          'uv': 0.74380165,
          'weather': {
            'icon': 'c02d',
            'code': 801,
            'description': 'Few clouds'
          },
          'wind_dir': 167,
          'max_dhi': null,
          'clouds_hi': 1,
          'precip': 0.0625,
          'low_temp': 10.5,
          'max_temp': 18.4,
          'moonset_ts': 1615062113,
          'datetime': '2021-03-06',
          'temp': 13.7,
          'min_temp': 10,
          'clouds_mid': 0,
          'clouds_low': 10
        },
      ];

      const mungedLocal = formatWeather(rawWeatherData);

      expect(mungedLocal).toEqual(expectation);
    });

    test.skip('returns formatted restaurunt information', async () => {
      const expectation = [
        {
          "name": "Voodoo Doughnut - Old Town",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/qHrzQy5ih2Sjhn7MdsCASw/o.jpg",
          "price": "$",
          "rating": 3.5,
          "url": "https://www.yelp.com/biz/voodoo-doughnut-old-town-portland-2?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Andina Restaurant",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/Ij9yv97Ch6NwKhNdpezRhw/o.jpg",
          "price": "$$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/andina-restaurant-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Lechon",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/wxLJSjqdB0v3wZSRqyNweg/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/lechon-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Luc Lac",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg",
          "price": "$$",
          "rating": 4,
          "url": "https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Deschutes Brewery Portland Public House",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/a-Av4dG6Xv3f1_XysFj4ow/o.jpg",
          "price": "$$",
          "rating": 4,
          "url": "https://www.yelp.com/biz/deschutes-brewery-portland-public-house-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Portland City Grill",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/-N8P6cTACCKnSuJaqeCyXg/o.jpg",
          "price": "$$$",
          "rating": 4,
          "url": "https://www.yelp.com/biz/portland-city-grill-portland-7?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Cheryl’s on 12th",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/w1tcp-5xJyQz19HH05JoVA/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/cheryl-s-on-12th-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Screen Door",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/lqmMYlLRV-aoH73koWA6Ew/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/screen-door-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Q Restaurant & Bar",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/jAH0XyZe5N8YTrOy71SuJg/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/q-restaurant-and-bar-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Nong's Khao Man Gai",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/jtp9n8HTjid4lEeXlcKKiA/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/nongs-khao-man-gai-portland-2?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Grassa",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/zloG1rU5-15Q4MVmf8inbA/o.jpg",
          "price": "$$",
          "rating": 4,
          "url": "https://www.yelp.com/biz/grassa-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Cuon - Vietnamese Street Food",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Zetji_yDJJDG8eksunYiTg/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/cuon-vietnamese-street-food-portland-3?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Salt & Straw",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/r6y-0Q2z3cnx1bQKxn-iHw/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/salt-and-straw-portland-2?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Stumptown Coffee Roasters",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/ZRKWUoGRDo1FryxlHfooRw/o.jpg",
          "price": "$",
          "rating": 4,
          "url": "https://www.yelp.com/biz/stumptown-coffee-roasters-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Ground Kontrol Classic Arcade",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/oU5nd95LfA3okpd9J_uPWg/o.jpg",
          "price": "$",
          "rating": 4,
          "url": "https://www.yelp.com/biz/ground-kontrol-classic-arcade-portland-2?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Le Pigeon",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/ARlFgwCNq62izXYf1TUQiA/o.jpg",
          "price": "$$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/le-pigeon-portland-2?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Olympia Provisions",
          "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/w8w2mkIrowArbwpzIInq9g/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/olympia-provisions-portland-2?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Lardo",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/b0E-cDYYiWuvBxFH-YPONA/o.jpg",
          "price": "$$",
          "rating": 4,
          "url": "https://www.yelp.com/biz/lardo-portland-4?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Mediterranean Exploration Company",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/AwxZ3eb04OiVH-92xKf_jg/o.jpg",
          "price": "$$",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/mediterranean-exploration-company-portland-2?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        },
        {
          "name": "Lan Su Chinese Garden",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/gY4shaDsFS6IfRH2fyMTnw/o.jpg",
          "rating": 4.5,
          "url": "https://www.yelp.com/biz/lan-su-chinese-garden-portland?adjust_creative=mjGhZaKg6Sc3Gm8PYqBkzg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=mjGhZaKg6Sc3Gm8PYqBkzg"
        }
      ];
      const mungedYelp = formatReviews(rawYelpData);

      expect(mungedYelp).toEqual(expectation);
    });

  });
});