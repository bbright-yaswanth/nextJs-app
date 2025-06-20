// services/CentralDataCollector.ts
import { useEffect, useState } from 'react';

import {
  BannerModel,
  CategoryRender,
  Product,
  StorePriceRanges,
  Discount,
  Kit,
  Category,
  Tags,
  Job,
  StoreAnnounce,
  ObjCache,
  DoneDiscount,
  TrackDiscount,
  API
} from '@/app/globalProvider'
import { UserController } from '@/views/user_auth/user_controller';



export class CentralDataCollector {
  // Data streams
  
  // public premiumStream = new LiveData<Map<CategoryRender, Product[]>>(new Map());
  // public nonPremiumStream = new LiveData<Map<CategoryRender, Product[]>>(new Map());
  // public priceRangeStream = new LiveData<StorePriceRanges>(StorePriceRanges.emptyPriceRanges());
  // public discountLiveData = new LiveData<Discount[]>([]);
  // public kitStream = new LiveData<Kit[]>([]);
  // public categoryStream = new LiveData<Category[]>([]);
  // public tagsLiveData = new LiveData<Tags>(Tags.emptyTags());
  // public jobLiveData = new LiveData<Job[]>([]);
  // public announceLiveData = new LiveData<StoreAnnounce>(StoreAnnounce.emptyAnnounce());

  // Loading states
  public isLoading = false;
  public isInitialLoading = true;
  public isCentralLoading = false;

