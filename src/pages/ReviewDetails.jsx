import { useLoaderData } from "react-router-dom";


const ReviewDetails = () => {

    const review = useLoaderData();
    const {_id, title, coverImg, description, genre, publishedYear, rating} = review;

    return (
        <div>
            REVIEW
        </div>
    );
};

export default ReviewDetails;