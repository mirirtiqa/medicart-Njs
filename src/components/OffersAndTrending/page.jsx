"use client"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import SpecialOffer from "@/components/OffersAndTrending/SpecialOffer";


const OffersAndTrending = () => {
    const trendingProducts = [
        { name: "Comfortable Patient Bed", price: "$8.99", imageSrc: "/images/Product-1.jpg" },
        { name: "Pain Relief Medication", price: "$9.99", imageSrc: "/images/Product-2.jpg" },
        { name: "Soft Patient Bed", price: "$8.99", imageSrc: "/images/Product-3.jpg" },
        { name: "Order Lab Tests Online", price: "Starting at $13.99", imageSrc: "/images/Product-4.jpg" },
        { name: "Prescription Refill", price: "Starting at $13.99", imageSrc: "/images/Product-5.png" },
        { name: "Book Doctor", price: "Starting at $13.99", imageSrc: "/images/Product-6.png" },
    ];
    return (
        <div className="flex flex-col md:flex-row pl-16  gap-4">
            {/* Left Side: Special Offers */}
            <div className="md:w-1/3 w-full p-4">
                <h2 className="text-xl text-left p-3 font-extrabold mb-4 bg-[#F1F4F6]">Special Offers</h2>
                {/* First Card: Cancer Care */}
                <Card className="mb-4 w-96 bg-[#F1F4F6]">
                    <CardHeader className="text-center">
                        <CardTitle className="font-bold text-2xl">Cancer Care</CardTitle>
                        <CardDescription>By MedicareHub</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <img src="/images/cancer-care-2.png" alt="Cancer Care" className="w-36 h-36 object-cover" />
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <button className="bg-[#01D6A3] text-white px-4 py-2 rounded hover:bg-opacity-90 transition">Buy Now</button>
                    </CardFooter>
                </Card>

                {/* Second Card: New Medical */}
                <Card className="mb-4 w-96 bg-[#F1F4F6]">
                    <CardHeader className="text-center">
                        <CardTitle className="font-bold text-2xl">New Medical</CardTitle>
                        <CardDescription>Explore Our New</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <img src="/images/new-medical.png" alt="New Medical" className="w-36 h-36 object-cover rounded" />
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <button className="bg-[#01D6A3] text-white px-4 py-2 rounded hover:bg-opacity-100 transition">Discover</button>
                    </CardFooter>
                </Card>
                <div className="w-full">
                    <SpecialOffer />
                </div>
            </div>

            {/* Right Side: Trending Products */}
            <div className="md:w-2/3 w-full p-4">
                <h2 className="text-xl font-extrabold mb-4 p-3 bg-[#F1F4F6]">Trending Products</h2>
                <div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {trendingProducts.map((product, index) => (
                            <Card key={index} className="hover:shadow-lg bg-[#F1F4F6]">
                                <CardContent className="flex justify-center items-center p-4 pb-0">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.name}
                                        className="w-80 center rounded h-44 object-cover"
                                    />
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="text-left text-sm font-semibold">
                                        {product.name}
                                    </CardTitle>
                                    <p className="text-left text-sm">{product.price}</p>
                                </CardHeader>
                            </Card>
                        ))}

                    </div>
                    <div className="py-5">
                        <h2 className="text-xl font-extrabold mb-4 p-3 bg-[#F1F4F6]">Top Medical Categories</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Medication Options Card */}
                            <a href="/medication-options" target="_blank" rel="noopener noreferrer">
                                <Card className="hover:shadow-lg transition-shadow duration-300 relative">
                                    <img src="/images/medication-options.jpg" alt="Medication Options" className="w-full h-56 object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-1">
                                        <h2 className="text-2xl font-semibold text-white">Medication Options</h2>
                                        <p className="text-sm text-black">BROWSE AND BUY ESSENTIAL</p>
                                    </div>
                                </Card>
                            </a>

                            {/* Cancer Care Card */}
                            <a href="/cancer-care" target="_blank" rel="noopener noreferrer">
                                <Card className="hover:shadow-lg transition-shadow duration-300 relative">
                                    <img src="/images/cancer-care-3.jpg" alt="Cancer Care" className="w-full h-56 object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-1">
                                        <h2 className="text-2xl font-semibold text-white">Cancer Care</h2>
                                        <p className="text-sm text-black">COMPREHENSIVE CANCER CARE</p>
                                    </div>
                                </Card>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default OffersAndTrending;
