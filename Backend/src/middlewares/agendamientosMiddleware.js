import Joi from "joi";

const paramsGetAgendamiento = Joi.object({
  id_agendamiento: Joi.number().required().messages({
    "any.required": "El campo id_agendamiento es obligatorio.",
  }),
});

const paramsGetAgendamientosDisponibles = Joi.object({
  id_medico: Joi.number().required().messages({
    "any.required": "El campo id_medico es obligatorio.",
  }),
});

const paramsGetAgendamientosDisponiblesPorEspecialidad = Joi.object({
  id_especialidad: Joi.number().required().messages({
    "any.required": "El campo id_especialidad es obligatorio.",
  }),
});

const queryGetAgendamientosDisponibles = Joi.object({
  fechahora_inicio: Joi.string().isoDate().required().messages({
    "string.isoDate": "El formato de fecha debe ser string isoDate",
  }),
  fechahora_fin: Joi.string().isoDate().required().messages({
    "string.isoDate": "El formato de fecha debe ser string isoDate",
  }),
});

const paramsAgendar = Joi.object({
  id_medico: Joi.number().required().messages({
    "any.required": "El campo id_medico es obligatorio.",
  }),
});

const bodyAgendar = Joi.object({
  id_paciente: Joi.number().required().messages({
    "any.required": "El campo id_paciente es obligatorio.",
  }),
  fechahora_inicio: Joi.string().isoDate().required().messages({
    "string.isoDate": "El formato de fecha debe ser string isoDate",
  }),
  fechahora_fin: Joi.string().isoDate().required().messages({
    "string.isoDate": "El formato de fecha debe ser string isoDate",
  }),
});

const paramsUpdateAgendamientoState = Joi.object({
  id_agendamiento: Joi.number().required().messages({
    "any.required": "El campo id_agendamiento es obligatorio.",
  }),
});

const bodyUpdateAgendamientoState = Joi.object({
  estado: Joi.string()
    .required()
    .valid("RESERVADO", "INICIADO", "FINALIZADO", "CANCELADO")
    .messages({
      "string.base": "Value must be a string.",
      "any.only":
        "Los valores permitidos son: RESERVADO, INICIADO, FINALIZADO, CANCELADO",
      "any.required": "Value is required.",
    }),
  url_videollamada: Joi.string()
    .required()
    .messages({
      "string.base": "Value must be a string.",
      "any.required": "Value is required.",
    }),
});

export const validateGetAgendamiento = (req, res, next) => {
  const { error } = paramsGetAgendamiento.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateGetAgendamientosDisponibles = (req, res, next) => {
  const paramsValidation = paramsGetAgendamientosDisponibles.validate(
    req.params
  );
  if (paramsValidation.error) {
    return res
      .status(400)
      .json({ error: paramsValidation.error.details[0].message }); //fix
  }

  const queryValidation = queryGetAgendamientosDisponibles.validate(req.query);
  if (queryValidation.error) {
    return res
      .status(200)
      .json({ error: queryValidation.error.details[0].message }); //fix
  }

  next();
};

export const validateGetAllAgendamientosDisponibles = (req, res, next) => {
  console.log("get all disponibles validation");
  const queryValidation = queryGetAgendamientosDisponibles.validate(req.query);
  if (queryValidation.error) {
    return res
      .status(400)
      .json({ error: queryValidation.error.details[0].message }); //fix
  }

  next();
};

export const validateGetAgendamientosDisponiblesPorEspecialidad = (
  req,
  res,
  next
) => {
  const paramsValidation =
    paramsGetAgendamientosDisponiblesPorEspecialidad.validate(req.params);
  if (paramsValidation.error) {
    return res
      .status(400)
      .json({ error: paramsValidation.error.details[0].message }); //fix
  }

  const queryValidation = queryGetAgendamientosDisponibles.validate(req.query);
  if (queryValidation.error) {
    return res
      .status(400)
      .json({ error: queryValidation.error.details[0].message }); //fix
  }

  next();
};

export const validateAgendar = (req, res, next) => {
  const paramsValidation = paramsAgendar.validate(req.params);
  if (paramsValidation.error) {
    return res
      .status(400)
      .json({ error: paramsValidation.error.details[0].message }); //fix
  }

  const bodyValidation = bodyAgendar.validate(req.body);
  if (bodyValidation.error) {
    return res
      .status(400)
      .json({ error: bodyValidation.error.details[0].message }); //fix
  }

  next();
};

export const validateUpdateAgendamientoState = (req, res, next) => {
  const paramsValidation = paramsUpdateAgendamientoState.validate(req.params);
  if (paramsValidation.error) {
    return res
      .status(400)
      .json({ error: paramsValidation.error.details[0].message }); //fix
  }

  const bodyValidation = bodyUpdateAgendamientoState.validate(req.body);
  if (bodyValidation.error) {
    return res
      .status(400)
      .json({ error: bodyValidation.error.details[0].message }); //fix
  }

  next();
};
