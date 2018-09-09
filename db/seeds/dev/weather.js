const weatherData = require('../../../data/finalData.json');

const createWeather = (knex, day) => {
  return knex('weather').insert(day)
}

exports.seed = (knex, Promise) => {
  return knex('weather').del()
    .then(() => {
      let weatherPromises = [];

      weatherData.forEach(day => {
        weatherPromises.push(createWeather(knex, day));
      });

      return Promise.all(weatherPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
