import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Parts = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 pb-10 container-section">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-heading mb-3">
          Genuine Parts & Accessories
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          We provide high-quality, genuine parts for all our products to ensure longevity and optimal performance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="glass-card p-6 rounded-2xl border border-border/50 animate-pulse">
              <div className="aspect-square bg-muted rounded-xl mb-4"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parts;
