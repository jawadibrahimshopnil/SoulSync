import { Divider } from "@mui/joy";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import { toast } from "react-toastify";
import useMyBio from "../../../../Hooks/useMyBio";
import Loading from "../../../../Compnents/Loading";

const EditBio = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const [biodata, loading] = useMyBio();

    if (loading) {
        return <Loading />
    }

    const hMinMax = [4, 7];
    const heightOptions = [];
    for (let feet = hMinMax[0]; feet <= hMinMax[1]; feet++) {
        for (let inches = 0; inches < 12; inches++) {
            const heightCm = `${Math.round((feet * 30.48) + (inches * 2.54))}`;
            const heightLabel = `${feet}' ${inches}" (${heightCm}cm)`;
            heightOptions.push({ label: heightLabel, value: heightCm })
        }
    }

    const wMinMax = [35, 160];
    const weightOptions = [];
    for (let weight = wMinMax[0]; weight <= wMinMax[1]; weight++) {
        weightOptions.push({ label: `${weight} KG`, value: weight })
    }

    const occupationOptions = ["Engineer", "Doctor", "Lawyer", "Teacher", "Nurse", "Business", "Accountant", "Architect", "Artist", "Consultant", "Dentist", "Entrepreneur", "Farmer", "Journalist", "Marketing", "Pharmacist", "Pilot", "Police Officer", "Professor", "Scientist", "Software Developer", "Student", "Writer", "Other"];

    const raceOptions = ["Asian", "African", "Hispanic/Latino", "White", "Native American", "Native Hawaiian", "Bangladeshi", "Mixed Race", "Other"];

    const divisions = ["Dhaka", "Chattogram", "Rangpur", "Barisal",
        "Khulna", "Maymansign", "Sylhet"]

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const type = form.type.value;
        const profileIMG = form.profileIMG.value;
        const birthDate = form.birthDate.value;
        const height = form.height.value;
        const weight = form.weight.value;
        const age = form.age.value;
        const occupation = form.occupation.value;
        const race = form.race.value;
        const fatherName = form.fatherName.value;
        const motherName = form.motherName.value;
        const presentDivision = form.presentDivision.value;
        const permanentDivision = form.permanentDivision.value;
        const partnerAge = form.partnerAge.value;
        const partnerHeight = form.partnerHeight.value;
        const partnerWeight = form.partnerWeight.value;
        const email = user.email;
        // const email = form.email.value;
        const mobileNum = form.mobileNum.value;

        const biodata = {
            name,
            type,
            profileIMG,
            birthDate,
            height,
            weight,
            age,
            occupation,
            race,
            fatherName,
            motherName,
            presentDivision,
            permanentDivision,
            partnerAge,
            partnerHeight,
            partnerWeight,
            email,
            mobileNum,
        }

        axiosSecure.put('/biodata/add', biodata)
            .then(({ data }) => {
                if (data.insertedId || data.modifiedCount > 0) {
                    toast.success("Biodata Saved to Database")
                }
            })

    }

    return (
        <div className="grid place-items-center">
            <div className="bg-white shadow-lg rounded-lg m-6 max-w-3xl">
                <form onSubmit={handleSubmit} className="p-6 rounded-md bg-base-200 my-4">
                    <div className="space-y-2 col-span-full lg:col-span-1  text-center">
                        <p className="font-bold text-2xl "> <span className="text-rose-600">Edit </span> Your Biodata</p>
                        <p className="text-base">Create or Update Your Profile Information.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 my-4">
                        <Divider className="text-xl mt-4 mb-2 col-span-full md:text-nowrap text-wrap">
                            About You
                        </Divider>
                        {/* row 1 */}
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="name" className="">Name<span className="text-red-500">*</span></label>
                            <input required type="text" name="name" defaultValue={biodata?.name} id="name" placeholder="Enter Your Full Name" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="type" className="">Your Type <span className="text-red-500">*</span></label>
                            <select
                                defaultValue={biodata?.type}
                                required
                                name="type"
                                className="w-full px-4 py-2 border rounded-md border-gray-400"
                                placeholder='Male or Female'>
                                <option value="">Choose...</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>

                        {/* row 2 */}
                        <div className="col-span-full">
                            <label htmlFor="profileIMG" className="">Profile Image Url<span className="text-red-500">*</span></label>
                            <input defaultValue={biodata?.profileIMG} required type="url" name="profileIMG" id="profileIMG" placeholder="Enter Your Profile Image Link" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>

                        {/* row 3 */}
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="birthDate" className="">Date of Birth <span className="text-red-500">*</span></label>
                            <input defaultValue={biodata?.birthDate} required type="date" name="birthDate" id="birthDate" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="height" className="">Height <span className="text-red-500">*</span></label>
                            <select
                                name="height"
                                required
                                defaultValue={biodata?.height}
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    heightOptions.map((height, idx) => <option key={idx} value={height.value}>{height.label}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="weight" className="">Weight <span className="text-red-500">*</span></label>
                            <select
                                required
                                name="weight"
                                defaultValue={biodata?.weight}
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    weightOptions.map((weight, idx) => <option key={idx} value={weight.value}>{weight.label}</option>)
                                }
                            </select>
                        </div>

                        {/* row 4 */}
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="age" className="">Age<span className="text-red-500">*</span></label>
                            <input defaultValue={biodata?.age} required placeholder="Enter age" type="number" min='18' max='80' name="age" id="age" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="occupation" className="">Occupation <span className="text-red-500">*</span></label>
                            <select
                                required
                                name="occupation"
                                defaultValue={biodata?.occupation}
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    occupationOptions.map((occupation, idx) => <option key={idx} value={occupation}>{occupation}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="race" className="">Race <span className="text-red-500">*</span></label>
                            <select
                                required
                                name="race"
                                defaultValue={biodata?.race}
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    raceOptions.map((race, idx) => <option key={idx} value={race}>{race}</option>)
                                }
                            </select>
                        </div>

                        <Divider className="text-xl mt-4 mb-2 col-span-full md:text-nowrap text-wrap">
                            Address & Parents Info
                        </Divider>

                        {/* row 5 */}
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="fatherName" className="">Father Name<span className="text-red-500">*</span></label>
                            <input defaultValue={biodata?.fatherName} required type="text" name="fatherName" id="fatherName" placeholder="Enter Your Father Name" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="motherName" className="">Mother Name<span className="text-red-500">*</span></label>
                            <input defaultValue={biodata?.motherName} required type="text" name="motherName" id="motherName" placeholder="Enter Your Mother Name" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>

                        {/* row 6 */}
                        <div className="col-span-full">
                            <label htmlFor="permanentAddr" className="">Permanent Division<span className="text-red-500">*</span></label>
                            <select
                                required
                                defaultValue={biodata?.permanentDivision}
                                name="permanentDivision"
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    divisions.map((division, idx) => <option key={idx} value={division}>{division}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="presentAddr" className="">Present Division<span className="text-red-500">*</span></label>
                            <select
                                required
                                name="presentDivision"
                                defaultValue={biodata?.presentDivision}
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    divisions.map((division, idx) => <option key={idx} value={division}>{division}</option>)
                                }
                            </select>
                        </div>

                        <Divider className="text-xl mt-4 mb-2 col-span-full md:text-nowrap text-wrap">
                            Expected Partner
                        </Divider>

                        {/* row 7 */}
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="partnerAge" className="">Partner Age<span className="text-red-500">*</span></label>
                            <input defaultValue={biodata?.partnerAge} required placeholder="Partner Age" type="number" min='18' max='80' name="partnerAge" id="partnerAge" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="partnerHeight" className="">Partner Height <span className="text-red-500">*</span></label>
                            <select
                                name="partnerHeight"
                                required
                                defaultValue={biodata?.partnerHeight}
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    heightOptions.map((height, idx) => <option key={idx} value={height.value}>{height.label}</option>)
                                }
                            </select>
                        </div>
                        <div className="col-span-full sm:col-span-2">
                            <label htmlFor="partnerWeight" className="">Partner Weight <span className="text-red-500">*</span></label>
                            <select
                                required
                                name="partnerWeight"
                                defaultValue={biodata?.partnerWeight}
                                className="w-full px-4 py-2 border rounded-md border-gray-400">
                                <option value="">Choose...</option>
                                {
                                    weightOptions.map((weight, idx) => <option key={idx} value={weight.value}>{weight.label}</option>)
                                }
                            </select>
                        </div>

                        <Divider className="text-xl mt-4 mb-2 col-span-full md:text-nowrap text-wrap">
                            Your Contact
                        </Divider>

                        <div className="col-span-full">
                            <label htmlFor="email" className="">Your Email<span className="text-red-500">*</span></label>
                            <input required type="email" name="email" id="email" readOnly value={user?.email || ''} className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="mobileNum" className="">Mobile Number<span className="text-red-500">*</span></label>
                            <input defaultValue={biodata?.mobileNum} required type="text" name="mobileNum" id="mobileNum" placeholder="Enter Mobile Mobile..." className="w-full px-4 py-2 border rounded-md border-gray-400" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="SSBtn px-10 bg-rose-600 text-lg text-white rounded-md">Save & Publish Now</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditBio;