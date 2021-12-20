const sequelize = require("sequelize");
const Op = sequelize.Op;
const { food } = require('../../models')
const { category } = require('../../models/category')


module.exports = (req, res) => {
    const searchWord = req.query.searchWord

    food.findAll({
        where:{
            [Op.or]: [
                {
                    food_name: {
                        [Op.like]: searchWord + "%"
                    }
                },
                {
                    food_expiration: {
                        [Op.like]: searchWord + "%"
                    }
                }
            ]
        }
    })
    .then((data) => {
        res.status(200).json({data: data, message: '상품 목록 가져오기를 성공하였습니다.'})
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({message: 'error'})
    })
};