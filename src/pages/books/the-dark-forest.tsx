import NBodyCanvas from "@/pages/books/the-dark-forest/NBodyCanvas";
import { BinaryStarSystem } from "@/pages/books/the-dark-forest/NBodySystems";

export default function TheDarkForest() {
    return (
        <div>
            <p>The Dark Forest</p>
            <NBodyCanvas bodies={BinaryStarSystem} />
            <p>
                Lastly I will say this: The book makes an implicitly strong assumption. That all
                civilizations are concerned with survival. Because all their actions serve this
                instinct.
            </p>
        </div>
    );
}
