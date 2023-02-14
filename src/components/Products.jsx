import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:4000/api/v1/products?category=${cat}`
            : "http://localhost:4000/api/v1/products"
        );
        console.log(res);
        setProducts(res.data.products);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
  return (
    <Container>
      {
        products.map((item) => <Product item={item} key={item._id} />)
      }
    </Container>
  );
};

export default Products;
