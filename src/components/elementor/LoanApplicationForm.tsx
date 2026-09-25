import { FormEvent, useState } from "react";
import { loanForm, FormField } from "@/content/form";
import { submitLoanApplication } from "@/lib/api";

type Props = { instanceId: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: FormField, value: string): string | null {
  if (!value.trim()) return loanForm.requiredMessage;
  if (field.type === "email" && !EMAIL.test(value)) return loanForm.invalidMessage;
  if (field.pattern && !new RegExp(field.pattern).test(value)) return loanForm.invalidMessage;
  return null;
}

// Same markup and class names as the original Formidable form, so formidableforms.css styles it.
// Submits to the Express API instead of WordPress.
export default function LoanApplicationForm({ instanceId }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.honeypot) return; // bots fill the hidden field
    const nextErrors: Record<string, string> = {};
    for (const field of loanForm.fields) {
      const msg = validate(field, data[field.key] ?? "");
      if (msg) nextErrors[field.key] = msg;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("sending");
    try {
      await submitLoanApplication(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="frm_forms with_frm_style frm_style_formidable-style" id={`frm_form_${instanceId}_container`}>
        <div className="frm_message" role="status">
          <p>{loanForm.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="frm_forms  with_frm_style frm_style_formidable-style" id={`frm_form_${instanceId}_container`}>
      <form method="post" className="frm-show-form " id={`form_loan_${instanceId}`} onSubmit={onSubmit} noValidate>
        <div className="frm_form_fields ">
          <fieldset>
            <legend className="frm_screen_reader">{loanForm.legend}</legend>
            <div className="frm_fields_container">
              {status === "error" && (
                <div className="frm_error_style" role="alert">
                  <p>{loanForm.errorMessage}</p>
                </div>
              )}
              {loanForm.fields.map((field) => {
                const id = `field_${instanceId}_${field.key}`;
                const error = errors[field.key];
                return (
                  <div
                    key={field.key}
                    id={`frm_field_${instanceId}_${field.key}_container`}
                    className={`frm_form_field form-field  frm_required_field frm_top_container frm6${field.first ? " frm_first" : ""}${error ? " frm_blank_field" : ""}`}
                  >
                    <label htmlFor={id} className="frm_primary_label">
                      <span className="frm_required" aria-hidden="true"></span>
                    </label>
                    <input
                      type={field.type}
                      id={id}
                      name={field.key}
                      placeholder={field.placeholder}
                      aria-required="true"
                      aria-invalid={Boolean(error)}
                      min={field.min}
                      max={field.max}
                      step={field.type === "number" ? "any" : undefined}
                      pattern={field.pattern}
                      onInput={() => error && setErrors((prev) => ({ ...prev, [field.key]: "" }))}
                    />
                    {error && (
                      <div className="frm_error" id={`frm_error_${id}`} role="alert">
                        {error}
                      </div>
                    )}
                  </div>
                );
              })}
              <div id={`frm_field_${instanceId}_submit_container`} className="frm_form_field form-field ">
                <div className="frm_submit frm_flex">
                  <button className="frm_button_submit" type="submit" disabled={status === "sending"}>
                    {loanForm.submitLabel}
                  </button>
                </div>
              </div>
              <div id={`frm_field_${instanceId}_verify_container`} className="frm_form_field frm_verify_container" aria-hidden="true">
                <label htmlFor={`field_${instanceId}_verify`}>{loanForm.honeypotLabel}</label>
                <input id={`field_${instanceId}_verify`} type="text" className="frm_form_field form-field frm_verify" name="honeypot" tabIndex={-1} autoComplete="off" />
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
}
