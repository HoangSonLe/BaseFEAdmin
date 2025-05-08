import React, { useState, useRef } from "react";
import { Button, Carousel } from "antd";
import type { CarouselProps } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "../Image";
import type { ImageProps } from "../Image";
import "./ImageSlider.css";

export interface ImageItem {
    /**
     * Source URL of the image
     */
    src: string;
    /**
     * Alt text for the image
     */
    alt: string;
    /**
     * Optional caption for the image
     */
    caption?: React.ReactNode;
}

export interface ImageSliderProps {
    /**
     * Array of images to display in the slider
     */
    images: ImageItem[];
    /**
     * Width of the slider container
     */
    width?: number | string;
    /**
     * Height of the slider container
     */
    height?: number | string;
    /**
     * Whether to show navigation arrows
     * @default true
     */
    showArrows?: boolean;
    /**
     * Whether to show navigation dots
     * @default true
     */
    showDots?: boolean;
    /**
     * Whether to enable auto play
     * @default false
     */
    autoplay?: boolean;
    /**
     * Interval for auto play in milliseconds
     * @default 3000
     */
    autoplaySpeed?: number;
    /**
     * Whether to show thumbnails below the slider
     * @default false
     */
    showThumbnails?: boolean;
    /**
     * Custom class name for the slider container
     */
    className?: string;
    /**
     * Custom style for the slider container
     */
    style?: React.CSSProperties;
    /**
     * Props to pass to the Image component
     */
    imageProps?: Omit<ImageProps, "src" | "alt" | "caption">;
    /**
     * Whether to enable preview when clicking on images in the main carousel
     * @default true
     */
    preview?:
        | boolean
        | {
              /**
               * Custom mask on preview
               */
              mask?: React.ReactNode;
              /**
               * Whether to show mask on hover
               * @default true
               */
              maskVisible?: boolean;
          };
    /**
     * The animation effect
     * @default 'slide'
     */
    effect?: "scrollx" | "fade";
    /**
     * Whether to use a fade effect for thumbnails
     * @default false
     */
    fadeThumb?: boolean;
    /**
     * Additional props to pass to the Carousel component
     */
    carouselProps?: Omit<CarouselProps, "autoplay" | "dots">;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
    images,
    width = "100%",
    height = 400,
    showArrows = true,
    showDots = true,
    autoplay = false,
    autoplaySpeed = 3000,
    showThumbnails = false,
    className = "",
    style,
    imageProps,
    preview = true,
    effect = "scrollx",
    fadeThumb = false,
    carouselProps,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<any>(null);
    const thumbCarouselRef = useRef<any>(null);

    // Handle next slide
    const nextSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    // Handle previous slide
    const prevSlide = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    // Handle slide change
    const handleSlideChange = (current: number) => {
        setCurrentIndex(current);

        // Sync thumbnail carousel if it exists
        if (showThumbnails && thumbCarouselRef.current) {
            thumbCarouselRef.current.goTo(current);
        }
    };

    // Handle thumbnail click
    const handleThumbnailClick = (index: number) => {
        if (carouselRef.current) {
            carouselRef.current.goTo(index);
        }
    };

    // Combine styles
    const containerStyle: React.CSSProperties = {
        width,
        ...style,
    };

    // Carousel settings
    const carouselSettings: CarouselProps = {
        effect,
        autoplay,
        autoplaySpeed,
        dots: showDots,
        beforeChange: (_, next) => handleSlideChange(next),
        adaptiveHeight: true,
        draggable: true,
        ...carouselProps,
    };

    // Thumbnail carousel settings
    const thumbCarouselSettings: CarouselProps = {
        dots: false,
        slidesToShow: Math.min(5, images.length),
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        centerMode: images.length > 5,
        centerPadding: "60px",
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(4, images.length),
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(3, images.length),
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(2, images.length),
                    centerMode: false,
                },
            },
        ],
    };

    return (
        <div className={`image-slider-container ${className}`} style={containerStyle}>
            <div className="image-slider-wrapper" style={{ height }}>
                {/* Main carousel */}
                <div className="image-slider-carousel">
                    <Carousel ref={carouselRef} {...carouselSettings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <div className="image-slider-slide">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        caption={image.caption}
                                        className="image-slider-image"
                                        width="auto"
                                        height="auto"
                                        preview={preview}
                                        {...imageProps}
                                    />
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Navigation arrows */}
                {showArrows && images.length > 1 && (
                    <>
                        <Button
                            className="image-slider-arrow image-slider-arrow-left"
                            icon={<LeftOutlined />}
                            onClick={prevSlide}
                        />
                        <Button
                            className="image-slider-arrow image-slider-arrow-right"
                            icon={<RightOutlined />}
                            onClick={nextSlide}
                        />
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {showThumbnails && images.length > 1 && (
                <div className="image-slider-thumbnails-container">
                    <div className={`image-slider-thumbnails ${fadeThumb ? "fade-thumb" : ""}`}>
                        <Carousel ref={thumbCarouselRef} {...thumbCarouselSettings}>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <div
                                        className={`image-slider-thumbnail ${
                                            index === currentIndex
                                                ? "image-slider-thumbnail-active"
                                                : ""
                                        }`}
                                        onClick={() => handleThumbnailClick(index)}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            preview={false}
                                            className="image-slider-thumbnail-image"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
