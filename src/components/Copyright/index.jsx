function GetCurrentYear(props) {
    return (
        <p className='py-5 px-3'>
            Copyright &#169; {props.year} Holidaze. All Rights Reserved
        </p>
    );
}

/* Keeps the year in the copyright text up to date */
function Copyright() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return <GetCurrentYear year={currentYear} />;
}

export default Copyright;
