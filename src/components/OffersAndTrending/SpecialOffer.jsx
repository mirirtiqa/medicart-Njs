import React, { useState, useEffect } from "react";
import Link from "next/link";

const SpecialOffer = () => {
    const calculateTimeLeft = () => {
        const endTime = new Date("2024-08-31T23:59:59");
        const difference = endTime - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const time = calculateTimeLeft();
            setTimeLeft(time);

            if (Object.keys(time).length === 0) {
                setIsExpired(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    if (isExpired) return null;

    const formatTime = (time) => String(time).padStart(2, '0').split('');

    return (
        <Link href="https://example.com/special-offer" target="_blank" rel="noopener noreferrer">
            <div className="p-6 bg-[#01D6A3] rounded shadow-md hover:shadow-lg w-96 h-48 transition-shadow duration-300 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-center mb-2">SPECIAL OFFER</h3>
                <h4 className="text-sm font-semibold text-center mb-4">LIMITED TIME OFFER</h4>
                <div className="flex space-x-1">
                    {formatTime(timeLeft.hours || 0).map((digit, index) => (
                        <div key={`hour-${index}`} className="bg-black text-white rounded text-2xl font-bold p-2">{digit}</div>
                    ))}
                    <div className="text-2xl font-bold">:</div>
                    {formatTime(timeLeft.minutes || 0).map((digit, index) => (
                        <div key={`minute-${index}`} className="bg-black text-white rounded text-2xl font-bold p-2">{digit}</div>
                    ))}
                    <div className="text-2xl font-bold">:</div>
                    {formatTime(timeLeft.seconds || 0).map((digit, index) => (
                        <div key={`second-${index}`} className="bg-black text-white rounded text-2xl font-bold p-2">{digit}</div>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default SpecialOffer;
