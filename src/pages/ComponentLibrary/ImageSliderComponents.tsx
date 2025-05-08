import React from "react";
import { Typography, Card, Divider } from "antd";
import { ImageSlider } from "../../components/common";

const { Title, Paragraph } = Typography;

const ImageSliderComponents: React.FC = () => {
    return (
        <div className="component-library">
            <Title level={2}>Image Slider Components</Title>
            <Paragraph>
                This page showcases the image slider components used throughout the application.
            </Paragraph>

            <Divider orientation="left">Image Slider</Divider>
            <Card variant="outlined" className="mb-8">
                <Title level={4}>ImageSlider</Title>
                <Paragraph>
                    A versatile image slider component with various display options.
                </Paragraph>

                <Title level={5}>Basic Image Slider</Title>
                <ImageSlider
                    images={[
                        {
                            src: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Landscape 1",
                            caption: "Beautiful mountain landscape",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Landscape 2",
                            caption: "Foggy forest scene",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Landscape 3",
                            caption: "Sunset over the mountains",
                        },
                    ]}
                    height={400}
                    className="mb-8"
                    imageProps={{
                        borderRadius: "8px",
                        shadow: true,
                    }}
                />

                <Title level={5}>Image Slider with Thumbnails</Title>
                <Paragraph>
                    This slider includes thumbnail navigation below the main images.
                </Paragraph>
                <ImageSlider
                    images={[
                        {
                            src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Nature 1",
                            caption: "Mountain lake at sunset",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Nature 2",
                            caption: "Forest pathway",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Nature 3",
                            caption: "Misty mountains",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Nature 4",
                            caption: "Autumn forest",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Nature 5",
                            caption: "Tropical beach",
                        },
                    ]}
                    height={400}
                    showThumbnails={true}
                    className="mb-8"
                    imageProps={{
                        borderRadius: "8px",
                        shadow: true,
                    }}
                />

                <Title level={5}>Advanced Image Slider</Title>
                <Paragraph>
                    This slider includes autoplay, fade effect, and thumbnail navigation with fade
                    effect.
                </Paragraph>
                <ImageSlider
                    images={[
                        {
                            src: "https://images.unsplash.com/photo-1520962922320-2038eebab146?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Urban 1",
                            caption: "City skyline at night",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Urban 2",
                            caption: "Street view with traffic",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Urban 3",
                            caption: "Modern architecture",
                        },
                        {
                            src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=600&h=400&auto=format&fit=crop",
                            alt: "Urban 4",
                            caption: "City street at dusk",
                        },
                    ]}
                    height={400}
                    showThumbnails={true}
                    fadeThumb={true}
                    autoplay={true}
                    autoplaySpeed={5000}
                    effect="fade"
                    className="mb-8"
                    imageProps={{
                        borderRadius: "8px",
                        shadow: true,
                    }}
                />
            </Card>
        </div>
    );
};

export default ImageSliderComponents;
