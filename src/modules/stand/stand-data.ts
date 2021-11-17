export const standData = {
  attributes: {
    name: '',
    slug: '',
    img_cover: '',
    img_logo: '',
    contact_email: '',
    restaurant: '',
    description: '',
    slogan: ''
  },
  relationships: {
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
          first_name: '',
          last_name: '',
          profile: {
            img_picture: '',
            owner_address: '',
            owner_email: '',
            owner_office_phone: '',
            owner_phone: '',
            owner_position: '',
            owner_position_description: '',
            owner_whatsapp: ''
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
