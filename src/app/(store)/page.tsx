import Categories from "@/components/storefront/categories";
import Cta from "@/components/storefront/cta";
import Faq from "@/components/storefront/faq";
import FeaturedProducts from "@/components/storefront/featured-products";
import Hero from "@/components/storefront/hero";
import HowItWorks from "@/components/storefront/how-it-works";
import Testimonials from "@/components/storefront/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Cta />
    </div>
  );
}
