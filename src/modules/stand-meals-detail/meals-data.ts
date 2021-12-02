const data = {
  attributes: {
    title: '',
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
          title: ''
        }
      }
    },
    meal_addons: {
      data: [{
        id: 0,
        attributes: {
          title: '',
          price: ''
        }
      }]
    }
  }
};

export default data;
