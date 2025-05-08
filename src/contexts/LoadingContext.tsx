import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define the context type
interface LoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    pendingRequests: number;
    incrementPendingRequests: () => void;
    decrementPendingRequests: () => void;
}

// Create the context with a default value
const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setLoading: () => {},
    pendingRequests: 0,
    incrementPendingRequests: () => {},
    decrementPendingRequests: () => {},
});

// Custom hook to use the loading context
export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [pendingRequests, setPendingRequests] = useState(0);

    const incrementPendingRequests = () => {
        setPendingRequests((prev) => prev + 1);
    };

    const decrementPendingRequests = () => {
        setPendingRequests((prev) => Math.max(0, prev - 1));
    };

    // Update loading state based on pending requests
    useEffect(() => {
        if (pendingRequests > 0) {
            setLoading(true);
        } else {
            // Add a small delay before hiding the loading indicator
            // to prevent flickering for very fast requests
            const timer = setTimeout(() => {
                setLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [pendingRequests]);

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                setLoading,
                pendingRequests,
                incrementPendingRequests,
                decrementPendingRequests,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};
