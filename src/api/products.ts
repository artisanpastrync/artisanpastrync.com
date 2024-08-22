// const function getProducts(columns: string[], filters: string[], sort: string, order: string, page: number, limit: number) {

import { supabase } from "@/lib/utils";


// }

export async function getProducts(
  columns: string,                    // Required: the columns you want to select
  filters: string = '',               // Optional: filters for the query, default to an empty array
): Promise<any> {                       // Adjust the return type based on your actual data structure

  // Construct the query using Supabase
   let { data: product, error } = await supabase
        .from('product')
    .select(columns)
    filters                  // Apply filters if any

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }

  return product;
}
