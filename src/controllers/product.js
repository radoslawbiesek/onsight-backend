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
    const sort = req.query.sort || 'name';
    const products = await Product.find()
      .sort(sort)
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

exports.getFilters = async (req, res, next) => {
  try {
    const products = await Product.find(
      {},
      { category: 1, color: 1, size: 1, brand: 1 }
    );
    const brand = Array.from(new Set(products.map(({ brand }) => brand)));
    const size = Array.from(new Set(products.map(({ size }) => size)));
    const category = Array.from(new Set(products.map(({ category }) => category)));
    const color = Array.from(new Set(products.map(({ color }) => color).flat()));
    res.status(200).json({
      message: 'Categories found',
      error: '',
      data: { brand, size, category, color },
    });
  } catch (error) {
    next(error);
  }
};
