const Product = require('../models/product');

const HTTPError = require('../errors/httpError');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, desc, price, img, category, size, brand, color } = req.body;
    const product = new Product({
      name,
      desc,
      price,
      img,
      category,
      size,
      brand,
      color,
    });
    await product.save();
    res
      .status(201)
      .json({ message: 'Product created', data: { product }, error: '' });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).select(
      '_id name price img category size brand desc'
    );
    if (!product) {
      throw new HTTPError('Product does not exist', 400);
    }
    res
      .status(200)
      .json({ message: 'Product found', data: { product }, error: '' });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const offset = +req.query.offset || null;
    const limit = +req.query.limit || null;
    const products = await Product.find()
      .skip(offset)
      .limit(limit)
      .select('_id name price img category size brand');
    const count = await Product.countDocuments();
    res.status(200).json({
      message: 'Products found',
      data: { products, count },
      error: '',
    });
  } catch (error) {
    next(error);
  }
};
