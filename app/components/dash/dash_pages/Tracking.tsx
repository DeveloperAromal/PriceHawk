"use client"

import React, { useEffect, useState } from "react";
import { runCronJob } from "../../../../utils/cronRunner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";
import Sidebar from "../dash_components/Sidebar";
import Ham from "../dash_components/Ham";

const supabase = createClientComponentClient();

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [addedProducts, setAddedProducts] = useState<
    Array<{
      url: string;
      uuid: any;
      title: string;
      price: string | null;
      image: string | null;
    }>
  >([]);

  useEffect(() => {
    console.log("Fetching products...");
    fetchProducts();
    
    const interval = setInterval(runCronJob, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("Scrape").select("*");

      if (error) {
        throw error;
      }

      if (data) {
        console.log("Fetched products:", data);
        setAddedProducts(data);
        setLoading(false);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      console.error("Error fetching products:", errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section className="flex">
      <Sidebar />
      <Ham />
      <div className="w-full pl-36 pr-20">
        <div>
          <div className="pt-10">
            <h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl pt-10">
              Tracked Products
            </h1>
          </div>
          {loading ? (
            <div className="flex justify-center py-4">
              <ScaleLoader color="gray" />
            </div>
          ) : (
            addedProducts.map((product, index) => (
              <div key={index} className="py-4">
                <div className="border border-gray-300 rounded-lg shadow-md flex flex-col md:flex-row">
                  {product.image && (
                    <div className="flex-none">
                      <Image
                        src={product.image}
                        alt="Product"
                        width={400}
                        height={400}
                        className="rounded-lg md:rounded-l-lg md:rounded-r-none"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      {product.title}
                    </h2>
                    {Array.isArray(product.price) ? (
                      <div>
                        <p className="text-base md:text-lg font-bold text-gray-700 mt-2">
                          <span className="text-teal-500">Prices:</span>
                        </p>
                        {product.price.map((price, index) => (
                          <p
                            key={index}
                            className="text-base md:text-lg font-bold text-gray-700"
                          >
                            {price}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-base md:text-lg font-bold text-gray-700">
                        <span className="text-teal-500">Price:</span>{" "}
                        {product.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          {error && <p className="text-center text-red-700">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
