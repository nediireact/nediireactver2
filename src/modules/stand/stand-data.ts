export const standData = {
  attributes: {
    name: null,
    slug: null,
    img_cover: null,
    img_logo: null,
    contact_email: null,
    restaurant: null,
    description: null,
    slogan: null,
    address: null,
    zip_code: null
  },
  relationships: {
    city: {
      data: {}
    },
    phones: {
      data: []
    },
    ratings: {
      data: []
    },
    pictures: {
      data: []
    },
    owner: {
      data: {
        attributes: {
          first_name: null,
          last_name: null,
          profile: {
            img_picture: null,
            owner_address: null,
            owner_email: null,
            owner_office_phone: null,
            owner_phone: null,
            owner_position: null,
            owner_position_description: null,
            owner_whatsapp: null
          }
        }
      }
    },
    expo: {
      data: {
        attributes: {
          img_picture: '',
          title: '',
          description: '',
          real: ''
        }
      }
    },
    group: {
      data: {
        attributes: {
          img_picture: '',
          title: '',
          description: '',
          real: '',
          email: '',
          slug: '',
          color: ''
        }
      }
    },
    stand_news: {
      data: [{
        id: 0,
        attributes: {
          created: '',
          description: '',
          img_picture: '',
          title: '',
          slug: ''
        }
      }]
    },
    stand_booking_questions: {
      data: []
    },
    survey_questions: {
      data: []
    }
  },
  meta: {
    meals: 0,
    products: 0
  }
};

export default standData;
