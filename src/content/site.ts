// Brand and contact details used by the header, footer and floating buttons.
export const site = {
  name: "Al Khair Islamic Finance",
  logoAlt: "al khair finance logo",
  phone: "8893237245",
  phoneSpaced: "88932 37245",
  whatsappNumber: "+918893237245",
  whatsappText: "Welcome in alkhair finance how many I help you ?",
  email: "info@alkhairsocietys.org.in",
  address: "Social services organization in , V8RV+GF5, Markaz-e-Islami Building Yunus Colony,Aurangabad Maharashtra 431001",
  addressShort: "Aurangabad Maharashtra 431001",
  topbar: {
    callLabel: "Call  8893237245",
    applyLabel: "APPLY NOW",
  },
  footer: {
    aboutTitle: "About Us",
    about:
      "Al Khair Loans offer a trusted solution for individuals and businesses alike. We offer a range of loan options, including personal loans, business loans, home loans, and more. Al Khair Islamic Finance is a leading financial institution that offers a comprehensive range of Shariah-compliant banking solutions designed to meet the needs of individuals, businesses, and communities. With a strong commitment to ethical banking, the finance company operates with the highest standards of transparency, fairness, and integrity, ensuring that all financial transactions align with Islamic principles.",
    linksTitle: "Important",
    contactTitle: "Contact Info",
    copyright: "© Copyright [Al Khair_2022] - zero interest loan",
    copyrightLink: { label: "Alkhair Society", to: "/" },
  },
};

export const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(site.whatsappNumber)}&text=${encodeURIComponent(site.whatsappText)}`;
