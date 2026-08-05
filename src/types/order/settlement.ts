// 정산 요청 생성 API 요청 바디
export interface SettlementPaymentRequest {
  userId: number;
  amount: number;
}

export interface CreateSettlementRequest {
  totalAmount: number;
  payments: SettlementPaymentRequest[];
}

// 정산 요청 생성 API 응답
export interface SettlementRequester {
  userId: number;
  nickname: string;
}

export interface SettlementBankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface SettlementPayment {
  userId: number;
  nickname: string;
  amount: number;
  paymentStatus: string;
  paidAt: string | null;
}

export interface SettlementDetail {
  partyId: number;
  settlementStatus: string;
  totalAmount: number;
  hostAmount: number;
  requestedAt: string;
  requester: SettlementRequester;
  bankAccount: SettlementBankAccount;
  payments: SettlementPayment[];
}
