import { createClient } from "next-sanity";

const clientApi = createClient({
  projectId: "ktuj9syr",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});

export default clientApi;