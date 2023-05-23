export default function GetTotalAmountOfDays(props) {
    const startDate = new Date(props.date1);
    const endDate = new Date(props.date2);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
}
