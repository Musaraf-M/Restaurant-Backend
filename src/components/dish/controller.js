// Import
const Dish = require("./model");
const Restaurant = require("../restaurant/model");
const {
    dishRegisterValidation
} = require("../../services/validation");
const jwt = require("jsonwebtoken");

// Register controller
const dishRegisterController = async (req, res) => {
    // Validation
    const {
        error
    } = dishRegisterValidation(req.body);

    if (error) {
        try {
            return res.status(400).send(error.details[0].message);
        } catch (err) {
            return res.status(400).send("Dish name must be greater than 6 characters");
        }
    }

    // If dish exist
    const isDishExist = await Dish.findOne({
        name: req.body.name,
    });

    const isRestaurantExist = await Restaurant.findById(req.body.restaurantId);

    if (!isRestaurantExist) {
        return res.status(400).send('Restaurant not found');
    }

    if (isDishExist) {
        try {
            //  Food exist in restaurant
            flag = false;
            isDishExist.restaurant.forEach((element) => {
                if (element.id == req.body.restaurantId) {
                    flag = true;
                }
            });

            if (flag) {
                return res.status(400).send('Food item already presents');
            }
            // update restaurant id in dish
            const updateDish = await Dish.updateOne({
                name: req.body.name
            }, {
                $push: {
                    restaurant: {
                        id: req.body.restaurantId,
                        cost: req.body.cost
                    }
                }
            });
            const dish = await Dish.find({name:req.body.name});
            return res.json(dish);
        } catch (err) {
            res.status(400).send(err.message);
        }
    } else {
        const dishObj = new Dish({
            name: req.body.name,
            description: req.body.description,
            cuisine: req.body.cuisine,
            type: req.body.type,
            restaurant: {
                id: req.body.restaurantId,
                cost: req.body.cost
            }
        });

        try {
            const dish = await dishObj.save();
            isRestaurantExist.dishes.push(req.body.restaurantId);
            const restaurant = await isRestaurantExist.save();

            return res.json({ restaurant, dish });
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
};

// Details controller
const getDetailController = async (req, res) => {
    try {
        // const regex= `/^${req.query.name}/`  
        console.log(req.query.name);
        req.query.name = { $regex: new RegExp(req.query.name), $options: 'i' };
        //   const dish = await Dish.find(req.query);
        if (req.query.restaurant){
            req.query.restaurant = {
                $elemMatch:
                {
                    id: req.query.restaurant
                }
            };
        }
        const dish = await Dish.find(req.query);
        return res.json(dish);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

// Export 
module.exports.dishRegisterController = dishRegisterController;
module.exports.getDetailController = getDetailController;