  private refreshInterval: number = 60; // Default 60 seconds
  private dataScheduler?: NodeJS.Timeout;
  
  
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.resetInitialLoad();
<<<<<<< Updated upstream
    this.refreshInterval = parseInt(process.env.NEXT_PUBLIC_REFRESH_INTERVAL || '60');
    // this.scheduleGetData();
    // this.getData();
=======
     this.refreshInterval = parseInt(process.env.NEXT_PUBLIC_REFRESH_INTERVAL || '60');
    // this.getData(); 
>>>>>>> Stashed changes
  }

   scheduleGetData(): void { 
    this.dataScheduler = setInterval(async () => {
      console.log('Refreshing data');
      await this.getData();
      // await refreshCurrentStore(); // Implement this function as needed
<<<<<<< Updated upstream
      // this.scheduleGetData();
=======
>>>>>>> Stashed changes
    }, this.refreshInterval * 1000);
  }

  public cleanup(): void {
    if (this.dataScheduler) {
      clearInterval(this.dataScheduler);
      console.log('Data scheduler stopped');
    }
  }

  // Data fetching methods
  public async getCategories(): Promise<void> {
    
    try {
      const categories = await API.getCategories();
      
      //this.categoryStream.setValue(categories);
      ObjCache.resetObjCacheCategoryList();
      ObjCache.insertObjCacheCategoryList(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  // Data fetching methods
  public async getAllCategories(): Promise<void> {
    
    try {
      const categories = await API.getAllCategories();
      
      //this.categoryStream.setValue(categories);
      ObjCache.resetObjCacheAllCategoryList();
      ObjCache.insertObjCacheAllCategoryList(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
  public async getKits(): Promise<void> {
    try {
      const kits = await API.getKits();
      //this.kitStream.setValue(kits);
      ObjCache.resetObjCacheKitList();
      ObjCache.insertObjCacheKitList(kits);
    } catch (error) {
      console.error('Error fetching kits:', error);
    }
  }

  public async getDiscounts(): Promise<void> {
    DoneDiscount.resetDoneDiscount();
    await this.getAllDiscount();
  }

  public async getPremium(): Promise<void> {
    try {
      const premiumData = await API.getPremium();
      //this.premiumStream.setValue(premiumData);
      ObjCache.resetObjCachePremiumList();
      premiumData.forEach(([category, products]) => {
        //ObjCache.insertObjCachePremiumList(category.name, products);
      });
    } catch (error) {
      console.error('Error fetching premium data:', error);
    }
  }

  public async getBanners(): Promise<void> {
    try {
      const banners = await API.getBanners();
      
     // ObjCache.insertObjCacheBannerList(banners);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  }

  public async getAllBanners(): Promise<void> {
    try {
      const banners = await API.getAllBanners();
      
      ObjCache.insertObjCacheAllBannersList(banners);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  }

  public async getStoreJobs(): Promise<void> {
    try {
      const jobs = await API.getJobs();
      //this.jobLiveData.setValue(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  public async  getAllProducts(): Promise<void> {
    try {
      const allProducts = await API.getAllProducts();
      //allProducts.forEach(([category, products]) => {
        //ObjCache.insertObjCachePremiumList(category.name, products);
        ObjCache.insertObjCacheAllProducts(allProducts);
      //});
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  public async getData(): Promise<void> {
    if (this.isInitialLoading) {
      this.isCentralLoading = true;
    }

    try {
      await Promise.all([
        this.getAnnounce(),
        this.getAllBanners(),
        this.getCategories(),
        this.getAllCategories(),
        this.getDiscounts(),
        this.getStorePriceRanges(),
        this.getPremium(),
        this.getAllNonPremiumProducts(),
        this.getAllProducts(),
        this.getKits(),
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (this.isInitialLoading) {
        this.isCentralLoading = false;
        this.isInitialLoading = false;
        // Get.find<SearchPageController>().onInit(); // Implement as needed
      }

      ObjCache.refreshAllControllers();
    }
  }

  public resetInitialLoad(): void {
    this.isInitialLoading = true;
  }

  public async getStorePriceRanges(): Promise<void> {
    try {
      const priceRanges = await API.getStorePriceRanges();
      //this.priceRangeStream.setValue(priceRanges);
       ObjCache.insertObjCachePriceRangeStream(priceRanges);
    } catch (error) {
      console.error('Error fetching price ranges:', error);
    }
  }

  public async getAllNonPremiumProducts(): Promise<void> {
    try {
      const nonPremiumData = await API.getNonPremium();
      //this.nonPremiumStream.setValue(nonPremiumData);
      ObjCache.resetObjCacheNonPremiumList();
      nonPremiumData.forEach(([category, products]) => {
       // ObjCache.insertObjCacheNonPremiumList(category.name, products);
      });
    } catch (error) {
      console.error('Error fetching non-premium products:', error);
    }
  }

  public async getAnnounce(): Promise<void> {
    try {
      const announcement = await API.getStoreAnnounce();
      //this.announceLiveData.setValue(announcement);
    } catch (error) {
      console.error('Error fetching announcement:', error);
    }
  }

  public async getAllDiscount(): Promise<void> {
    try {
      const result = await API.getDiscounts();
      const hideDiscounts: string[] = [];
      // const userController = new UserController(); // Implement as needed
      // const phoneNumber = userController.loggedInPhoneNumber;

      // if (!phoneNumber) {
      //   throw new Error('Logged in phone number is null');
      // }

      // Filter out removed discounts
      const discountsToRemove = Array.from(TrackDiscount.discountsTracker.keys())
        .filter(itemId => !result.some(discount =>
          discount.id === itemId ||
          discount.getDiscountItems().some(item => item.id === itemId)
        ));

      discountsToRemove.forEach(discountId => {
        TrackDiscount.removeDiscountDetail(discountId);
        DoneDiscount.addDoneDiscount(discountId);
      });

      // Filter excluded discounts
      // result.forEach(discount => {
      //   if (discount.isDiscountExcludedToPhoneNumber(phoneNumber)) {
      //     console.log(`Discount is excluded to this user: ${discount.id}`);
      //     hideDiscounts.push(discount.id);
      //   }
      // });

      const filteredDiscounts = result.filter(discount =>
        !hideDiscounts.includes(discount.id)
      );

      // Separate expired and active discounts
      const now = Date.now();
      const notExpiredDiscounts = filteredDiscounts.filter(discount =>
        (discount.discountEndDate?.getTime() || 0) >= now
      );

      const expiredDiscounts = filteredDiscounts.filter(discount =>
        (discount.discountEndDate?.getTime() || 0) < now
      );

     // this.discountLiveData.setValue(notExpiredDiscounts);
      ObjCache.resetObjCacheDiscountList();
      ObjCache.insertObjCacheDiscountList(notExpiredDiscounts);

      // Update trackers
      notExpiredDiscounts.forEach(discount => {
        TrackDiscount.insertDiscountDetail(discount.id, discount.discountEndDate);
        discount.getDiscountItems().forEach(item => {
          TrackDiscount.insertDiscountDetail(item.id, discount.discountEndDate);
        });
      });

      // Clean up expired discounts
      expiredDiscounts.forEach(discount => {
        TrackDiscount.removeDiscountDetail(discount.id);
        DoneDiscount.addDoneDiscount(discount.id);
      });

      // Clean up hidden discounts
      hideDiscounts.forEach(discountId => {
        TrackDiscount.removeDiscountDetail(discountId);
        DoneDiscount.addDoneDiscount(discountId);
      });
      ObjCache.discountProducts.next(notExpiredDiscounts);
    } catch (error) {
      console.error('Error fetching discounts:', error);
    }
  }
}

// Singleton instance
export const centralDataCollector = new CentralDataCollector();