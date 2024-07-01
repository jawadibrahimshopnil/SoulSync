const ContactUs = () => {
    return (
        <div className="min-h-screen my-6">

            <div className="mx-auto text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">Contact US</h2>
                <p className="text-base md:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
                    Reach Out and Connect with Us Today
                </p>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" name="name" id="name" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border py-3" />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" name="email" id="email" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border py-3" />
                                </div>

                                <div className="col-span-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" name="message" rows="4" className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"></textarea>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                        <p className="text-lg text-gray-700 mb-2">Feel free to reach out to us using the following information:</p>
                        <div className="flex items-center">
                            <p className="text-gray-700">123 Street Name, City, Country</p>
                        </div>
                        <div className="flex items-center mt-2">
                            <p className="text-gray-700">info@example.com</p>
                        </div>
                        <div className="flex items-center mt-2">
                            <p className="text-gray-700">+1234567890</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ContactUs;