const { celebrate, Segments, Joi } = require("celebrate");

const Validators = {
    // Sessions
  sessionsPost: celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
  }),

    // Profile
  profileGet: celebrate({
      [Segments.HEADERS]: Joi.object({
          authorization: Joi.string().required()
      }).unknown(),
  }),

    // Ong
  ongPost: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
    })
  }),
  
    // incident
  incidentGet: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),

  incidentPost: celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
  }),

  incidentDelete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  })


};

module.exports = Validators;
