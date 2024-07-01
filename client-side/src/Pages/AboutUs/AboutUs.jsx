const AboutUs = () => {
    return (
        <div className="min-h-screen my-6" id="aboutus">
            <div className="mx-auto text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 uppercase">About US</h2>
                <p className="text-base md:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
                Discover the Story Behind Our Journey
                </p>
            </div>
            <main className="max-w-7xl mx-auto pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                        <p className="text-lg text-gray-700">
                            We are dedicated to helping individuals find their perfect match and embark on a journey of love and companionship. Our mission is to create a platform that fosters meaningful connections and celebrates the beauty of relationships.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-700">
                            Our mission is to empower individuals to find love and happiness by providing them with a safe and trusted platform to connect with like-minded individuals. We strive to make the journey of finding a life partner as enjoyable and fulfilling as possible.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold  mb-4">Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img className="w-full h-48 object-cover object-center" src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg" alt="Team Member 1" />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold  mb-2">John Doe</h3>
                                    <p className="text-gray-700">Co-founder & CEO</p>
                                </div>
                            </div>

                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img className="w-full h-48 object-cover object-center" src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg" alt="Team Member 2" />
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold  mb-2">Jane Smith</h3>
                                    <p className="text-gray-700">Co-founder & CTO</p>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AboutUs;