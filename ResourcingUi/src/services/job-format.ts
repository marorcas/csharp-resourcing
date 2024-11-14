import { JobResponse } from "./job-services";

export const filterOption = {
  NAME: 'Name',
  STARTDATE: 'Start Date',
  ENDDATE: 'End Date'
}
export type filterOptionType = typeof filterOption[keyof typeof filterOption];

export const sortJobs = (jobs: JobResponse[], selectedFilter: filterOptionType) => {
  const sortedJobs = [...jobs];
    if (selectedFilter === filterOption.STARTDATE) {
      sortedJobs.sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : null;
        const dateB = b.startDate ? new Date(b.startDate).getTime(): null;

        // If both dates are null, they are equal
        if (dateA === null && dateB === null) return 0;

        // If one date is null, push the one with the date to the top
        if (dateA === null) return 1;
        if (dateB === null) return -1;

        // Otherwise, compare the dates
        return dateA - dateB;
      })
    } else if (selectedFilter === filterOption.ENDDATE) {
      sortedJobs.sort((a, b) => {
        const dateA = a.endDate ? new Date(a.endDate).getTime() : null;
        const dateB = b.endDate ? new Date(b.endDate).getTime(): null;

        // If both dates are null, they are equal
        if (dateA === null && dateB === null) return 0;

        // If one date is null, push the one with the date to the top
        if (dateA === null) return 1;
        if (dateB === null) return -1;

        // Otherwise, compare the dates
        return dateA - dateB;
      })
    } else {
      sortedJobs.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    return sortedJobs;
}