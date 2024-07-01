import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <section className="flex items-center h-full p-16 bg-gray-50 text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl text-rose-400">
				<span className="sr-only">Error</span>404
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldnt find this page.</p>
			<p className="mt-4 mb-8 text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
			<Link to={"/"} className="SSBtn px-8 py-3 font-semibold">Back to homepage</Link>
		</div>
	</div>
</section>
    );
};

export default ErrorPage;