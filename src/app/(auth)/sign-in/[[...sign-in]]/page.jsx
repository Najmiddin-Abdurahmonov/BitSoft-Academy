"use client";
import { SignIn } from "@clerk/nextjs";
import { useLanguageContext } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export default function Page() {
  const { language } = useLanguageContext();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
   
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-linear(ellipse_at_top,_var(--tw-linear-stops))] from-purple-800/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-linear(ellipse_at_bottom,_var(--tw-linear-stops))] from-cyan-700/30 via-transparent to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {t(language, "auth.joinCodeMaster")}
          </h1>
          <p className="text-gray-400 mt-4 text-lg">{t(language, "auth.startLearningFree")}</p>
        </div>

        <div className="glass p-8 rounded-3xl shadow-2xl">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent border-0 shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl",
                dividerLine: "bg-white/10",
                dividerText: "text-gray-400",
                formFieldInput: "bg-white/10 border-white/20 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl",
                formButtonPrimary: "bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 font-bold text-lg h-12 rounded-xl",
                footerActionLink: "text-purple-400 hover:text-purple-300 font-medium",
              },
            }}
          />
        </div>

        <p className="text-center mt-6 text-gray-500">
          {t(language, "auth.dontHaveAccount")}{" "}
          <a href="/sign-up" className="text-purple-400 hover:text-purple-300 font-medium">
            {t(language, "auth.signUpHere")}
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}