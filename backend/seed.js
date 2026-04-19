const { sequelize } = require('./config/database');
const { Restaurant } = require('./models');

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await Restaurant.destroy({ where: {}, truncate: true });

    await Restaurant.bulkCreate([
      {
        name: 'Biryani House',
        cuisine: ['Indian'],
        rating: 4.5,
        isActive: true
      },
      {
        name: 'Pizza Hub',
        cuisine: ['Italian'],
        rating: 4.2,
        isActive: true
      },
      {
        name: 'Burger King',
        cuisine: ['Fast Food'],
        rating: 4.0,
        isActive: true
      }
    ]);

    console.log("✅ Data inserted");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();