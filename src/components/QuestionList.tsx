interface QuestionItem {
    id: string;
    title: string;
    completed: boolean;
  }
  
  interface QuestionStepperProps {
    questions: QuestionItem[];
    activeQuestion: string;
    setActiveQuestion: (id: string) => void;
  }
  
  export default function QuestionList({ questions, activeQuestion, setActiveQuestion }: QuestionStepperProps) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Interview Questions</h3>
        <div className="flex-1 overflow-y-auto space-y-4">
          {questions.map((question, index) => {
            const isCompleted = question.completed;
            const isActive = question.id === activeQuestion;
            const isLast = index === questions.length - 1;
            const nextQuestion = questions[index + 1];
  
            return (
              <div 
                key={question.id}
                className="relative flex gap-3 cursor-pointer group"
                onClick={() => setActiveQuestion(question.id)}
              >
                {/* Vertical connector line */}
                {!isLast && (
                  <div className={`absolute left-[15px] top-8 h-[calc(100%+1rem)] w-0.5 ${
                    isCompleted 
                      ? 'bg-green-500' 
                      : (nextQuestion && !nextQuestion.completed) 
                        ? 'bg-gray-200 bg-dashed'
                        : 'bg-gray-200'
                  }`} />
                )}
  
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCompleted 
                      ? 'bg-green-500 text-white border-2 border-green-600' 
                      : isActive 
                        ? 'border-2 border-blue-500 bg-white text-blue-500' 
                        : 'border-2 border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="font-medium">{index + 1}</span>
                    )}
                  </div>
                </div>
  
                {/* Question content */}
                <div className={`flex-1 min-w-0 ${!isLast ? 'pb-4' : ''}`}>
                  <div className={`flex justify-between items-start ${
                    isActive ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'
                  }`}>
                    <div className="min-w-0">
                      <h4 className={`text-sm font-medium truncate ${
                        isCompleted ? 'text-gray-500' : 
                        isActive ? 'text-blue-600' : 
                        'text-gray-700'
                      }`}>
                        {question.title}
                      </h4>
                    </div>
                    {isActive && (
                      <button className="ml-2 px-2.5 py-0.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors whitespace-nowrap">
                        Start
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }