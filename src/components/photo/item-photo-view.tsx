import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/utils/sanity-img-url";

export function ItemPhotoView({
  mainImage,
  otherImages,
}: {
  mainImage: SanityImageSource;
  otherImages: SanityImageSource[];
}) {
  return (
    <PhotoProvider>
      <div className="flex my-6 border-gray-300 border-2 space-x-2 space-y-2 flex-wrap items-center">
        {mainImage && (
          <PhotoView src={urlFor(mainImage).url()}>
            <img
              src={urlFor(mainImage).width(96).url()}
              className="object-contain h-24 w-24 hover:cursor-zoom-in"
            />
          </PhotoView>
        )}
        {otherImages?.map((item, index) => (
          <PhotoView key={index} src={urlFor(item).url()}>
            <img
              src={urlFor(item).width(96).url()}
              className="object-contain h-24 w-24 hover:cursor-zoom-in"
            />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
