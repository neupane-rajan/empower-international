import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Lock, Eye, Activity, Globe, Brain, Scale, MessageCircle, Smile, Handshake, Pencil, Shield, Ban } from 'lucide-react';

const iconMap = {
    "🌍": Globe, "🧠": Brain, "⚖️": Scale,
    "🔒": Lock, "👀": Eye, "💪": Activity,
    "📅": Calendar, "✅": Check, "🤝": Handshake, "💬": MessageCircle, "😊": Smile,
    "✏️": Pencil, "🛡️": Shield, "🚫": Ban
};

const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
        }
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
        }
    })
};

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

const GlassCard = ({ children, className = "" }) => (
    <motion.div
        variants={itemVariants}
        className={`
      bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-xl 
      hover:bg-white/10 hover:border-white/20 transition-all duration-500 ease-out 
      hover:shadow-2xl hover:shadow-indigo-500/10 group
      ${className}
    `}
    >
        {children}
    </motion.div>
);

const Slide = ({ slide, direction }) => {
    const Icon = ({ name, className }) => {
        const LucideIcon = iconMap[name];
        if (LucideIcon) return <LucideIcon size={48} className={`mb-6 text-indigo-400 group-hover:text-fuchsia-400 transition-colors duration-500 ${className}`} strokeWidth={1.5} />;
        return <span className="text-5xl mb-6 block transform group-hover:scale-110 transition-transform duration-500">{name}</span>;
    };

    return (
        <motion.div
            className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col items-center justify-center min-h-[85vh] absolute inset-0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            key={slide.id}
        >
            <motion.div variants={contentVariants} initial="hidden" animate="visible" className="w-full flex flex-col items-center">

                {/* Header */}
                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-center mb-4 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300 drop-shadow-sm">
                        {slide.title}
                    </span>
                </motion.h1>

                {slide.subtitle && (
                    <motion.h2 variants={itemVariants} className="text-xl md:text-3xl text-indigo-200/90 mb-12 text-center font-light tracking-wide">
                        {slide.subtitle}
                    </motion.h2>
                )}

                {/* Content Renderers */}
                <div className="w-full">

                    {/* Type: Title Slide */}
                    {slide.type === 'title' && (
                        <div className="flex flex-col items-center">
                            <motion.div variants={itemVariants} className="text-7xl md:text-9xl my-8 font-bold text-indigo-500 animate-pulse drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                                {slide.bigNumber}
                            </motion.div>
                            <GlassCard className="max-w-2xl text-center backdrop-blur-3xl bg-white/10">
                                <p className="text-2xl md:text-3xl text-slate-100 font-light leading-relaxed">{slide.content}</p>
                            </GlassCard>
                        </div>
                    )}

                    {/* Type: Content Cards */}
                    {slide.type === 'content' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {slide.cards.map((card, idx) => (
                                <GlassCard key={idx} className="flex flex-col items-center text-center h-full justify-start">
                                    {card.icon && <Icon name={card.icon} />}
                                    <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                                    <p className="text-slate-300 text-lg leading-relaxed">{card.text}</p>
                                </GlassCard>
                            ))}
                        </div>
                    )}

                    {/* Type: Q&A Question Cards */}
                    {slide.type === 'qa' && (
                        <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
                            {slide.cards.map((card, idx) => (
                                <GlassCard key={idx} className="border-l-4 border-l-indigo-500/50 hover:border-l-fuchsia-500 transition-colors">
                                    <h3 className="text-xl font-bold text-indigo-300 mb-2 flex items-center gap-3">
                                        <span className="bg-indigo-500/20 p-1.5 rounded-lg">❓</span>
                                        {card.question}
                                    </h3>
                                    <p className="text-white text-lg leading-relaxed pl-10 opacity-90">{card.answer}</p>
                                </GlassCard>
                            ))}
                        </div>
                    )}

                    {/* Type: List */}
                    {slide.type === 'list' && (
                        <GlassCard className="w-full max-w-3xl mx-auto">
                            <ul className="space-y-6">
                                {slide.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center text-xl text-slate-200 group/item">
                                        <span className="mr-4 w-2 h-2 rounded-full bg-indigo-400 group-hover/item:bg-fuchsia-400 group-hover/item:scale-150 transition-all duration-300"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    )}

                    {/* Type: Split Columns */}
                    {slide.type === 'split' && (
                        <>
                            {slide.bigNumber && (
                                <motion.div variants={itemVariants} className="text-8xl font-black text-center text-indigo-400/20 absolute top-20 right-20 -z-10 select-none">
                                    {slide.bigNumber}
                                </motion.div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
                                <GlassCard className="border-t-4 border-t-emerald-500/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10"><Check size={100} /></div>
                                    <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                                        {slide.left.icon && <span className="text-3xl">{slide.left.icon}</span>}
                                        {slide.left.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {slide.left.items.map((it, i) => (
                                            <li key={i} className="flex gap-3 text-lg text-slate-200">
                                                <Check size={24} className="text-emerald-500 shrink-0" />
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </GlassCard>
                                <GlassCard className="border-t-4 border-t-rose-500/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10"><Ban size={100} /></div>
                                    <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-2">
                                        {slide.right.icon && <span className="text-3xl">{slide.right.icon}</span>}
                                        {slide.right.title}
                                    </h3>
                                    <ul className="space-y-4">
                                        {slide.right.items.map((it, i) => (
                                            <li key={i} className="flex gap-3 text-lg text-slate-200">
                                                <span className="text-rose-500 font-bold">✕</span>
                                                {it}
                                            </li>
                                        ))}
                                    </ul>
                                </GlassCard>
                            </div>
                        </>
                    )}
                </div>

                {/* Highlight Box */}
                {slide.highlight && (
                    <motion.div
                        variants={itemVariants}
                        className="mt-12 bg-white/5 border border-indigo-500/30 px-8 py-4 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    >
                        <p className="text-xl md:text-2xl font-semibold text-indigo-200 text-center tracking-wide">
                            {slide.highlight}
                        </p>
                    </motion.div>
                )}

            </motion.div>
        </motion.div>
    );
};

export default Slide;
