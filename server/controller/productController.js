import * as repository from "../repository/productRepository.js";

export const getProducts = async (req, res) => {
  const params = req.body;
  const products = await repository.getProducts(params);
  res.json(products);
};

export const getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await repository.getProduct(id);
  res.json(product);
};
