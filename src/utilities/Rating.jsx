import fullStar from '../assets/full-star.png'
import halfStar from '../assets/half-star.png'
import emptyStar from '../assets/empty-star.png'

const Rating = ({ rating }) => {
    const totalStars = 10;

    const fullStars = Math.floor(rating);

    const halfStars = rating % 1 >= 0.5;

    const emptyStars = totalStars - Math.ceil(rating);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(fullStar);    //Full Star
    }

    if (halfStars) {
        stars.push(halfStar);   //Half Star
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(emptyStar);   //Empty Star
    }

    if (stars.length<10) {
        stars.push(emptyStar);
    }

    return (
        <div className="flex items-center gap-1 sm:gap-2">
            {stars?.map((star, index) => (
                <span key={index}>
                    <img className='w-2 h-2 sm:w-4 sm:h-4' src={star} alt="star_img" />
                </span>
            ))}
        </div>
    );
};

export default Rating;
