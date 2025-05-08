import React from "react";
import { Image as AntImage } from "antd";
import type { ImageProps as AntImageProps } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./Image.css";

export interface ImageProps extends Omit<AntImageProps, "preview"> {
    /**
     * Whether to show preview when clicking the image
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
              /**
               * Callback when preview is closed
               */
              onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
              /**
               * Callback when preview is opened
               */
              onPreviewClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
          };
    /**
     * Custom class name for the image container
     */
    containerClassName?: string;
    /**
     * Custom style for the image container
     */
    containerStyle?: React.CSSProperties;
    /**
     * Whether to apply a hover effect to the image
     * @default false
     */
    hoverable?: boolean;
    /**
     * Whether to apply a shadow effect to the image
     * @default false
     */
    shadow?: boolean;
    /**
     * Whether to apply a border to the image
     * @default false
     */
    bordered?: boolean;
    /**
     * Border radius of the image
     * @default 0
     */
    borderRadius?: number | string;
    /**
     * Whether to make the image circular
     * @default false
     */
    circular?: boolean;
    /**
     * Whether to apply a zoom effect on hover
     * @default false
     */
    zoomEffect?: boolean;
    /**
     * Custom caption to display below the image
     */
    caption?: React.ReactNode;
}

const Image: React.FC<ImageProps> = ({
    preview = true,
    containerClassName = "",
    containerStyle,
    hoverable = false,
    shadow = false,
    bordered = false,
    borderRadius = 0,
    circular = false,
    zoomEffect = false,
    caption,
    className = "",
    style,
    ...restProps
}) => {
    // Determine if we should show the preview mask
    const showPreviewMask = typeof preview === "object" ? preview.maskVisible !== false : preview;

    // Default preview mask - no need to set borderRadius here as we'll handle it with CSS
    const defaultPreviewMask = (
        <div className="custom-image-preview-mask">
            <EyeOutlined className="custom-image-preview-icon" />
            <span className="custom-image-preview-text">Preview</span>
        </div>
    );

    // Custom or default preview configuration
    // If a custom mask is provided, we need to ensure it inherits the border radius
    const customMask =
        typeof preview === "object" && preview.mask ? (
            <div className="custom-image-mask-wrapper">{preview.mask}</div>
        ) : null;

    const previewConfig =
        typeof preview === "object"
            ? {
                  ...preview,
                  mask: customMask || (showPreviewMask ? defaultPreviewMask : null),
              }
            : preview
            ? { mask: showPreviewMask ? defaultPreviewMask : null }
            : false;

    // Combine all the style classes
    const imageClasses = [
        "custom-image",
        className,
        hoverable ? "custom-image-hoverable" : "",
        shadow ? "custom-image-shadow" : "",
        bordered ? "custom-image-bordered" : "",
        circular ? "custom-image-circular" : "",
        zoomEffect ? "custom-image-zoom" : "",
    ]
        .filter(Boolean)
        .join(" ");

    // Combine all the styles
    const imageStyles: React.CSSProperties = {
        ...style,
        borderRadius: circular ? "50%" : borderRadius,
    };

    // Container classes
    const containerClasses = [
        "custom-image-container",
        containerClassName,
        zoomEffect ? "custom-image-zoom-container" : "",
    ]
        .filter(Boolean)
        .join(" ");

    // Container styles
    const containerStyleWithBorderRadius: React.CSSProperties = {
        ...containerStyle,
        borderRadius: circular ? "50%" : borderRadius,
    };

    return (
        <div className="custom-image-wrapper">
            <div className={containerClasses} style={containerStyleWithBorderRadius}>
                <AntImage
                    className={imageClasses}
                    style={imageStyles}
                    preview={previewConfig}
                    {...restProps}
                />
            </div>
            {caption && <div className="custom-image-caption">{caption}</div>}
        </div>
    );
};

export default Image;
