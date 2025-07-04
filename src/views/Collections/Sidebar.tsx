/* eslint-disable react-hooks/exhaustive-deps */
import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { Collapse, Input, Label } from "reactstrap";
import { FilterContext } from "../../helpers/filter/filter.context";
import { useRouter, useSearchParams } from "next/navigation";

const GET_BRANDS = gql`
  query getAllBrands($type: String) {
    getBrands(type: $type) {
      brand
    }
    getColors(type: $type) {
      colors
    }
  }
`;

const Sidebar: NextPage = () => {
  const { handleBrands, selectedBrands, selectedColor, setSelectedColor, setSelectedPrice, setSelectedBrands, setSelectedCategory, selectedCategory, selectedPrice, leftSidebarOpen, setLeftSidebarOpen } = useContext(FilterContext);
  var { loading, data } = useQuery(GET_BRANDS, {
    variables: {
      type: selectedCategory.toLowerCase(),
    },
  });
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const toggleBrand = () => setIsBrandOpen(!isBrandOpen);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const toggleColor = () => setIsColorOpen(!isColorOpen);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const togglePrice = () => setIsPriceOpen(!isPriceOpen);
  const [radioChecked, setRadioChecked] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    router.push(`${window.location.pathname}?brand=${selectedBrands}&color=${selectedColor}&category=${selectedCategory}&pricemin=${selectedPrice.min}&pricemax=${selectedPrice.max}`);
  }, [selectedCategory, selectedPrice, selectedBrands, selectedColor, router]);

  useEffect(() => {
    
    const { min, max } = selectedPrice;
    if (min === 0 && max === 100) setRadioChecked(1);
    else if (min === 100 && max === 200) setRadioChecked(2);
    else if (min === 200 && max === 300) setRadioChecked(3);
    else if (min === 300 && max === 400) setRadioChecked(4);
    else if (min === 400) setRadioChecked(5);
    else setRadioChecked(null);
  }, [searchParams.get("pricemin"), selectedPrice]);

  const resetFilter = () => {
    setSelectedBrands([]);
    setSelectedColor("");
    setSelectedPrice({ min: 0, max: 500 });
    setRadioChecked(null);
  };
  return (
    <div className="collection-filter-block creative-card creative-inner category-side">
      {/* <!-- brand filter start --> */}
      <div className="collection-mobile-back">
        <span className="filter-back" onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}>
          <i className="fa fa-angle-left" aria-hidden="true"></i> back
        </span>
      </div>
      {/* <!-- price filter start here --> */}
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title mt-0" onClick={toggleCategory}>
          Category
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <ul className="category-list">
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("ALL");
                      resetFilter();
                    }}
                  >
                    ALL PRODUCTS
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("FASHION");
                      resetFilter();
                    }}
                  >
                    FASHION
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("ELECTRONICS");
                      resetFilter();
                    }}
                  >
                    ELECTRONIC
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("VEGETABLES");
                      resetFilter();
                    }}
                  >
                    VEGETABLES
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("FURNITURE");
                      resetFilter();
                    }}
                  >
                    FURNITURE
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("JEWELLWEY");
                      resetFilter();
                    }}
                  >
                    JEWELLWEY
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("BEAUTY");
                      resetFilter();
                    }}
                  >
                    BEAUTY
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("FLOWER");
                      resetFilter();
                    }}
                  >
                    FLOWER
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("TOOLS");
                      resetFilter();
                    }}
                  >
                    TOOLS
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("WATCH");
                      resetFilter();
                    }}
                  >
                    WATCH
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("METRO");
                      resetFilter();
                    }}
                  >
                    METRO
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("SHOES");
                      resetFilter();
                    }}
                  >
                    SHOES
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("BAGS");
                      resetFilter();
                    }}
                  >
                    BAGS
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("KIDS");
                      resetFilter();
                    }}
                  >
                    KIDS
                  </a>
                </li>
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory("PETS");
                      resetFilter();
                    }}
                  >
                    PETS
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Collapse>
      </div>
      {!data || !data.getBrands || data.getBrands.brand.length === 0 || loading ? (
        loading && <h4>Loading</h4>
      ) : (
        <div className="collection-collapse-block open">
          <h3 className="collapse-block-title mt-0" onClick={toggleBrand}>
            brand
          </h3>
          <Collapse isOpen={isBrandOpen}>
            <div className="collection-collapse-block-content">
              <div className="collection-brand-filter">
                {data.getBrands.brand.map((brand: string, i: number) => (
                  <div className="custom-control custom-checkbox collection-filter-checkbox" key={`brand-${i}`}>
                    <Input
                      checked={selectedBrands.includes(brand)}
                      onChange={() => {
                        handleBrands(brand);
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id="zara"
                    />
                    <label className="custom-control-label">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
          </Collapse>
        </div>
      )}
      {/* <!-- color filter start here --> */}
      {!data || !data.getColors || data.getColors.colors.length === 0 || loading ? (
        loading && <h4>Loading</h4>
      ) : (
        <div className="collection-collapse-block open">
          <h3 className="collapse-block-title" onClick={toggleColor}>
            colors
          </h3>
          <Collapse isOpen={isColorOpen}>
            <div className="collection-collapse-block-content">
              <div className="color-selector">
                <ul>
                  {data.getColors.colors.map((color: string, i: number) => (
                    <li
                      className={`${color} ${selectedColor === color ? "active" : ""}`}
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                      key={i}
                    ></li>
                  ))}
                </ul>
              </div>
            </div>
          </Collapse>
        </div>
      )}
      {/* <!-- price filter start here --> */}
      <div className="collection-collapse-block border-0 open">
        <h3 className="collapse-block-title" onClick={togglePrice}>
          price
        </h3>
        <Collapse isOpen={isPriceOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input onClick={() => setSelectedPrice({ min: 0, max: 100 })} type="radio" name="price-filter" className="custom-control-input" id="hundred" checked={radioChecked === 1} onChange={() => setRadioChecked(1)} />
                <Label className="custom-control-label">$0 - $100</Label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input onClick={() => setSelectedPrice({ min: 100, max: 200 })} type="radio" name="price-filter" className="custom-control-input" id="twohundred" checked={radioChecked === 2} onChange={() => setRadioChecked(2)} />
                <Label className="custom-control-label">$100 - $200</Label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input onClick={() => setSelectedPrice({ min: 200, max: 300 })} type="radio" name="price-filter" className="custom-control-input" id="threehundred" checked={radioChecked === 3} onChange={() => setRadioChecked(3)} />
                <Label className="custom-control-label">$200 - $300</Label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input onClick={() => setSelectedPrice({ min: 300, max: 400 })} type="radio" name="price-filter" className="custom-control-input" id="fourhundred" checked={radioChecked === 4} onChange={() => setRadioChecked(4)} />
                <Label className="custom-control-label">$300 - $400</Label>
              </div>
              <div className="custom-control custom-checkbox collection-filter-checkbox">
                <Input onClick={() => setSelectedPrice({ min: 400, max: 1000 })} type="radio" name="price-filter" className="custom-control-input" id="fourhundredabove" checked={radioChecked === 5} onChange={() => setRadioChecked(5)} />
                <Label className="custom-control-label">$400 above</Label>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Sidebar;
