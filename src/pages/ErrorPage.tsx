import React from "react";
import { Button, Typography, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./ErrorPage.css";

const { Text } = Typography;

interface ErrorPageProps {
    code?: "403" | "500" | "error" | "404";
    title?: string;
    subTitle?: string;
    showBackButton?: boolean;
    showHomeButton?: boolean;
    showContactButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
    code = "error",
    title = "Something went wrong",
    subTitle = "Sorry, an unexpected error has occurred.",
    showBackButton = true,
    showHomeButton = true,
    showContactButton = true,
}) => {
    const navigate = useNavigate();

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
                    <img src={getIllustrationSrc()} alt={`${code} Illustration`} />
                </div>

                <h2 className="error-title">{title}</h2>
                <div className="error-subtitle">{subTitle}</div>

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
                    <a href="mailto:support@example.com" className="contact-button">
                        Contact Support
                    </a>
                )}

                <div className="error-help-text">
                    If this problem persists, please contact our support team.
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
