export default function formatCoffeePrice(value) {
  return "R$" + (value / 100).toFixed(2).replace(".", ",");
}
