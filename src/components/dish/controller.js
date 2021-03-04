// Import
const Dish = require("./model");
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
            return res.status(400).send("Restaurant name must be greater than 6 characters");
        }
    }

    // If dish exist
    const isDishExist = await Dish.findOne({
        name: req.body.name,
    });

    if (isDishExist) {
        try {

            flag = false;
            isDishExist.restaurant.forEach((element) => {
                if ((element.id == req.body.restaurantId)&&(element.cost == req.body.cost)){
                    flag = true;
                }
            });

            if (flag){
                return res.status(400).send('Food item already presents'); 
            }

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
            res.json(updateDish);
        } catch (err) {
            res.status(400).send(err.message);
        }
    } else {
        const dish = new Dish({
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
            const savedDish = await dish.save();
            res.send({
                dishId: savedDish._id,
            });
        } catch (err) {
            res.status(400).send(error);
        }
    }
};

// Details controller
const getDetailController = async (req, res) => {
    try {
      const dish = await Dish.find(req.query);
      return res.json(dish);
    } catch (error) {
      return res.status(400).send(error.message);
    }
};

// Export 
module.exports.dishRegisterController = dishRegisterController;
module.exports.getDetailController = getDetailController;