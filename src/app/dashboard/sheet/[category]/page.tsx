"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

const questionsData: Record<string, { 
  easy: { question: string; link?: string }[],
  medium: { question: string; link?: string }[],
  hard: { question: string; link?: string }[]
}> = {
  arrays: {
    easy: [
      { question: "Reverse an Array/String", link: "https://www.geeksforgeeks.org/problems/reverse-a-string/1" },
      { question: "Find the maximum and minimum element in an array", link: "https://www.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1" },
      { question: "Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo", link: "https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1" },
      { question: "Move all the negative elements to one side of the array", link: "https://www.geeksforgeeks.org/problems/move-all-negative-elements-to-end1813/1" },
      { question: "Find the Union and Intersection of the two sorted arrays", link: "https://www.geeksforgeeks.org/problems/union-of-two-arrays3538/1" },
      { question: "Write a program to cyclically rotate an array by one", link: "https://www.geeksforgeeks.org/problems/cyclically-rotate-an-array-by-one2614/1" },
      { question: "Find all pairs on integer array whose sum is equal to given number", link: "https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1" },
      { question: "Find if there is any subarray with sum equal to 0", link: "https://www.geeksforgeeks.org/problems/subarray-with-0-sum-1587115621/1" },
      { question: "Find whether an array is a subset of another array", link: "https://www.geeksforgeeks.org/problems/array-subset-of-another-array2317/1" },
      { question: "Find the triplet that sum to a given value", link: "https://www.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1" }
    ],
    medium: [
      { question: "Find the Kth max and min element of an array", link: "https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1" },
      { question: "Find Largest sum contiguous Subarray [V. IMP]", link: "https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1" },
      { question: "Minimum no. of Jumps to reach end of an array", link: "https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1" },
      { question: "Find duplicate in an array of N+1 Integers", link: "https://www.geeksforgeeks.org/problems/find-duplicates-in-an-array/1" },
      { question: "Kadane's Algo [V.V.V.V.V IMP]", link: "https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1" },
      { question: "Next Permutation", link: "https://www.geeksforgeeks.org/problems/next-permutation5226/1" },
      { question: "Best time to buy and Sell stock", link: "https://www.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1" },
      { question: "Find common elements In 3 sorted arrays", link: "https://www.geeksforgeeks.org/problems/common-elements1132/1" },
      { question: "Rearrange the array in alternating positive and negative items with O(1) extra space", link: "https://www.geeksforgeeks.org/problems/-rearrange-array-alternately-1587115620/1" },
      { question: "Find maximum product subarray", link: "https://www.geeksforgeeks.org/problems/maximum-product-subarray3604/1" },
      { question: "Find longest consecutive subsequence", link: "https://www.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1" },
      { question: "Chocolate Distribution problem", link: "https://www.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1" },
      { question: "Smallest Subarray with sum greater than a given value", link: "https://www.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x5651/1" },
      { question: "Three way partitioning of an array around a given value", link: "https://www.geeksforgeeks.org/problems/three-way-partitioning/1" }
    ],
    hard: [
      { question: "Minimize the maximum difference between heights [V.IMP]", link: "https://www.geeksforgeeks.org/problems/minimize-the-heights3351/1" },
      { question: "Merge 2 sorted arrays without using Extra space", link: "https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1" },
      { question: "Merge Intervals", link: "https://www.geeksforgeeks.org/problems/overlapping-intervals--170633/1" },
      { question: "Count Inversion", link: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1" },
      { question: "Find factorial of a large number", link: "https://www.geeksforgeeks.org/problems/factorials-of-large-numbers2508/1" },
      { question: "Given an array of size n and a number k, find all elements that appear more than n/k times", link: "https://www.geeksforgeeks.org/problems/count-element-occurences/1" },
      { question: "Maximum profit by buying and selling a share at most twice", link: "https://www.geeksforgeeks.org/problems/maximum-profit4657/1" },
      { question: "Trapping Rain water problem", link: "https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1" },
      { question: "Minimum swaps required bring elements less equal K together", link: "https://www.geeksforgeeks.org/problems/minimum-swaps-required-to-bring-all-elements-less-than-or-equal-to-k-together4847/1" },
      { question: "Minimum no. of operations required to make an array palindrome", link: "https://www.geeksforgeeks.org/problems/palindromic-array-1587115620/1" },
      { question: "Median of 2 sorted arrays of equal size", link: "https://www.geeksforgeeks.org/problems/find-the-median0527/1" },
      { question: "Median of 2 sorted arrays of different size", link: "https://www.geeksforgeeks.org/problems/median-of-2-sorted-arrays-of-different-sizes/1" }
    ]
  },
};

const DifficultyBadge = ({ difficulty }: { difficulty: 'easy' | 'medium' | 'hard' }) => {
  const colors = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    hard: 'bg-red-100 text-red-800 border-red-200'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[difficulty]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  );
};

