import { useState, useEffect } from "react";
import { useSearch, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, Calendar, UserRound, CreditCard, ArrowLeft, Star, ShieldCheck } from "lucide-react";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useCaregivers } from "@/hooks/use-caregivers";
import { InsertBooking } from "@shared/schema";

export default function BookingFlow() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialCaregiverId = params.get("caregiverId");

  const { data: caregivers } = useCaregivers();
  const createBooking = useCreateBooking();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<InsertBooking>>({
    caregiverId: initialCaregiverId ? parseInt(initialCaregiverId, 10) : undefined,
    time: [],
    paymentMethod: "credit_card"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlots = ["09:00", "11:00", "13:00", "15:00", "17:00"];

  const handleNext = () => {
    // Validate current step
    let newErrors = {};
    if (step === 1) {
      if (!formData.clientName) newErrors = { ...newErrors, clientName: "Required" };
      if (!formData.clientEmail) newErrors = { ...newErrors, clientEmail: "Required" };
      if (!formData.clientPhone) newErrors = { ...newErrors, clientPhone: "Required" };
    }
    if (step === 2) {
      if (!formData.date) newErrors = { ...newErrors, date: "Please select a date" };
      if (!formData.time || formData.time.length === 0) newErrors = { ...newErrors, time: "Please select a time" };
    }
    if (step === 3) {
      if (!formData.caregiverId) newErrors = { ...newErrors, caregiverId: "Please select a caregiver" };
    }
    if (step === 4) {
      if (formData.paymentMethod === "credit_card") {
        const cardNum = document.querySelector('input[placeholder="0000 0000 0000 0000"]') as HTMLInputElement;
        const expiry = document.querySelector('input[placeholder="MM/YY"]') as HTMLInputElement;
        const cvc = document.querySelector('input[placeholder="123"]') as HTMLInputElement;
        
        if (!cardNum?.value) newErrors = { ...newErrors, cardNumber: "Required" };
        if (!expiry?.value) newErrors = { ...newErrors, expiry: "Required" };
        if (!cvc?.value) newErrors = { ...newErrors, cvc: "Required" };
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    try {
      await createBooking.mutateAsync(formData as InsertBooking);
      setStep(6); // Success
    } catch (err: any) {
      alert(err.message || "Failed to book");
    }
  };

  const steps = [
    { num: 1, title: "Your Info", icon: UserRound },
    { num: 2, title: "Schedule", icon: Calendar },
    { num: 3, title: "Caregiver", icon: UserRound },
    { num: 4, title: "Payment", icon: CreditCard },
    { num: 5, title: "Review", icon: CheckCircle },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 min-h-[80vh]">
      
      {step < 6 && (
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted -z-10 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500" 
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
            
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  step >= s.num ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold hidden md:block ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card rounded-3xl premium-shadow p-6 md:p-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Client Info */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold mb-2">Personal Details</h2>
                <p className="text-muted-foreground">Who is this booking for?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="input-premium"
                    value={formData.clientName || ""}
                    onChange={e => setFormData({...formData, clientName: e.target.value})}
                    placeholder="Jane Doe"
                  />
                  {errors.clientName && <p className="text-destructive text-sm mt-1">{errors.clientName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="input-premium"
                    value={formData.clientEmail || ""}
                    onChange={e => setFormData({...formData, clientEmail: e.target.value})}
                    placeholder="jane@example.com"
                  />
                  {errors.clientEmail && <p className="text-destructive text-sm mt-1">{errors.clientEmail}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="input-premium"
                    value={formData.clientPhone || ""}
                    onChange={e => setFormData({...formData, clientPhone: e.target.value})}
                    placeholder="(555) 123-4567"
                  />
                  {errors.clientPhone && <p className="text-destructive text-sm mt-1">{errors.clientPhone}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display font-bold mb-2">Select Schedule</h2>
                <p className="text-muted-foreground">When do you need care?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-4">Date</label>
                <input 
                  type="date" 
                  className="input-premium w-full md:w-1/2"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date || ""}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
                {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-4">Available Time Slots</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setFormData({...formData, time: [time]})}
                      className={`py-3 rounded-xl font-medium border-2 transition-all ${
                        formData.time?.[0] === time 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "bg-transparent border-border text-foreground hover:border-primary/50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-destructive text-sm mt-2">{errors.time}</p>}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Caregiver Select */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold mb-2">Choose Caregiver</h2>
                <p className="text-muted-foreground">Select a professional for your care.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 pb-4">
                {caregivers?.map(caregiver => (
                  <div 
                    key={caregiver.id}
                    onClick={() => setFormData({...formData, caregiverId: caregiver.id})}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.caregiverId === caregiver.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <img src={caregiver.image} alt={caregiver.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-foreground">{caregiver.name}</h4>
                      <p className="text-sm text-muted-foreground">{caregiver.experience}</p>
                      <div className="flex items-center gap-1 text-sm font-semibold text-primary mt-1">
                        <Star className="w-3.5 h-3.5 fill-primary" /> {caregiver.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.caregiverId && <p className="text-destructive text-sm mt-4">{errors.caregiverId}</p>}
            </motion.div>
          )}

          {/* STEP 4: Payment */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold mb-2">Payment Method</h2>
                <p className="text-muted-foreground">How would you like to pay?</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <button
                  onClick={() => setFormData({...formData, paymentMethod: "credit_card"})}
                  className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center justify-center gap-3 font-semibold transition-all ${
                    formData.paymentMethod === "credit_card" ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Credit Card
                </button>
                <button
                  onClick={() => setFormData({...formData, paymentMethod: "cash"})}
                  className={`flex-1 py-4 px-6 rounded-2xl border-2 flex items-center justify-center gap-3 font-semibold transition-all ${
                    formData.paymentMethod === "cash" ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground"
                  }`}
                >
                  💵 Cash on visit
                </button>
              </div>

              {formData.paymentMethod === "credit_card" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Card Number</label>
                    <input type="text" className="input-premium" placeholder="0000 0000 0000 0000" />
                    {errors.cardNumber && <p className="text-destructive text-sm mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                      <input type="text" className="input-premium" placeholder="MM/YY" />
                      {errors.expiry && <p className="text-destructive text-sm mt-1">{errors.expiry}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-2">CVC</label>
                      <input type="text" className="input-premium" placeholder="123" />
                      {errors.cvc && <p className="text-destructive text-sm mt-1">{errors.cvc}</p>}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-4">
                    <ShieldCheck className="w-4 h-4" /> Secure encrypted payment
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 5: Review */}
          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold mb-2">Review Booking</h2>
                <p className="text-muted-foreground">Please confirm your details before completing.</p>
              </div>

              <div className="bg-muted/30 rounded-2xl p-6 border border-border space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Client Name</p>
                    <p className="font-bold text-foreground">{formData.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-bold text-foreground">{formData.clientPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-bold text-foreground">{formData.date} at {formData.time?.[0]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-bold text-foreground capitalize">{formData.paymentMethod?.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-3">Selected Caregiver</p>
                  {caregivers?.find(c => c.id === formData.caregiverId) && (
                    <div className="flex items-center gap-4">
                      <img src={caregivers.find(c => c.id === formData.caregiverId)?.image} className="w-12 h-12 rounded-full object-cover" />
                      <div className="font-bold text-foreground">
                        {caregivers.find(c => c.id === formData.caregiverId)?.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Success */}
          {step === 6 && (
            <motion.div 
              key="step6"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-12 h-12" />
              </motion.div>
              <h2 className="text-4xl font-display font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                Your caregiver has been notified. We've sent a confirmation email with all the details.
              </p>
              <button onClick={() => setLocation("/")} className="btn-premium btn-primary">
                Return Home
              </button>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 6 && (
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : history.back()} 
              className="flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-xl hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {step < 5 ? (
              <button 
                onClick={handleNext} 
                className="btn-premium btn-primary flex items-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                disabled={createBooking.isPending}
                className="btn-premium btn-primary flex items-center gap-2"
              >
                {createBooking.isPending ? "Confirming..." : "Confirm Booking"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
