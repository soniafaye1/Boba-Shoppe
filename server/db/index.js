//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Order_Products = require("./models/OrderProducts");

User.belongsToMany(Product, { through: "userProducts" });
Product.belongsToMany(User, { through: "userProducts" });

Order.belongsToMany(Product, {
  through: Order_Products,
});
Product.belongsToMany(Order, { through: Order_Products });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Products,
  },
};
