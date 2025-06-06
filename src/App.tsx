import { lazy, Suspense, useEffect } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";

// Providers
import { setLoadingController } from "./apis/axios";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import ComponentLibrary from "./pages/ComponentLibrary";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import UserSettings from "./pages/UserSettings";

// Auth Pages
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";

// Auth Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy-loaded Component Library pages
const TableComponents = lazy(() => import("./pages/ComponentLibrary/TableComponents"));
const SimpleTableComponent = lazy(() => import("./pages/ComponentLibrary/SimpleTableComponent"));
const FormComponents = lazy(() => import("./pages/ComponentLibrary/FormComponents"));
const FilterComponents = lazy(() => import("./pages/ComponentLibrary/FilterComponents"));
const UIComponents = lazy(() => import("./pages/ComponentLibrary/UIComponents"));
const ImageComponents = lazy(() => import("./pages/ComponentLibrary/ImageComponents"));
const ImageSliderComponents = lazy(() => import("./pages/ComponentLibrary/ImageSliderComponents"));
const EditorComponents = lazy(() => import("./pages/ComponentLibrary/EditorComponents"));
const SvgIconDemo = lazy(() => import("./pages/ComponentLibrary/SvgIconDemo"));
const PermissionExample = lazy(() => import("./components/examples/PermissionExample"));
const ConfirmDialogDemo = lazy(() => import("./components/examples/ConfirmDialogDemo"));
const DeleteConfirmDemo = lazy(() => import("./components/examples/DeleteConfirmDemo"));


// User Pages
import UserPermissions from "./pages/users/UserPermissions";
import UserRoles from "./pages/users/UserRoles";

// Product Pages
import ProductCategories from "./pages/products/ProductCategories";
import ProductInventory from "./pages/products/ProductInventory";

// Component to initialize loading controller
const LoadingInitializer = () => {
    const loading = useLoading();

    useEffect(() => {
        // Set the loading controller for axios to use
        setLoadingController({
            incrementPendingRequests: loading.incrementPendingRequests,
            decrementPendingRequests: loading.decrementPendingRequests,
        });
    }, [loading]);

    return null;
};

function App() {
    return (
        <ConfigProvider>
            <AntApp>
                <ThemeProvider>
                    <LoadingProvider>
                        <LoadingInitializer />
                        <Router>
                            <AuthProvider>
                        <Routes>
                            {/* Auth routes (public) */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/reset-password" element={<ResetPassword />} />

                            {/* Protected routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<MainLayout />}>
                                    <Route index element={<Dashboard />} />

                                    {/* User routes */}
                                    <Route path="users" element={<Users />} />
                                    <Route path="users/roles" element={<UserRoles />} />
                                    <Route path="users/permissions" element={<UserPermissions />} />

                                    {/* Product routes */}
                                    <Route path="products" element={<Products />} />
                                    <Route
                                        path="products/categories"
                                        element={<ProductCategories />}
                                    />
                                    <Route
                                        path="products/inventory"
                                        element={<ProductInventory />}
                                    />
                                    <Route
                                        path="components/simple-table"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <SimpleTableComponent />
                                            </Suspense>
                                        }
                                    />

                                    {/* Component Library routes */}
                                    <Route path="components" element={<ComponentLibrary />} />
                                    <Route
                                        path="components/tables"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <TableComponents />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/forms"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <FormComponents />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/filters"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <FilterComponents />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/ui"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <UIComponents />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/images"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <ImageComponents />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/image-sliders"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <ImageSliderComponents />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/editors"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <EditorComponents />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/svg-icons"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <SvgIconDemo />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/permissions"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <PermissionExample />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/confirm-dialogs"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <ConfirmDialogDemo />
                                            </Suspense>
                                        }
                                    />
                                    <Route
                                        path="components/delete-confirm"
                                        element={
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <DeleteConfirmDemo />
                                            </Suspense>
                                        }
                                    />


                                    {/* Settings route */}
                                    <Route path="settings" element={<Settings />} />

                                    {/* User Settings route */}
                                    <Route path="user-settings" element={<UserSettings />} />

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

                                    {/* Pages routes */}
                                    <Route path="pages">
                                        <Route path="404" element={<ErrorPage code="404" />} />
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
                                        <Route path="login" element={<Login />} />
                                        <Route
                                            path="forgot-password"
                                            element={<ForgotPassword />}
                                        />
                                        <Route path="reset-password" element={<ResetPassword />} />
                                    </Route>

                                    {/* 404 route */}
                                    <Route path="*" element={<ErrorPage code="404" />} />
                                </Route>
                            </Route>
                        </Routes>
                            </AuthProvider>
                        </Router>
                    </LoadingProvider>
                </ThemeProvider>
            </AntApp>
        </ConfigProvider>
    );
}

export default App;
