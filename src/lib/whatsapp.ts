export function generateWhatsAppLink(phone: string, data: Record<string, string>): string {
  const messageLines = [
    '*New Consultation Request*',
    '-----------------------',
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    data.email ? `*Email:* ${data.email}` : '',
    `*Matter:* ${data.caseType}`,
    '-----------------------',
    '*Description:*',
    data.description
  ];

  const text = messageLines.filter(Boolean).join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
