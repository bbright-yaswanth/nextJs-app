// services/api.ts

import axios from 'axios';

const API_URL = 'https://1rpapp.in/v1/fetch-banners';

const API_BASE_URL = 'https://devqarupeecomservice.rupeecom.in/v1';

const API_PROD_URL = 'https://1rpapp.in/v1';
const tenant_id = "owuhhrlb";

export interface BannerModel {
  id: string;
  title: string;
  imageUrl?: string;
  [key: string]: any; // For additional dynamic fields
}

export const getBanners = async (
  tenantId: string,
  storeId: string
): Promise<BannerModel[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        tenant_id: tenant_id,
        store_id: storeId,
      },
    });

    const data = response.data?.data;

    if (Array.isArray(data)) {
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        ...item,
      }));
    } else {
      console.warn('Unexpected data format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
};


export async function getAllBanners(tenantId: string): Promise<BannerModel[]> {

const API_BASE_URL = 'https://devqarupeecomservice.rupeecom.in/v1';
  try {
    const response = await axios.get(`${API_PROD_URL}/fetch-All-banners`, {
      params: {
        tenant_id: tenant_id,
      },
    });

    const data = response.data?.data;

    if (Array.isArray(data)) {
      const banners: BannerModel[] = [];

      for (const item of data) {
        try {
          // You can customize this parsing logic if needed
          banners.push({
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            ...item,
          });
        } catch (err) {
          console.info(
            `Error parsing BannerModel for item: ${item.name ?? 'Unknown'}. Error: ${err}`
          );
        }
      }

      return banners;
    } else {
      console.info('Banners data is not a list or is null.');
      return [];
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.info(`Banner API error: ${error.message}`);
      throw new Error(`Banner API error: ${error.message}`);
    } else {
      console.info(`Unknown error fetching banners: ${error}`);
      throw new Error(`Error fetching Banner: ${error}`);
    }
  }
}


export interface BusinessDetails {
  id: string;
  name: string;
  address?: string;
  [key: string]: any;
}

export async function getBusinessDetails(tenantId: string): Promise<BusinessDetails> {

const API_BASE_URL = 'https://1rpapp.in/v1';
  try {
    const response = await axios.get(`${API_BASE_URL}/get-business`, {
      params: {
        tenant_id: tenant_id,
      },
    });

    const businessDataList = response.data?.data;

    if (!Array.isArray(businessDataList) || businessDataList.length === 0) {
      throw new Error("No business details found.");
    }

    const businessDetailMap = businessDataList[0];

    return {
      id: businessDetailMap.id,
      name: businessDetailMap.name,
      address: businessDetailMap.address,
      ...businessDetailMap,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Business API error: ${error.message}`);
    } else {
      throw new Error(`Error fetching business details: ${error}`);
    }
  }
}




export interface Product {
  id: string;
  name: string;
  price?: number;
  isPremium: boolean;
  [key: string]: any;
}

export interface CategoryRender {
  name: string;
  viewOption: string;
  sort: number;
  img: any[];
}

type AllProducts = Map<string, Product[]>;

function serializeCategory(category: CategoryRender): string {
  // Serialize to a unique string key (e.g., JSON or custom key)
  return `${category.name}|${category.viewOption}|${category.sort}`;
}

export async function getAllProducts(tenantId: string): Promise<AllProducts> {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-all-products`, {
      params: { tenant_id: tenant_id },
    });

    const data = response.data?.data;
    const allProducts: AllProducts = new Map();

    for (const element of data) {
      try {
        const category: CategoryRender = {
          name: element['category_name'],
          viewOption: element['view_option'],
          sort: element['category_sort'],
          img: element['category_image'],
        };

        const key = serializeCategory(category);
        if (!allProducts.has(key)) {
          allProducts.set(key, []);
        }

        const productsList = element['products'];

        for (const p of productsList) {
          try {
            const premiumProduct: Product = { ...p, isPremium: true };
            const nonPremiumProduct: Product = { ...p, isPremium: false };
            allProducts.get(key)?.push(premiumProduct, nonPremiumProduct);
          } catch (e) {
            console.info(`Error in fetching product data: ${JSON.stringify(p)}`);
          }
        }
      } catch (e) {
        console.info(`Error in fetching category data: ${JSON.stringify(element)}`);
      }
    }

    return allProducts;
  } catch (e) {
    throw new Error(`All products API error: ${e}`);
  }
}

export interface CategoryRender {
  name: string;
  viewOption: string;
  sort: number;
  img: any[];
}

type ProductMap = Map<string, Product[]>;

// Shared utility
async function fetchProductsByType(
  endpoint: string,
  tenantId: string,
  storeId: string,
  isPremium: boolean
): Promise<ProductMap> {
  try {
    const response = await axios.get(`${API_PROD_URL}/${endpoint}`, {
      params: {
        tenant_id: tenant_id,
        store_id: storeId,
      },
    });

    const data = response.data?.data;
    const resultMap: ProductMap = new Map();

    for (const element of data) {
      try {
        const category: CategoryRender = {
          name: element['category_name'],
          viewOption: element['view_option'],
          sort: element['category_sort'],
          img: element['category_image'],
        };

        const key = serializeCategory(category);
        if (!resultMap.has(key)) {
          resultMap.set(key, []);
        }

        for (const p of element['products']) {
          try {
            const product: Product = {
              ...p,
              isPremium,
            };
            resultMap.get(key)?.push(product);
          } catch (e) {
            console.info(`Error in fetching ${isPremium ? 'premium' : 'non-premium'} product data: ${JSON.stringify(p)}`);
          }
        }
      } catch (e) {
        console.info(`Error in fetching category: ${JSON.stringify(element)}`);
      }
    }

    return resultMap;
  } catch (e) {
    throw new Error(`${isPremium ? 'Premium' : 'Non-premium'} products API error: ${e}`);
  }
}

// ✅ getPremium
export async function getPremiumProducts(tenantId: string, storeId: string): Promise<ProductMap> {
  return await fetchProductsByType('fetch-premium-products', tenantId, storeId, true);
}

// ✅ getNonPremium
export async function getNonPremiumProducts(tenantId: string, storeId: string): Promise<ProductMap> {
  return await fetchProductsByType('fetch-non-premium-products', tenantId, storeId, false);
}


// const API_BASE_URL = 'https://1rpapp.in/v1';
// const DEV_API_BASE_URL = 'https://devqarupeecomservice.rupeecom.in/v1';
const TENANT_SERVICE_URL = 'https://tenantservice.1rpapp.in/v1';

export interface Category {
  id: string;
  name: string;
  [key: string]: any;
}

export interface OrderSummary {
  [key: string]: any;
}

export interface AppLogo {
  logoUrl: string;
  [key: string]: any;
}

// Get active categories
export async function getCategories(tenantId: string, storeId: string): Promise<Category[]> {
  try {
    const response = await axios.get(`${API_PROD_URL}/fetch-active-categories`, {
      params: {
        tenant_id: tenant_id,
        store_id: storeId,
      },
    });

    const data = response.data?.data;
    if (Array.isArray(data)) {
      return data.map((item) => ({ ...item })) as Category[];
    }
    return [];
  } catch (e: any) {
    throw new Error(`Categories API error: ${e.message}`);
  }
}

// Get all categories
export async function getAllCategories(tenantId: string): Promise<Category[]> {
  try {
    const response = await axios.get(`${API_PROD_URL}/fetch-all-categories`, {
      params: {
        tenant_id: tenant_id,
      },
    });

    const data = response.data?.data;
    if (Array.isArray(data)) {
      return data.map((item) => ({ ...item })) as Category[];
    }
    return [];
  } catch (e: any) {
    throw new Error(`All Categories API error: ${e.message}`);
  }
}

// Save order summary
export async function saveOrderSummary(orderSummary: OrderSummary): Promise<void> {
  try {
    const response = await axios.post(`${TENANT_SERVICE_URL}/order-summary`, orderSummary);
    if (response.status !== 200) {
      throw new Error(`Saving order details error: ${response.statusText}`);
    }
  } catch (e: any) {
    throw new Error(`Order details API error: ${e.message}`);
  }
}

// Get App Logo
export async function getAppLogo(tenantId: string): Promise<AppLogo> {
  try {
    const response = await axios.get(`${TENANT_SERVICE_URL}/get-app-config`, {
      params: {
        tenant_id: tenantId,
      },
    });
    return response.data?.data as AppLogo;
  } catch (e: any) {
    throw new Error(`AppLogo API error: ${e.message}`);
  }
}






