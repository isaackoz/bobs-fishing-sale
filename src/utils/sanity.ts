import type { PortableTextBlock } from "@portabletext/types";
import type { ImageUrlBuilder } from "sanity";
import { sanityClient } from "sanity:client";

export interface Rod {
  name: string;
}

export interface Collection {
  name?: string;
  description?: string;
  slug: {
    current: string;
  };
}

export async function getRods(): Promise<Rod[]> {
  return await sanityClient.fetch(
    `*[_type=="fishingRod"] | order(publishedAt desc)`
  );
}

export async function getCollections(): Promise<Collection[]> {
  return await sanityClient.fetch(
    `*[_type=="collections"] | order(publishedAt desc)`
  );
}

export interface Item {
  refId: string;
  name: string;
  info: PortableTextBlock[];
  _id: string;
  brand: string;
  mainImage: ImageUrlBuilder;
}

export async function getItemsByCollection(
  collection: string
): Promise<Item[]> {
  console.log(collection);
  return await sanityClient.fetch(
    `*[_type == "items" && collection._ref in *[_type=="collections" && slug.current==$collection]._id]{_id, mainImage, name, refId, "brand":brand->name}`,
    { collection }
  );
}

export interface CollectionBySlug {
  name: string;
  description: string;
}

export async function getCollectionBySlug(
  collectionSlug: string
): Promise<CollectionBySlug> {
  return await sanityClient.fetch(
    `*[_type=="collections" && slug.current==$collectionSlug]{name, description}[0]`,
    {
      collectionSlug,
    }
  );
}
