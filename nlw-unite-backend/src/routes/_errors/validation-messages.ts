export function validationMessage(field: string, messageType: number) {
  let message = "";
  switch (messageType) {
    case 0:
      message = `${field} não é um campo válido.`;
      break;
    case 1:
      message = `${field} é um campo obrigatório.`;
      break;
  }

  return message;
}
