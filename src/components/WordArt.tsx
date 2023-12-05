import { FC } from "react";
import "./WordArt.scss";

interface WordArtProps {
  wordArt: string;
}

export const WordArt: FC<WordArtProps> = ({ wordArt }) => {
  return (
    <div className="word-art-container">
      <pre className="word-art">{wordArt}</pre>
    </div>
  );
};
