const Joi = require("joi");

exports.schemaValidation = {
  barangJasa: Joi.object().keys({
    nama_barang_jasa: Joi.string().required(),
    harga: Joi.number().required(),
    stok: Joi.number().required()
  }),
  customer: Joi.object().keys({
    nama_customer: Joi.string().required(),
    alamat_customer: Joi.string().required(),
    jenis_kelamin_customer: Joi.string().valid("P", "L")
  }),
  kendaraan: Joi.object().keys({
    no_polisi: Joi.string().required(),
    merk: Joi.string().required(),
    warna: Joi.string().required(),
    customer: Joi.string().required()
  }),
  montir: Joi.object().keys({
    nama_montir: Joi.string().required(),
    alamat_montir: Joi.string().required(),
    jenis_kelamin_montir: Joi.string().valid("P", "L")
  }),
  service: Joi.object().keys({
    tanggal_service: Joi.date().required(),
    kendaraan: Joi.string().required(),
    montir: Joi.string().required()
  }),
  serviceDetail: Joi.object().keys({
    jumlah: Joi.number().required(),
    service: Joi.string().required(),
    barang_jasa: Joi.string().required()
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
