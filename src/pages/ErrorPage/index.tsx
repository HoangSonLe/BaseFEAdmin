import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./ErrorPage.css";

interface ErrorPageProps {
    code?: "403" | "500" | "error" | "404";
    title?: string;
    subTitle?: string;
    showBackButton?: boolean;
    showHomeButton?: boolean;
    showContactButton?: boolean;
    showHelpText?: boolean;
}

/**
 * Unified Error Page component that handles both NotFound (404) and other error types
 */
const ErrorPage: React.FC<ErrorPageProps> = ({
    code = "error",
    title,
    subTitle,
    showBackButton = true,
    showHomeButton = true,
    showContactButton = true,
    showHelpText = true,
}) => {
    const navigate = useNavigate();

    // Set default title and subtitle based on error code if not provided
    const getDefaultTitle = () => {
        if (title) return title;

        switch (code) {
            case "404":
                return "404";
            case "403":
                return "403";
            case "500":
                return "500";
            default:
                return "Something went wrong";
        }
    };

    const getDefaultSubtitle = () => {
        if (subTitle) return subTitle;

        switch (code) {
            case "404":
                return "Sorry, the page you visited does not exist.";
            case "403":
                return "Sorry, you are not authorized to access this page.";
            case "500":
                return "Sorry, the server is reporting an error.";
            default:
                return "Sorry, an unexpected error has occurred.";
        }
    };

    // Get the appropriate illustration based on error code
    const getIllustrationSrc = () => {
        switch (code) {
            case "403":
                return "/images/403-character.svg";
            case "404":
                return "/images/404-character.svg";
            case "500":
                return "/images/500-character.svg";
            default:
                return "/images/error-character.svg";
        }
    };

    return (
        <div className="error-page-container">
            <div className="error-page-content">
                <div className="error-page-illustration">
                    <img
                        src={getIllustrationSrc()}
                        alt={`${code} Illustration`}
                        onError={(e) => {
                            // Fallback to error-character.svg if the specific image fails to load
                            const target = e.target as HTMLImageElement;
                            if (target.src !== "/images/error-character.svg") {
                                target.src = "/images/error-character.svg";
                            }
                        }}
                    />
                </div>

                <h2 className="error-title">{getDefaultTitle()}</h2>
                <div className="error-subtitle">{getDefaultSubtitle()}</div>

                <div className="error-page-actions">
                    {showBackButton && (
                        <Button className="error-button back-button" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    )}
                    {showHomeButton && (
                        <Link to="/">
                            <Button type="primary" className="error-button home-button">
                                Back Home
                            </Button>
                        </Link>
                    )}
                </div>

                {showContactButton && (
                    <a href="mailto:support@example.com" className="error-contact-link">
                        Contact Support
                    </a>
                )}

                {showHelpText && (
                    <div className="error-help-text">
                        If this problem persists, please contact our support team.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ErrorPage;
