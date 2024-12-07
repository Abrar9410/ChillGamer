import { useLoaderData } from "react-router-dom";


const AllReviews = () => {

    const allReviews = useLoaderData();

    return (
        <div>
            {
                allReviews && allReviews.map(review => 
                    <div key={review._id} className="my-8">
                        <p>{review.title}</p>
                        <p>{review.userName}</p>
                    </div>
                )
            }
        </div>
    );
};

export default AllReviews;