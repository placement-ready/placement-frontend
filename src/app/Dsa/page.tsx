'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  ListOrdered,
  Search,
  Type,
  RefreshCw,
  Link as LinkIcon,
  ActivitySquare,
  Layers3,
  ArrowUpRight,
  Columns2,
  TrendingUp,
  TreePine,
  TreeDeciduous,
  Share2,
  Repeat,
  Calculator,
  KeyRound,
  SplitSquareVertical,
  MapPinned
} from 'lucide-react';

const topicIcons: Record<string, React.ReactNode> = {
  basic: <BookOpen size={32} strokeWidth={2} className="text-emerald-600" />,
  arrays: <ListOrdered size={32} strokeWidth={2} className="text-green-600" />,
  "binary-search": <Search size={32} strokeWidth={2} className="text-emerald-500" />,
  strings: <Type size={32} strokeWidth={2} className="text-green-500" />,
  recursion: <RefreshCw size={32} strokeWidth={2} className="text-emerald-600" />,
  linkedlist: <LinkIcon size={32} strokeWidth={2} className="text-green-600" />,
  bit: <ActivitySquare size={32} strokeWidth={2} className="text-green-700" />,
  "stack-queue": <Layers3 size={32} strokeWidth={2} className="text-teal-600" />,
  "two-pointers": <ArrowUpRight size={32} strokeWidth={2} className="text-emerald-700" />,
  "sliding-window": <Columns2 size={32} strokeWidth={2} className="text-lime-600" />,
  heaps: <TrendingUp size={32} strokeWidth={2} className="text-green-800" />,
  greedy: <TrendingUp size={32} strokeWidth={2} className="text-emerald-800" />,
  trees: <TreeDeciduous size={32} strokeWidth={2} className="text-green-800" />,
  bst: <TreePine size={32} strokeWidth={2} className="text-emerald-800" />,
  graphs: <Share2 size={32} strokeWidth={2} className="text-blue-600" />,
  dp: <Repeat size={32} strokeWidth={2} className="text-green-700" />,
  math: <Calculator size={32} strokeWidth={2} className="text-green-700" />,
  trie: <KeyRound size={32} strokeWidth={2} className="text-teal-800" />,
  dsu: <SplitSquareVertical size={32} strokeWidth={2} className="text-green-800" />,
  backtracking: <MapPinned size={32} strokeWidth={2} className="text-emerald-600" />,
};

interface Topic {
  key: string;
  name: string;
  icon: string;
  count: number;
  completed: number;
}

const dsaTopics: Topic[] = [
  { key: 'basic', name: "Basic Concepts", icon: "basic", count: 10, completed: 0 },
  { key: 'arrays', name: "Arrays", icon: "arrays", count: 40, completed: 0 },
  { key: 'binary-search', name: "Binary Search", icon: "binary-search", count: 22, completed: 0 },
  { key: 'strings', name: "Strings", icon: "strings", count: 35, completed: 0 },
  { key: 'recursion', name: "Recursion", icon: "recursion", count: 18, completed: 0 },
  { key: 'linkedlist', name: "Linked List", icon: "linkedlist", count: 25, completed: 0 },
  { key: 'bit', name: "Bit Manipulation", icon: "bit", count: 12, completed: 0 },
  { key: 'stack-queue', name: "Stack & Queues", icon: "stack-queue", count: 23, completed: 0 },
  { key: 'two-pointers', name: "Two Pointers", icon: "two-pointers", count: 17, completed: 0 },
  { key: 'sliding-window', name: "Sliding Window", icon: "sliding-window", count: 19, completed: 0 },
  { key: 'heaps', name: "Heaps", icon: "heaps", count: 14, completed: 0 },
  { key: 'greedy', name: "Greedy Algorithms", icon: "greedy", count: 24, completed: 0 },
  { key: 'trees', name: "Trees", icon: "trees", count: 33, completed: 0 },
  { key: 'bst', name: "Binary Search Tree (BST)", icon: "bst", count: 14, completed: 0 },
  { key: 'graphs', name: "Graphs", icon: "graphs", count: 25, completed: 0 },
  { key: 'dp', name: "Dynamic Programming", icon: "dp", count: 40, completed: 0 },
  { key: 'math', name: "Math & Number Theory", icon: "math", count: 10, completed: 0 },
  { key: 'trie', name: "Trie", icon: "trie", count: 8, completed: 0 },
  { key: 'dsu', name: "Disjoint Set / Union Find", icon: "dsu", count: 6, completed: 0 },
  { key: 'backtracking', name: "Backtracking", icon: "backtracking", count: 10, completed: 0 },
];

type DifficultyStats = {
  easy: { count: number; completed: number };
  medium: { count: number; completed: number };
  hard: { count: number; completed: number };
};

const difficulty: DifficultyStats = {
  easy: { count: 132, completed: 0 },
  medium: { count: 186, completed: 0 },
  hard: { count: 136, completed: 0 },
};

