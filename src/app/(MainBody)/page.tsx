"use client";
import NewsLatter from "@/views/Containers/news-letter";
import Layouts from "@/views/layouts/layout1";
import CollectionBanner from "@/views/layouts/layout1/collection-banner";
import CollectionBannerThree from "@/views/layouts/layout1/collection-banner-three";
import CollectionBannerTwo from "@/views/layouts/layout1/collection-banner-two";
import HotDeal from "@/views/layouts/layout1/hot-deal";
import SliderBanner from "@/views/layouts/layout1/slider";
import TabProduct from "@/views/layouts/widgets/Tab-Product/TabProduct";
import ContactBanner from "@/views/layouts/widgets/contact-us";
import DealBanner from "@/views/layouts/widgets/dealBanner";
import DiscountBanner from "@/views/layouts/widgets/discount-banner";
import DiscountCoupon from "@/views/layouts/widgets/discountCoupon";
import InstagramSection from "@/views/layouts/widgets/instagram/instagram1";
import RatioSquare from "@/views/layouts/widgets/ratio-square";
import Category from "@/views/layouts/widgets/roundedCategory";
import Testimonial from "@/views/layouts/widgets/testimonial";
import SpecialProduct from "@/views/layouts/widgets/title-section";
import DiscountProducts from "@/views/layouts/layout1/discounts";
import { centralDataCollector, CentralDataCollector } from '@/app/services/central_data_control';
import { useEffect, useState } from "react";
import { Discount, ObjCache } from "../globalProvider";
import { Subscription } from 'rxjs';

const centralDataCollectorObj: CentralDataCollector = centralDataCollector;

const Home = () => {
  const [products, setProducts] = useState<Discount[]>([]);

  useEffect(() => {
    // Subscribe to the Subject
    const subscription: Subscription = ObjCache.discountProducts.subscribe((data) => {
      console.log(" Data received from ObjCache:", data);
      setProducts(data);
    });

    // Initial and scheduled data fetch
    centralDataCollectorObj.getData();
    centralDataCollectorObj.scheduleGetData();

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);


  return (
    <>
      {/* <NewsLatter /> */}
      <Layouts>
        <div className="bg-light">
          <SliderBanner />
          {/* <CollectionBanner /> */}
          <DiscountBanner/>
          <TabProduct effect="icon-inline" />
          {/* <CollectionBannerTwo /> */}
          <DiscountProducts products={products}/>
          <section className="deal-banner">
            <DealBanner />
          </section>
          <section className="rounded-category">
            <Category />
          </section>
          <section className="box-category section-py-space">
            <DiscountCoupon />
          </section>
          <RatioSquare />
          <CollectionBannerThree />
          <HotDeal />
          <section className="testimonial testimonial-inverse">
            <Testimonial />
          </section>
          <SpecialProduct hoverEffect="icon-inline" />
          <section className="instagram">
            <InstagramSection />
          </section>
          <ContactBanner />
        </div>
      </Layouts>
    </>
  );
};

export default Home;
