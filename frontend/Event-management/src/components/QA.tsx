/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import EventLayout from "../layout/EventLayout";
import { useFetchEventByID } from "../Queries/Allquery";
import { useParams } from "react-router";



const Questionnaire: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>() as { eventId: string };
  
  const {data} = useFetchEventByID(eventId);
  if(data){

    console.log(data.questions);
  }

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleBlur = (questionId: number) => {
    console.log(`Answer for Question ${questionId} submitted:`, answers[questionId]);
  };

  return (
    <EventLayout>
      <div className="font-sans p-4 max-w mx-auto">
        <h2 className="text-xl font-bold md:text-2xl pl-3">Q&A</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 p-2 text-center">No</th>
                <th className="border border-gray-300 p-2 pl-4">Question</th>
                <th className="border border-gray-300 p-2">Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {data && data.questions.map((question:any,index:number) => (
                <tr key={question._id} className="border border-gray-300">
                  <td className="border border-gray-300 p-2 text-center">{index+1}</td>
                  <td className="border border-gray-300 p-2 pl-4">{question.q}</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={question.answers || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      onBlur={() => handleBlur(question.id)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </EventLayout>
  );
};

export default Questionnaire;
