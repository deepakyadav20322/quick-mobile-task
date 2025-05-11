import React, { useEffect, useState } from "react";
import axios from "axios";

const MainComponents = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://quick-mobile.onrender.com/api/service");
        setServices(res?.data.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://quick-mobile.onrender.com/api/product");
        setProducts(res?.data?.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchServices();
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 px-4 py-10 max-w-7xl mx-auto">
      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {services?.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="  bg-[#ffe7cb] flex items-center justify-center px-2 aspect-auto rounded-md mb-1 cursor-pointer">
                <img
                  src={service.servicePic}
                  alt={service.serviceName}
                  className="h-48 w-48 object-contain"
                />
              </div>
              <p className="text-base font-medium text-gray-700 text-center">
                {service.serviceName}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section--------------------------------------- */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Top Selling Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
          {products?.map((product, idx) => (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200 ">
              {product.onSale && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  On Sale
                </div>
              )}

              {/* Product Image */}
              <div className="p-4 bg-gray-50 flex justify-center cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 ">
                {/* Title and Variant */}
                <h3 className="font-semibold text-lg text-gray-900 text-center">
                  {product.name}
                </h3>
                <p className="text-base text-gray-500 mt-1 text-center">
                  {product.variant}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-2 justify-center w-full">
                  <div className="flex text-yellow-400 text-lg ">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {product.rating}
                    {/* ({product.reviews.toLocaleString()}) */}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex flex-row ">
                  <p className="text-base pr-1 text-gray-500 text-nowrap">
                    Starting at
                  </p>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-800 text-lg">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">
                        ₹{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainComponents;
