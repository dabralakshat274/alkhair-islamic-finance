export type NavItem = { label: string; to: string };

// Header menu and footer bottom menu (same items on the original)
export const mainMenu: NavItem[] = [
  { label: "alkhair Finance", to: "/" },
  { label: "alKhair", to: "/alkhair" },
  { label: "alkhair baitulmaal co-op credit soc", to: "/alkhair-baitulmaal-co-op-credit-soc" },
  { label: "alkhair finance aurangabad", to: "/alkhair-finance-aurangabad" },
  { label: "alKhair Finance", to: "/alkhair-finance" },
  { label: "alkhair islamic finance", to: "/alkhair-islamic-finance" },
  { label: "alkhair Loan", to: "/alkhair-loan" },
  { label: "Contact", to: "/contact" },
];

// "Important" links widget in the footer
export const footerLinks: NavItem[] = [
  { label: "alkhair islamic finance", to: "/alkhair-islamic-finance" },
  { label: "alkhair loan", to: "/alkhair-loan" },
  { label: "al khair finance", to: "/" },
  { label: "alkhair finance", to: "/" },
  { label: "alkhair finance loan apply online", to: "/alkhair-loan" },
  { label: "alkhair baitulmaal co-op credit soc", to: "/alkhair-baitulmaal-co-op-credit-soc" },
  { label: "alkhair finance loan", to: "/alkhair" },
  { label: "alkhair islamic finance loan apply online", to: "/alkhair-islamic-finance" },
  { label: "alkhair finance loan apply online", to: "/alkhair-finance" },
  { label: "alkhair finance aurangabad", to: "/alkhair-finance-aurangabad" },
  { label: "alkhair loan", to: "/alkhair-finance" },
  { label: "alkhair islamic finance aurangabad", to: "/alkhair-finance-aurangabad" },
  { label: "alkhair", to: "/alkhair" },
  { label: "alkhair baitul maal finance loan apply online", to: "/contact" },
  { label: "alkhair finance aurangabad", to: "/contact" },
];

// Old addresses that should keep working (original slugs and the broken al-khair-* links)
export const redirects: Record<string, string> = {
  "/alkhair-islamic-bank": "/alkhair-islamic-finance",
  "/al-khair-islamic-bank": "/alkhair-islamic-finance",
  "/alkhair-bank-aurangabad": "/alkhair-finance-aurangabad",
  "/al-khair-bank-aurangabad": "/alkhair-finance-aurangabad",
  "/al-khair": "/alkhair",
  "/al-khair-finance": "/alkhair-finance",
  "/al-khair-baitulmaal-co-op-credit-soc": "/alkhair-baitulmaal-co-op-credit-soc",
};