const QuestionCard = ({ 
  question, 
  index, 
  difficulty, 
  isCompleted, 
  onToggleComplete,
  questionId 
}: { 
  question: { question: string; link?: string }, 
  index: number,
  difficulty: 'easy' | 'medium' | 'hard',
  isCompleted: boolean,
  onToggleComplete: (questionId: string) => void,
  questionId: string
}) => (
  <div className={`bg-white rounded-lg border p-4 hover:shadow-md transition-all duration-200 ${
    isCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200'
  }`}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 flex-1">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(questionId)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center mt-1 ${
            isCompleted 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-gray-300 hover:border-emerald-400'
          }`}
        >
          {isCompleted && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center justify-center w-6 h-6 text-sm font-medium rounded-full ${
              isCompleted 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {index + 1}
            </span>
            <DifficultyBadge difficulty={difficulty} />
            {isCompleted && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                ✓ Completed
              </span>
            )}
          </div>
          <h3 className={`font-medium leading-relaxed ${
            isCompleted ? 'text-gray-700 line-through' : 'text-gray-900'
          }`}>
            {question.question}
          </h3>
        </div>
      </div>
      
      {question.link && (
        <a
          href={question.link}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors duration-200 flex-shrink-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Solve
        </a>
      )}
    </div>
  </div>
);

const DifficultySection = ({ 
  title, 
  questions, 
  difficulty,
  completedQuestions,
  onToggleComplete,
  category
}: { 
  title: string, 
  questions: { question: string; link?: string }[],
  difficulty: 'easy' | 'medium' | 'hard',
  completedQuestions: Set<string>,
  onToggleComplete: (questionId: string) => void,
  category: string
}) => {
  const completedCount = questions.filter((_, index) => 
    completedQuestions.has(`${category}-${difficulty}-${index}`)
  ).length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <DifficultyBadge difficulty={difficulty} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-emerald-600 font-medium bg-emerald-100 px-2 py-1 rounded">
            {completedCount}/{questions.length} completed
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {questions.length} questions
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${questions.length > 0 ? (completedCount / questions.length) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-3">
        {questions.map((question, index) => {
          const questionId = `${category}-${difficulty}-${index}`;
          return (
            <QuestionCard 
              key={questionId} 
              question={question} 
              index={index}
              difficulty={difficulty}
              isCompleted={completedQuestions.has(questionId)}
              onToggleComplete={onToggleComplete}
              questionId={questionId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function QuestionsPage() {
  const { category } = useParams() as { category: string };
  const categoryData = questionsData[category];
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  
  const handleToggleComplete = (questionId: string) => {
    setCompletedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };
  
  if (!categoryData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h1>
          <p className="text-gray-600">No questions available for this topic yet.</p>
        </div>
      </div>
    );
  }

  const totalQuestions = categoryData.easy.length + categoryData.medium.length + categoryData.hard.length;
  const categoryTitle = category?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  
  // Calculate completion stats
  const easyCompleted = categoryData.easy.filter((_, index) => 
    completedQuestions.has(`${category}-easy-${index}`)
  ).length;
  const mediumCompleted = categoryData.medium.filter((_, index) => 
    completedQuestions.has(`${category}-medium-${index}`)
  ).length;
  const hardCompleted = categoryData.hard.filter((_, index) => 
    completedQuestions.has(`${category}-hard-${index}`)
  ).length;
  const totalCompleted = easyCompleted + mediumCompleted + hardCompleted;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryTitle} Questions
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Total: {totalCompleted}/{totalQuestions} completed
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Easy: {easyCompleted}/{categoryData.easy.length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            Medium: {mediumCompleted}/{categoryData.medium.length}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            Hard: {hardCompleted}/{categoryData.hard.length}
          </span>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${totalQuestions > 0 ? (totalCompleted / totalQuestions) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0}% Complete
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Practice Progress</h2>
          {totalCompleted > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
              🎉 {totalCompleted} problems solved!
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {easyCompleted}/{categoryData.easy.length}
            </div>
            <div className="text-sm text-gray-600">Easy Problems</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${categoryData.easy.length > 0 ? (easyCompleted / categoryData.easy.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {mediumCompleted}/{categoryData.medium.length}
            </div>
            <div className="text-sm text-gray-600">Medium Problems</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${categoryData.medium.length > 0 ? (mediumCompleted / categoryData.medium.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {hardCompleted}/{categoryData.hard.length}
            </div>
            <div className="text-sm text-gray-600">Hard Problems</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${categoryData.hard.length > 0 ? (hardCompleted / categoryData.hard.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions by Difficulty */}
      {categoryData.easy.length > 0 && (
        <DifficultySection 
          title="Easy Questions"
          questions={categoryData.easy}
          difficulty="easy"
          completedQuestions={completedQuestions}
          onToggleComplete={handleToggleComplete}
          category={category}
        />
      )}

      {categoryData.medium.length > 0 && (
        <DifficultySection 
          title="Medium Questions"
          questions={categoryData.medium}
          difficulty="medium"
          completedQuestions={completedQuestions}
          onToggleComplete={handleToggleComplete}
          category={category}
        />
      )}

      {categoryData.hard.length > 0 && (
        <DifficultySection 
          title="Hard Questions"
          questions={categoryData.hard}
          difficulty="hard"
          completedQuestions={completedQuestions}
          onToggleComplete={handleToggleComplete}
          category={category}
        />
      )}
    </div>
  );
}