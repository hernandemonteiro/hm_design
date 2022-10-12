import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePagination from "../../../Hooks/usePagination";
import useProducts from "../../../Hooks/useProducts";
import ProductCard from "../../UI/ProductCard";
import "./ProductList.scss";

export default function ProductList() {
  const { pagination, buttonPaginate } = usePagination(9);
  const [message, setMessage] = useState("");
  const {
    products,
    productsFetch,
    productsCategoryFetch,
    productsSearchFetch,
  } = useProducts();
  const category = useParams().category;
  const search = useParams().search;

  useEffect(() => {
    category
      ? productsCategoryFetch(category)
      : search
      ? productsSearchFetch(search)
      : productsFetch();
    setTimeout(() => setMessage("Nada encontrado por aqui!"), 3000);
  }, []);
  return (
    <div className="productList">
      {products.length == 0 && <h1 className="NotFoundHere">{message}</h1>}
     
      {products
        .slice(0, pagination)
        .map(
          (element: {
            images: string;
            name: string;
            price: number;
            _id: string;
          }) => (
            <ProductCard
              key={element._id}
              img={JSON.parse(element.images)[0].id}
              name={element.name}
              price={element.price}
              id={element._id}
            />
          )
        )}
      {buttonPaginate(products.length)}
    </div>
  );
}
