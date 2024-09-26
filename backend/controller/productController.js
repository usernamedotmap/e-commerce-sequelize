const product = require("../db/models/product");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createProduct = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newProduct = await product.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  return res.status(201).json({
    status: "sucess",
    data: newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const userId = req.user.id
  const userType = req.user.userType;

  let result;

  if (userType === '1') {
    result = await product.findAll({ where: {createdBy: userId}})
  }

  else if (userType === '2') {
    result = await product.findAll()
  }

  
  return res.json({
    status: "sucess",
    data: result,
  });
});

const getProductsById = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const result = await product.findByPk(productId, { include: user });

  if (!result) {
    return next(new AppError("Invalid product id", 400));
  }

  return res.json({
    status: "sucess",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const body = req.body;

  const result = await product.findOne({
    where: { id: productId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Invalid product id", 400));
  }
  result.title = body.title;
  result.productImage = body.productImage;
  result.price = body.price;
  result.shortDescription = body.shortDescription;
  result.description = body.description;
  result.productUrl = body.productUrl;
  result.category = body.category;
  result.tags = body.tags;

  const updatedResult = await result.save();

  return res.json({
    status: "sucess",
    data: updatedResult,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const body = req.body;

  const result = await product.findOne({
    where: { id: productId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Invalid product id", 400));
  }
  result.title = body.title;
  result.productImage = body.productImage;
  result.price = body.price;
  result.shortDescription = body.shortDescription;
  result.description = body.description;
  result.productUrl = body.productUrl;
  result.category = body.category;
  result.tags = body.tags;

  await result.destroy();

  return res.json({
    status: "sucess",
    message: "product deleted successfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct
};
