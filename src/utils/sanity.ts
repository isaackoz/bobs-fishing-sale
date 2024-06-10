import type { PortableTextBlock } from "@portabletext/types";
import type { ImageUrlBuilder } from "sanity";
import { sanityClient } from "sanity:client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Collection {
  name?: string;
  description?: string;
  slug: {
    current: string;
  };
}

export async function getCollections(): Promise<Collection[]> {
  return await sanityClient.fetch(
    `*[_type=="collections"] | order(publishedAt desc)`
  );
}

export interface Item {
  refId: string;
  name: string;
  info?: PortableTextBlock[];
  _id: string;
  brand?: string;
  mainImage?: SanityImageSource;
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

export async function getAllItems(): Promise<Item[]> {
  return await sanityClient.fetch(`*[_type=="items"]{_id}`);
}

export interface DetailedItem {
  _id: string;
  name: string;
  brand: string;
  mainImage: SanityImageSource;
  refId: string;
  info: PortableTextBlock[];
  updated: string;
  created: string;
  otherImages: SanityImageSource[];
}

export async function getItemById(id: string): Promise<DetailedItem> {
  return await sanityClient.fetch(
    `*[_type=="items" && _id==$id]{_id, name, "brand":brand->name, mainImage, refId, info, "updated":_updatedAt, "created":_createdAt, otherImages}[0]`,
    {
      id,
    }
  );
}
