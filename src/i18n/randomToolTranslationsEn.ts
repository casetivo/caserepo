export type RandomToolTranslationKeys = {
  randomGenerators: string;
  randomChoiceGenerator: string;
  randomChoiceGeneratorSubtitle: string;
  randomChoiceGeneratorAction: string;
  randomDataGenerator: string;
  randomDataGeneratorSubtitle: string;
  randomDataGeneratorAction: string;
  randomIpAddressGenerator: string;
  randomIpAddressGeneratorSubtitle: string;
  randomIpAddressGeneratorAction: string;
  randomLetterGenerator: string;
  randomLetterGeneratorSubtitle: string;
  randomLetterGeneratorAction: string;
  randomMonthGenerator: string;
  randomMonthGeneratorSubtitle: string;
  randomMonthGeneratorAction: string;
  randomNumberGenerator: string;
  randomNumberGeneratorSubtitle: string;
  randomNumberGeneratorAction: string;
  strongPasswordGenerator: string;
  strongPasswordGeneratorSubtitle: string;
  strongPasswordGeneratorAction: string;
  uuidGenerator: string;
  uuidGeneratorSubtitle: string;
  uuidGeneratorAction: string;
};

// English-only for fast initial load
// Full translations (14 languages) in randomToolTranslations.ts

export const randomToolTranslationsEn = {
  randomGenerators: "Random Generators",
  randomChoiceGenerator: "Random Choice Generator",
  randomChoiceGeneratorSubtitle: "Randomly pick an item from a list of choices",
  randomChoiceGeneratorAction: "Pick Random",
  randomDataGenerator: "Random Data Generator",
  randomDataGeneratorSubtitle: "Generate random names, emails, addresses, and more",
  randomDataGeneratorAction: "Generate Data",
  randomIpAddressGenerator: "Random IP Address Generator",
  randomIpAddressGeneratorSubtitle: "Generate random IPv4 and IPv6 addresses",
  randomIpAddressGeneratorAction: "Generate IP",
  randomLetterGenerator: "Random Letter Generator",
  randomLetterGeneratorSubtitle: "Generate random letters from the alphabet",
  randomLetterGeneratorAction: "Generate Letters",
  randomMonthGenerator: "Random Month Generator",
  randomMonthGeneratorSubtitle: "Pick a random month of the year",
  randomMonthGeneratorAction: "Generate Month",
  randomNumberGenerator: "Random Number Generator",
  randomNumberGeneratorSubtitle: "Generate random numbers within a specified range",
  randomNumberGeneratorAction: "Generate Number",
  strongPasswordGenerator: "Strong Password Generator",
  strongPasswordGeneratorSubtitle: "Generate secure, random passwords with custom length and complexity",
  strongPasswordGeneratorAction: "Generate Password",
  uuidGenerator: "UUID Generator",
  uuidGeneratorSubtitle: "Generate universally unique identifiers (UUID v4)",
  uuidGeneratorAction: "Generate UUID",
};

export default randomToolTranslationsEn;
