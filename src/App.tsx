import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Theme Provider
import { ThemeProvider } from "./contexts/ThemeContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import SimpleTable from "./pages/SimpleTable";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

// User Pages
import UserRoles from "./pages/users/UserRoles";
import UserPermissions from "./pages/users/UserPermissions";

// Product Pages
import ProductCategories from "./pages/products/ProductCategories";
import ProductInventory from "./pages/products/ProductInventory";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Dashboard />} />

                        {/* User routes */}
                        <Route path="users" element={<Users />} />
                        <Route path="users/roles" element={<UserRoles />} />
                        <Route path="users/permissions" element={<UserPermissions />} />

                        {/* Product routes */}
                        <Route path="products" element={<Products />} />
                        <Route path="products/categories" element={<ProductCategories />} />
                        <Route path="products/inventory" element={<ProductInventory />} />
                        <Route path="simple-table" element={<SimpleTable />} />

                        {/* Settings route */}
                        <Route path="settings" element={<Settings />} />

                        {/* Error routes */}
                        <Route path="error" element={<ErrorPage />} />
                        <Route
                            path="403"
                            element={
                                <ErrorPage
                                    code="403"
                                    title="403"
                                    subTitle="Sorry, you are not authorized to access this page."
                                />
                            }
                        />
                        <Route
                            path="500"
                            element={
                                <ErrorPage
                                    code="500"
                                    title="500"
                                    subTitle="Sorry, the server is reporting an error."
                                />
                            }
                        />

                        {/* 404 route */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
