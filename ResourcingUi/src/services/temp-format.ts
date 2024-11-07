import { TempResponse } from "./temp-services";

export const filterOption = {
  FIRSTNAME: 'First Name',
  LASTNAME: 'Last Name',
}
export type filterOptionType = typeof filterOption[keyof typeof filterOption];

export const sortTemps = (temps: TempResponse[], selectedFilter: filterOptionType) => {
    const sortedTemps = [...temps];
    if (selectedFilter === filterOption.LASTNAME) {
      sortedTemps.sort((a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase()));
    } else {
      sortedTemps.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
    }

    return sortedTemps;
}