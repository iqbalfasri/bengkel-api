const Joi = require("joi");

exports.schemaValidation = {
  barangJasa: Joi.object().keys({
    nama_barang_jasa: Joi.string().required(),
    harga: Joi.number().required(),
    stok: Joi.number().required()
  })
};

exports.code_response = {
  CODE_SUCCESS: 0,
  CODE_BAD_REQUEST: 1,
  CODE_UNAUTHORIZED: 2,
  CODE_SERVER_ERROR: 3,
  CODE_NOT_FOUND: 4,
  CODE_ALREADY_EXIST: 5
};
