import { forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";

interface CatalogFlipbookProps {
  images: string[];
}

const CatalogFlipbook = forwardRef<any, CatalogFlipbookProps>(
  ({ images }, ref) => {
    return (
      <HTMLFlipBook
        width={350}
        height={500}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        drawShadow={true}
        flippingTime={1000}
        startPage={0}
        useMouseEvents={true}
        clickEventForward={true}
        usePortrait={true}
        showPageCorners={true}
        disableFlipByClick={false}
        startZIndex={0}
        autoSize={true}
        swipeDistance={30}
        style={{}}
        ref={ref}
        className="flipbook-wrapper"
      >
        {images.map((src, idx) => (
          <div key={idx} className="page bg-white shadow-xl">
            <img
              src={src}
              alt={`Page ${idx + 1}`}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        ))}
      </HTMLFlipBook>
    );
  }
);

export default CatalogFlipbook;
