export const getStaticProps = async () => {
    return {
        props: {},
    };
};

// TODO: add a page for each material
export default function Materials() {
    return (
        <div className="px-3 text-lg">
            <p className="mt-20 text-center text-2xl">Materials</p>
            <div>
                <a
                    href="/materials/polymers"
                    className="ml-2 underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                >
                    Building Polymers with Neural Network Potentials
                </a>
            </div>
        </div>
    );
}
