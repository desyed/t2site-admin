export function calculatePrice(
  priceInUnits: number,
  quantity: number,
  unitBase = 100
) {
  // Split price into whole units and sub-units (e.g., taka and poisha or dollars and cents)
  const wholeUnits = Math.floor(priceInUnits); // Whole unit part (e.g., Taka or Dollar)
  const subUnits = Math.round((priceInUnits - wholeUnits) * unitBase); // Sub-unit part (e.g., Poisha or Cents)

  // Multiply whole units by quantity
  let totalWholeUnits = wholeUnits * quantity;

  // Multiply sub-units by quantity and handle carryover to whole units
  let totalSubUnits = subUnits * quantity;

  // Handle carryover: if sub-units >= unitBase, convert to whole units
  totalWholeUnits += Math.floor(totalSubUnits / unitBase); // Convert every `unitBase` sub-units to 1 whole unit
  totalSubUnits = totalSubUnits % unitBase; // Remainder is the sub-unit part (Poisha or Cents)

  // Combine total whole units and sub-units to get the final amount
  const totalInUnits = (totalWholeUnits + totalSubUnits / unitBase).toFixed(2);

  return totalInUnits;
}
