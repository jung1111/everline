import react from 'react'

const ReservationIcon = ({date}) => {

    return(
        <>
        <div>
            <span className='reservation-icon'>예약판매</span>
        </div>
        <div className='reservation'>
            <span>판매중</span>
            <i className='period'>
                <i className='remain-period'></i>
            </i>
            <span>{date}</span>
        </div>
        </>
    )

}

export default ReservationIcon;