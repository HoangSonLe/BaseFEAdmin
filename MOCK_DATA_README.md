# Mock Data Setup for Authentication System

This project now includes a comprehensive mock data system for testing the enhanced authentication and user management features.

## 🧪 Mock User Accounts

The following test accounts are available for immediate use:

### Admin User
- **Email**: `admin@example.com`
- **Password**: Any password with at least 3 characters (e.g., `123456`)
- **Role**: Administrator
- **Permissions**: Full access to all features
- **Features**: Can manage users, products, orders, settings, and access all reports

### Manager User
- **Email**: `manager@example.com`
- **Password**: Any password with at least 3 characters (e.g., `123456`)
- **Role**: Manager
- **Permissions**: Management access (excluding system settings)
- **Features**: Can manage products, orders, and view most reports

### Editor User
- **Email**: `editor@example.com`
- **Password**: Any password with at least 3 characters (e.g., `123456`)
- **Role**: Editor
- **Permissions**: Create, read, and update access for products and orders
- **Features**: Can create and edit content but cannot delete or manage users

### Viewer User
- **Email**: `viewer@example.com`
- **Password**: Any password with at least 3 characters (e.g., `123456`)
- **Role**: Viewer
- **Permissions**: Read-only access
- **Features**: Can view products, orders, and dashboard but cannot modify anything

## 🔧 How to Use

1. **Login**: Go to the login page and use any of the email addresses above with any password (minimum 3 characters)
2. **Test Permissions**: Try different users to see how permissions affect what features are available
3. **Profile Management**: Update user profiles, preferences, and avatars
4. **Permission Testing**: Visit `/components/permissions` to see detailed permission examples

## 📁 File Structure

```
src/
├── data/
│   └── mockData.ts          # All mock data definitions
├── services/
│   ├── mockUserApi.ts       # Mock API implementations
│   └── userApi.ts           # Real API implementations (for production)
├── components/
│   ├── auth/
│   │   ├── MockUserInfo.tsx # Component showing available test accounts
│   │   └── PermissionGuard.tsx # Permission-based access control
│   ├── user/
│   │   └── UserProfile.tsx  # User profile management
│   └── dashboard/
│       └── UserInfoCard.tsx # Current user information display
├── hooks/
│   └── usePermissions.ts    # Permission checking utilities
├── types/
│   ├── user.ts             # User-related type definitions
│   ├── api.ts              # API response type definitions
│   └── index.ts            # Exported types
└── pages/
    ├── UserSettings.tsx    # User account settings page
    └── auth/
        └── Login.tsx       # Updated login page with mock user info
```

## 🎯 Key Features Demonstrated

### Authentication
- ✅ Login with different user roles
- ✅ Password change functionality
- ✅ Profile management
- ✅ Avatar upload/delete
- ✅ User preferences

### Authorization
- ✅ Role-based access control (RBAC)
- ✅ Permission-based access control
- ✅ Conditional component rendering
- ✅ Route protection
- ✅ Feature toggling based on permissions

### User Management
- ✅ User profile updates
- ✅ Preference management
- ✅ Session management
- ✅ Activity logging
- ✅ Notification system

## 🔄 Switching Between Mock and Real API

The project is currently configured to use mock data. To switch to real API:

1. **Update AuthContext**: In `src/contexts/AuthContext.tsx`, change the import:
   ```typescript
   // Current (Mock API)
   import { authApi, userApi } from "../services/mockUserApi";
   
   // Change to (Real API)
   import { authApi, userApi } from "../services/userApi";
   ```

2. **Configure Real API**: Update `src/services/userApi.ts` with your actual API endpoints

## 🧪 Testing Different Scenarios

### Permission Testing
1. Login as **Admin** - See all features available
2. Login as **Manager** - See management features but no system settings
3. Login as **Editor** - See content editing features but no user management
4. Login as **Viewer** - See read-only access to most features

### Profile Management Testing
1. Login with any account
2. Go to "Account Settings" from user dropdown
3. Test profile updates, avatar upload, preference changes
4. Test password change functionality

### Component Permission Testing
1. Visit `/components/permissions` to see live permission examples
2. Try different users to see how components show/hide based on permissions
3. Check the dashboard to see current user information

## 📝 Mock Data Details

### Users
- 4 predefined users with different roles and permissions
- Complete profile information including avatars, addresses, social links
- Realistic preferences and settings

### Permissions
- 21 different permissions across 5 resource types
- Hierarchical permission structure (manage > create/read/update/delete)
- Module-based organization

### Roles
- 4 roles with different permission sets
- System roles that cannot be deleted
- Clear role hierarchy and descriptions

### Sessions
- Mock session data for testing session management
- Device information and activity tracking
- Session revocation functionality

### Notifications
- Sample notifications with different types
- Read/unread status tracking
- Notification management features

### Activity Logs
- User action tracking
- Resource-based activity logging
- IP address and user agent tracking

## 🚀 Next Steps

1. **Test the System**: Login with different users and explore the features
2. **Customize Mock Data**: Modify `src/data/mockData.ts` to add more test scenarios
3. **Implement Real API**: Replace mock services with actual backend integration
4. **Add More Permissions**: Extend the permission system for your specific needs
5. **Enhance UI**: Customize the user interface components to match your design

## 💡 Tips

- Use the copy buttons on the login page to quickly copy test credentials
- Check the browser console for detailed API call logs
- The mock API includes realistic delays to simulate network requests
- All mock data is stored in memory and resets on page refresh
- Permission changes take effect immediately without requiring re-login

## 🔍 Debugging

If you encounter issues:

1. **Check Console**: Look for error messages in browser console
2. **Verify Imports**: Ensure you're importing from the correct API service
3. **Check Types**: TypeScript will help catch type mismatches
4. **Test Permissions**: Use the permission testing page to verify access control
5. **Review Mock Data**: Check `src/data/mockData.ts` for available test data

---

**Happy Testing! 🎉**

The mock data system provides a complete testing environment for the authentication and authorization features. You can now test all user management functionality without needing a backend API.
