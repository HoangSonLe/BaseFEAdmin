import React, { useState, useCallback } from 'react';
import ConfirmDialog from '../components/common/ConfirmDialog';

interface ConfirmOptions {
    title?: string;
    content?: React.ReactNode;
    type?: 'delete' | 'warning' | 'info';
    okText?: string;
    cancelText?: string;
    danger?: boolean;
    icon?: React.ReactNode;
}

interface ConfirmState {
    open: boolean;
    loading: boolean;
    options: ConfirmOptions;
    onConfirm?: () => void | Promise<void>;
}

export const useConfirm = () => {
    const [state, setState] = useState<ConfirmState>({
        open: false,
        loading: false,
        options: {},
        onConfirm: undefined
    });

    const confirm = useCallback((options: ConfirmOptions, onConfirm: () => void | Promise<void>) => {
        setState({
            open: true,
            loading: false,
            options,
            onConfirm
        });
    }, []);

    const handleConfirm = useCallback(async () => {
        if (!state.onConfirm) return;

        setState(prev => ({ ...prev, loading: true }));

        try {
            await state.onConfirm();
            setState(prev => ({ ...prev, open: false, loading: false }));
        } catch (error) {
            console.error('Confirm action failed:', error);
            setState(prev => ({ ...prev, loading: false }));
        }
    }, [state.onConfirm]);

    const handleCancel = useCallback(() => {
        setState(prev => ({ ...prev, open: false, loading: false }));
    }, []);

    // Predefined confirm functions for common use cases
    const confirmDelete = useCallback((
        itemName: string,
        onConfirm: () => void | Promise<void>,
        customOptions?: Partial<ConfirmOptions>
    ) => {
        confirm({
            type: 'delete',
            title: 'Xác nhận xóa',
            content: (
                <div>
                    <p>Bạn có chắc chắn muốn xóa <strong>{itemName}</strong> không?</p>
                    <p style={{ color: 'var(--error-color, #ff4d4f)', fontSize: '14px', marginTop: '8px' }}>
                        Hành động này không thể hoàn tác.
                    </p>
                </div>
            ),
            okText: 'Xóa',
            ...customOptions
        }, onConfirm);
    }, [confirm]);

    const confirmAction = useCallback((
        title: string,
        content: React.ReactNode,
        onConfirm: () => void | Promise<void>,
        options?: Partial<ConfirmOptions>
    ) => {
        confirm({
            title,
            content,
            type: 'warning',
            ...options
        }, onConfirm);
    }, [confirm]);

    const confirmLogout = useCallback((onConfirm: () => void | Promise<void>) => {
        confirm({
            type: 'warning',
            title: 'Đăng xuất',
            content: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?',
            okText: 'Đăng xuất',
            danger: true
        }, onConfirm);
    }, [confirm]);

    const confirmLogoutAllDevices = useCallback((onConfirm: () => void | Promise<void>) => {
        confirm({
            type: 'warning',
            title: 'Đăng xuất tất cả thiết bị',
            content: (
                <div>
                    <p>Bạn có chắc chắn muốn đăng xuất khỏi tất cả thiết bị không?</p>
                    <p style={{ color: 'var(--warning-color, #faad14)', fontSize: '14px', marginTop: '8px' }}>
                        Bạn sẽ cần đăng nhập lại trên tất cả thiết bị.
                    </p>
                </div>
            ),
            okText: 'Đăng xuất tất cả',
            danger: true
        }, onConfirm);
    }, [confirm]);

    const confirmDeleteAccount = useCallback((onConfirm: () => void | Promise<void>) => {
        confirm({
            type: 'delete',
            title: 'Xóa tài khoản',
            content: (
                <div>
                    <p>Bạn có chắc chắn muốn xóa tài khoản của mình không?</p>
                    <p style={{ color: 'var(--error-color, #ff4d4f)', fontSize: '14px', marginTop: '8px' }}>
                        <strong>Cảnh báo:</strong> Hành động này sẽ xóa vĩnh viễn tất cả dữ liệu của bạn và không thể hoàn tác.
                    </p>
                </div>
            ),
            okText: 'Xóa tài khoản',
        }, onConfirm);
    }, [confirm]);

    const confirmRevokeSession = useCallback((
        deviceName: string,
        onConfirm: () => void | Promise<void>
    ) => {
        confirm({
            type: 'warning',
            title: 'Thu hồi phiên đăng nhập',
            content: `Bạn có chắc chắn muốn thu hồi phiên đăng nhập trên thiết bị "${deviceName}" không?`,
            okText: 'Thu hồi',
            danger: true
        }, onConfirm);
    }, [confirm]);

    const confirmDisable2FA = useCallback((onConfirm: () => void | Promise<void>) => {
        confirm({
            type: 'warning',
            title: 'Tắt xác thực hai yếu tố',
            content: (
                <div>
                    <p>Bạn có chắc chắn muốn tắt xác thực hai yếu tố không?</p>
                    <p style={{ color: 'var(--warning-color, #faad14)', fontSize: '14px', marginTop: '8px' }}>
                        Điều này sẽ làm giảm tính bảo mật của tài khoản.
                    </p>
                </div>
            ),
            okText: 'Tắt 2FA',
            danger: true
        }, onConfirm);
    }, [confirm]);

    const ConfirmDialogComponent = () => (
        <ConfirmDialog
            open={state.open}
            loading={state.loading}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            {...state.options}
        />
    );

    return {
        confirm,
        confirmDelete,
        confirmAction,
        confirmLogout,
        confirmLogoutAllDevices,
        confirmDeleteAccount,
        confirmRevokeSession,
        confirmDisable2FA,
        ConfirmDialog: ConfirmDialogComponent
    };
};

export default useConfirm;
