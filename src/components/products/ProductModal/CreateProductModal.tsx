import React from "react";
import ProductDetailModal from "./ProductDetailModal";

interface CreateProductModalProps {
    /**
     * Whether the modal is visible
     */
    visible: boolean;
    /**
     * Callback when the modal is closed
     */
    onCancel: () => void;
    /**
     * Callback when the form is submitted
     */
    onSubmit: (values: Record<string, unknown>) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ visible, onCancel, onSubmit }) => {
    return (
        <ProductDetailModal
            visible={visible}
            product={null}
            onCancel={onCancel}
            onSubmit={onSubmit}
            title="Add New Product"
            submitButtonText="Add Product"
        />
    );
};

export default CreateProductModal;
