const data = {
  attributes: {
    name: '',
    price: '',
    discount: '',
    final_price: '',
    times_selled: '',
    is_breakfast: '',
    is_meal: '',
    is_dinner: '',
    description: ''
  },
  relationships: {
    meal_pictures: {
      data: []
    },
    stand: {
      data: {
        attributes: {
          img_cover: ''
        }
      }
    },
    classification: {
      data: {
        attributes: {
          name: ''
        }
      }
    },
    meal_addons: {
      data: [{
        id: 0,
        attributes: {
          name: '',
          price: ''
        }
      }]
    }
  }
};

export default data;
