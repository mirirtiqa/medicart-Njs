import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



const CardComponent = ({ title, imageSrc, link }) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-center text-sm font-semibold">{title}</CardTitle>
                </CardHeader>
                <img src={imageSrc} alt={title} className="w-full h-auto object-cover"/>
            </Card>
        </a>
    );
};

const CardGrid = () => {
    const cards = [
        { title: 'Medicines', imageSrc: '/images/medicines.png', link: '/medicines' },
        { title: 'Lab Tests', imageSrc: '/images/lab-tests.png', link: '/lab-tests' },
        { title: 'Doctors', imageSrc: '/images/doctors.png', link: '/doctors' },
        { title: 'Cancer Care', imageSrc: '/images/cancer-care.png', link: '/cancer-care' },
        { title: 'Care Plans', imageSrc: '/images/care-plans.png', link: '/care-plans' },
        { title: 'Support for', imageSrc: '/images/support-for.png', link: '/support-for' },
    ];

    return (
        <div className="p-12 pb-28 lg:pt-28">
            <h2 className="text-center text-2xl font-bold mb-6">Categories</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {cards.map((card, index) => (
                    <CardComponent key={index} title={card.title} imageSrc={card.imageSrc} link={card.link} />
                ))}
            </div>
        </div>
    );
};

export default CardGrid;