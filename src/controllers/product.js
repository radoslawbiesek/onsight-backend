const Product = require('../models/product');

const HTTPError = require('../errors/httpError');

const FILTERS = ['brand', 'category', 'color', 'size'];

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
    const {
      offset = null,
      limit = null,
      sort = 'name',
      ...queryFilters
    } = req.query;

    let filters = {};
    Object.keys(queryFilters).forEach((key) => {
      if (FILTERS.includes(key) && queryFilters[key] !== '') {
        filters[key] = { $in: queryFilters[key].split(',') };
      }
    });

    const products = await Product.find(filters)
      .sort(sort)
      .skip(+offset)
      .limit(+limit)
      .select('_id name price img category size brand');
    const count = await Product.countDocuments(filters);
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
      { category: 1, color: 1, size: 1, brand: 1, _id: 0 }
    );
    const data = products.reduce(
      (acc, product) => {
        FILTERS.forEach((filter) => {

          acc[filter] = Array.isArray(product[filter])
            ? Array.from(new Set([...acc[filter], ...product[filter]]))
            : Array.from(new Set([...acc[filter], product[filter]]));
        });
        // acc.brand = Array.from(new Set([...acc.brand, product.brand]));
        // acc.category = Array.from(new Set([...acc.category, product.category]));
        // acc.color = Array.from(new Set([...acc.color, ...product.color]));
        // acc.size = Array.from(new Set([...acc.size, product.size]));
        return acc;
      },
      { brand: [], category: [], color: [], size: [] }
    );

    res.status(200).json({
      message: 'Categories found',
      error: '',
      data,
    });
  } catch (error) {
    next(error);
  }
};
