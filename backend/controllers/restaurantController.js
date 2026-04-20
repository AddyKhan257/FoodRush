const { Op } = require('sequelize');
const { Restaurant, MenuItem, MenuCategory, Review, User } = require('../models');

// @desc    GET all restaurants
// @route   GET /api/restaurants
const getRestaurants = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, search, cuisine, rating, sortBy = 'rating', sortOrder = 'DESC' } = req.query;
    const offset = (page - 1) * limit;
    let where = { isActive: true };
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { cuisine: { [Op.contains]: [search] } },
      ];
    }
    if (cuisine) where.cuisine = { [Op.contains]: [cuisine] };
    if (rating)  where.rating  = { [Op.gte]: parseFloat(rating) };
    const { count, rows } = await Restaurant.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({ restaurants: rows, pagination: { total: count, page: parseInt(page), pages: Math.ceil(count / limit), limit: parseInt(limit) } });
  } catch (err) { next(err); }
};

// @desc    GET featured restaurants
// @route   GET /api/restaurants/featured
const getFeaturedRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { isFeatured: true, isActive: true },
      order: [['rating', 'DESC']],
      limit: 8,
    });
    res.json({ restaurants });
  } catch (err) { next(err); }
};

// @desc    GET single restaurant with menu
// @route   GET /api/restaurants/:id
const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.params.id, isActive: true },
      include: [
        {
          model: MenuCategory,
          as: 'menuCategories',
          include: [{ model: MenuItem, as: 'items', where: { isAvailable: true }, required: false }],
        },
        {
          model: Review,
          as: 'reviews',
          include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
          limit: 10,
          order: [['createdAt', 'DESC']],
        },
      ],
    });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json({ restaurant });
  } catch (err) { next(err); }
};

// @desc    GET nearby restaurants (by city match for now)
// @route   GET /api/restaurants/nearby
const getNearbyRestaurants = async (req, res, next) => {
  try {
    const { city = '', limit = 8 } = req.query;
    const restaurants = await Restaurant.findAll({
      where: {
        isActive: true,
        ...(city && { address: { [Op.contains]: { city } } }),
      },
      order: [['rating', 'DESC']],
      limit: parseInt(limit),
    });
    res.json({ restaurants });
  } catch (err) { next(err); }
};

// @desc    CREATE restaurant
// @route   POST /api/restaurants
const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.create({ ...req.body, ownerId: req.user.id });
    res.status(201).json({ restaurant });
  } catch (err) { next(err); }
};

// @desc    UPDATE restaurant
// @route   PUT /api/restaurants/:id
const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ where: { id: req.params.id } });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    if (restaurant.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await restaurant.update(req.body);
    res.json({ restaurant });
  } catch (err) { next(err); }
};

module.exports = { getRestaurants, getFeaturedRestaurants, getRestaurant, createRestaurant, updateRestaurant, getNearbyRestaurants };
