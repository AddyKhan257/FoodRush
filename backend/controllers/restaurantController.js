const { Op } = require('sequelize');
const { Restaurant } = require('../models');

// @desc GET all restaurants
// @route GET /api/restaurants
const getRestaurants = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      cuisine,
      rating,
      sortBy = 'rating',
      sortOrder = 'DESC',
    } = req.query;

    const offset = (page - 1) * limit;

    let where = {};

    // 🔍 Search
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { cuisine: { [Op.contains]: [search] } },
      ];
    }

    // 🍽 Cuisine filter
    if (cuisine) {
      where.cuisine = { [Op.contains]: [cuisine] };
    }

    // ⭐ Rating
    if (rating) {
      where.rating = { [Op.gte]: parseFloat(rating) };
    }

    const { count, rows } = await Restaurant.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      restaurants: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        limit: parseInt(limit),
      },
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { getRestaurants };