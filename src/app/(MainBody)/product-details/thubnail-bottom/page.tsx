"use client";
import React from "react";
import { NextPage } from "next";
import Layout1 from "@/views/layouts/layout1";
import Breadcrumb from "@/views/Containers/Breadcrumb";
import TabProduct from "@/views/Products-Detail/tab-product";
import RelatedProducts from "@/views/Products-Detail/related products";
import ThubnailBottomPage from "@/views/Products-Detail/ThubnailBottomPage";

const ThubnailBottom: NextPage = () => {
  return (
    <div className="b-g-light">
      <Layout1>
        <Breadcrumb title="Thubnail Bottom" parent="product" />
        <section className="section-big-pt-space bg-light">
          <ThubnailBottomPage />
        </section>
        <div className="custom-container">
          <TabProduct />
        </div>
        <RelatedProducts />
      </Layout1>
    </div>
  );
};

export default ThubnailBottom;
