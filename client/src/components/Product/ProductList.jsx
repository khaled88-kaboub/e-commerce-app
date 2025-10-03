import ProductItem from "./ProductItem";
const ProductList = ({ products, page }) => {
  return (
    <div className="product-list">
      {products &&
        products.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
    </div>
  );
};

export default ProductList;
