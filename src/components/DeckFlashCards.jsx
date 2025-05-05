import FlashCardsCarousel from "./FlashCardsCarousel/FlashCardsCarousel";
import { useLocation, useParams } from 'react-router';

export default function DeckFlashcards() {
  const location = useLocation()
  const { deck } = location.state || {};
  return(
    <div>
    <FlashCardsCarousel deck={deck}>

    </FlashCardsCarousel>
    </div>
  )
    
}
