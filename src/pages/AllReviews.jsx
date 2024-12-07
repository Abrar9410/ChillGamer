import { useState } from "react";
import { useLoaderData } from "react-router-dom";


const AllReviews = () => {

    const data = useLoaderData();
    const [allReviews, setAllReviews] = useState(data);

    return (
        <div>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn">Click</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </div>
            <ul className="menu w-20">
                <li>
                    <details>
                        <summary>Parent</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
            {
                allReviews && allReviews.map(review => 
                    <div key={review._id} className="my-8">
                        <p>{review.title} {review.rating}</p>
                        <p>{review.userName}</p>
                    </div>
                )
            }
        </div>
    );
};

export default AllReviews;