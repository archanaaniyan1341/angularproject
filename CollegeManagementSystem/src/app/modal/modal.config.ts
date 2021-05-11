export interface ModalConfig {
    modalTitle: string;
    dismissButtonLabel?: string;
    closeButtonLabel?: string;
    shouldClose?(): Promise<boolean> | Boolean;
    shouldDismiss?(): Promise<boolean> | Boolean;
    onClose?(): Promise<boolean> | Boolean;
    onDismiss?(): Promise<boolean> | Boolean;
    disableCloseButton?(): Boolean;
    disableDismissButton?(): Boolean;
    hideCloseButton?(): Boolean;
    hideDismissButton?(): Boolean;
}