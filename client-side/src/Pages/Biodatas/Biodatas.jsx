import BioCard from "../../Compnents/BioCard";
import { Slider } from "@mui/joy";
import { useEffect, useState } from "react";
// import useBiodatas from "../../Hooks/useBiodatas";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import Loading from "../../Compnents/Loading";

const Biodatas = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const size = 10;
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: biodatas = [], isPending: loading } = useQuery({
        queryKey: ["biodatas", currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/biodatas/card?page=${currentPage}&size=${size}`);
            return res.data;
        }
    })

    const { data: biodataCount = 0, isPending: countLoading } = useQuery({
        queryKey: ['biodataCount'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodatas-count`);
            return res.data.count;
        }
    })
    const [pages, setPages] = useState([0]);
    useEffect(() => {
        if (biodataCount) {
            const pageCount = Math.ceil(biodataCount / size);
            setPages([...Array(pageCount).keys()]);
        }
    }, [biodataCount, size])

    const [cardBiodatas, setCardBiodatas] = useState(biodatas);

    useEffect(() => {
        if (biodatas.length) {
            setCardBiodatas(biodatas);
        }
    }, [biodatas]);

    const [ageRange, setAgeRange] = useState([18, 80]);
    const handleAgeChange = (_, value) => {
        setAgeRange(value);
    }

    const handleFilter = (e) => {
        e.preventDefault();

        const form = e.target;

        const startAge = ageRange[0];
        const endAge = ageRange[1];
        const type = form.type.value;
        const division = form.division.value;

        let filteredBio = biodatas;
        if (startAge || endAge) {
            filteredBio = filteredBio.filter(biodata => biodata.age >= startAge && biodata.age <= endAge);
        }
        if (type) {
            filteredBio = filteredBio.filter(biodata => biodata.type == type);
        }
        if (division) {
            filteredBio = filteredBio.filter(biodata => biodata.permanentDivision == division);
        }

        setCardBiodatas(filteredBio)

    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length-1) {
            setCurrentPage(currentPage + 1)
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="md:flex">
            <div className="md:w-1/4 border shadow-md md:">
                <form onSubmit={handleFilter} className="my-4 p-4">
                    <h3 className="text-center text-2xl mb-2">Filters</h3>
                    <div>
                        <label className="block">Age: {ageRange[0]}-{ageRange[1]}</label>
                        <Slider
                            getAriaLabel={() => 'age range'}
                            value={ageRange}
                            onChange={handleAgeChange}
                            valueLabelDisplay="auto"
                            min={18}
                            max={80}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Type:</label>
                        <select
                            name="type"
                            className="w-full px-4 py-2 border rounded-md border-gray-400"
                        >
                            <option value="">Choose gender…</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label>Division:</label>
                        <select
                            name="division"
                            className="w-full px-4 py-2 border rounded-md border-gray-400"
                        >
                            <option value="">Choose Division...</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattogram">Chattogram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Maymansign">Maymansign</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                    </div>
                    <button className="SSBtn my-2 w-full font-semibold text-lg">Apply</button>
                </form>
            </div>

            <div className="md:w-3/4 mx-auto">
                <div className="p-6 grid place-items-center sm:grid-cols-2 lg:grid-cols-3">
                    {
                        loading && <Loading />
                    }
                    {
                        cardBiodatas.map((card, idx) => <BioCard card={card} key={idx}></BioCard>)
                    }

                </div>

                <div className="flex justify-center my-4 space-x-1 text-gray-800">
                    <button onClick={handlePrevPage} className="SSBtnOutline border rounded-md shadow-md ">
                        <MdArrowBackIos className="w-4 h-4" />
                    </button>

                    {
                        pages.map((page)=><button key={page} onClick={()=>setCurrentPage(page)} className={` px-3 py-1 ${page === currentPage ? "SSBtn" : "SSBtnOutline"}  border rounded shadow-md`}>{page+1}</button>)
                    }

                    <button onClick={handleNextPage} className="SSBtnOutline border rounded-md shadow-md ">
                        <MdArrowForwardIos className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Biodatas;