import Joi from 'joi';

// Custom function to check for uniqueness
const uniqueItems = (value, helpers) => {
  const uniqueValues = [...new Set(value)];
  if (uniqueValues.length !== value.length) {
    return helpers.error('array.unique');
  }
  return value;
};

const timeSchema = Joi.string()
	.custom((value, helpers) => {
		// Regular expression to match `hh:mm` format
		const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

		if (!timePattern.test(value)) {
			return helpers.error('any.invalid');
		}

		return value;
	}, 'Time format validation')
	.required()
	.messages({'any.invalid': 'Formato de hora invalido. usar hh:mm (string)'});

const paramsGetHorarios = Joi.object({
	id_medico: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El campo nro_documento debe ser un número.',
      'number.integer': 'El campo nro_documento debe ser un número entero.',
      'any.required': 'El campo id_medico es obligatorio.'
    })
});

const paramsUpdateHorarios = Joi.object({
	id_medico: Joi.number()
    .integer()
    .required()
    .messages({
      'number.base': 'El campo nro_documento debe ser un número.',
      'number.integer': 'El campo nro_documento debe ser un número entero.',
      'any.required': 'El campo id_medico es obligatorio.'
    })
});

const bodyUpdateHorarios = Joi.object({
	dias_disponibles: Joi.array().items(
		Joi.number().integer().min(0).max(6))
		.custom(uniqueItems, 'Unique values validation')
		.required()
		.messages({
			'array.unique': 'La lista contiene valores repetidos.',
			'array.includes': 'La lista solo puede contener enteros del 0 al 6',
			'number.base': 'Cada elemento debe ser un entero.',
			'number.min': 'min=0',
			'number.max': 'max=6'
		}),
	horario_inicio_jornada: timeSchema.required(),
	horario_fin_jornada: timeSchema.required(),
	minutos_sesion: Joi.number().min(10).required(),
	minutos_descanso: Joi.number().max(60).required()
});

export const validateGetHorarios = (req, res, next) => {
	const paramsValidation = paramsGetHorarios.validate(req.params);
	if (paramsValidation.error) {
		return res.status(400)
			.json({ error: paramsValidation.error.details[0].message })
	} 

	next();
}

export const validateUpdateHorarios = (req, res, next) => {
	const paramsValidation = paramsUpdateHorarios.validate(req.params);
	if (paramsValidation.error) {
		return res.status(400)
			.json({ error: paramsValidation.error.details[0].message })
	} 

	const bodyValidation = bodyUpdateHorarios.validate(req.body);
	if (bodyValidation.error) {
		return res.status(400)
			.json({ error: bodyValidation.error.details[0].message });
	} 

	next();
}
