// SETTLEMENT_REQUEST 메시지의 content 형식:
// "정산이 요청되었습니다.\n총 20,000원\n우리은행 1361851299639 (우리)"
export function parseSettlementRequestContent(content: string | null) {
  const lines = content?.split("\n") ?? [];

  return {
    amountText: lines[1] ?? "",
    accountText: lines[2] ?? "",
  };
}
