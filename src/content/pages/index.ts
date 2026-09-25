export { homePage } from "./home";
export { alkhairPage } from "./alkhair";
export { baitulmaalPage } from "./baitulmaal";
export { aurangabadPage } from "./aurangabad";
export { financePage } from "./finance";
export { islamicFinancePage } from "./islamicFinance";
export { loanPage } from "./loan";
export { contactPage } from "./contact";

import type { PageContent } from "../types";
import { homePage } from "./home";
import { alkhairPage } from "./alkhair";
import { baitulmaalPage } from "./baitulmaal";
import { aurangabadPage } from "./aurangabad";
import { financePage } from "./finance";
import { islamicFinancePage } from "./islamicFinance";
import { loanPage } from "./loan";
import { contactPage } from "./contact";

export const pages: PageContent[] = [homePage, alkhairPage, baitulmaalPage, aurangabadPage, financePage, islamicFinancePage, loanPage, contactPage];
