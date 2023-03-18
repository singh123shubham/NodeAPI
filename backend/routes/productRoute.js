const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getProductReviews } = require("../controller/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const router = express.Router()

 router.route('/products').get(getAllProducts)
 router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
 router.route('/product/:id').put(authorizeRoles("admin"),updateProduct).delete(authorizeRoles("admin"),deleteProduct).get(getProductDetails)
 router.route("/review").put(isAuthenticatedUser, createProductReview);
 router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
 module.exports = router