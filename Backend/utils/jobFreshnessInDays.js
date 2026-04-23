

export function jobFreshnessInDays(jobCreatedDate) {
    const jobDate = new Date(jobCreatedDate)
    const currentDate = new Date()

    const diffTime = currentDate - jobDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays

}

