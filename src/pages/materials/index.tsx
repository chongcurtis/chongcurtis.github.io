export const getStaticProps = async () => {
    return {
        props: {},
    };
};

// TODO: add a page for each material
export default function Materials() {
    return (
        <div className="px-3 text-center text-lg">
            <p className="mt-20 text-2xl">Materials</p>
            <p className="fade-in-on-scroll">
                {" "}
                <a
                    href="/materials"
                    target="_blank"
                    className="ml-2 underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                >
                    Building Polymers with Neural Network Potentials
                </a>
            </p>
        </div>
    );
}
