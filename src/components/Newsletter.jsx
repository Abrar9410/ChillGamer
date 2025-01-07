import { toast } from "react-toastify";


const Newsletter = () => {

    const handleSubscribe = e => {
        e.preventDefault();
        toast.success('Thank You for Subscribing to our Newsletter!', {
            position: "top-center",
            autoClose: 1500
        });
        e.target.reset();
    }

    return (
        <div className="w-11/12 sm:w-9/12 lg:w-2/3 xl:w-1/2 mx-auto mt-8 sm:mt-11 md:mt-14 p-4 md:p-8 rounded-2xl border border-red-600 bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 shadow-xl">
            <div className="rounded-2xl bg-rose-100 bg-cover bg-center border text-center py-10 md:py-14 px-4 md:px-8">
                <h2 className="text-red-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Subscribe to our Newsletter</h2>
                <p className="text-black text-sm sm:text-base lg:text-xl mb-6">Get immediate notification for every future Post right in your Inbox!</p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-4 items-center">
                    <input className="w-full px-4 sm:px-7 py-3 rounded-xl border-2 border-orange-500" type="email" name="email" placeholder="Enter your email" required/>
                    <input type="submit" value="Subscribe" className="w-full px-4 sm:px-7 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-red-800 via-orange-700 to-rose-400 cursor-pointer hover:scale-105 outline-none"/>
                </form>
            </div>            
        </div>
    );
};

export default Newsletter;