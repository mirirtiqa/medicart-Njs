import { heroSection } from "@/constants";
import Button from "@/components/Reusable/Button";

export default function Hero(){
    return(
       <section className="w-full h-[100vh] bg-cover
         flex"
       style={{ backgroundImage: "url('/heroBG.png')" }}
       >
        {/* leftscetion */}

         <div className="relative top-20 left-4 flex flex-col gap-10 md:w-[60%] md:h-3/4">
            <div className="flex flex-col gap-3 text-white">
                <h1 className="text-3xl md:text-5xl font-extrabold">Find top quality <span className="text-green">medical products</span></h1>
                <h1 className="text-3xl md:text-5xl font-extrabold">for your needs</h1>
                <p className="text-slate-400 text-base md:text-lg">{heroSection.description}</p>
            </div>
            <form className="flex flex-col md:flex-row gap-5 text-base md:text-lg ">
                <input type="text" placeholder="Search for medical products or services" className="p-4 w-[60%]" />
                <div className="w-[20%]">
                <Button textColor="text-white" bgColor="bg-green" hoverBGColor="hover:bg-white" hoverColor="hover:text-green" padding="p-4" >Search</Button>
                </div>
            </form>

        </div>   


       </section>
    )
}
