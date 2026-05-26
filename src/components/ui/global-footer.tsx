import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="relative z-10 py-20 px-6 sm:px-12 bg-black border-t border-white/5 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-16">
        
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-[3px] text-[#C8EB5F]">
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
              <div className="w-8 h-[2.5px] bg-current rounded-sm" />
            </div>
            <span className="font-serif tracking-widest text-white text-base font-bold">TAJWEEDPAGE</span>
          </div>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Professional, certified online Quran teaching matching global timezone coordinates. Engage with native scholars to perfect your phonetic accuracy.
          </p>
        </div>

        <div className="space-y-4">
          <h5 className="font-mono text-[10px] tracking-[0.2em] font-bold text-white uppercase">Syllabus Links</h5>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
            <li><Link href="/courses/tajweed-course" className="hover:text-[#C8EB5F] transition-colors">Complete Tajweed Master Series</Link></li>
            <li><Link href="/quran-classes-for-kids" className="hover:text-[#C8EB5F] transition-colors">Noorani Qaida for Kids</Link></li>
            <li><Link href="/quran-in-the-world" className="hover:text-[#C8EB5F] transition-colors">Quran in the World (Timing)</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h5 className="font-mono text-[10px] tracking-[0.2em] font-bold text-white uppercase">Primary Features</h5>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
            <li className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-[#C8EB5F]" /> Handpicked Female Scholars</li>
            <li className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-emerald-400" /> WhatsApp Weekly Updates</li>
            <li className="flex gap-2 items-center"><CheckCircle2 size={12} className="text-[#C8EB5F]" /> Individual Lesson Logbooks</li>
          </ul>
        </div>

        <div className="space-y-4 col-span-1">
          <h5 className="font-mono text-[10px] tracking-[0.2em] font-bold text-white uppercase">Direct Channels</h5>
          <div className="space-y-3">
            <a 
              href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%20online%20classes%20with%20Tajweedpage."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 w-full justify-center bg-[#C8EB5F] text-black hover:bg-white font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
            >
              WhatsApp Chat (+923708201211)
            </a>
            <a 
              href="mailto:abuqitmirshirazalmadani@gmail.com?subject=Tajweedpage%20Quran%20Classes%20Inquiry"
              className="flex items-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-[#C8EB5F] text-white hover:text-black font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-300 w-full justify-center"
            >
              Inquire via Email
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 text-[10px] font-mono tracking-widest text-neutral-500 uppercase border-t border-white/5 pt-8">
          <div className="space-y-1.5 text-center lg:text-left">
            <span>© 2026 TAJWEEDPAGE ONLINE ACADEMY. EMAIL: abuqitmirshirazalmadani@gmail.com</span>
            <span className="text-[9px] text-neutral-600 block lowercase tracking-wider">
              Established traditional phonic sciences with authentic Ijazah narration chains.
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a 
              href="https://wa.me/923708201211?text=Asalamu%20Alaikum,%20I%20am%20interested%20in%20taking%20Tajweed%20online%20classes%20with%20Tajweedpage."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#C8EB5F] hover:text-white transition-colors font-bold uppercase cursor-pointer"
            >
              <span className="size-2 rounded-full bg-[#C8EB5F] inline-block animate-pulse shrink-0" />
              <span>WhatsApp Admin (+923708201211)</span>
            </a>

            <a 
              href="https://www.google.com/search?q=Tajweedpage&stick=H4sIAAAAAAAA_-NgU1I1qDBOTTI2NkxNSkpJTTIH0lYGFalGhskGJsaWxqmpBpYphqaLWLlDErPKU1NTChLTUwFo6QPNNwAAAA&hl=en-GB&mat=CWEeAbVfenJoElcBTVDHnvkfxVBzv5W1rNW9fIld_b-VvjinwHEJBBoXvgRWUH3vq9-jcvSSUZTudv6JM5Kx5syZmqk1teLlBqWSZa1HvTyG1-z41RbZzAAawEFhCa6rtw8&authuser=0"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-wider text-neutral-400 hover:text-[#C8EB5F] hover:underline transition-colors uppercase font-bold cursor-pointer"
            >
              Google My Business
            </a>

            <a 
              href="https://www.facebook.com/profile.php?id=61574326525360"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-wider text-neutral-400 hover:text-[#C8EB5F] hover:underline transition-colors uppercase font-bold cursor-pointer"
            >
              Facebook
            </a>

            <a 
              href="https://www.instagram.com/#reactivated"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-wider text-neutral-400 hover:text-[#C8EB5F] hover:underline transition-colors uppercase font-bold cursor-pointer"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Directory Navigation Links Row */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-[10px] font-mono tracking-widest text-[#888888] uppercase border-t border-white/5 pt-6">
          <Link href="/courses/tajweed-course" className="hover:text-white transition-colors">TAJWEED SYLLABUS</Link>
          <Link href="/quran-classes-for-kids" className="hover:text-white transition-colors">KIDS CLASSES</Link>
          <Link href="/quran-in-the-world/quran-classes-in-europe" className="hover:text-white transition-colors">EUROPE CLASSES</Link>
          <Link href="/quran-in-the-world" className="hover:text-white transition-colors">QURAN IN THE WORLD</Link>
          <Link href="/blog" className="hover:text-white transition-colors font-bold text-[#C8EB5F]">JOURNAL (BLOG)</Link>
          <Link href="/about" className="hover:text-[#C8EB5F] text-white transition-colors font-semibold">ABOUT US</Link>
          <Link href="/contact" className="hover:text-[#C8EB5F] text-white transition-colors font-semibold">CONTACT</Link>
          <Link href="/pricing" className="hover:text-[#C8EB5F] text-white transition-colors font-semibold">PRICING</Link>
          <Link href="/free-trial" className="hover:text-[#C8EB5F] text-white transition-colors font-semibold">FREE TRIAL</Link>
          <Link href="/teacher-profiles" className="hover:text-[#C8EB5F] text-white transition-colors font-semibold">TEACHERS</Link>
          <Link href="/privacy-policy" className="hover:text-[#C8EB5F] text-white transition-colors font-semibold">PRIVACY POLICY</Link>
          <Link href="/terms-conditions" className="hover:text-[#C8EB5F] text-white transition-colors font-semibold">TERMS & CONDITIONS</Link>
          <Link href="/blog?admin=true" className="hover:text-[#C8EB5F] text-[#C8EB5F] font-semibold border-l border-white/20 pl-4 ml-2">✦ ADMIN DASHBOARD</Link>
        </div>
      </div>
    </footer>
  );
}
