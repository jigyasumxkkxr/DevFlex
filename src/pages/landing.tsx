import { Nav } from "../components/nav"
import { UsernameCard } from "../components/username-card"
import logo from "../assets/Vector.svg"


export const Landing = () => {
    return (
        <div className="absolute inset-0 h-full w-full bg-black bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:24px_24px] flex flex-col">
            <Nav />
            <div className=" flex flex-col justify-center items-center flex-grow gap-16">
                <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                    <p className="text-white text-5xl font-extrabold">{"<"}</p>
                    <img src={logo} alt="" className="bg-black" />
                    <p className="text-white text-5xl font-extrabold">{"/>"}</p>
                </div>
                <div>
                    <p className="text-gray-300 font-light text-center">Show off your dev skills and share them with your friends.</p>
                </div>
                </div>
                <UsernameCard />
            </div>
        </div>
    )
}