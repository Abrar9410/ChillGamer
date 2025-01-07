

const FAQ = () => {
    return (
        <div className="w-11/12 sm:w-10/12 mx-auto mt-8 sm:mt-11 md:mt-14 flex flex-col gap-4">
            <div className="collapse collapse-arrow bg-rose-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-red-800 font-medium">What is ChillGamer?</div>
                <div className="collapse-content">
                    <p className="text-black">
                        ChillGamer is a review aggregator for video games. ChillGamer shows review data
                        from our users and compiles it all into one page. ChillGamer's mission is to help
                        consumers make more informed decisions when considering to pre-order, buy, or play a game.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-rose-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-red-800 font-medium">How does ChillGamer work?</div>
                <div className="collapse-content">
                    <p className="text-black">
                        After registering with us users can post reviews on games. He/She has to fill up a form
                        with the game title, cover photo etc. He/She can rate the game and give descriptive
                        review on the game. The review goes into our database and you will see it appearing
                        in the all reviews page and also on user's "My Reviews" page. Of course users can
                        edit/update their reviews anytime they want.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-rose-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-red-800 font-medium">How is the ChillGamer rating determined?</div>
                <div className="collapse-content">
                    <p className="text-black">
                        ChillGamer rating of a game you see is the average of the ratings provided by all
                        the reviewers of that game. We depend solely on our users/reviewers on this case.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-rose-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-red-800 font-medium">How can I support ChillGamer?</div>
                <div className="collapse-content">
                    <p className="text-black">
                        More than anything else, tell your friends about us. The top struggle for ChillGamer is
                        awareness. While it might sound surprising, most gamers still don't know that ChillGamer
                        exists.<br/><br/>
                        Otherwise, you can follow us on Twitter or like us on Facebook. Those might sound silly,
                        but for us, ChillGamer has been both a personal and emotional project. Little things
                        like page views, Facebook/Twitter followers, etc. are small in isolation, but in
                        aggregation, they help the team learn and validate that ChillGamer is moving in the
                        right direction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;