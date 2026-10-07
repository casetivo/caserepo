import React from "react";
import { ToolSeoContent } from "../seoContent";
import { strongPasswordSeo } from "./random/strongPassword";
import { uuidGeneratorSeo } from "./random/uuidGenerator";
import { randomNumberSeo } from "./random/randomNumber";
import { randomChoiceSeo } from "./random/randomChoice";
import { randomDataSeo } from "./random/randomData";
import { randomIpAddressSeo } from "./random/randomIpAddress";
import { randomLetterSeo } from "./random/randomLetter";
import { randomMonthSeo } from "./random/randomMonth";

export const randomGeneratorsSeo: Record<string, ToolSeoContent> = {
  "strong-password-generator": strongPasswordSeo,
  "uuid-generator": uuidGeneratorSeo,
  "random-number-generator": randomNumberSeo,
  "random-choice-generator": randomChoiceSeo,
  "random-data-generator": randomDataSeo,
  "random-ip-address-generator": randomIpAddressSeo,
  "random-letter-generator": randomLetterSeo,
  "random-month-generator": randomMonthSeo,
};
