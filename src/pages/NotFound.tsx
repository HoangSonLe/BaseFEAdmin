import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-illustration">
                    <img src="/images/404-character.svg" alt="404 Illustration" />
                </div>

                <div className="not-found-subtitle">
                    Sorry, the page you visited does not exist.
                </div>

                <div className="not-found-actions">
                    <Button className="not-found-button back-button" onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                    <Link to="/">
                        <Button type="primary" className="not-found-button home-button">
                            Back Home
                        </Button>
                    </Link>
                </div>

                <a href="mailto:support@example.com" className="support-link">
                    Contact Support
                </a>

                <div className="help-text">
                    If this problem persists, please contact our support team.
                </div>
            </div>
        </div>
    );
};

export default NotFound;
