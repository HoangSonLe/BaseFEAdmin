import React, { useEffect, useState, useRef } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import { useTheme } from "../../../contexts/ThemeContext";
import "./TopProgressBar.css";

export interface TopProgressBarProps {
    height?: number;
    className?: string;
    // Color options
    startColor?: string;
    endColor?: string;
    // Ant Design style strokeColor property (can be string or object with from/to)
    strokeColor?: string | { from: string; to: string };
}

const TopProgressBar: React.FC<TopProgressBarProps> = ({
    height = 3,
    className = "",
    startColor = "#108ee9",
    endColor = "#87d068",
    strokeColor,
}) => {
    const { isLoading } = useLoading();
    const { theme } = useTheme();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const progressIntervalRef = useRef<number | null>(null);
    const hideTimeoutRef = useRef<number | null>(null);

    // Clear all timeouts and intervals when component unmounts
    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isLoading) {
            // Clear any existing timeouts
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }

            setVisible(true);
            setProgress(0);

            // Simulate progress incrementing with a more natural curve
            progressIntervalRef.current = setInterval(() => {
                setProgress((prevProgress) => {
                    // Use a more sophisticated progress algorithm
                    // Faster at the beginning, slower as it approaches 90%
                    if (prevProgress < 20) return prevProgress + 7;
                    if (prevProgress < 40) return prevProgress + 5;
                    if (prevProgress < 60) return prevProgress + 3;
                    if (prevProgress < 75) return prevProgress + 2;
                    if (prevProgress < 85) return prevProgress + 1;
                    if (prevProgress < 90) return prevProgress + 0.5;
                    return prevProgress;
                });
            }, 80);

            return () => {
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                    progressIntervalRef.current = null;
                }
            };
        } else if (visible) {
            // Clear any existing intervals
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }

            // When loading completes, quickly finish the progress bar
            setProgress(100);

            // Hide the progress bar after animation completes
            hideTimeoutRef.current = setTimeout(() => {
                setVisible(false);
                setProgress(0);
            }, 600);

            return () => {
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current);
                    hideTimeoutRef.current = null;
                }
            };
        }
    }, [isLoading, visible]);

    if (!visible && progress === 0) {
        return null;
    }

    return (
        <div
            className={`top-progress-bar ${className} ${theme}`}
            style={{
                height: `${height}px`,
                opacity: visible ? 1 : 0,
            }}
        >
            <div
                className="top-progress-bar-inner"
                style={{
                    width: `${progress}%`,
                    background: strokeColor
                        ? typeof strokeColor === "string"
                            ? strokeColor
                            : `linear-gradient(to right, ${strokeColor.from}, ${strokeColor.to})`
                        : `linear-gradient(to right, ${startColor}, ${endColor})`,
                    transition: isLoading
                        ? "width 0.2s ease-in-out"
                        : "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out",
                }}
            />
        </div>
    );
};

export default TopProgressBar;
