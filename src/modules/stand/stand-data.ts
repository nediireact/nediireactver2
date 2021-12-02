export const standData = {
  id: null,
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
          img_picture: null,
          title: null,
          description: null,
          real: null
        }
      }
    },
    group: {
      data: {
        attributes: {
          img_picture: null,
          title: null,
          description: null,
          real: null,
          email: null,
          slug: null,
          color: null
        }
      }
    },
    stand_news: {
      data: [{
        id: 0,
        attributes: {
          created: null,
          description: null,
          img_picture: null,
          title: null,
          slug: null
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
