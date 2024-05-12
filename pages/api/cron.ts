import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data: storedProducts, error } = await supabase.from('Scrape').select('*');
    if (error) throw error;

    for (const product of storedProducts) {
      try {
        console.log("Scraping product:", product.url);
        const response = await axios.post(
          "http://localhost:8000/api/scrape",
          { url: product.url },
          { timeout: 120000 }
        );

        const scrapedData = response.data;
        console.log("Scraped data:", scrapedData);

        // Update the price in the "Scrape" table
        const newData = {
          title: scrapedData.title,
          price: scrapedData.price,
          image: scrapedData.image,
          url: product.url,
          email: product.email,
          uuid: product.uuid,
        };

        const { data: updatedData, error } = await supabase
          .from("Scrape")
          .update(newData)
          .eq('uuid', product.uuid);

        if (error) {
          throw error;
        }

        console.log("Data updated successfully in Scrape table:", updatedData);

        const { data: insertData, error: insertError } = await supabase
          .from("Send_Email")
          .insert([newData]);

        if (insertError) {
          throw insertError;
        }

        console.log("Data inserted successfully into Send_Email table:", insertData);

        // Send email
        await sendEmail(newData);
      } catch (error) {
        console.error("Error processing product:", product.url, "-", error);
      }
    }

    res.status(200).json({ message: 'Cron job completed successfully.' });
  } catch (error) {
    console.error('Error in cron job:', error);
    res.status(500).json({ error: 'An error occurred during the cron job.' });
  }
}

async function sendEmail(data: any) {
  const apiEndpoint = 'https://server-gbcr.onrender.com/api/email/sendmail';

  try {
    const response = await axios.post(apiEndpoint, data);
    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
    console.log("Email sent successfully");
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
