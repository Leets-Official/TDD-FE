export function isValidPartyId(partyId: number): boolean {
  return Number.isSafeInteger(partyId) && partyId > 0;
}
