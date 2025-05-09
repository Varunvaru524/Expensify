import type {ValueOf} from 'type-fest';
import type {OnyxServerUpdate} from '@src/types/onyx/OnyxUpdatesFromServer';

const NotificationType = {
    REPORT_ACTION: 'reportAction',
    REPORT_COMMENT: 'reportComment',
    MONEY_REQUEST: 'moneyRequest',
    TRANSACTION: 'transaction',
} as const;

type NotificationTypes = ValueOf<typeof NotificationType>;

type NotificationDataMap = {
    [NotificationType.REPORT_ACTION]: ReportActionPushNotificationData;
    [NotificationType.REPORT_COMMENT]: ReportActionPushNotificationData;
    [NotificationType.MONEY_REQUEST]: ReportActionPushNotificationData;
    [NotificationType.TRANSACTION]: TransactionPushNotificationData;
};

type PushNotificationData = ReportActionPushNotificationData | TransactionPushNotificationData;

type BasePushNotificationData = {
    title: string;
    type: ValueOf<typeof NotificationType>;
    onyxData?: OnyxServerUpdate[];
    lastUpdateID?: number;
    previousUpdateID?: number;
    hasPendingOnyxUpdates?: boolean;
};

type ReportActionPushNotificationData = BasePushNotificationData & {
    reportID: number;
    reportActionID: string;
    roomName?: string;
};

type TransactionPushNotificationData = BasePushNotificationData & {
    transactionID: number;
    reportID: number;
    roomName?: string;
};

/**
 * See https://github.com/Expensify/Web-Expensify/blob/main/lib/MobilePushNotifications.php for the various
 * types of push notifications sent by our API.
 */
export default NotificationType;
export type {NotificationTypes, NotificationDataMap, PushNotificationData, ReportActionPushNotificationData, TransactionPushNotificationData};
