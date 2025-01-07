

const FAQ = () => {
    return (
        <div className="w-11/12 sm:w-10/12 mx-auto mt-8 sm:mt-11 md:mt-14 flex flex-col gap-4">
            <div className="collapse collapse-arrow bg-rose-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-red-800 font-medium">What is Chill Gamer?</div>
                <div className="collapse-content">
                    <p className="text-black">
                        Chill Gamer is a review aggregator for video games. Chill Gamer shows review data
                        from our users and compiles it all into one page. Chill Gamer's mission is to help
                        consumers make more informed decisions when considering to pre-order, buy, or play a game.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-rose-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl text-red-800 font-medium">How does Chill Gamer work?</div>
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
                <div className="collapse-title text-xl text-red-800 font-medium">How can I support Chill Gamer?</div>
                <div className="collapse-content">
                    <p className="text-black">
                        More than anything else, tell your friends about us. The top struggle for Chill Gamer is
                        awareness. While it might sound surprising, most gamers still don't know that Chill gamer
                        exists.<br/><br/>
                        Otherwise, you can follow us on Twitter or like us on Facebook. Those might sound silly,
                        but for us, Chill Gamer has been both a personal and emotional project. Little things
                        like page views, Facebook/Twitter followers, etc. are small in isolation, but in
                        aggregation, they help the team learn and validate that Chill Gamer is moving in the
                        right direction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;