import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  name: string;
}

export const ImageCarousel = ({ images, name }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden group">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${name} - Image ${index + 1}`}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-foreground/10" />

      {/* Navigation Buttons */}
      <Button
        variant="glass"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="glass"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToNext}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-primary-foreground w-6'
                : 'bg-primary-foreground/50 hover:bg-primary-foreground/75'
            )}
          />
        ))}
      </div>
    </div>
  );
};
