interface notification {
    title: string;
    body: string;
}

interface Data {
    transaction_id: string;
    path: string;
    kickout: string;
}

export interface Message {
    topic?: string;
    token?: string;
    notification: notification;
    data: Data;
}