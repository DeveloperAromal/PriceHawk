"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Modal from "../../../components/Modal";
import Tracker from "../../../components/dash/dash_components/Track_container";
import axios from "axios";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function ProductDetails({
  params,
}: {
  params: { productid: string };
}) {
  const { productid } = params;
  const [product, setProduct] = useState<{
    email: any;
    id: number;
    title: string;
    price: string | null;
    image: string | null;
    uuid:string
    url:string,
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Price_main")
          .select("*")
          .eq("uuid", productid)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProduct(data);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productid]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error || !product) {
    return <div>Error: {error || "Product not found"}</div>;
  }
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleSendTrackingDetails = async () => {
    if (product) {
      const trackingDetails = {
        id: product.id,
        url:product.url,
        title: product.title,
        image: product.image,
        price: product.price,
        uuid: product.uuid,
        email: product.email,
      };
  
      try {
        const { data: insertData, error } = await supabase
          .from("Scrape")
          .insert([trackingDetails]);
  
        if (error) {
          throw error;
        }
  
        console.log("Data inserted successfully:", insertData);
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
  };
  
  const handleDetailsClick = (product: any) => {
    setSelectedProduct(product);
  };


  return (
    <div className="h-screen flex justify-center items-center">
      {selectedProduct && (
        <Modal onClose={handleCloseModal}>
          <Tracker onClick={handleSendTrackingDetails} />
        </Modal>
      )}
      <div className="bg-neutral-800 shad shadow-lg rounded-lg p-6 flex flex-col items-center justify-center max-w-xl w-full">
        <div className="mb-4">
          <Image
            src={product.image || ""}
            alt="@"
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-teal-700 mb-2">
            {product.title}
          </h2>
          <p className="text-xl font-medium text-teal-800 mb-4">
            {product.price}
          </p>
          <button onClick={() => handleDetailsClick(product)} className="block w-full bg-cyan-600 text-white text-center py-2 rounded-lg hover:bg-cyan-700 transition duration-300">
            Track this product
          </button>
        </div>
      </div>
    </div>
  );
}