export default function DsaUi() {
  const router = useRouter();
  const totalQuestions = dsaTopics.reduce((sum, t) => sum + t.count, 0);
  const totalCompleted = dsaTopics.reduce((sum, t) => sum + t.completed, 0);
  const totalPercent = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  return (
    <div className="relative">

      {/* Back button (fixed top-left corner, YOUR SVG) */}
      <button
        onClick={() => router.back()}
        className="
          fixed top-6 left-6
          flex items-center justify-center w-14 h-14 rounded-2xl
          bg-white/95 hover:bg-emerald-50
          shadow-xl border border-green-100
          backdrop-blur
          transition z-50
        "
        aria-label="Back"
        style={{
          boxShadow: '0 4px 18px 0 #00c85118',
        }}
      >
        {/* --- YOUR SVG: --- */}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
          <path d="M9 5l-7 7 7 7v-4c7.732 0 12 3.268 13 10-1-11-6.268-16-13-16V5z"/>
        </svg>
      </button>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        {/* Summary card */}
        <div className="
          flex flex-col md:flex-row items-center justify-between
          gap-4 md:gap-0 mb-12 px-10 py-8
          bg-gradient-to-br from-green-500 via-emerald-500 to-green-600
          rounded-[38px] shadow-2xl text-white
          border border-green-300/30 backdrop-blur relative z-10
        ">
          <div className="flex flex-col items-center flex-1 min-w-[180px] mb-6 md:mb-0">
            <div className="text-lg font-semibold mb-1 opacity-90 tracking-tight">
              Total Progress
            </div>
            <div className="text-4xl font-black mb-1 tracking-tight drop-shadow">
              {totalCompleted} <span className="opacity-80 font-bold">/ {totalQuestions}</span>
            </div>
            <div className="flex items-center justify-center mt-1">
              <div
                className="w-[72px] h-[72px] rounded-full bg-green-50 flex items-center justify-center border-4 border-emerald-400 shadow-inner"
                style={{
                  boxShadow: "0 8px 32px 0 #00c85122, inset 0 1.5px 7px #00c85155",
                }}
              >
                <span className="text-2xl font-extrabold text-green-700">{totalPercent}%</span>
              </div>
            </div>
          </div>
          {[["Easy", "easy"], ["Medium", "medium"], ["Hard", "hard"]].map(([label, key]) => {
            const { completed, count } = difficulty[key as keyof DifficultyStats];
            const percent = count > 0 ? Math.round((completed / count) * 100) : 0;
            const barColors = {
              Easy: "from-emerald-200 to-green-400",
              Medium: "from-green-300 via-green-500 to-emerald-400",
              Hard: "from-green-400 to-green-700",
            };
            return (
              <div key={label} className="flex-1 flex flex-col items-center min-w-[170px]">
                <div className="text-lg font-semibold mb-0.5">{label}</div>
                <div className="text-2xl font-bold mb-1 tracking-tight">
                  {completed} <span className="opacity-70 font-bold">/ {count}</span>
                </div>
                <div className="w-full px-3 flex items-center">
                  <div className="flex-1 h-2 bg-white/20 rounded-full relative overflow-hidden drop-shadow">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${barColors[label as keyof typeof barColors]} transition-all duration-300`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-white/80 mt-1 font-medium tracking-wide">
                  completed
                </div>
              </div>
            );
          })}
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {dsaTopics.map((topic) => {
            const percent = topic.count > 0 ? Math.round((topic.completed / topic.count) * 100) : 0;
            return (
              <div
                key={topic.key}
                className="
                  flex flex-col items-center justify-start
                  rounded-[26px] p-7 bg-gradient-to-br from-green-50 via-white to-emerald-50
                  border border-green-100 hover:border-green-400
                  shadow-xl hover:shadow-green-200
                  transition-all duration-200 group
                  relative
                  cursor-pointer
                  hover:-translate-y-1 hover:scale-[1.025]
                "
                style={{
                  minHeight: "190px",
                }}
              >
                <span
                  className="mb-4 flex items-center justify-center w-16 h-16 rounded-xl drop-shadow-lg bg-white"
                  aria-label={topic.name}
                  style={{
                    boxShadow: "0 4px 20px #00c87116, 0 1.5px 7px #00c85114",
                  }}
                >
                  {topicIcons[topic.icon]}
                </span>
                <h3 className="font-black text-lg mb-2 text-green-700 text-center group-hover:text-emerald-600 tracking-tight leading-tight">
                  {topic.name}
                </h3>
                <div className="mb-2 text-green-900 font-semibold text-base">
                  {topic.completed} / {topic.count} solved
                </div>
                <div className="w-11/12 mx-auto bg-green-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="text-xs text-green-700 opacity-80 mt-2 font-bold tracking-wide">
                  {percent}% completed
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
