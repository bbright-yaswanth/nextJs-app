/* eslint-disable @next/next/no-img-element */
"use client";
import { CompareContext } from "@/helpers/compare/compare.context";
import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner, Button } from "reactstrap";
import { Skeleton } from "../../common/skeleton";
import { CartContext } from "../../helpers/cart/cart.context";
import { FilterContext } from "../../helpers/filter/filter.context";
import { WishlistContext } from "../../helpers/wishlist/wish.context";
import ProductBox from "../layouts/widgets/Product-Box/productbox";
import CollectionBanner from "./CollectionBanner";
import { useSearchParams } from "next/navigation";
import { ObjCache } from "@/app/globalProvider";
import { Discount } from "@/app/models/models";

const GET_PRODUCTS_QUERY = gql`
  query getProducts(
    $type: CategoryType!
    $color: String!
    $priceMax: Int!
    $priceMin: Int!
    $sortBy: ProductSort
    $indexFrom: Int!
    $limit: Int!
  ) {
    products(
      type: $type
      color: $color
      priceMax: $priceMax
      priceMin: $priceMin
      sortBy: $sortBy
      indexFrom: $indexFrom
      limit: $limit
    ) {
      total
      hasMore
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        sale
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

type CollectionProps = {
  cols: any;
  layoutList: string;
};

const Collection: NextPage<CollectionProps> = ({ cols, layoutList }) => {
  const {
    selectedCategory,
    selectedBrands,
    selectedColor,
    selectedPrice,
    setSelectedColor,
    setSelectedBrands,
    setLeftSidebarOpen,
    leftSidebarOpen,
  } = useContext(FilterContext);
  const { addToCart } = useContext(CartContext);
  const { addToWish } = useContext(WishlistContext);
  const { addToCompare } = useContext(CompareContext);
  const [grid, setGrid] = useState(cols);
  const [sortBy, setSortBy] = useState("ASC_ORDER");
  const [pageLimit, setPageLimit] = useState(10);
  const [layout, setLayout] = useState(layoutList);
  const [discount, setDiscount] = useState<Discount>();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const discountId = searchParams.get("id");

  useEffect(() => {
    const subscription = ObjCache.discountProducts.subscribe((data: Discount[]) => {
      if (data && data.length > 0) {
        const foundDiscount = data.find((item: Discount) => item.id === discountId);
        if (foundDiscount) {
          setDiscount(foundDiscount);
        }
      }
    });

    return () => {
      subscription.unsubscribe?.();
    };
  }, [discountId]);

  const { loading } = useQuery(GET_PRODUCTS_QUERY, {
    variables: {
      type: selectedCategory || "all",
      color: selectedColor || "",
      indexFrom: 0,
      limit: pageLimit,
      priceMax: selectedPrice?.max ?? 100000,
      priceMin: selectedPrice?.min ?? 0,
      brand: selectedBrands || [],
      sortBy: sortBy,
    },
  });

  const removeBrand = (val: any) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    setSelectedBrands(temp);
  };

  const removeColor = () => {
    setSelectedColor("");
  };

  const handlePagination = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPageLimit((prev) => prev + 10);
      setIsLoading(false);
    }, 500);
  };

  

  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <CollectionBanner img={discount?.img?.[0]} name={discount?.name} details={discount?.details} />

            <div className="collection-product-wrapper">
              {/* Filter tags */}
              <Row>
                <Col xs="12">
                  <ul className="product-tags">
                    {!!discount?.discountItems?.length &&
                       discount.discountItems.map((brand: any, i: number) => (
                        <li className="me-1" key={i}>
                          <a className="filter_tag">
                            {brand.name}
                            <i className="ti-close" onClick={() => removeBrand(brand)}></i>
                          </a>
                        </li>
                      ))}
                    {!!selectedColor.length && (
                      <li className="me-1">
                        <a className="filter_tag">
                          {selectedColor}
                          <i className="ti-close" onClick={removeColor}></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </Col>
              </Row>

              {/* Product Grid */}
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {loading ||!discount?.discountItems?.length? (
                    <Col xs="12">
                      <Skeleton />
                    </Col>
                  ) : (
                    discount.discountItems.slice(0, pageLimit).map((item: any, i: number) => (
                      <div className={grid} key={i}>
                        <div className="product">
                          <ProductBox
                            layout="layout-one"
                            data={item}
                            newLabel={item.new}
                            item={item}
                            addCart={() => addToCart(item)}
                            addCompare={() => addToCompare(item)}
                            addWish={() => addToWish(item)}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>

              {/* Pagination */}
              <div className="product-pagination loadmore-pagination">
                <div className="theme-paggination-block">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {discount?.discountItems?.length > pageLimit && (
                        <Button onClick={handlePagination}>
                          {isLoading? (
                            <Spinner size="sm" color="light">
                              {" "}
                            </Spinner>
                          ) : (
                            "Load More"
                          )}
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Collection;
