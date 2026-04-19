const Restaurant = sequelize.define('Restaurant', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

  ownerId: { type: DataTypes.UUID, allowNull: true }, // allow null for seed

  name: { type: DataTypes.STRING(150), allowNull: false },

  description: { type: DataTypes.TEXT },

  cuisine: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },

  address: { type: DataTypes.JSONB, allowNull: true }, // allow null for seed

  phone: { type: DataTypes.STRING(15) },

  email: { type: DataTypes.STRING, validate: { isEmail: true } },

  logo: { type: DataTypes.TEXT },
  coverImage: { type: DataTypes.TEXT },

  images: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },

  rating: { type: DataTypes.DECIMAL(2, 1), defaultValue: 0 },

  totalRatings: { type: DataTypes.INTEGER, defaultValue: 0 },

  deliveryTime: { type: DataTypes.INTEGER, defaultValue: 30 },

  deliveryFee: { type: DataTypes.DECIMAL(8, 2), defaultValue: 0 },

  minOrder: { type: DataTypes.DECIMAL(8, 2), defaultValue: 0 },

  isOpen: { type: DataTypes.BOOLEAN, defaultValue: true },

  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

  isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },

  openingHours: { type: DataTypes.JSONB, defaultValue: {} },

  tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },

  offerBadge: { type: DataTypes.STRING },

  priceRange: {
    type: DataTypes.ENUM('budget', 'moderate', 'expensive'),
    defaultValue: 'moderate',
  },

}, {
  tableName: 'Restaurants',   // 🔥 IMPORTANT FIX
  underscored: true
});