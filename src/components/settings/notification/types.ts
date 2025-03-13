
export interface NotificationSettingsFormValues {
  enableEmailAlerts: boolean;
  enableSmsAlerts: boolean;
  autoEscalateCriticalAlerts: string;
}

export const defaultNotificationSettings: NotificationSettingsFormValues = {
  enableEmailAlerts: true,
  enableSmsAlerts: false,
  autoEscalateCriticalAlerts: "30",
};
