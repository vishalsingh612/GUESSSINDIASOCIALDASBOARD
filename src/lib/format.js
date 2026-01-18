export function formatCompactNumber(n) {
    if (n === null || n === undefined || Number.isNaN(n)) return "-";
    return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 }).format(n);
  }
  
  export function formatFullNumber(n) {
    if (n === null || n === undefined || Number.isNaN(n)) return "-";
    return Intl.NumberFormat("en").format(n);
  }
  