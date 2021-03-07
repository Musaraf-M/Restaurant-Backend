// Import
const Restaurant = require("./model");
const {
    restaurantRegisterValidation
} = require("../../services/validation");
const jwt = require("jsonwebtoken");

// Register controller
const restaurantRegisterController = async  (req,res) => {
    // Validation
    const {
        error
    } = restaurantRegisterValidation(req.body);

    if(error) {
        try {
            return res.status(400).send(error.details[0].message);
        } catch (err) {
            return res.status(400).send("Restaurant name must be greater than 6 characters");
        }
    }

    // If restaurant exist
    const isRestaurantExist = await Restaurant.findOne({
        name: req.body.name
    });

    if(isRestaurantExist) {
        return res.status(400).send("Restaurant already exist");
    }

    const restaurant = new Restaurant ({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        city: req.body.city,
        cuisine: req.body.cuisine,
        restaurantType: req.body.restaurantType
    });

    try {
        const savedRestaurant = await restaurant.save();
        res.send({
            restaurantId: savedRestaurant._id,
        });
    } catch (err) {
        res.status(400).send(error);
    }
};

// Details query controller
const getDetailController = async (req,res) => {
    try {
        req.query.name = { $regex: new RegExp(req.query.name), $options: 'i'};
        if(req.query.city) {
            req.query.city = req.query.city.toLowerCase();
        }
        if(req.query.cuisine) {
            req.query.cuisine = req.query.cuisine.toLowerCase();
        }
        if(req.query.type) {
            req.query.type = req.query.type.toLowerCase();
        }
        const restaurant = await Restaurant.find(req.query);
        return res.json(restaurant);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}
// Export
module.exports.restaurantRegisterController = restaurantRegisterController;
module.exports.getDetailController = getDetailController;