export const getStaticProps = async () => {
    return {
        props: {},
    };
};

// TODO: add a page for each material
export default function Materials() {
    return (
        <div className="px-3 text-center text-lg">
            <p className="fade-in-on-scroll text-2xl">Materials</p>
            <p></p>
        </div>
    );
}
