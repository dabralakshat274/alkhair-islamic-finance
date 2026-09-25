// Loan application form (same fields as the original Formidable form)
export type FormField = {
  key: string;
  type: "text" | "email" | "tel" | "number";
  placeholder: string;
  first?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
};

export const loanForm = {
  legend: "Alkhair Loan Application Form",
  submitLabel: "Submit",
  requiredMessage: "This field cannot be blank.",
  invalidMessage: "This field is invalid",
  successMessage: "Your responses were successfully submitted. Thank you!",
  errorMessage: "There was a problem submitting your application. Please try again.",
  honeypotLabel: "If you are human, leave this field blank.",
  fields: [
    { key: "fullName", type: "text", placeholder: "Full Name", first: true },
    { key: "email", type: "email", placeholder: "Email" },
    { key: "address", type: "text", placeholder: "Address", first: true },
    { key: "state", type: "text", placeholder: "State" },
    { key: "pinCode", type: "number", placeholder: "Pin Code", first: true, min: 0, max: 9999999 },
    {
      key: "mobile",
      type: "tel",
      placeholder: "Mobile Number",
      pattern: "((\\+\\d{1,3}(-|.| )?\\(?\\d\\)?(-| |.)?\\d{1,5})|(\\(?\\d{2,6}\\)?))(-|.| )?(\\d{3,4})(-|.| )?(\\d{4})(( x| ext)\\d{1,5}){0,1}$",
    },
    { key: "loanPurpose", type: "text", placeholder: "Loan Purpose", first: true },
    { key: "loanAmount", type: "number", placeholder: "Loan Amount", min: 0, max: 9999999 },
  ] as FormField[],
};
