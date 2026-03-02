import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, UserRound, Star } from "lucide-react";
import { useCaregivers } from "@/hooks/use-caregivers";

export default function Home() {
  const { data: caregivers, isLoading } = useCaregivers();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background gradient & pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 -z-10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                <Star className="w-4 h-4 fill-primary" />
                #1 Rated Elderly Care Platform
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6">
                Compassionate Care, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Right at Home.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Connect with vetted, experienced professionals dedicated to providing the highest quality care for your loved ones.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/book" className="btn-premium btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Find Care Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/caregivers" className="btn-premium btn-outline text-lg px-8 py-4 w-full sm:w-auto bg-background">
                  Meet our Caregivers
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Fully Vetted
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  24/7 Available
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border/50"
            >
              {/* landing page hero smiling elderly woman with caregiver */}
              <img 
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=2000" 
                alt="Caregiver assisting elderly woman"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating review card */}
              <div className="absolute bottom-8 left-8 right-8 bg-background/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-foreground font-medium mb-2">"The care my mother received was exceptional. It gave our family complete peace of mind."</p>
                <p className="text-sm text-muted-foreground">— Sarah Jenkins</p>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Featured Caregivers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Top Rated Caregivers</h2>
            <p className="text-muted-foreground max-w-2xl text-lg">Meet some of our most experienced and highly-rated professionals ready to help.</p>
          </div>
          <Link href="/caregivers" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse bg-card rounded-3xl h-96 border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caregivers?.slice(0, 3).map((caregiver, i) => (
              <motion.div 
                key={caregiver.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-3xl overflow-hidden premium-shadow group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={caregiver.image} 
                    alt={caregiver.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-sm">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    {caregiver.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">{caregiver.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{caregiver.experience} Experience</p>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                    {caregiver.bio}
                  </p>
                  <Link href={`/caregivers/${caregiver.id}`} className="btn-premium btn-outline w-full py-2.5">
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to find the right care?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10">
              Start the booking process today and let us match you with the perfect caregiver for your specific needs.
            </p>
            <Link href="/book" className="bg-background text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
