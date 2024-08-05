import Image from 'next/image';

export default function Hero() {
    return (
        <div id={"hero-section"} className={"flex justify-between w-full bg-gradient-to-r from-primary-orange-200 to-primary-orange-400"}>
        <div>
            <h3>The platform where time becomes knowledge</h3>
            <h1>Transform the way you <span className={"text-primary-blue-300"}>learn & teach</span></h1>
            <p>Earn time credits by teaching, spend them to learn. No <br/>money needed.</p>
        </div>
        <div>
            <Image
                src="/hero.svg"
                alt="chronocademy illustration for hero section"
                width={490}
                height={417}
            />
        </div>
    </div>
    );
}