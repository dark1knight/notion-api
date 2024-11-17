export const formatUUID = (id: string): string => {
    if (id.includes('-')) return id; // Já está no formato correto
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
  };
  