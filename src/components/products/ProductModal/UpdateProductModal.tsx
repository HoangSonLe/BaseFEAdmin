import React from "react";
import ProductDetailModal from "./ProductDetailModal";
import type { Product } from "./ProductDetailModal";

interface UpdateProductModalProps {
    /**
     * Whether the modal is visible
     */
    visible: boolean;
    /**
     * Product data for editing
     */
    product: Product;
    /**
     * Callback when the modal is closed
     */
    onCancel: () => void;
    /**
     * Callback when the form is submitted
     */
    onSubmit: (values: Record<string, unknown>) => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
    visible,
    product,
    onCancel,
    onSubmit,
}) => {
    return (
        <ProductDetailModal
            visible={visible}
            product={product}
            onCancel={onCancel}
            onSubmit={onSubmit}
            title="Edit Product"
            submitButtonText="Save Changes"
        />
    );
};

export default UpdateProductModal;
